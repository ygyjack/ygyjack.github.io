import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Auth from "./../services/auth";
import Api from "./../api/api";
import Spin from "./ui/spin";
import Toaster from "./ui/toastify";
import "./../styles/sass.scss";


export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, } = useForm();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("login");

  const onSubmitLogin = values => {
    // console.log('react-hook-form', values);
    setLoading(true);
    Api.login({
      email: values.email,
      password: values.password
    })
    .then(res => {
      Auth.setToken(res);
      navigate('/dashboard', { replace: true });
      window.location.reload();
    }, err => {
      Auth.setToken(null);
      Toaster.error(t('login.message.error'));
    })
    .finally(() => setLoading(false));
  };

  const onSubmitForgot = values => {
    // console.log('react-hook-form onSubmitForgot', values);
    setLoading(true);
    Api.sendForgot({
      forgotemail : values.forgotemail
    })
    .then(res => {
      Toaster.success(t('forgot.message.success'));
    }, err => {
      Toaster.error(t('forgot.message.error'));
    })
    .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Row>
        <Col className="col-sm-10 col-md-8 col-lg-6 mx-auto">
          { page === 'login' && <Card className="my-5" border="success">
            <Form noValidate onSubmit={handleSubmit(onSubmitLogin)}>
              <Card.Header><h4><span className="text-primary">{t('login.header')}</span></h4></Card.Header>
              <Card.Body>
                <Card.Title>{t('login.title')}</Card.Title>
                <Form.Group as={Col} controlId="username" className="mt-2">
                  <Form.Label>{t('login.label.username')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="userIcon"><FontAwesomeIcon icon="user" /></InputGroup.Text>
                    <Form.Control type="email"
                      isInvalid={errors.email} 
                      {...register("email", {
                      required: t('login.valid.username'),
                      validate: value => value.length > 6 || t('login.valid.username'),
                      // pattern: {
                      //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      //   message: "invalid email address"
                      // }
                    })} />
                    <Form.Control.Feedback type="invalid">                                                     
                      {errors.email?.message || t('login.valid.username')}                                                                  
                    </Form.Control.Feedback>    
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="password" className="mt-2">
                  <Form.Label>{t('login.label.password')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="passwordIcon"><FontAwesomeIcon icon="lock" /></InputGroup.Text>
                    <Form.Control
                      name="password"
                      type="password"
                      isInvalid={errors.password}
                      {...register("password", {
                        validate: value => value.length >= 6 || "Nice try! Password must be 6 characters long!"
                      })}
                    />
                    <Form.Control.Feedback type="invalid">{t('login.valid.password')}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between m-0">
                <div>
                  <Button onClick={() => navigate('/register')} variant="warning">
                    <FontAwesomeIcon icon="user" /> {t('login.button.register')}
                  </Button>
                </div>
                <div>
                  <Button onClick={() => setPage('forgot')} variant="link">
                    {t('login.button.forgot')}
                  </Button>
                  { loading ? <Spin show={{type: "button", variant: "primary"}} /> :
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon="sign-in-alt" /> {t('login.button.login')}
                    </Button>
                  }
                </div>
              </Card.Footer>
            </Form>
          </Card> }
          { page === 'forgot' && <Card className="my-5" border="success">
            <Form noValidate onSubmit={handleSubmit(onSubmitForgot)}>
              <Card.Header><h4><span className="text-primary">{t('forgot.header')}</span></h4></Card.Header>
              <Card.Body>
                <Card.Title>{t('forgot.title')}</Card.Title>
                <Form.Group as={Col} controlId="forgotemail" className="mt-2">
                  <Form.Label>{t('forgot.label.email')}<span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="emailIcon"><FontAwesomeIcon icon="envelope" /></InputGroup.Text>
                    <Form.Control
                      name="forgotemail"
                      type="email"
                      isInvalid={errors.forgotemail}
                      {...register("forgotemail", {
                        required: t('forgot.valid.email')+' - Required',
                        validate: value => value.length >= 6 || (t('forgot.valid.email')+' - Length'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: t('forgot.valid.email')+' - Format'
                        }
                      })}
                    />
                    <Form.Control.Feedback type="invalid">                                                     
                      {errors.forgotemail?.message || t('forgot.valid.email')}                                                                  
                    </Form.Control.Feedback>    
                  </InputGroup>
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between m-0">
                <Button onClick={() => setPage('login')} variant="link">
                  {t('forgot.button.back')}
                </Button>
                <div>
                  { loading ? <Spin show={{type: "button", variant: "primary"}}/> :
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon="sign-in-alt" /> {t('forgot.button.send')}
                    </Button>
                  }
                </div>
              </Card.Footer>
            </Form>
          </Card> }
        </Col>
      </Row>
    </Container>
  )
}
