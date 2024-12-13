import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { Container, Card, Tabs, Tab, ButtonGroup, Button, Badge, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Api from "../../api/api";
import Util from "../../utilities";
import Spin from "../ui/spin";
import Message from "../ui/message";
import Toaster from "../ui/toastify";
import MyModal from "./../ui/modal";
import Chart from "./../ui/chart";
import './../../styles/sass.scss';


export default function Expenselist() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [showTotal, setShowTotal] = useState(0);
  const [key, setKey] = useState('current');
  const [show, setShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onMonth, setOnMonth] = useState((new Date()).getMonth());
  const [onYear, setOnYear] = useState((new Date()).getFullYear());
  const [chart, setChart] = useState({
    bar: false,
    pie: false
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const defaultSort = {
    type: 'num',
    name: 'timestamp',
    reverse: true
  };
  const [sort, setSort] = useState(defaultSort);
  const [showModal, setShowModal] = useState(null);
  const modal = {
    title: 'modal.expense.title',
    header: 'modal.expense.header',
    body: 'modal.expense.body',
    cancel: 'modal.expense.cancel',
    confirm: 'modal.expense.confirm'
  };

  useAuth();
	/***
    * FILTER => EXPENSE LIST BY MONTH AND YEAR
	  * */
  const filterExpense = (obj) => obj.filter(expense => 
    (new Date(expense.timestamp)).getMonth() === onMonth && (new Date(expense.timestamp)).getFullYear() === onYear
  );

	/***
    * CALCULATE => TOTAL EXPENSES
	  * */
  const calcShowTotal = () => {
    let total = 0;
    show.forEach(item => { total += item.cost; });
    setShowTotal(Math.round(total*100)/100);
  }

	/***
    * SHOW => PROVIDE THE DATA INTO THE CHART
	  * */
  const calcShowChart = () => {
    let result = show.reduce((acc, val) => {
        let o = acc.filter(obj => obj.category === val.category).pop() || {category:val.category, cost:0};
        o.cost += val.cost;
        acc.indexOf(o) && acc.push(o);
        return acc;
    },[])
    .filter((itm, i, a) => i === a.indexOf(itm));
    let inputData = {
      labels: [],
      data: []
    };
    ['expense', 'apparel', 'household', 'motor', 'holiday', 'property', 'education'].forEach( category => {
      inputData.labels.push(t('expense.option.'+category));
      let curCate = result.filter(item => category === item.category).shift();
      inputData.data.push(curCate ? Math.round(curCate.cost*100)/100 : 0);
    });
    setChartData({
      labels: inputData.labels,
      datasets: [
        {
          label: t('expense.list.chart.label'),
          data: inputData.data,
          backgroundColor: [
            'rgba(23, 43, 77, 0.2)',
            'rgba(101, 84, 192, 0.2)',
            'rgba(0, 184, 217, 0.2)',
            'rgba(54, 179, 126, 0.2)',
            'rgba(255, 86, 48, 0.2)',
            'rgba(255, 153, 31, 0.2)',
            'rgba(151, 160, 175, 0.2)',
          ],
          borderColor: [
            'rgba(23, 43, 77, 1)',
            'rgba(101, 84, 192, 1)',
            'rgba(0, 184, 217, 1)',
            'rgba(54, 179, 126, 1)',
            'rgba(255, 86, 48, 1)',
            'rgba(255, 153, 31, 1)',
            'rgba(151, 160, 175, 1)',
          ],
          borderWidth: 1.5,
        },
      ]
    });
  }

  /***
    * SWITCH TABS
	  * */
  const handleSwitch = (key) => {
    setSort(defaultSort);
    setKey(key);
    let month;
    if (key === 'current') {
      let d = new Date();
      setOnYear(d.getFullYear());
      month = d.getMonth();
    } else {
      month = (key === 'last') ? onMonth-1 : onMonth+1;
      setOnYear(onYear+(month === 12 ? 1 : ((month === -1) ? -1 : 0)));
      month = (month === 12) ? 0 : (month === -1) ? 11 : month;
    }
    setOnMonth(month);
  };

  /***
    * HANDLE => DELETE ACTION
	  * */
  const handleDelete = () => {
    setLoading(true);
    Api.deleteExpense(showModal._id)
    .then(res => {
      setShowModal(null);
      Toaster.success(t('expense.list.message.success.delete'));
      getExpenses();
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * HANDLE => BACKUO ACTION
	  * */
  const handleBackup = () => {
    setLoading(true);
    Api.backupExpense()
    .then(res => {
      Toaster.success(t('expense.list.message.success.backup'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * HANDLE => SHOW CHART ACTION
	  * */
  const handleChart = (type) => {
    const chart = {
      bar: (type === 'Bar') ? true : false,
      pie: (type === 'Pie') ? true : false
    }
    setChart(chart);
  };

  /***
    * GET LIST OF EXPENSES
	  * */
  const getExpenses = () => {
    setLoading(true);
    Api.getExpenses()
    .then(res => {
      setExpenses(res);
      setShow(Util.sortOrder(filterExpense(res), 'num', 'timestamp', 'desc'));
      Toaster.success(t('expense.list.message.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    setShow(Util.sortOrder(filterExpense(expenses), sort.type, sort.name, sort.reverse ? 'desc' : 'asc'));
  }, [key, onMonth, onYear, sort]);

  useEffect(() => {
    calcShowTotal();
    calcShowChart();
  }, [show]);

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'expense.list.message.label' }} />
      <MyModal show={showModal} modal={modal} onHide={() => setShowModal(null)} onConfirm={() => handleDelete()} />
      { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
        <Card.Header>
          <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => handleSwitch(k)}>
            <Tab eventKey="last" title={<span><FontAwesomeIcon icon="arrow-left" /> {t('expense.list.tab.last')} </span>}></Tab>
            <Tab eventKey="current" title={t('expense.list.tab.current')}></Tab>
            <Tab eventKey="next" title={<span> {t('expense.list.tab.next')} <FontAwesomeIcon icon="arrow-right" /></span>}></Tab>
          </Tabs>
        </Card.Header>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between mx-0">
            <span>{t('expense.list.title')} - {onYear} {t('month.'+onMonth)} <Badge size="sm" bg="success" className="rounded-pill px-2 mx-1">{show.length}</Badge></span>
            <span>
              {t('expense.list.total')} <NumberFormat value={showTotal} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={2} fixedDecimalScale={true}/>
              <span className="px-1">
                { show.length !== 0 && <Chart chart={chart} chartdata={chartData} showBar={() => handleChart('Bar')} showPie={() => handleChart('Pie')} onHide={() => handleChart('')}/> }
              </span>
            </span>
          </Card.Title>
          { show.length === 0 ?
            <Message show={{ variant: 'warning', content: 'expense.list.message.noResult' }} /> :
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
                      <ButtonGroup aria-label="actions">
                        <Button variant="primary" className="mx-0" onClick={() => navigate('/expensesingle/create')}><FontAwesomeIcon icon="plus-square" /> {t('expense.list.button.create')}</Button>
                        <Button variant="warning" onClick={() => handleBackup()}><FontAwesomeIcon icon="thumbs-up" /> {t('expense.list.button.backup')}</Button>
                      </ButtonGroup>
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
                        <Button variant="primary" className="mx-0" onClick={() => navigate('/expensesingle/'+expense._id)}><FontAwesomeIcon icon="edit" /> {t('expense.list.button.edit')}</Button>
                        <Button variant="danger" onClick={() => setShowModal(expense)}><FontAwesomeIcon icon="trash-alt" /> {t('expense.list.button.delete')}</Button>
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