import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Container, Row, Col, Tabs, Tab, Card, Form, InputGroup, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "./../../hooks/useAuth";
import ApiIssue from './../../services/api';
import Moment from 'react-moment';
import Api from "./../../api/api";
import Spin from "./../ui/spin";
import Message from "./../ui/message";
import Toaster from "./../ui/toastify";
import './../../styles/sass.scss';


export default function Usersingle() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  useAuth();
  /***
    * GET USER BY ID
	  * */
  const getUser = (id) => {
    Api.getUser(id)
    .then(res => {
      setUser(res);
      Toaster.success(t('user.single.message.load'));
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  /***
    * UPDATE USER
    * */
  const onSubmitUpdate = (values) => {
    setLoading(true);
    values.id = id;
    Api.updateUser(values)
    .then(res => {
      Toaster.success(t('user.single.message.success'));
      setTimeout(() => {
        getUser(res._id);
      }, 5000);
    }, err => ApiIssue(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      user.gender = user.gender?.toString();
      reset(user);
    }
  }, [user, reset]);

  let { _id, email, createdate, modifydate, modifyby } = user;

  return (
    <Container fluid>
      <Message show={{ variant: 'light', content: 'user.single.message.label'}} />
      <Form noValidate onSubmit={handleSubmit(onSubmitUpdate)}>
        { loading ? <Spin show={{type:"card", variant:"primary"}}/> : <Card>
          <Card.Header>
            <Tabs id="controlled-tab-example" activeKey="edit">
              <Tab eventKey="edit" title={t('user.single.tab')}></Tab>
            </Tabs>
          </Card.Header>
          <Card.Body>
            <Card.Title>{t('user.single.title')} {t('user.field.id')}: {_id}</Card.Title>
            <Alert variant="success">
              <Card.Text as={Row}>
                <Col><strong>{t('user.field.email')}:</strong> {email}</Col>
                <Col><strong>{t('user.field.modifyby')}:</strong> {modifyby}</Col>
              </Card.Text>
              <Card.Text as={Row}>
                <Col><strong>{t('user.field.create')}:</strong> <Moment format="YYYY-MM-DD HH:mm:ss">{createdate}</Moment></Col>
                <Col><strong>{t('user.field.modify')}:</strong> <Moment format="YYYY-MM-DD HH:mm:ss">{modifydate}</Moment></Col>
              </Card.Text>
            </Alert>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="name">
                <Form.Label>{t('user.field.name')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="userIcon"><FontAwesomeIcon icon="user" /></InputGroup.Text>
                  <Form.Control type="text"
                    name="name"
                    aria-describedby="userIcon"
                    isInvalid={errors.name}
                    {...register('name', {
                      required: t('user.single.valid.name')
                    })}
                  />
                  <Form.Control.Feedback type="invalid"> 
                    {errors.name?.message || t('user.single.valid.name')}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="password">
                <Form.Label>{t('user.field.password')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="passwordIcon"><FontAwesomeIcon icon="lock" /></InputGroup.Text>
                  <Form.Control type="password" disabled
                    name="password"
                    aria-describedby="passwordIcon"
                    {...register('password')}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="phone">
                <Form.Label>{t('user.field.phone')}</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="phoneIcon"><FontAwesomeIcon icon="phone" /></InputGroup.Text>
                  <Form.Control type="number" 
                    name="phone"
                    aria-describedby="phoneIcon"
                    isInvalid={errors.phone}
                    {...register('phone')} 
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message || t('user.single.valid.phone')}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="gender">
                <Form.Label>{t('user.field.gender')}</Form.Label>
                <div key={`inline-radio`} className="pt-1">
                  <Form.Check inline type="radio" name="gender" value={0} {...register('gender')} label={t('user.field.unknown')} id={`inline-radio-Unknown`} />
                  <Form.Check inline type="radio" name="gender" value={1} {...register('gender')} label={t('user.field.female')} id={`inline-radio-female`} />
                  <Form.Check inline type="radio" name="gender" value={2} {...register('gender')} label={t('user.field.male')} id={`inline-radio-male`} />
                </div>
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="6" controlId="address">
                <Form.Label>{t('user.field.address')}<span className="text-danger">*</span></Form.Label>
                <Form.Control type="text"
                  name="address"
                  isInvalid={errors.address}
                  {...register('address', {
                    required: t('user.single.valid.address')
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address?.message || t('user.single.valid.address')}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="address2">
                <Form.Label>{t('user.field.address2')}</Form.Label>
                <Form.Control type="text" name="address2" {...register('address2')}/>
              </Form.Group>
            </Row>
            <Row className="mt-2">
              <Form.Group as={Col} md="4" controlId="city">
                <Form.Label>{t('user.field.city')}<span className="text-danger">*</span></Form.Label>
                <Form.Control as="select" 
                  name="city" 
                  isInvalid={errors.city}
                  {...register('city', {
                    required: t('user.single.valid.city')
                  })}
                >
                  <option value="">Choose</option>
                  <option value="2">Carlow</option>
                  <option value="1">Dublin</option>
                  <option value="3">Kilkenny</option>
                  <option value="4">Waterford</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.city?.message || t('user.single.valid.city')}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="postcode">
                <Form.Label>{t('user.field.postcode')}</Form.Label>
                <Form.Control type="text" name="postcode" {...register('postcode')} />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="country">
                <Form.Label>{t('user.field.country')}</Form.Label>
                <Form.Control as="select" name="country" {...register('country')}>
                  <option value="">Choose</option>
                  <option value="Ireland">Ireland</option>
                  <option value="UK">UK</option>
                  <option value="French">French</option>
                  <option value="Denmark">Denmark</option>
                </Form.Control>
              </Form.Group>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between mx-0">
            <Button variant="warning" onClick={() => navigate('/userlist')} className="mx-0">
              <FontAwesomeIcon icon="backspace" /> {t('user.single.button.back')}
            </Button>
            { loading ? <Spin show={{type: "button", variant: "primary"}} /> :
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon="save" /> {t('user.single.button.save')}
              </Button>
            }
          </Card.Footer>
        </Card> }
      </Form>
    </Container>
  )
}