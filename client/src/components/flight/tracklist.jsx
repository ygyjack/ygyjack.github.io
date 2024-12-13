import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Container, Card, Tabs, Tab, ButtonGroup, Button, Badge, Table, OverlayTrigger, Tooltip, Pagination, Row, Col, Form, Alert, InputGroup } from 'react-bootstrap';
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


export default function Flightlist() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [website, setWebsite] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [show, setShow] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState('');
  const [pageItems, setPageItems] = useState(25);
  const [pageOn, setPageOn] = useState(1);
  const [sort, setSort] = useState({
    orderByField : 'trackdate',
    reverseSort : false
  });
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  useAuth();
	/***
    * SORT => TABLE
	  * */
  const sortByField = (obj) => {
    setSort({ orderByField: obj.name, reverseSort: !sort.reverseSort });
    setTracks(Util.sortOrder(tracks, obj.type, obj.name, sort.reverseSort ? 'desc' : 'asc'));
  };

	/***
    * PAGINATION => TABLE
	  * */
  const doPagination = (page = pageOn) => {
    let pages = Math.ceil(tracks.length / pageItems);
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
      pageItems*(pageOn-1)+number < tracks.length && newShow.push(tracks[pageItems*(pageOn-1)+number]);
    }
    setShow(newShow);
  };

	/***
    * UPDATE TOKEN BY WEBSITE ID
	  * */
  const onSubmitUpdate = (values) => {
    values.createdate = new Date(values.createdate).getTime();
    values.updatedate = new Date().getTime();
    setTokenLoading(true);
    Api.updateWebsiteToken(values)
    .then(res => {
      setWebsite(values);
      Toaster.success(t('track.website.message.success'));
    }, err => ApiIssue(err))
    .finally(() => setTokenLoading(false));
  }

	/***
    * GET TRACK AND FLIGHT
	  * */
  const getTracks = () => {
    Api.getWebsiteToken(1)
    .then(res => {
      setWebsite(res);
      return Api.getTracks();
    }, err => ApiIssue(err))
    .then(res => {
      setTracks(Util.sortOrder(res, 'num', 'trackdate', 'desc'));
      Toaster.success(t('track.list.message.success'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getTracks();
  }, []);

  useEffect(() => {
    doPagination();
  }, [tracks, pageItems, pageOn, sort]);

  useEffect(() => {
    if (website) {
      website.activated = website.activated?.toString();
      website.updatedate = new Date(parseInt(website.updatedate) || Date.now());
      website.createdate = website.createdate ? new Date(parseInt(website.createdate)) : website.updatedate;
      reset(website);
    }
  }, [website, reset]);


  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'track.list.message.label' }} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey="tab">
            <Tab eventKey="tab" title={<span><FontAwesomeIcon icon="eye" /> {t('track.list.title')} <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{tracks.length}</Badge></span>}></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmitUpdate)}>
            { website && <Alert variant="success">
              <Card.Text as={Row}>
                <Col md="4">
                  <strong>{t('track.website.label.name')}: </strong> 
                  <a href={website.url} target="_blank" rel="noreferrer">{website.name}</a>
                </Col>
                <Col>
                  <strong>{t('track.website.label.createdate')}: </strong> 
                  <Moment format="ddd YYYY-MM-DD HH:mm:ss">{website.createdate}</Moment>
                </Col>
                <Col>
                  <strong>{t('track.website.label.updatedate')}: </strong> 
                  <Moment format="ddd YYYY-MM-DD HH:mm:ss">{website.updatedate}</Moment>
                </Col>
              </Card.Text>
              <Card.Text as={Row} className="pt-2">
                <Form.Group as={Col} md="4" controlId="token">
                  <InputGroup>
                    <InputGroup.Text id="tokenIcon"><FontAwesomeIcon icon="dollar-sign" /></InputGroup.Text>
                    <Form.Control type="text"
                      name="token"
                      aria-describedby="tokenIcon"
                      isInvalid={errors.token}
                      {...register('token', {
                        required: true,
                      })}
                    />
                    <Form.Control.Feedback type="invalid"> 
                      {errors.token?.message || t('track.website.valid.token')}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Col className="vertical-position">
                  <div className="vertical-middle">
                    <strong>{t('track.website.label.activated')}: </strong> 
                    <span key={`inline-radio`} className="pt-1">
                      <Form.Check inline type="radio" name="activated" value={true} {...register('activated')} label={t('track.website.option.yes')} id={`inline-radio-yes`} />
                      <Form.Check inline type="radio" name="activated" value={false} {...register('activated')} label={t('track.website.option.no')} id={`inline-radio-no`} />
                    </span>
                  </div>
                </Col>
                <Col>
                  { tokenLoading ? <Spin show={{type: "button", variant: "primary"}} /> :
                    <Button variant="primary" type="submit">
                      <FontAwesomeIcon icon='save' /> {t(`track.website.button.edit`)}
                    </Button>
                  }
                </Col>
              </Card.Text>
            </Alert> }
          </Form>
          { tracks.length === 0 ?
            <Message show={{ variant: 'warning', content: 'track.list.message.noResult' }} /> :
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="trackdate" onClick={() => sortByField({ type:"num", name:"trackdate" })}>
                          {t('track.field.trackdate')} { sort.orderByField === 'trackdate' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="airport" onClick={() => sortByField({ type:"txt", name:"airport" })}>
                          {t('track.field.airport')} { sort.orderByField === 'airport' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="code" onClick={() => sortByField({ type:"txt", name:"airport" })}>
                          {t('track.field.code')} { sort.orderByField === 'airport' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="direction" onClick={() => sortByField({ type:"txt", name:"direction" })}>
                          {t('track.field.direction')} { sort.orderByField === 'direction' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="completedate" onClick={() => sortByField({ type:"num", name:"completedate" })}>
                          {t('track.field.completedate')} { sort.orderByField === 'completedate' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="numberflights" onClick={() => sortByField({ type:"num", name:"numberflights" })}>
                          {t('track.field.numberflights')} { sort.orderByField === 'numberflights' && <FontAwesomeIcon icon={sort.reverseSort ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { show.map((item, index) => <tr key={index}>
                    <td className={`${(new Date(item.trackdate*1000)).getDay() === 0 || (new Date(item.trackdate*1000)).getDay() === 6 ? 'text-danger' : 'text-success'} `}>
                      <Moment format="ddd">{item.trackdate*1000}</Moment>
                    </td>
                    <td className={`${(new Date(item.trackdate*1000)).getDay() === 0 || (new Date(item.trackdate*1000)).getDay() === 6 ? 'text-danger' : 'text-success'} `}>
                      <Moment format="YYYY-MM-DD HH:mm:ss">{item.trackdate*1000}</Moment>
                    </td>
                    <td className="text-center">{t(`airport.${item.airport}`)}</td>
                    <td className="text-center">{item.airport}</td>
                    <td className="text-center">
                      <OverlayTrigger key='right' placement='right' overlay={
                        <Tooltip id={`tooltip-id-${item.trackid}`}>
                          {t(`direction.${item.direction}`)}
                        </Tooltip>
                      }>
                        <Button variant={`outline-${item.result === 'Done' ? 'success' : 'danger'}`} size="sm">
                          <FontAwesomeIcon icon={item.direction ==='Dep' ? "plane-departure" : "plane-arrival"} />
                        </Button>
                      </OverlayTrigger>
                    </td>
                    <td className="text-center"><Moment format="HH:mm:ss">{item.completedate*1000}</Moment></td>
                    <td className="text-center">{item.numberflights}</td>
                    <td className="text-center">
                      <ButtonGroup aria-label="actions">
                        <Button variant="primary" size="sm" className="mx-0" onClick={() => navigate('/flightlist/'+item.trackid)}><FontAwesomeIcon icon="eye" /> {t('track.list.button.view')}</Button>
                        <Button variant="danger" size="sm" onClick={() => alert("delete")}><FontAwesomeIcon icon="trash-alt" /> {t('track.list.button.delete')}</Button>
                      </ButtonGroup>
                    </td>
                  </tr> )}
                </tbody>
              </Table>
              <MyPagination key={`my_pagi`} pageItems={pageItems} allItems={tracks.length} pagination={pagination} onSetPageItems={(items) => setPageItems(items)} />
            </>
          }
        </Card.Body>
      </Card> }
    </Container>
  )
}