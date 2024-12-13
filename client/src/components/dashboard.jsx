import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, ButtonGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Auth from "./../services/auth";
import useAuth from "./../hooks/useAuth";
import Message from "./ui/message";
import Moment from 'react-moment';
import './../styles/sass.scss';

export default function Dashboard() {

  useAuth();
  const navigate = useNavigate();
  const [profile] = useState(Auth.checkToken());
  
  return (
    <Container fluid>
      <Message show={{variant: "light", content: "This is the home page:" }} />
      <Row className="pb-2">
        <Col className="col-sm-4">
          <ListGroup>
            <ListGroup.Item variant="primary">
              Administration
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>User ID: </h3>
              <strong>{profile?.id}</strong><br/>
              <strong>User Email :</strong> {profile?.email}<br/>
              <strong>Last login:</strong> <Moment format="YYYY-MMM-DD HH:mm">{profile?.last}</Moment>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className="col-sm-4">
          <ListGroup>
            <ListGroup.Item variant="success">
              <FontAwesomeIcon icon="user" /> User Card
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>User Details</h3>
              Please click the button to view a list of users.
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-end mx-0">
              <Button variant="primary" onClick={() => navigate('/userlist')}>View Users</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className="col-sm-4">
          <ListGroup>
            <ListGroup.Item variant="success">
              <FontAwesomeIcon icon="clipboard-check" /> Log Card
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>User Logs</h3>
              Please click the button to view a list of login logs.
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-end mx-0">
              <Button variant="primary" onClick={() => navigate('/loglist')}>View Logs</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="pb-2">
        <Col>
          <ListGroup>
            <ListGroup.Item variant="success">
              <FontAwesomeIcon icon="list" /> List of Sections
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <Card bg="light">
                    <Card.Header>
                      <FontAwesomeIcon icon="euro-sign" /> Expense Card
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Expense Section</Card.Title>
                      <Card.Text>
                        Please click the button to view a list of expenses.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end mx-0">
                      <ButtonGroup aria-label="ExpenseButtonGroup">
                        <Button variant="outline-primary" onClick={() => navigate('/expensesearch')}>Expense Search</Button>
                        <Button variant="outline-primary" onClick={() => navigate('/expenselist')}>View Expenses</Button> 
                      </ButtonGroup>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                  <Card bg="light">
                    <Card.Header>
                      <FontAwesomeIcon icon="plane" /> Flight Card
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Flight Section</Card.Title>
                      <Card.Text>
                        Please click the button to view a list of trackings & flights.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end mx-0">
                      <Button variant="outline-primary" onClick={() => navigate('/tracklist')}>View Trackings</Button>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                  <Card bg="light">
                    <Card.Header>
                      <FontAwesomeIcon icon="city" /> Property Card
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Property Section</Card.Title>
                      <Card.Text>
                        Please click the button to view a list of propertys.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end mx-0">
                      <Button variant="outline-primary" onClick={() => navigate('/propertylist')}>View Propertys</Button>
                    </Card.Footer>
                  </Card>
                </Col>
                <Col>
                  <Card bg="light">
                    <Card.Header>
                      <FontAwesomeIcon icon="bell" /> Visa Card
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Visa Section</Card.Title>
                      <Card.Text>
                        Please click the button to view a list of Visas.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-end mx-0">
                      <Button variant="outline-primary" onClick={() => navigate('/visalist')}>View Visas</Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}