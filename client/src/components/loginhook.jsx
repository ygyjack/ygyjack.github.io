import React, { Component, useState } from "react";
import Auth from "./../services/auth";
import { Container, Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS

import Toaster from "./ui/toastify";
import Spin from "./ui/spin";
import "./../styles/sass.scss";

import { useForm } from "react-hook-form";

export default function Login() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState("login");
  /* React Hook Form */
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log('react-hook-form', values);
  };

  let login = {
		email : "jack@yu",
		password : "password",
		error : null,
		forgotemail : "",
		forgoterror: null,
		forgotmsg : null
	};

  function handleSubmit1(event) {
    setLoading(true);
    setError(false);
    login.email = email;
    login.password = password;
    alert("handleSubmit");
    // Auth.login(login)
    // .then(function (response) {
    //   console.log("response"+JSON.stringify(response));
    //   if (response.status === 200 && response.data.auth != null) {
    //     Auth.setToken(response.data.auth);
    //   } else {
    //     setError(true);
    //   }
    // })
    // .catch(function (error) {
    //   setError(true);
    // })
    // .finally(function () {
    //   setLoading(false);
    // });
    event.preventDefault();
  }

  return (
    <Container>
      <Row>
        <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
          { page === 'login' && <Card className="my-5" border="success">
            <Card.Header><h4><span className="text-primary">{t('login.header')}</span></h4></Card.Header>
            <Card.Body>
              <Card.Title>{t('login.title')}</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Col} controlId="username">
                  <InputGroup>
                    <InputGroup.Text id="userIcon"><FontAwesomeIcon icon="user" /></InputGroup.Text>
                    <Form.Control
                      autoFocus
                      name="email"
                      type="email"
                      value={email}
                      {...register("message", {
                        required: 'User Name (Email) is Required',
                        validate: value => value.length > 6 || "Nice try! User Name must be 6 characters long!",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "invalid email address"
                        }
                      })}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">{t('login.valid.username')}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>{t('login.label.password')}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="passwordIcon"><FontAwesomeIcon icon="lock" /></InputGroup.Text>
                    <Form.Control
                      name="password"
                      type="password"
                      value={password}
                      {...register("message", {
                        validate: value => value.length > 6 || "Nice try! Password must be 6 characters long!"
                      })}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">{t('login.valid.password')}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between m-0">
              <div>
                <Button onClick={() => this.props.navigate('/register')} variant="warning">
                  <FontAwesomeIcon icon="user" /> {t('login.button.register')}
                </Button>
              </div>
              <div>
                { page === 'forgot' && <>
                  <Button onClick={() => setPage('forgot')} variant="link">
                    {t('login.button.forgot')}
                  </Button>
                  { loading ? <Spin show={{type: "button", variant: "primary"}} /> :
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon="sign-in-alt" /> {t('login.button.login')}
                    </Button>
                  }
                </> }
              </div>
            </Card.Footer>
          </Card> }
          { page === 'forgot' && <Card className="my-5" border="success">
            <Card.Header><h4><span className="text-primary">{t('forgot.header')}</span></h4></Card.Header>
            <Card.Body>
              <Card.Title>{t('forgot.title')}</Card.Title>
              <Form.Group as={Col} controlId="forgotemail">
                <Form.Label>{t('forgot.label.email')}<span className="text-danger">*</span></Form.Label>
                <InputGroup>
                  <InputGroup.Text id="emailIcon"><FontAwesomeIcon icon="envelope" /></InputGroup.Text>
                  <Form.Control
                    autoFocus
                    name="forgotemail"
                    type="email"
                    value={email}
                    {...register("message", {
                      required: 'User Name (Email) is Required',
                      validate: value => value.length > 6 || "Nice try! User Name must be 6 characters long!",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">{t('forgot.valid.email')}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between m-0">
              <Button onClick={() => this.setState({page: 'login'})} variant="link">
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
          </Card> }
        </Col>
      </Row>
    </Container>
  )
}
