import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { Container, ListGroup, Button, Badge, Table, OverlayTrigger, Popover, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import Api from "./../../api/api";
import Util from "./../../utilities";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import MyPagination from "./../ui/pagination";
import './../../styles/sass.scss';


export default function Loglist() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState([]);
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState('');
  const [pageItems, setPageItems] = useState(10);
  const [pageOn, setPageOn] = useState(1);
  const [sort, setSort] = useState({
    orderByField : 'timestamp',
    reverseSort : false
  });

  useAuth();
	/***
    * SORT => TABLE
	  * */
  const sortByField = (obj) => {
    setSort({ orderByField: obj.name, reverseSort: !sort.reverseSort });
    setLogs(Util.sortOrder(logs, obj.type, obj.name, sort.reverseSort ? 'desc' : 'asc'));
  };

	/***
    * PAGINATION => TABLE
	  * */
  const doPagination = (page = pageOn) => {
    let pages = Math.ceil(logs.length / pageItems);
    if (page > pages) {
      setPageOn(1);
      return;
    }
    let pagination = [];
    pagination.push(<Pagination.First key='pagi_first' disabled={page===1} onClick={() => doPagination(1)} />);
    pagination.push(<Pagination.Prev key='pagi_prev' disabled={page===1} onClick={() => doPagination(pageOn-1)} />);
    page > 3 && pagination.push(<Pagination.Ellipsis key='ellipsis_before' onClick={() => doPagination(pageOn-2)} />);
    for (let number = 1; number <= pages; number++) {
      Math.abs(number-page) <= 2 && pagination.push(
        <Pagination.Item key={`pagi_key_${number}`} active={number === page} onClick={() => doPagination(number)} >
          {number}
        </Pagination.Item>
      );
    }
    (page+3) < pages && pagination.push(<Pagination.Ellipsis key='ellipsis_after' onClick={() => doPagination(pageOn+2)} />);
    pagination.push(<Pagination.Next key='pagi_next' disabled={page===pages} onClick={() => doPagination(pageOn+1)} />);
    pagination.push(<Pagination.Last key='pagi_last' disabled={page===pages} onClick={() => page !== pages && doPagination(pages)} />);
    setPagination(pagination);
    setPageOn(page);
    let newShow = [];
    for (let number = 0; number < pageItems; number++) {
      pageItems*(pageOn-1)+number < logs.length && newShow.push(logs[pageItems*(pageOn-1)+number]);
    }
    setShow(newShow);
  };

  /***
  * GET LIST OF LOGS
  * */
  const getLogs = () => {
    Api.getLogs()
    .then(res => {
      setLogs(Util.sortOrder(res, 'num', 'timestamp', 'desc'));
      Toaster.success(t('log.list.message.success'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    doPagination();
  }, [logs, pageItems, pageOn, sort])

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'log.list.message.label' }} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <ListGroup>
        <ListGroup.Item variant="primary">
          <FontAwesomeIcon icon="clipboard-check" /> {t('log.list.title')} { logs.length > 0 && <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{logs.length}</Badge> }
        </ListGroup.Item>
        <ListGroup.Item>
          { logs.length === 0 ?
            <Message show={{ variant: 'warning', content: 'log.list.message.noResult' }} /> :
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="username" onClick={() => sortByField({type:"txt",name:"username"})}>
                          {t('log.field.username')} { sort.orderByField === 'username' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="type" onClick={() => sortByField({type:"txt",name:"type"})}>
                          {t('log.field.type')} { sort.orderByField === 'type' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="timestamp" onClick={() => sortByField({type:"num",name:"timestamp"})}>
                          {t('log.field.datetime')} { sort.orderByField === 'timestamp' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="result" onClick={() => sortByField({type:"txt",name:"result"})}>
                          {t('log.field.result')} { sort.orderByField === 'result' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button key="ip" variant="light" className="mx-0 fw-bold" disabled>{t('log.field.ip')}</Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="description" onClick={() => sortByField({type:"txt",name:"description"})}>
                          {t('log.field.description')} { sort.orderByField === 'description' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { show.map((log, index) => <tr key={index}>
                    <td>{log.username}</td>
                    <td>{log.type}</td>
                    <td><Moment format="YYYY-MM-DD HH:mm:ss">{log.timestamp}</Moment></td>
                    <td className={ log.result === 'Success' ? 'text-success' : (log.result === 'Fail' ? 'text-danger' : '') }>{log.result}</td>
                    <td className="text-center">
                      { log.ip && 
                        <OverlayTrigger key="top" placement="top" 
                          overlay={
                            <Popover id={`popover-positioned-top-${index}`}>
                              <Popover.Header as="h3">{log.ip.ip}</Popover.Header>
                              <Popover.Body>
                                <strong>{log.ip.timezone}</strong>
                                <div>{log.ip.city} {log.ip.postal}</div>
                                <div>{log.ip.region}</div>
                              </Popover.Body>
                            </Popover>
                          } 
                        >
                          <Button variant="outline-success" size="sm" className="mx-0">
                            <FontAwesomeIcon icon="home" />
                          </Button>
                        </OverlayTrigger>
                      }
                    </td>
                    <td>{log.description} </td>
                  </tr> )}
                </tbody>
              </Table>
              <MyPagination key={`my_pagi`} pageItems={pageItems} allItems={logs.length} pagination={pagination} onSetPageItems={(items) => setPageItems(items)} />
            </>
          }
        </ListGroup.Item>
      </ListGroup> }
    </Container>
  )
}














