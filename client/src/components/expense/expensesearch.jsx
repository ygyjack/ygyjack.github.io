import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ButtonGroup, Button, Badge, Table, Row, Col, Form, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Api from "./../../api/api";
import Util from "../../utilities";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import './../../styles/sass.scss';


export default function Expensesearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [showTotal, setShowTotal] = useState(0);
  const [payto, setPayto] = useState([]);
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    payto: '',
    category: '',
  });
  const [sort, setSort] = useState({
    type: 'num',
    name: 'timestamp',
    reverse: false
  });
  
  useAuth();
	/***
    * FILTER => EXPENSE LIST
	  * */
  const filterExpense = () => {
    return (filter.payto === '' && filter.category === '') ? [] : expenses
    .filter(expense => expense.payto === filter.payto || filter.payto === '')
    .filter(expense => expense.category === filter.category || filter.category === '');
  };

	/***
    * CALCULATE => TOTAL EXPENSES
	  * */
  const calcShowTotal = () => {
    let total = 0;
    show.forEach(item => { total += item.cost; });
    total = Math.round(total*100)/100;
    setShowTotal(total);
  }

	/***
    * HANDLE => NEW SEARCH
	  * */
  const handleSearch = () => {
    setShow(Util.sortOrder(filterExpense(), sort.type, sort.name, sort.reverse ? 'asc' : 'desc'));
  };

	/***
    * HANDLE => CHANGE FILTER
	  * */
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFilter({
      payto: name === 'payto' ? value : filter.payto,
      category: name === 'category' ? value : filter.category,
    });
    event.persist();
  };

  /***
    * GET LIST OF EXPENSES
	  * */
  const getExpenses = () => {
    setLoading(true);
    Api.getExpenses()
    .then(res => {
      setExpenses(res);
      let payToArray = [];
      res.map(expense => {
        payToArray.indexOf(expense.payto) < 0 && payToArray.push(expense.payto) && payToArray.sort();
      });
      setPayto(payToArray);
      Toaster.success(t('expense.search.message.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    calcShowTotal();
  }, [show]);

  useEffect(() => {
    handleSearch();
  }, [sort]);

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'expense.search.message.label' }} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey="search">
            <Tab eventKey="search" title={<span><FontAwesomeIcon icon="search" /> {t('expense.search.tab.current')} </span>}></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {t('expense.search.title')} <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{show.length}</Badge>
          </Card.Title>
          <Alert variant="success">
            <Form noValidate>
              <Card.Text as={Row}>
                <Form.Group as={Col} md="5" controlId="payto">
                  <Form.Label>{t('expense.field.payto')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="paytoIcon"><FontAwesomeIcon icon="shopping-cart" /></InputGroup.Text>
                    <Form.Control as="select" name="payto" aria-describedby="paytoIcon" value={filter.payto} onChange={(e) => changeHandler(e)}>
                      <option value="">{t('expense.option.choose')}</option>
                      { payto.map((item, index) => (
                        <option key={`payto-key-${index}`} value={item}>{item}</option>
                      )) }
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="category">
                  <Form.Label>{t('expense.field.category')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="categoryIcon"><FontAwesomeIcon icon="tag" /></InputGroup.Text>
                    <Form.Control as="select" name="category" aria-describedby="paytoIcon" value={filter.category} onChange={(e) => changeHandler(e)}>
                      <option value="">{t('expense.option.choose')}</option>
                      <option value="expense">{t('expense.option.expense')}</option>
                      <option value="apparel">{t('expense.option.apparel')}</option>
                      <option value="household">{t('expense.option.household')}</option>
                      <option value="motor">{t('expense.option.motor')}</option>
                      <option value="holiday">{t('expense.option.holiday')}</option>
                      <option value="property">{t('expense.option.property')}</option>
                      <option value="education">{t('expense.option.education')}</option>
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
                <Col className="position-relative">
                  <Button variant="primary" className="position-absolute bottom-0 mx-0" onClick={() => handleSearch()}>
                    <FontAwesomeIcon icon="search" />{t('expense.search.button.search')}
                  </Button>
                </Col>
              </Card.Text>
            </Form>
          </Alert>
          { show.length === 0 ?
            <Message show={{ variant: 'warning', content: 'expense.search.message.noResult' }} /> :
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="timestamp" onClick={() => setSort({type:"num",name:"timestamp",reverse:!sort.reverse})}>
                          {t('expense.field.datetime')} { sort.name === 'timestamp' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="cost" onClick={() => setSort({type:"num",name:"cost",reverse:!sort.reverse})}>
                          {t('expense.field.cost')} { sort.name === 'cost' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="payto" onClick={() => setSort({type:"txt",name:"payto",reverse:!sort.reverse})}>
                          {t('expense.field.payto')} { sort.name === 'payto' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="category" onClick={() => setSort({type:"txt",name:"category",reverse:!sort.reverse})}>
                          {t('expense.field.category')} { sort.name === 'category' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th>
                      <div className="d-grid">
                        <Button variant="outline-primary" className="table-header-sorting" key="description" onClick={() => setSort({type:"txt",name:"description",reverse:!sort.reverse})}>
                          {t('expense.field.description')} { sort.name === 'description' && <FontAwesomeIcon icon={sort.reverse ? "sort-amount-down" : "sort-amount-up"} /> }
                        </Button>
                      </div>
                    </th>
                    <th className="text-center">
                      {t('expense.search.total')} <NumberFormat value={showTotal} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={2} fixedDecimalScale={true}/>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { show.map((expense, index) => <tr key={index}>
                    <td className={ (new Date(expense.timestamp)).getDay() === 0 || (new Date(expense.timestamp)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                      <Moment format="ddd">{expense.timestamp}</Moment>
                    </td>
                    <td className={ (new Date(expense.timestamp)).getDay() === 0 || (new Date(expense.timestamp)).getDay() === 6 ? 'text-danger' : 'text-success' }>
                      <Moment format="YYYY-MM-DD HH:mm">{expense.timestamp}</Moment>
                    </td>
                    <td style={{textAlign: "right"}}><strong>
                      <NumberFormat value={expense.cost} displayType={'text'} thousandSeparator={true} prefix={''} decimalScale={2} fixedDecimalScale={true}/>
                    </strong></td>
                    <td>{expense.payto}</td>
                    <td className="text-center">{t('expense.option.'+expense.category)}</td>
                    <td>{expense.description} {!!expense.description}</td>
                    <td className="text-center">
                      <ButtonGroup aria-label="actions">
                        <Button variant="primary" className="mx-0" onClick={() => navigate('/expensesingle/'+expense._id)}>
                          <FontAwesomeIcon icon="edit" /> {t('expense.search.button.edit')}
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr> )}
                </tbody>
              </Table>
            </>
          }
        </Card.Body>
      </Card> }
    </Container>
  )
}