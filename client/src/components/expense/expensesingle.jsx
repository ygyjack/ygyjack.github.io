import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { Container, Row, Col, Tabs, Tab, Card, Form, InputGroup, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import Api from "./../../api/api";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import DatePicker from "react-datepicker";
import './../../styles/sass.scss';


export default function Expensesingle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [action, setAction] = useState();
  const [payto, setPayto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paytoLoading, setPaytoLoading] = useState(true);
  const { control, register, formState: { errors }, handleSubmit, reset } = useForm();

  useAuth();
  /***
    * GET LIST OF PAYTO
	  * */
  const getPayto = () => {
    setLoading(true);
    Api.getExpenses()
    .then(res => {
      let paytoArray = [];
      res.map(expense => paytoArray.indexOf(expense.payto) < 0 && paytoArray.push(expense.payto) && paytoArray.sort());
      setPayto(paytoArray);
    }, err => {
      Toaster.error(t('expense.single.message.error.payto'));
      ApiIssue(err);
    })
    .finally(() => setLoading(false));
  };

  /***
    * GET EXPENSE BY ID
	  * */
  const getExpense = (id) => {
    setLoading(true);
    Api.getExpense(id)
    .then(res => {
      setExpense(res);
      Toaster.success(t('expense.single.message.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * CREATE OR UPDATE EXPENSE
    * */
  const onSubmit = (values) => {
    setLoading(true);
    const date = new Date(values.datetime);
    let data = {
      id: values._id,
      cost: parseFloat(values.cost),
      datetime: date.toISOString(),
      timestamp: date.getTime(),
      category: values.category,
      payto: values.payto,
      description: values.description
    };
    (action === 'create' ? Api.createExpense(data) : Api.updateExpense(data))
    .then(res => {
      Toaster.success(t('expense.single.message.success.'+action));
      if (action === 'create') {
        setExpense({ 
          cost: '',
          datetime: date.toISOString(),
          timestamp: date.getTime(),
          category: values.category,
          payto: values.payto,
          description: values.description
        });
      } else {
        navigate('/expenselist');
      }
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    setAction(id === 'create' ? 'create' : 'edit');
    id !== 'create' && getExpense(id);
    getPayto();
  }, [id]);

  useEffect(() => {
    if (expense) {
      expense.datetime = new Date(expense.datetime);
      reset(expense);
    }
    if (payto.length > 0) {
      reset(expense);
      setPaytoLoading(false);
    }
  }, [expense, payto, reset]);


  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'expense.single.message.label' }} />
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
          <Card.Header>
            <Tabs id="controlled-tab-example" activeKey="tab">
              <Tab eventKey="tab" title={t(`expense.single.tab.${action}`)}></Tab>
            </Tabs>
          </Card.Header>
          <Card.Body>
            <Card.Title>{t(`expense.single.title.${action}`)}{ action !== 'create' ? ` ${t('expense.field.id')}: ${expense._id}` : ''}</Card.Title>
            { action !== 'create' && <Alert variant="success">
              <Card.Text as={Row}>
                <Col><strong>{t('expense.field.username')}:</strong> {expense.username}</Col>
                <Col><strong>{t('expense.field.datetime')}:</strong> <Moment format="ddd YYYY-MM-DD HH:mm:ss">{expense.datetime}</Moment></Col>
              </Card.Text>
            </Alert> }
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="cost">
                <Form.Label>{t('expense.field.cost')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="costIcon"><FontAwesomeIcon icon="dollar-sign" /></InputGroup.Text>
                  <Form.Control type="text" name="cost" aria-describedby="costIcon"
                    isInvalid={errors.cost} 
                    {...register('cost', {
                      required: true
                    })} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.cost?.message || t('expense.single.valid.cost')}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="datetime">
                <Form.Label>{t('expense.field.datetime')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="datetimeIcon"><FontAwesomeIcon icon="calendar" /></InputGroup.Text>
                  <Controller
                    name="datetime"
                    defaultValue={ new Date(expense?.datetime || Date.now()) }
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, ref } }) => {
                      return (
                        <DatePicker
                          onChange={onChange}
                          selected={value}
                          showTimeInput
                          dateFormat="yyyy-MM-dd HH:mm aa"
                          placeholderText={t('datepicker.placeholder')}
                          timeInputLabel={t('datepicker.time')}
                          inputRef={ref}
                          aria-invalid={!!errors.datetime}
                        />
                      );
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.datetime?.message || t('expense.single.valid.datetime')}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="payto">
                <Form.Label>{t('expense.field.payto')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="paytoIcon"><FontAwesomeIcon icon="shopping-cart" /></InputGroup.Text>
                  <Form.Control as="select" name="payto" aria-describedby="paytoIcon"
                    defaultValue={expense?.payto}
                    isInvalid={errors.payto} 
                    {...register('payto', {
                      required: true
                    })} >
                    <option value="">{t('expense.option.choose')}</option>
                    { payto.map((item, index) => (
                      <option key={`payto-key-${index}`} value={item}>{item}</option>
                    )) }
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.payto?.message || t('expense.single.valid.payto')}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="category">
                <Form.Label>{t('expense.field.category')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="categoryIcon"><FontAwesomeIcon icon="tag" /></InputGroup.Text>
                  <Form.Control as="select" name="category" aria-describedby="categoryIcon" 
                    isInvalid={errors.category} 
                    {...register('category', {
                      required: true
                    })}
                  >
                    <option value="">{t('expense.option.choose')}</option>
                    <option value="expense">{t('expense.option.expense')}</option>
                    <option value="apparel">{t('expense.option.apparel')}</option>
                    <option value="household">{t('expense.option.household')}</option>
                    <option value="motor">{t('expense.option.motor')}</option>
                    <option value="holiday">{t('expense.option.holiday')}</option>
                    <option value="property">{t('expense.option.property')}</option>
                    <option value="education">{t('expense.option.education')}</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.category?.message || t('expense.single.valid.category')}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} controlId="description">
                <Form.Label>{t('expense.field.description')}</Form.Label>
                <Form.Control type="text" name="description" {...register('description')} />
              </Form.Group>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between mx-0">
            <Button variant="warning" onClick={() => navigate('/expenselist')} className="mx-0">
              <FontAwesomeIcon icon={ action === 'create' ? 'window-close' : 'backspace' } /> {t((action === 'create') ? 'expense.single.button.cancel' : 'expense.single.button.back')}
            </Button>
            { paytoLoading ? <Spin show={{type: "button", variant: "primary"}} /> :
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={ action === 'create' ? 'plus-square' : 'save' } /> {t(`expense.single.button.${action}`)}
              </Button>
            }
          </Card.Footer>
        </Card> }
      </Form>
    </Container>
  )
}