import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { Container, Row, Col, Tabs, Tab, Card, Form, InputGroup, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import Api from "./../../api/api";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import DatePicker from "react-datepicker";
import './../../styles/sass.scss';


export default function Propertysingle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const { control, register, formState: { errors }, handleSubmit, reset } = useForm();

  useAuth();
  /***
    * GET PROPERTY BY ID
	  * */
  const getProperty = (id) => {
    setLoading(true);
    Api.getProperty(id)
    .then(res => {
      setProperty(res);
      Toaster.success(t('property.single.message.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * UPDATE PROPERTY
    * */
  const onSubmitUpdate = (values) => {
    setLoading(true);
    let data = {
      id: values.propertyid,
      bidprice: parseInt(values.bidprice),
      viewdate: (new Date(values.viewdate)).getTime() === 0 ? null : (new Date(values.viewdate)).getTime(),
      soldprice: parseInt(values.soldprice),
      solddate: (new Date(values.solddate)).getTime() === 0 ? null : (new Date(values.solddate)).getTime(),
      note: values.note === '' ? null : values.note,
      status: 'info',
    };
    Api.updateProperty(data)
    .then(res => {
      Toaster.success(t('property.single.message.success.edit'));
      navigate('/propertylist/'+location);
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProperty(id);
  }, [id]);

  useEffect(() => {
    if (property) {
      setLocation(property.location);
      property.viewdate = new Date(parseInt(property.viewdate) || Date.now());
      property.solddate = new Date(parseInt(property.solddate) || Date.now());
      reset(property);
    }
  }, [property, setLocation, reset]);

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'property.single.message.label' }} />
      <Form noValidate onSubmit={handleSubmit(onSubmitUpdate)}>
        { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
          <Card.Header>
            <Tabs id="controlled-tab-example" activeKey="tab">
              <Tab eventKey="tab" title={t(`property.single.tab.edit`)}></Tab>
            </Tabs>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {t(`property.single.title.edit`)}: {id}
            </Card.Title>
            <Alert variant="success">
              <Card.Text as={Row}>
                <Col><strong>{t('property.field.address')}: </strong>  
                  <a href={(property.websiteid===1?'http://www.myhome.ie':'http://www.daft.ie')+property.url} target="_blank" rel="noreferrer">
                    {property.address}
                  </a>
                  <br /><strong>{t('property.field.beds')}: </strong> {property.beds} {property.bath} {property.type} 
                  <br /><strong>{t('property.field.sizeBer')}: </strong> {property.size} {property.ber}
                  <br />
                  <br /><strong>{t('property.field.price')}: </strong> {property.price}
                  <br /><strong>{t('property.field.createdate')}: </strong> <Moment format="ddd YYYY-MM-DD HH:mm:ss">{parseInt(property.createdate)}</Moment>
                </Col>
                <Col>
                  <img src={property.photo} className="image-max-15" alt="" />
                </Col>
              </Card.Text>
              { (property.bidprice > 0 || property.viewdate) && <Card.Text as={Row} className="pt-2">
                <Col><strong>{t('property.field.bidprice')}: </strong> {property.bidprice} </Col>
                <Col><strong>{t('property.field.viewdate')}: </strong> <Moment format="ddd YYYY-MM-DD HH:mm:ss">{property.viewdate}</Moment></Col>
              </Card.Text> }
              { property.soldprice > 0 && property.solddate && <Card.Text as={Row} className="pt-2">
                <Col><strong>{t('property.field.soldprice')}: </strong>
                  <NumberFormat value={property.soldprice} displayType={'text'} thousandSeparator={true} prefix={'€'} decimalScale={0} fixedDecimalScale={true} />
                </Col>
                <Col><strong>{t('property.field.solddate')}: </strong> <Moment format="ddd YYYY-MM-DD HH:mm:ss">{property.solddate}</Moment></Col>
              </Card.Text> }
            </Alert>
            <Row>
              <Form.Group as={Col} md="6" controlId="bidprice">
                <Form.Label>{t('property.field.bidprice')}</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="bidpriceIcon"><FontAwesomeIcon icon="dollar-sign" /></InputGroup.Text>
                  <Form.Control type="number" name="bidprice"
                    aria-describedby="bidpriceIcon"
                    {...register('bidprice')}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="viewdate">
                <Form.Label>{t('property.field.viewdate')}</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="viewdateIcon"><FontAwesomeIcon icon="calendar" /></InputGroup.Text>
                  <Controller
                    control={control}
                    name='viewdate'
                    render={({ field }) => (
                      <DatePicker
                        onChange={(date) => field.onChange(date)}
                        showTimeInput
                        dateFormat="yyyy-MM-dd HH:mm aa"
                        placeholderText={t('datepicker.placeholder')}
                        timeInputLabel={t('datepicker.time')}
                        selected={field.value}
                        isInvalid={errors.viewdate}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid"> 
                    {errors.viewdate?.message || t('property.single.valid.viewdate')}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="pt-2">
              <Form.Group as={Col} md="6" controlId="soldprice">
                <Form.Label>{t('property.field.soldprice')}</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="soldpriceIcon"><FontAwesomeIcon icon="dollar-sign" /></InputGroup.Text>
                  <Form.Control type="number" name="soldprice"
                    aria-describedby="soldpriceIcon"
                    {...register('soldprice')}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="solddate">
                <Form.Label>{t('property.field.solddate')}</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="solddateIcon"><FontAwesomeIcon icon="calendar" /></InputGroup.Text>
                  <Controller
                    control={control}
                    name='solddate'
                    render={({ field }) => (
                      <DatePicker
                        onChange={(date) => field.onChange(date)}
                        showTimeInput
                        dateFormat="yyyy-MM-dd HH:mm aa"
                        placeholderText={t('datepicker.placeholder')}
                        timeInputLabel={t('datepicker.time')}
                        selected={field.value}
                        isInvalid={errors.solddate}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid"> 
                    {errors.solddate?.message || t('property.single.valid.solddate')}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="pt-2">
              <Form.Group as={Col} md="12" controlId="note">
                <Form.Label>{t('property.field.note')}</Form.Label>
                <InputGroup>
                  <Form.Control as="textarea" name="note" type="text" rows="2" 
                    placeholder={t('property.single.placeholder.note')} 
                    isInvalid={errors.note}
                    {...register('note', {
                        validate: value => value?.length <= 255 || t('property.single.valid.note')
                    })} />
                    <Form.Control.Feedback type="invalid"> 
                      {errors.note?.message || t('property.single.valid.note')}
                    </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between mx-0">
            <Button variant="warning" onClick={() => navigate('/propertylist/'+location)} className="mx-0">
              <FontAwesomeIcon icon='backspace' /> {t('property.single.button.back')}
            </Button>
            { loading ? <Spin show={{type: "button", variant: "primary"}} /> :
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon='save' /> {t(`property.single.button.edit`)}
              </Button>
            }
          </Card.Footer>
        </Card> }
      </Form>
    </Container>
  )
}
