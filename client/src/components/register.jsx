import React, { useState } from 'react';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from "../services/auth";
import Api from "../api/api";
import Spin from "./ui/spin";
import Toaster from "./ui/toastify";
import "./../styles/sass.scss";


export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, formState: { errors }, handleSubmit, } = useForm();

  /***
    * REGISTER USER
    * */
  const onSubmitRegister = (values) => {
    setLoading(true);
    Api.register(values)
    .then(res => {
      Auth.setToken(res);
      navigate('/dashboard', { replace: true });
      window.location.reload();
    }, err => {
      Toaster.error(t('register.message.error'));
    })
    .finally(() => setLoading(false));
  };

  /***
    * VALIDATE EMAIL
    * */
  const validateEmail = async (value) => {
    return await Api.checkEmail({ email: value })
    .then(res => res, err => false);
  }

  return (
    <Container>
      <Row>
        <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
          <Form noValidate onSubmit={handleSubmit(onSubmitRegister)}>
            <Card className="my-5" border="success">
              <Card.Header><h4><span className="text-primary">{t('register.header')}</span></h4></Card.Header>
              <Card.Body>
                <Card.Title>{t('register.title')}</Card.Title>
                <Row className="mt-2">
                  <Form.Group as={Col} md="6" controlId="name">
                    <Form.Label>{t('register.label.name')}<span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="userIcon"><FontAwesomeIcon icon="user" /></InputGroup.Text>
                      <Form.Control type="text" name="name" aria-describedby="userIcon" 
                        isInvalid={errors.name} 
                        {...register('name', {
                          required: true
                        })} 
                      />
                      <Form.Control.Feedback type="invalid">{errors.name?.message || t('register.valid.name')}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>{t('register.label.email')}<span className="text-danger">*</span></Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="emailIcon"><FontAwesomeIcon icon="envelope" /></InputGroup.Text>
                      <Form.Control type="email" name="email"
                        isInvalid={errors.email} 
                        {...register("email", {
                          required: t('register.valid.email.required'),
                          validate: validateEmail,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: t('register.valid.email.format')
                          },
                          // onChange: (e) => { console.log(e.target.value) },
                        })}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email?.message || t('register.valid.email.existed')}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group as={Col} md="6" controlId="phone">
                    <Form.Label>{t('register.label.phone')}</Form.Label>
                    <InputGroup>
                      <InputGroup.Text id="phoneIcon"><FontAwesomeIcon icon="phone" /></InputGroup.Text>
                      <Form.Control type="number" name="phone" aria-describedby="phoneIcon" {...register('phone')}/>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="gender">
                    <Form.Label>{t('register.label.gender')}</Form.Label>
                    <div key={`inline-radio`} className="pt-1">
                      <Form.Check inline type="radio" name="gender" {...register('gender')} value="0" label={t('register.label.unknown')} id={`inline-radio-Unknown`} />
                      <Form.Check inline type="radio" name="gender" {...register('gender')} value="1" label={t('register.label.female')} id={`inline-radio-female`} />
                      <Form.Check inline type="radio" name="gender" {...register('gender')} value="2" label={t('register.label.male')} id={`inline-radio-male`} />
                    </div>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group as={Col} controlId="address">
                    <Form.Label><FontAwesomeIcon icon="home" /> {t('register.label.address')}<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" name="address"
                      isInvalid={errors.address} 
                      {...register('address', {
                        required: true
                      })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.address?.message || t('register.valid.address')}</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group as={Col} controlId="address2">
                    <Form.Label><FontAwesomeIcon icon="home" /> {t('register.label.address2')}</Form.Label>
                    <Form.Control type="text" name="address2" {...register('address2')}/>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group as={Col} md="4" controlId="city">
                    <Form.Label>{t('register.label.city')}<span className="text-danger">*</span></Form.Label>
                    <Form.Control as="select" name="city" defaultValue=""
                      isInvalid={errors.city} 
                      {...register('city', {
                        required: true
                      })}
                    >
                      <option value="">Choose</option>
                      <option value="2">Carlow</option>
                      <option value="1">Dublin</option>
                      <option value="3">Kilkenny</option>
                      <option value="4">Waterford</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.city?.message || t('register.valid.city')}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="postcode">
                    <Form.Label>{t('register.label.postcode')}</Form.Label>
                    <Form.Control type="text" name="postcode" {...register('postcode')}/>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="country">
                    <Form.Label>{t('register.label.country')}</Form.Label>
                    <Form.Control as="select" name="country" defaultValue="" {...register('country')}>
                      <option value="">Choose</option>
                      <option value="Ireland">Ireland</option>
                      <option value="UK">UK</option>
                      <option value="French">French</option>
                      <option value="Denmark">Denmark</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group controlId="conditions">
                    <div key={`checkbox`} className="mb-3 mx-2">
                      <Form.Check type="checkbox" id={`check-api-checkbox`}>
                        <Form.Check.Input type="checkbox"
                          isInvalid={errors.conditions} 
                          {...register('conditions', {
                            required: true
                          })}
                        />
                        <Form.Check.Label className="px-2">{t('register.label.conditions')}</Form.Check.Label>
                        <Form.Control.Feedback type="invalid">{t('register.valid.conditions')}</Form.Control.Feedback>
                      </Form.Check>
                    </div>
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between mx-0">
                <Button variant="warning" onClick={() => navigate('/login')} className="mx-0">
                  <FontAwesomeIcon icon="ban" /> {t('register.button.cancel')}
                </Button>
                { loading ? <Spin show={{type: "button", variant: "primary"}} /> :
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon="user" /> {t('register.button.register')}
                  </Button>
                }
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}