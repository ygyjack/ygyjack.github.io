import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { Container, Card, Tabs, Tab, ButtonGroup, Button, Badge, Table, Row, Col, Form, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "../../hooks/useAuth";
import ApiIssue from '../../services/api';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Api from "../../api/api";
import Util from "../../utilities";
import Spin from "../ui/spin";
import Message from "../ui/message";
import Toaster from "../ui/toastify";
import DatePicker from "react-datepicker";
import './../../styles/sass.scss';


export default function Ticketsearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [show, setShow] = useState(false);
  // const [search, setSearch] = useState({
  //   departure: '',
  //   arrival: '',
  //   departuredate: null,
  //   arrivaldate: null,
  //   stop: '1',
  // });

  const [loading, setLoading] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [sort, setSort] = useState({
    type: 'num',
    name: 'minPrice',
    reverse: false
  });
  
  const { control, register, formState: { errors }, handleSubmit, reset } = useForm();

  useAuth();
	/***
    * FILTER => EXPENSE LIST
	  * */
  // const filterExpense = () => {
  //   return (filter.payto === '' && filter.category === '') ? [] : expenses
  //   .filter(expense => expense.payto === filter.payto || filter.payto === '')
  //   .filter(expense => expense.category === filter.category || filter.category === '');
  // };

	/***
    * HANDLE => NEW SEARCH
	  * */
//   const handleSearch = () => {
//     setShow(Util.sortOrder(filterExpense(), sort.type, sort.name, sort.reverse ? 'asc' : 'desc'));
// console.warn("search => ", search);
//   };

	/***
    * HANDLE => CHANGE SEARCH
	  * */
  // const changeHandler = (event) => {
  //   const { name, value } = event.target;
  //   setSearch({
  //     departure: search.departure,
  //     arrival: search.arrival,
  //     departuredate: search.departuredate,
  //     arrivaldate: search.arrivaldate,
  //     stop: name === 'stop' ? value : search.stop
  //   });
  //   event.persist();
  // };



	/***
    * PREPARE => PAYLOAD
    * DEFAULT IS RETURN
	  * */
  const getPayload = (data) => {
    return {
      query: {
        market: "IE",
        locale: "zh-CN",
        currency: "EUR",
        query_legs: [
          {
            origin_place_id: {
              iata: data.departure.toUpperCase()
            },
            destination_place_id: {
              iata: data.arrival.toUpperCase()
            },
            date: {
              year: new Date(data.departuredate).getFullYear(),
              month: new Date(data.departuredate).getMonth()+1,
              day: new Date(data.departuredate).getDate(),
            }
          },
          {
            origin_place_id: {
              iata: data.arrival.toUpperCase()
            },
            destination_place_id: {
              iata: data.departure.toUpperCase()
            },
            date: {
              year: new Date(data.arrivaldate).getFullYear(),
              month: new Date(data.arrivaldate).getMonth()+1,
              day: new Date(data.arrivaldate).getDate(),
            }
          }
        ],
        adults: 1,
        cabin_class: "CABIN_CLASS_ECONOMY"
      }
    };
  };

  /***
    * CREATE OR UPDATE EXPENSE
    * */
  const onSubmit = (values) => {
    console.warn("onSubmit values => ", values);
    setLoadButton(true);

    Api.getTickets(getPayload(values))
    .then(res => {
      console.warn("onSubmit res => ", res);
      setTickets(res);
      Toaster.success(t('flight.search.message.success'));
    }, err => ApiIssue(err))
    .finally(() => {
      setLoadButton(false);
      setShow(true);
    });
  };

  /***
    * GET LIST OF EXPENSES
	  * */
  // const getExpenses = () => {
  //   setLoading(true);
  //   Api.getExpenses()
  //   .then(res => {
  //     setExpenses(res);
  //     let payToArray = [];
  //     res.map(expense => {
  //       payToArray.indexOf(expense.payto) < 0 && payToArray.push(expense.payto) && payToArray.sort();
  //     });
  //     setPayto(payToArray);
  //     Toaster.success(t('expense.search.message.load'));
  //   }, err => ApiIssue(err))
  //   .finally(() => setLoading(false));
  // };

  // useUpdateEffect(() => {
  //   getSearch();
  // }, []);

  // useEffect(() => {
  //   let total = 0;
  //   tickets.forEach(item => { total += item.cost; });
  //   total = Math.round(total*100)/100;
  //   setShowTotal(total);
  // }, [tickets]);

  // useEffect(() => {
  //   handleSearch();
  // }, [sort]);

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'flight.search.message.label' }} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey="search">
            <Tab eventKey="search" title={<span><FontAwesomeIcon icon="search" /> {t('flight.search.tab.current')} </span>}></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {t('flight.search.title')} { tickets.length > 0 && <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{tickets.length}</Badge> }
          </Card.Title>
          <Alert variant="success">
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Card.Text as={Row}>
                <Form.Group as={Col} md="2" controlId="departure">
                  <Form.Label>{t('flight.search.field.departure')}<span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="departureIcon"><FontAwesomeIcon icon="plane-departure" /></InputGroup.Text>
                    <Form.Control type="text" name="departure" aria-describedby="departureIcon"
                      style={{textTransform: 'uppercase'}}
                      defaultValue={'DUB'}
                      maxLength={3}
                      minLength={3}
                      isInvalid={errors.departure} 
                      {...register('departure', {
                        required: true,
                        pattern: {
                          value: /[A-Z]$/i,
                          message: t('flight.search.valid.departure.format')
                        }
                      })} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.departure?.message || t('flight.search.valid.departure.required')}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="arrival">
                  <Form.Label>{t('flight.search.field.arrival')}<span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="arrivalIcon"><FontAwesomeIcon icon="plane-arrival" /></InputGroup.Text>
                    <Form.Control type="text" name="arrival" aria-describedby="arrivalIcon"
                      style={{textTransform: 'uppercase'}}
                      defaultValue={'PEK'}
                      maxLength={3}
                      minLength={3}
                      isInvalid={errors.arrival} 
                      {...register('arrival', {
                        required: true,
                        pattern: {
                          value: /[A-Z]$/i,
                          message: t('flight.search.valid.arrival.format')
                        }
                      })} 
                    />
                    <Form.Control.Feedback type="invalid">{errors.arrival?.message || t('flight.search.valid.arrival.required')}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="departuredate">
                  <Form.Label>{t('flight.search.field.departuredate')}<span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="departuredateIcon"><FontAwesomeIcon icon="calendar" /></InputGroup.Text>
                    <Controller
                      name="departuredate"
                      defaultValue={ new Date(Date.now()) }
                      control={control}
                      rules={{ 
                        required: true,
                        // validate: value => value.getTime() >= getValues(arrivaldate).getTime() || "Nice try! User Name must be 6 characters long!",
                       }}
                      render={({ field: { onChange, value, ref } }) => {
                        return (
                          <DatePicker
                            onChange={onChange}
                            selected={value}
                            dateFormat="yyyy-MM-dd"
                            placeholderText={t('datepicker.placeholder')}
                            timeInputLabel={t('datepicker.time')}
                            inputRef={ref}
                            aria-invalid={!!errors.departuredate}
                          />
                        );
                      }}
                    />
                    <Form.Control.Feedback type="invalid"> 
                      {errors.departuredate?.message || t('flight.search.valid.departuredate')}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="arrivaldate">
                  <Form.Label>{t('flight.search.field.arrivaldate')}<span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="arrivaldateIcon"><FontAwesomeIcon icon="calendar" /></InputGroup.Text>
                    <Controller
                      name="arrivaldate"
                      defaultValue={ new Date(Date.now()) }
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, ref } }) => {
                        return (
                          <DatePicker
                            onChange={onChange}
                            selected={value}
                            dateFormat="yyyy-MM-dd"
                            placeholderText={t('datepicker.placeholder')}
                            timeInputLabel={t('datepicker.time')}
                            inputRef={ref}
                            aria-invalid={!!errors.arrivaldate}
                          />
                        );
                      }}
                    />
                    <Form.Control.Feedback type="invalid"> 
                      {errors.arrivaldate?.message || t('flight.search.valid.arrivaldate')}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="1" controlId="stop">
                  <Form.Label>{t('flight.search.field.stop')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="stopIcon"><FontAwesomeIcon icon="tag" /></InputGroup.Text>
                    <Form.Control as="select" name="stop" aria-describedby="stopIcon" defaultValue="0"
                    isInvalid={errors.stops} 
                    {...register('stops', {
                      required: true
                    })}
                    >
                      <option value="0">{t('flight.search.option.direct')}</option>
                      <option value="1">{t('flight.search.option.one')}</option>
                      <option value="2">{t('flight.search.option.two')}</option>
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
                <Col className="position-relative">
                  { loadButton ? <Spin show={{type: "button", variant: "primary"}} /> :
                    <Button variant="primary" className="position-absolute top-0 mx-0" type="submit">
                      <FontAwesomeIcon icon="search" />{t('flight.search.button.search')}
                    </Button>
                  }
                </Col>
              </Card.Text>
            </Form>
          </Alert>
          { !!show && (tickets.length === 0 ?
            <Message show={{ variant: 'warning', content: 'flight.search.message.noResult' }} /> :
            <>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="departureDateTime">
                          {t('flight.search.form.field.departure')}
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="from">
                          {t('flight.search.form.field.from')}
                        </Button>
                      </div>
                    </th>
                    <th colSpan={2}>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="arrivalDateTime">
                          {t('flight.search.form.field.arrival')}
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="to">
                          {t('flight.search.form.field.to')}
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="stop" onClick={() => setSort({type:"txt",name:"stop",reverse:!sort.reverse})}>
                          {t('flight.search.form.field.stop')} { sort.name === 'stop' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="durationInMinutes" onClick={() => setSort({type:"txt",name:"durationInMinutes",reverse:!sort.reverse})}>
                          {t('flight.search.form.field.duration')} { sort.name === 'durationInMinutes' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="carrier" onClick={() => setSort({type:"txt",name:"carrier",reverse:!sort.reverse})}>
                          {t('flight.search.form.field.carrier')} { sort.name === 'carrier' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="minPrice" onClick={() => setSort({type:"num",name:"minPrice",reverse:!sort.reverse})}>
                          {t('flight.search.form.field.minprice')} { sort.name === 'minPrice' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="maxPrice" onClick={() => setSort({type:"num",name:"maxPrice",reverse:!sort.reverse})}>
                          {t('flight.search.form.field.maxprice')} { sort.name === 'maxPrice' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="agent" onClick={() => setSort({type:"txt",name:"agent",reverse:!sort.reverse})}>
                          {t('flight.search.form.field.agent')} { sort.name === 'agent' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { tickets.map((ticket, index) =>
                  <>
                    <tr key={ticket.itineraryId}>
                      <td className="text-center">
                        <span className={ (new Date(ticket.legs[0].departureDateTime)).getDay() === 0 || (new Date(ticket.legs[0].departureDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="ddd">{ticket.legs[0].departureDateTime}</Moment>
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={ (new Date(ticket.legs[0].departureDateTime)).getDay() === 0 || (new Date(ticket.legs[0].departureDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="YYYY-MM-DD HH:mm">{ticket.legs[0].departureDateTime}</Moment>
                        </span>
                      </td>
                      <td>{ticket.legs[0].originPlace}</td>
                      <td>
                        <span className={ (new Date(ticket.legs[0].arrivalDateTime)).getDay() === 0 || (new Date(ticket.legs[0].arrivalDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="ddd">{ticket.legs[0].arrivalDateTime}</Moment>
                        </span>
                      </td>
                      <td>
                        <span className={ (new Date(ticket.legs[0].arrivalDateTime)).getDay() === 0 || (new Date(ticket.legs[0].arrivalDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="YYYY-MM-DD HH:mm">{ticket.legs[0].arrivalDateTime}</Moment>
                        </span>
                      </td>
                      <td>{ticket.legs[0].destinationPlace}</td>
                      <td className="text-center">{ticket.legs[0].stopCount}</td>
                      <td className="text-center">
                        <span>{`${Math.floor(ticket.legs[0].durationInMinutes / 60)}:${ticket.legs[0].durationInMinutes % 60}`}</span>
                      </td>
                      <td>{ticket.legs[0].carrier}</td>
                      <td style={{textAlign: "right"}} rowSpan={3}>
                        <NumberFormat value={ticket.minPrice/1000} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={2} fixedDecimalScale={true}/>
                      </td>
                      <td style={{textAlign: "right"}} rowSpan={3}>{ticket.maxPrice && <NumberFormat value={ticket.maxPrice/1000} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={2} fixedDecimalScale={true}/>}</td>
                      <td className="text-center" rowSpan={3} onClick={() => window.open(ticket.link, '_blank', 'noopener,noreferrer')}><img src={ticket.imageUrl} className="image-max-5" alt={ticket.agent} /></td>
                    </tr>
                    <tr key={ticket.itineraryId+'-0.5'+index}></tr>
                    <tr key={ticket.itineraryId+'-1'+index}>
                      <td className="text-center">
                        <span className={ (new Date(ticket.legs[1].departureDateTime)).getDay() === 0 || (new Date(ticket.legs[1].departureDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="ddd">{ticket.legs[1].departureDateTime}</Moment>
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={ (new Date(ticket.legs[1].departureDateTime)).getDay() === 0 || (new Date(ticket.legs[1].departureDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                        <Moment format="YYYY-MM-DD HH:mm">{ticket.legs[1].departureDateTime}</Moment>
                        </span>
                      </td>
                      <td>{ticket.legs[1].originPlace}</td>
                      <td>
                        <span className={ (new Date(ticket.legs[1].arrivalDateTime)).getDay() === 0 || (new Date(ticket.legs[1].arrivalDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="ddd">{ticket.legs[1].arrivalDateTime}</Moment>
                        </span>
                      </td>
                      <td>
                        <span className={ (new Date(ticket.legs[1].arrivalDateTime)).getDay() === 0 || (new Date(ticket.legs[1].arrivalDateTime)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                          <Moment format="YYYY-MM-DD HH:mm">{ticket.legs[1].arrivalDateTime}</Moment>
                        </span>
                      </td>
                      <td>{ticket.legs[1].destinationPlace}</td>
                      <td className="text-center">{ticket.legs[1].stopCount}</td>
                      <td className="text-center">
                        <span>{`${Math.floor(ticket.legs[1].durationInMinutes / 60)}:${ticket.legs[0].durationInMinutes % 60}`}</span>
                      </td>
                      <td>{ticket.legs[1].carrier}</td>
                    </tr>
                  </>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>
      </Card> }
    </Container>
  )
}