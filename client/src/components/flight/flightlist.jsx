import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ButtonGroup, Button, Badge, Alert, Row, Col, Table, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import 'moment-timezone';
import Api from "./../../api/api";
import Util from "./../../utilities";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import MyPagination from "./../ui/pagination";
import './../../styles/sass.scss';


export default function Flightlist() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [flights, setFlights] = useState([]);
  const [track, setTrack] = useState([]);
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState('');
  const [pageItems, setPageItems] = useState(25);
  const [pageOn, setPageOn] = useState(1);
  const [sort, setSort] = useState({
    orderByField : 'scheduleddeptime',
    reverseSort : false
  });

  useAuth();
	/***
    * SORT => TABLE
	  * */
  const sortByField = (obj) => {
    setSort({ orderByField: obj.name, reverseSort: !sort.reverseSort });
    setFlights(Util.sortOrder(flights, obj.type, obj.name, sort.reverseSort ? 'desc' : 'asc'));
  };

	/***
    * PAGINATION => TABLE
	  * */
  const doPagination = (page = pageOn) => {
    let pages = Math.ceil(flights.length / pageItems);
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
      pageItems*(pageOn-1)+number < flights.length && newShow.push(flights[pageItems*(pageOn-1)+number]);
    }
    setShow(newShow);
  };


	/***
    * GET TRACK AND FLIGHT
	  * */
  const getTrack = (id) => {
    Api.getTrack(id)
    .then(res => {
      setTrack(res[0]);
      return Api.getFlight(id);
    })
    .then(res => {
      setFlights(Util.sortOrder(res, 'num', 'scheduleddeptime', 'asc'));
      Toaster.success(t('flight.list.message.success'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getTrack(id);
  }, [id]);

  useEffect(() => {
    doPagination();
  }, [flights, pageItems, pageOn, sort]);

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'flight.list.message.label' }} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey="current">
            <Tab eventKey="current" title={<span><FontAwesomeIcon icon="plane" /> {t('flight.list.title')} <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{flights.length}</Badge></span>}></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between mx-0">
            <div>
              <strong>{t(`airport.${track.airport}`)}</strong> {track.airport} - {t(`direction.${track.direction}`)} <FontAwesomeIcon icon={track.direction ==='Dep' ? "plane-departure" : "plane-arrival"} />
            </div>
            <Button variant="warning" size="sm" onClick={() => navigate('/tracklist')}>
              <FontAwesomeIcon icon="backspace" /> {t('flight.list.button.back')}
            </Button>
          </Card.Title>
          <Alert variant={track.result === 'Done' ? "success" : "danger"}>
            <Card.Text as={Row}>
              <Col>
                <strong>{t('track.field.trackdate')}: </strong>
                <Moment format="YYYY-MM-DD">{track.trackdate*1000}</Moment>
                <strong> <Moment format="dddd">{track.trackdate*1000}</Moment></strong>
              </Col>
              <Col><strong>{t('track.info.from')}: </strong><Moment format="HH:mm:ss">{track.trackdate*1000}</Moment></Col>
              <Col><strong>{t('track.info.to')}: </strong><Moment format="HH:mm:ss">{track.completedate*1000}</Moment></Col>
            </Card.Text>
          </Alert>
          { flights.length === 0 ?
            <Message show={{ variant: 'warning', content: 'flight.list.message.noResult' }} /> :
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="scheduleddeptime" onClick={() => sortByField({ type:"num", name:"scheduleddeptime" })}>
                          {t('flight.field.scheduleddeptime')} { sort.orderByField === 'scheduleddeptime' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    { track.direction ==='Dep' ?
                      <>
                      <th>
                        <div className="d-grid">
                          <Button variant="outline-primary" className="table-header-sorting" key="fdstaptcname" onClick={() => sortByField({ type:"txt", name:"fdstaptcname" })}>
                            {t('flight.field.fdstaptcname')} { sort.orderByField === 'fdstaptcname' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                          </Button>
                        </div>
                      </th>
                      <th>
                        <div className="d-grid">
                          <Button variant="outline-primary" className="table-header-sorting" key="fdst" onClick={() => sortByField({ type:"txt", name:"fdst" })}>
                            {t('flight.field.fdst')} { sort.orderByField === 'fdst' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                          </Button>
                        </div>
                      </th>
                      </>
                    :
                      <>
                      <th>
                        <div className="d-grid">
                          <Button variant="outline-primary" className="table-header-sorting" key="forgaptcname" onClick={() => sortByField({ type:"txt", name:"forgaptcname" })}>
                            {t('flight.field.forgaptcname')} { sort.orderByField === 'forgaptcname' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                          </Button>
                        </div>
                      </th>
                      <th>
                        <div className="d-grid">
                          <Button variant="outline-primary" className="table-header-sorting" key="forg" onClick={() => sortByField({ type:"txt", name:"forg" })}>
                            {t('flight.field.forg')} { sort.orderByField === 'forg' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                          </Button>
                        </div>
                      </th>
                      </>
                    }
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="dsttinezone" onClick={() => sortByField({ type:"num", name:"dsttinezone" })}>
                          {t('flight.field.dsttinezone')} { sort.orderByField === 'dsttinezone' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="fnum" onClick={() => sortByField({ type:"txt", name:"fnum" })}>
                          {t('flight.field.fnum')} { sort.orderByField === 'fnum' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="ftype" onClick={() => sortByField({ type:"txt", name:"ftype" })}>
                          {t('flight.field.ftype')} { sort.orderByField === 'ftype' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="name" onClick={() => sortByField({ type:"txt", name:"name" })}>
                          {t('flight.field.name')} { sort.orderByField === 'name' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="actualdeptime" onClick={() => sortByField({ type:"num", name:"actualdeptime" })}>
                          {t('flight.field.actualdeptime')} { sort.orderByField === 'actualdeptime' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { show.map((item, index) => <tr key={index}>
                    <td><Moment tz="Asia/Shanghai" format="YYYY-MM-DD HH:mm">{item.scheduleddeptime*1000}</Moment></td>
                    <td>{item.fdstaptcname}{item.forgaptcname}</td>
                    <td className="text-center">{item.fdst}{item.forg}</td>
                    { item.fdst && <td className={`text-center ${(28800-item.dsttinezone) > 0 ? 'text-success' : 'text-danger'}`}>{28800-item.dsttinezone > 0 ? '+' : ''}{(28800-item.dsttinezone)/3600}</td> }
                    { item.forg && <td className={`text-center ${(28800-item.orgtinezone) > 0 ? 'text-success' : 'text-danger'}`}>{28800-item.orgtinezone > 0 ? '+' : ''}{(28800-item.orgtinezone)/3600}</td> }
                    <td className="text-center">{item.fnum}</td>
                    <td className="text-center">{item.ftype}</td>
                    <td className={`text-center ${item.complete ? 'text-success' : 'text-danger'}`}>{item.name}</td>
                    <td className="text-center">{!!item.actualdeptime && <Moment tz="Asia/Shanghai" format="HH:mm">{item.actualdeptime*1000}</Moment>}</td>
                  </tr> )}
                </tbody>
              </Table>
              <MyPagination key={`my_pagi`} pageItems={pageItems} allItems={flights.length} pagination={pagination} onSetPageItems={(items) => setPageItems(items)} />
            </>
          }
        </Card.Body>
      </Card> }
    </Container>
  )
}