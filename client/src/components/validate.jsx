import React, { Component } from 'react';
import Api from "./../api/api";
import { Container, Row, Col, Card, Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withTranslation } from 'react-i18next'; // TRANSLATION IN HOC
import Spin from "./ui/spin";
import Message from "./ui/message";
import "./../styles/sass.scss";

import SimpleReactValidator from 'simple-react-validator';

import * as queryString from 'query-string';

const stringifiedParams = queryString.stringify({
  client_id: '15281320220-vge2uvg01ntamot0hpudn246br296ube.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:3000/auth/google',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;


//console.error(" ===== process.env ===== ", process.env);


class Validate extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      name: '',
      email: '',
      password: '',
      validated: false,
      error: -1,
      message: '',
      loading: false
    };
    this.validator = new SimpleReactValidator();
  }


  changeHandler = (event) => {
    const emailValid = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const { name, value } = event.target;
    let error = '';
    this.setState({[name]: value});
    event.persist();
    switch (name) {
      case 'name':
        error = value.length < 6 ? 'Full Name must be 6 characters long!' : error;
        break;
      case 'email':
        error = !emailValid.test(value) ? 'Email is not valid!' : error;
        break;
      case 'password':
        error = value.length < 8 ? 'Password must be 8 characters long!' : error;
        break;
      default:
        break;
    }
    console.log(name+" checked: "+error);
    event.target.setCustomValidity(error);
  }

  submitForm = () => {
    if (this.validator.allValid()) {
      alert('You submitted the form and stuff!');
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }

  onHandleSubmit = (event) => {
    this.setState({loading: true});
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({validated: true});
      this.setState({loading: false})
    } else {
      console.log("this.state: "+this.state.name+" & "+this.state.email+" & "+this.state.password);
      setTimeout(() => {
        if (this.state.email !== 'jack@gmail.com') this.setState({error:1, message:{variant: "danger", content: 'login.message.error'}});
        else this.setState({error: 1, message:{variant: "success", content: 'GOOD LOGIN!'}});
        this.setState({loading: false})
      }, 5000);
    }
  }

  onHandleAddUsername = () => {
    let data = {username: this.state.username}
    Api.addUsername(data)
    .then(res => {
      console.warn(" ======= Api getLogs result ======= : "+(new Date()).toISOString(), res);
    }, err => {
      console.warn(" ======= Api getLogs reject ======= : "+(new Date()).toISOString(), err);
    })
  }
  onHandleGoogle = () => {
    // Api.getAuthGoogle()
    alert("£Google");
  }

  render() {
    const { t } = this.props;
    return (
      <Container>
        {/* LOGIN CARD 1 */}
        <Row>
          <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
            <Form noValidate validated={this.state.validated} onSubmit={this.onHandleSubmit}>
              <Card className="my-5" border="success">
                <Card.Header><h4><span className="text-primary">{t('login.header')}</span></h4></Card.Header>
                <Card.Body>
                  { this.state.error >= 0 && <Message show={this.state.message} /> }
                  <Card.Title>{t('login.title')}</Card.Title>
                  <Row>
                    <Form.Group as={Col} md="6" controlId="name">
                      <Form.Label>{t('register.label.name')}<span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <InputGroup.Text id="userIcon"><FontAwesomeIcon icon="user" /></InputGroup.Text>
                        <Form.Control required type="text" name="name" aria-describedby="userIcon" onChange={this.changeHandler} />
                        <Form.Control.Feedback type="invalid">{t('register.valid.name')}</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>{t('register.label.email')}<span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <InputGroup.Text id="emailIcon"><FontAwesomeIcon icon="envelope" /></InputGroup.Text>
                        <Form.Control required type="email" name="email" aria-describedby="emailIcon" onChange={this.changeHandler} />
                        <Form.Control.Feedback type="invalid">{t('register.valid.email')}</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group controlId="password">
                      <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <Form.Control required type="password" name="password" aria-describedby="passwordIcon" onChange={this.changeHandler} />
                        <Form.Control.Feedback type="invalid">Invalid Password</Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between mx-0">
                  <div>
                    <Button onClick={() => this.props.history.push('/register')} className="mx-0" variant="warning">
                      <FontAwesomeIcon icon="user" /> {t('login.button.register')}
                    </Button>
                  </div>
                  <div>
                    { this.state.loading ? <Spin show={{type: "button", variant: "primary"}} /> :
                      <Button type="submit" variant="primary">
                        <FontAwesomeIcon icon="sign-in-alt" /> {t('login.button.login')}
                      </Button>
                    }
                  </div>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
        {/* LOGIN CARD 2 */}

        <Row>
          <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
            <a href={googleLoginUrl}>
              Login with Google
            </a>
            <br />
            <span className="purple">Test</span>
          </Col>
        </Row>
        <Row>
          <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
            <Button type="button" onClick={this.onHandleGoogle} variant="primary">
              <FontAwesomeIcon icon="sign-in-alt" /> Google
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
            <input name="username" value={this.state.username} onChange={this.changeHandler} />
            <Button type="button" onClick={this.onHandleAddUsername} variant="primary">
              <FontAwesomeIcon icon="user" /> Add User Name
            </Button>
          </Col>
        </Row>


        <Row>
          <Col className="col-sm-12 col-md-10 col-lg-8 mx-auto">
            <Form noValidate validated={this.state.validated} onSubmit={this.onHandleSubmit}>
              <Card className="my-5" border="success">
                <Card.Header><h4><span className="text-primary">{t('login.header')}</span></h4></Card.Header>
                <Card.Body>
                  { this.state.error >= 0 && <Message show={this.state.message} /> }
                  <Card.Title>{t('login.title')}</Card.Title>
                  <Row>
                    <Form.Group as={Col} md="6" controlId="name">
                      <Form.Label>{t('register.label.name')}<span className="text-danger">*</span></Form.Label>
                      <input className="form-control" value={this.state.name} onChange={this.changeHandler} />
                      {/**********   This is where the magic happens     ***********/}
                      {this.validator.message('name', this.state.name, 'required|min:6')}
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="email">
                      <Form.Label>{t('register.label.email')}<span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <InputGroup.Text id="emailIcon"><FontAwesomeIcon icon="envelope" /></InputGroup.Text>
                        <Form.Control required type="email" name="email" value={this.state.email} aria-describedby="emailIcon" onChange={this.changeHandler} />
                        {/**********   This is where the magic happens     ***********/}
                        {this.validator.message('email', this.state.email, 'required|email')}
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group controlId="password">
                      <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                        <input className="form-control" value={this.state.password} onChange={this.changeHandler} />
                        {/**********   This is where the magic happens     ***********/}
                        {this.validator.message('password', this.state.password, 'required|min:8')}
                    </Form.Group>
                  </Row>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between mx-0">
                  <div>
                    <Button onClick={() => this.props.history.push('/register')} className="mx-0" variant="warning">
                      <FontAwesomeIcon icon="user" /> {t('login.button.register')}
                    </Button>
                  </div>
                  <div>
                    { this.state.loading ? <Spin show={{type: "button", variant: "primary"}} /> :
                      <Button type="button" onClick={this.submitForm} variant="primary">
                        <FontAwesomeIcon icon="sign-in-alt" /> {t('login.button.login')}
                      </Button>
                    }
                  </div>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withTranslation()(Validate);
