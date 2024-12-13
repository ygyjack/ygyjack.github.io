import React, { Component } from 'react';
import { ListGroup, Card, Alert, Nav, Tabs, Tab, Table, Form, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleButton from 'react-toggle-button'
import PNF from '../images/digitary.jpg';
import Spin from './ui/spin';
import ToggleSwitch from './ui/toggle';
import './../styles/sass.scss';

import {Doughnut} from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 13],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ]
};

class Message extends Component {

  state = {
    value: true,
    ts: true,
    isLoading: false
  };

  toggle = () => this.setState((currentState) => ({isLoading: !this.state.isLoading}));
  handleClickMe = () => {
    this.toggle();
    const d = new Date();
    console.warn("Start Time: "+d.toISOString());
    setTimeout(() => {
      console.warn("New Time: "+(new Date()).toISOString());
      this.toggle();
    }, 3000);
  };

  render () {
    return (
      <ListGroup>
        <ListGroup.Item>
          <Alert key='0' variant='success'>
            This is a success alert—check it out!
            <h1 className="purple">Hello purple Car!</h1>
            { this.state.isLoading ? <Spin showType="button" /> : <Button variant="primary" onClick={ ()=> this.handleClickMe() }>Click me</Button> }
            {/* <ToggleButton
              inactiveLabel=<FontAwesomeIcon icon="times" />
              activeLabel=<FontAwesomeIcon icon="circle" />
              value={this.state.value}
              onToggle={(value) => {
                this.setState({
                  value: !value,
                })
              }}
            /> */}
            {this.state.value ? "value Yes" : "value No"}
            <br />
            <ToggleSwitch id="id" name="ts" currentValue={this.state.ts} onChange={ () => this.setState({ ts: !this.state.ts }) }/>{this.state.ts ? "ts Yes" : "ts No"}
          </Alert>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#platform">
                <Nav.Item>
                  <Nav.Link href="#platform">Platform Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#system">System Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#disabled" disabled>
                    3rd Party Admin
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Learner Portal</Card.Title>
              <Card.Text>
                Please click the toggle button to update the Learner Portal(LP) feature status.
              </Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Budges</th>
                    <th>Orders</th>
                    <th>VIA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>LP</td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Card.Title>Organisation Portal</Card.Title>
              <Card.Text>
                Please click the toggle button to update the feature status in Organisation.
              </Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2"></th>
                    <th>Budges</th>
                    <th>Orders</th>
                    <th>VIA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ANU</td>
                    <td><Button variant="primary">Edit</Button></td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-success">Enabled</Button>
                        <Button variant="secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  <tr>
                    <td>Auckland</td>
                    <td><Button variant="primary">Edit</Button></td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-success">Enabled</Button>
                        <Button variant="secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  <tr>
                    <td>Digitary</td>
                    <td><Button variant="primary">Edit</Button></td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                      <Button variant="outline-success">Enabled</Button>
                      <Button variant="secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="success">Enabled</Button>
                        <Button variant="outline-secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  <tr>
                    <td>Wellington</td>
                    <td><Button variant="primary">Edit</Button></td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-success">Enabled</Button>
                        <Button variant="secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-success">Enabled</Button>
                        <Button variant="secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup aria-label="Basic example">
                        <Button variant="outline-success">Enabled</Button>
                        <Button variant="secondary">Disabled</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </ListGroup.Item>
        {/*
        * SINGLE DETAILS CARD
        */}
        <ListGroup.Item>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#platform">
                <Nav.Item>
                  <Nav.Link href="#platform">Digitary</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Digitary Organisation Details</Card.Title>
              <Card.Text>
                Please update the organisation details, and click the <strong>Save</strong> button.
                <div>
                  <span className="text-primary">Bar Example (custom size)</span>
                  <Doughnut data={data} />
                </div>
              </Card.Text>
              <Card.Text>
                <img src={PNF} alt="Page Not Fount" width="30%"/>
              </Card.Text>
              <Form>
                <Form.Group as={Row} controlId="name">
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control defaultValue="Digitary" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description">
                  <Form.Label column sm="2">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control as="textarea" type="text" rows="4" placeholder="Digitary is used by over 30 educational institutions in the UK, Ireland, Portugal and Australia to issue transcripts, parchments, and other official academic documents. Almost half a million official documents have been issued through Digitary to over quarter of a million students and graduates worldwide." />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between mx-0">
                <Button variant="danger">
                  Cancel
                </Button>
                <Button variant="primary">
                  Save
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </ListGroup.Item>


        {/*
        * SINGLE DETAILS CARD
        */}
        <ListGroup.Item>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#platform">
                <Nav.Item>
                  <Nav.Link href="#platform">Icon</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Show All Available Icons</Card.Title>
              <Card.Text>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan={2}>Icon</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><FontAwesomeIcon icon="ad" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ad" /> faAd</Button></td><td>ad</td></tr>
                  <tr><td><FontAwesomeIcon icon="address-book" /></td><td><Button variant="primary"><FontAwesomeIcon icon="address-book" /> faAddressBook</Button></td><td>address-book</td></tr>
                  <tr><td><FontAwesomeIcon icon="address-card" /></td><td><Button variant="primary"><FontAwesomeIcon icon="address-card" /> faAddressCard</Button></td><td>address-card</td></tr>
                  <tr><td><FontAwesomeIcon icon="adjust" /></td><td><Button variant="primary"><FontAwesomeIcon icon="adjust" /> faAdjust</Button></td><td>adjust</td></tr>
                  <tr><td><FontAwesomeIcon icon="air-freshener" /></td><td><Button variant="primary"><FontAwesomeIcon icon="air-freshener" /> faAirFreshener</Button></td><td>air-freshener</td></tr>
                  <tr><td><FontAwesomeIcon icon="align-center" /></td><td><Button variant="primary"><FontAwesomeIcon icon="align-center" /> faAlignCenter</Button></td><td>align-center</td></tr>
                  <tr><td><FontAwesomeIcon icon="align-justify" /></td><td><Button variant="primary"><FontAwesomeIcon icon="align-justify" /> faAlignJustify</Button></td><td>align-justify</td></tr>
                  <tr><td><FontAwesomeIcon icon="align-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="align-left" /> faAlignLeft</Button></td><td>align-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="align-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="align-right" /> faAlignRight</Button></td><td>align-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="allergies" /></td><td><Button variant="primary"><FontAwesomeIcon icon="allergies" /> faAllergies</Button></td><td>allergies</td></tr>
                  <tr><td><FontAwesomeIcon icon="ambulance" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ambulance" /> faAmbulance</Button></td><td>ambulance</td></tr>
                  <tr><td><FontAwesomeIcon icon="american-sign-language-interpreting" /></td><td><Button variant="primary"><FontAwesomeIcon icon="american-sign-language-interpreting" /> faAmericanSignLanguageInterpreting</Button></td><td>american-sign-language-interpreting</td></tr>
                  <tr><td><FontAwesomeIcon icon="anchor" /></td><td><Button variant="primary"><FontAwesomeIcon icon="anchor" /> faAnchor</Button></td><td>anchor</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-double-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-double-down" /> faAngleDoubleDown</Button></td><td>angle-double-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-double-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-double-left" /> faAngleDoubleLeft</Button></td><td>angle-double-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-double-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-double-right" /> faAngleDoubleRight</Button></td><td>angle-double-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-double-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-double-up" /> faAngleDoubleUp</Button></td><td>angle-double-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-down" /> faAngleDown</Button></td><td>angle-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-left" /> faAngleLeft</Button></td><td>angle-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-right" /> faAngleRight</Button></td><td>angle-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="angle-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angle-up" /> faAngleUp</Button></td><td>angle-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="angry" /></td><td><Button variant="primary"><FontAwesomeIcon icon="angry" /> faAngry</Button></td><td>angry</td></tr>
                  <tr><td><FontAwesomeIcon icon="ankh" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ankh" /> faAnkh</Button></td><td>ankh</td></tr>
                  <tr><td><FontAwesomeIcon icon="apple-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="apple-alt" /> faAppleAlt</Button></td><td>apple-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="archive" /></td><td><Button variant="primary"><FontAwesomeIcon icon="archive" /> faArchive</Button></td><td>archive</td></tr>
                  <tr><td><FontAwesomeIcon icon="archway" /></td><td><Button variant="primary"><FontAwesomeIcon icon="archway" /> faArchway</Button></td><td>archway</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-alt-circle-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-alt-circle-down" /> faArrowAltCircleDown</Button></td><td>arrow-alt-circle-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-alt-circle-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-alt-circle-left" /> faArrowAltCircleLeft</Button></td><td>arrow-alt-circle-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-alt-circle-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-alt-circle-right" /> faArrowAltCircleRight</Button></td><td>arrow-alt-circle-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-alt-circle-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-alt-circle-up" /> faArrowAltCircleUp</Button></td><td>arrow-alt-circle-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-circle-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-circle-down" /> faArrowCircleDown</Button></td><td>arrow-circle-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-circle-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-circle-left" /> faArrowCircleLeft</Button></td><td>arrow-circle-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-circle-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-circle-right" /> faArrowCircleRight</Button></td><td>arrow-circle-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-circle-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-circle-up" /> faArrowCircleUp</Button></td><td>arrow-circle-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-down" /> faArrowDown</Button></td><td>arrow-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-left" /> faArrowLeft</Button></td><td>arrow-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-right" /> faArrowRight</Button></td><td>arrow-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrow-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrow-up" /> faArrowUp</Button></td><td>arrow-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrows-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrows-alt" /> faArrowsAlt</Button></td><td>arrows-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrows-alt-h" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrows-alt-h" /> faArrowsAltH</Button></td><td>arrows-alt-h</td></tr>
                  <tr><td><FontAwesomeIcon icon="arrows-alt-v" /></td><td><Button variant="primary"><FontAwesomeIcon icon="arrows-alt-v" /> faArrowsAltV</Button></td><td>arrows-alt-v</td></tr>
                  <tr><td><FontAwesomeIcon icon="assistive-listening-systems" /></td><td><Button variant="primary"><FontAwesomeIcon icon="assistive-listening-systems" /> faAssistiveListeningSystems</Button></td><td>assistive-listening-systems</td></tr>
                  <tr><td><FontAwesomeIcon icon="asterisk" /></td><td><Button variant="primary"><FontAwesomeIcon icon="asterisk" /> faAsterisk</Button></td><td>asterisk</td></tr>
                  <tr><td><FontAwesomeIcon icon="at" /></td><td><Button variant="primary"><FontAwesomeIcon icon="at" /> faAt</Button></td><td>at</td></tr>
                  <tr><td><FontAwesomeIcon icon="atlas" /></td><td><Button variant="primary"><FontAwesomeIcon icon="atlas" /> faAtlas</Button></td><td>atlas</td></tr>
                  <tr><td><FontAwesomeIcon icon="atom" /></td><td><Button variant="primary"><FontAwesomeIcon icon="atom" /> faAtom</Button></td><td>atom</td></tr>
                  <tr><td><FontAwesomeIcon icon="audio-description" /></td><td><Button variant="primary"><FontAwesomeIcon icon="audio-description" /> faAudioDescription</Button></td><td>audio-description</td></tr>
                  <tr><td><FontAwesomeIcon icon="award" /></td><td><Button variant="primary"><FontAwesomeIcon icon="award" /> faAward</Button></td><td>award</td></tr>
                  <tr><td><FontAwesomeIcon icon="baby" /></td><td><Button variant="primary"><FontAwesomeIcon icon="baby" /> faBaby</Button></td><td>baby</td></tr>
                  <tr><td><FontAwesomeIcon icon="baby-carriage" /></td><td><Button variant="primary"><FontAwesomeIcon icon="baby-carriage" /> faBabyCarriage</Button></td><td>baby-carriage</td></tr>
                  <tr><td><FontAwesomeIcon icon="backspace" /></td><td><Button variant="primary"><FontAwesomeIcon icon="backspace" /> faBackspace</Button></td><td>backspace</td></tr>
                  <tr><td><FontAwesomeIcon icon="backward" /></td><td><Button variant="primary"><FontAwesomeIcon icon="backward" /> faBackward</Button></td><td>backward</td></tr>
                  <tr><td><FontAwesomeIcon icon="bacon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bacon" /> faBacon</Button></td><td>bacon</td></tr>
                  <tr><td><FontAwesomeIcon icon="bacteria" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bacteria" /> faBacteria</Button></td><td>bacteria</td></tr>
                  <tr><td><FontAwesomeIcon icon="bacterium" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bacterium" /> faBacterium</Button></td><td>bacterium</td></tr>
                  <tr><td><FontAwesomeIcon icon="bahai" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bahai" /> faBahai</Button></td><td>bahai</td></tr>
                  <tr><td><FontAwesomeIcon icon="balance-scale" /></td><td><Button variant="primary"><FontAwesomeIcon icon="balance-scale" /> faBalanceScale</Button></td><td>balance-scale</td></tr>
                  <tr><td><FontAwesomeIcon icon="balance-scale-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="balance-scale-left" /> faBalanceScaleLeft</Button></td><td>balance-scale-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="balance-scale-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="balance-scale-right" /> faBalanceScaleRight</Button></td><td>balance-scale-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="ban" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ban" /> faBan</Button></td><td>ban</td></tr>
                  <tr><td><FontAwesomeIcon icon="band-aid" /></td><td><Button variant="primary"><FontAwesomeIcon icon="band-aid" /> faBandAid</Button></td><td>band-aid</td></tr>
                  <tr><td><FontAwesomeIcon icon="barcode" /></td><td><Button variant="primary"><FontAwesomeIcon icon="barcode" /> faBarcode</Button></td><td>barcode</td></tr>
                  <tr><td><FontAwesomeIcon icon="bars" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bars" /> faBars</Button></td><td>bars</td></tr>
                  <tr><td><FontAwesomeIcon icon="baseball-ball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="baseball-ball" /> faBaseballBall</Button></td><td>baseball-ball</td></tr>
                  <tr><td><FontAwesomeIcon icon="basketball-ball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="basketball-ball" /> faBasketballBall</Button></td><td>basketball-ball</td></tr>
                  <tr><td><FontAwesomeIcon icon="bath" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bath" /> faBath</Button></td><td>bath</td></tr>
                  <tr><td><FontAwesomeIcon icon="battery-empty" /></td><td><Button variant="primary"><FontAwesomeIcon icon="battery-empty" /> faBatteryEmpty</Button></td><td>battery-empty</td></tr>
                  <tr><td><FontAwesomeIcon icon="battery-full" /></td><td><Button variant="primary"><FontAwesomeIcon icon="battery-full" /> faBatteryFull</Button></td><td>battery-full</td></tr>
                  <tr><td><FontAwesomeIcon icon="battery-half" /></td><td><Button variant="primary"><FontAwesomeIcon icon="battery-half" /> faBatteryHalf</Button></td><td>battery-half</td></tr>
                  <tr><td><FontAwesomeIcon icon="battery-quarter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="battery-quarter" /> faBatteryQuarter</Button></td><td>battery-quarter</td></tr>
                  <tr><td><FontAwesomeIcon icon="battery-three-quarters" /></td><td><Button variant="primary"><FontAwesomeIcon icon="battery-three-quarters" /> faBatteryThreeQuarters</Button></td><td>battery-three-quarters</td></tr>
                  <tr><td><FontAwesomeIcon icon="bed" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bed" /> faBed</Button></td><td>bed</td></tr>
                  <tr><td><FontAwesomeIcon icon="beer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="beer" /> faBeer</Button></td><td>beer</td></tr>
                  <tr><td><FontAwesomeIcon icon="bell" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bell" /> faBell</Button></td><td>bell</td></tr>
                  <tr><td><FontAwesomeIcon icon="bell-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bell-slash" /> faBellSlash</Button></td><td>bell-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="bezier-curve" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bezier-curve" /> faBezierCurve</Button></td><td>bezier-curve</td></tr>
                  <tr><td><FontAwesomeIcon icon="bible" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bible" /> faBible</Button></td><td>bible</td></tr>
                  <tr><td><FontAwesomeIcon icon="bicycle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bicycle" /> faBicycle</Button></td><td>bicycle</td></tr>
                  <tr><td><FontAwesomeIcon icon="biking" /></td><td><Button variant="primary"><FontAwesomeIcon icon="biking" /> faBiking</Button></td><td>biking</td></tr>
                  <tr><td><FontAwesomeIcon icon="binoculars" /></td><td><Button variant="primary"><FontAwesomeIcon icon="binoculars" /> faBinoculars</Button></td><td>binoculars</td></tr>
                  <tr><td><FontAwesomeIcon icon="biohazard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="biohazard" /> faBiohazard</Button></td><td>biohazard</td></tr>
                  <tr><td><FontAwesomeIcon icon="birthday-cake" /></td><td><Button variant="primary"><FontAwesomeIcon icon="birthday-cake" /> faBirthdayCake</Button></td><td>birthday-cake</td></tr>
                  <tr><td><FontAwesomeIcon icon="blender" /></td><td><Button variant="primary"><FontAwesomeIcon icon="blender" /> faBlender</Button></td><td>blender</td></tr>
                  <tr><td><FontAwesomeIcon icon="blender-phone" /></td><td><Button variant="primary"><FontAwesomeIcon icon="blender-phone" /> faBlenderPhone</Button></td><td>blender-phone</td></tr>
                  <tr><td><FontAwesomeIcon icon="blind" /></td><td><Button variant="primary"><FontAwesomeIcon icon="blind" /> faBlind</Button></td><td>blind</td></tr>
                  <tr><td><FontAwesomeIcon icon="blog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="blog" /> faBlog</Button></td><td>blog</td></tr>
                  <tr><td><FontAwesomeIcon icon="bold" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bold" /> faBold</Button></td><td>bold</td></tr>
                  <tr><td><FontAwesomeIcon icon="bolt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bolt" /> faBolt</Button></td><td>bolt</td></tr>
                  <tr><td><FontAwesomeIcon icon="bomb" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bomb" /> faBomb</Button></td><td>bomb</td></tr>
                  <tr><td><FontAwesomeIcon icon="bone" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bone" /> faBone</Button></td><td>bone</td></tr>
                  <tr><td><FontAwesomeIcon icon="bong" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bong" /> faBong</Button></td><td>bong</td></tr>
                  <tr><td><FontAwesomeIcon icon="book" /></td><td><Button variant="primary"><FontAwesomeIcon icon="book" /> faBook</Button></td><td>book</td></tr>
                  <tr><td><FontAwesomeIcon icon="book-dead" /></td><td><Button variant="primary"><FontAwesomeIcon icon="book-dead" /> faBookDead</Button></td><td>book-dead</td></tr>
                  <tr><td><FontAwesomeIcon icon="book-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="book-medical" /> faBookMedical</Button></td><td>book-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="book-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="book-open" /> faBookOpen</Button></td><td>book-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="book-reader" /></td><td><Button variant="primary"><FontAwesomeIcon icon="book-reader" /> faBookReader</Button></td><td>book-reader</td></tr>
                  <tr><td><FontAwesomeIcon icon="bookmark" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bookmark" /> faBookmark</Button></td><td>bookmark</td></tr>
                  <tr><td><FontAwesomeIcon icon="border-all" /></td><td><Button variant="primary"><FontAwesomeIcon icon="border-all" /> faBorderAll</Button></td><td>border-all</td></tr>
                  <tr><td><FontAwesomeIcon icon="border-none" /></td><td><Button variant="primary"><FontAwesomeIcon icon="border-none" /> faBorderNone</Button></td><td>border-none</td></tr>
                  <tr><td><FontAwesomeIcon icon="border-style" /></td><td><Button variant="primary"><FontAwesomeIcon icon="border-style" /> faBorderStyle</Button></td><td>border-style</td></tr>
                  <tr><td><FontAwesomeIcon icon="bowling-ball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bowling-ball" /> faBowlingBall</Button></td><td>bowling-ball</td></tr>
                  <tr><td><FontAwesomeIcon icon="box" /></td><td><Button variant="primary"><FontAwesomeIcon icon="box" /> faBox</Button></td><td>box</td></tr>
                  <tr><td><FontAwesomeIcon icon="box-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="box-open" /> faBoxOpen</Button></td><td>box-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="box-tissue" /></td><td><Button variant="primary"><FontAwesomeIcon icon="box-tissue" /> faBoxTissue</Button></td><td>box-tissue</td></tr>
                  <tr><td><FontAwesomeIcon icon="boxes" /></td><td><Button variant="primary"><FontAwesomeIcon icon="boxes" /> faBoxes</Button></td><td>boxes</td></tr>
                  <tr><td><FontAwesomeIcon icon="braille" /></td><td><Button variant="primary"><FontAwesomeIcon icon="braille" /> faBraille</Button></td><td>braille</td></tr>
                  <tr><td><FontAwesomeIcon icon="brain" /></td><td><Button variant="primary"><FontAwesomeIcon icon="brain" /> faBrain</Button></td><td>brain</td></tr>
                  <tr><td><FontAwesomeIcon icon="bread-slice" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bread-slice" /> faBreadSlice</Button></td><td>bread-slice</td></tr>
                  <tr><td><FontAwesomeIcon icon="briefcase" /></td><td><Button variant="primary"><FontAwesomeIcon icon="briefcase" /> faBriefcase</Button></td><td>briefcase</td></tr>
                  <tr><td><FontAwesomeIcon icon="briefcase-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="briefcase-medical" /> faBriefcaseMedical</Button></td><td>briefcase-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="broadcast-tower" /></td><td><Button variant="primary"><FontAwesomeIcon icon="broadcast-tower" /> faBroadcastTower</Button></td><td>broadcast-tower</td></tr>
                  <tr><td><FontAwesomeIcon icon="broom" /></td><td><Button variant="primary"><FontAwesomeIcon icon="broom" /> faBroom</Button></td><td>broom</td></tr>
                  <tr><td><FontAwesomeIcon icon="brush" /></td><td><Button variant="primary"><FontAwesomeIcon icon="brush" /> faBrush</Button></td><td>brush</td></tr>
                  <tr><td><FontAwesomeIcon icon="bug" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bug" /> faBug</Button></td><td>bug</td></tr>
                  <tr><td><FontAwesomeIcon icon="building" /></td><td><Button variant="primary"><FontAwesomeIcon icon="building" /> faBuilding</Button></td><td>building</td></tr>
                  <tr><td><FontAwesomeIcon icon="bullhorn" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bullhorn" /> faBullhorn</Button></td><td>bullhorn</td></tr>
                  <tr><td><FontAwesomeIcon icon="bullseye" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bullseye" /> faBullseye</Button></td><td>bullseye</td></tr>
                  <tr><td><FontAwesomeIcon icon="burn" /></td><td><Button variant="primary"><FontAwesomeIcon icon="burn" /> faBurn</Button></td><td>burn</td></tr>
                  <tr><td><FontAwesomeIcon icon="bus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bus" /> faBus</Button></td><td>bus</td></tr>
                  <tr><td><FontAwesomeIcon icon="bus-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="bus-alt" /> faBusAlt</Button></td><td>bus-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="business-time" /></td><td><Button variant="primary"><FontAwesomeIcon icon="business-time" /> faBusinessTime</Button></td><td>business-time</td></tr>
                  <tr><td><FontAwesomeIcon icon="calculator" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calculator" /> faCalculator</Button></td><td>calculator</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar" /> faCalendar</Button></td><td>calendar</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-alt" /> faCalendarAlt</Button></td><td>calendar-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-check" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-check" /> faCalendarCheck</Button></td><td>calendar-check</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-day" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-day" /> faCalendarDay</Button></td><td>calendar-day</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-minus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-minus" /> faCalendarMinus</Button></td><td>calendar-minus</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-plus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-plus" /> faCalendarPlus</Button></td><td>calendar-plus</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-times" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-times" /> faCalendarTimes</Button></td><td>calendar-times</td></tr>
                  <tr><td><FontAwesomeIcon icon="calendar-week" /></td><td><Button variant="primary"><FontAwesomeIcon icon="calendar-week" /> faCalendarWeek</Button></td><td>calendar-week</td></tr>
                  <tr><td><FontAwesomeIcon icon="camera" /></td><td><Button variant="primary"><FontAwesomeIcon icon="camera" /> faCamera</Button></td><td>camera</td></tr>
                  <tr><td><FontAwesomeIcon icon="camera-retro" /></td><td><Button variant="primary"><FontAwesomeIcon icon="camera-retro" /> faCameraRetro</Button></td><td>camera-retro</td></tr>
                  <tr><td><FontAwesomeIcon icon="campground" /></td><td><Button variant="primary"><FontAwesomeIcon icon="campground" /> faCampground</Button></td><td>campground</td></tr>
                  <tr><td><FontAwesomeIcon icon="candy-cane" /></td><td><Button variant="primary"><FontAwesomeIcon icon="candy-cane" /> faCandyCane</Button></td><td>candy-cane</td></tr>
                  <tr><td><FontAwesomeIcon icon="cannabis" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cannabis" /> faCannabis</Button></td><td>cannabis</td></tr>
                  <tr><td><FontAwesomeIcon icon="capsules" /></td><td><Button variant="primary"><FontAwesomeIcon icon="capsules" /> faCapsules</Button></td><td>capsules</td></tr>
                  <tr><td><FontAwesomeIcon icon="car" /></td><td><Button variant="primary"><FontAwesomeIcon icon="car" /> faCar</Button></td><td>car</td></tr>
                  <tr><td><FontAwesomeIcon icon="car-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="car-alt" /> faCarAlt</Button></td><td>car-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="car-battery" /></td><td><Button variant="primary"><FontAwesomeIcon icon="car-battery" /> faCarBattery</Button></td><td>car-battery</td></tr>
                  <tr><td><FontAwesomeIcon icon="car-crash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="car-crash" /> faCarCrash</Button></td><td>car-crash</td></tr>
                  <tr><td><FontAwesomeIcon icon="car-side" /></td><td><Button variant="primary"><FontAwesomeIcon icon="car-side" /> faCarSide</Button></td><td>car-side</td></tr>
                  <tr><td><FontAwesomeIcon icon="caravan" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caravan" /> faCaravan</Button></td><td>caravan</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-down" /> faCaretDown</Button></td><td>caret-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-left" /> faCaretLeft</Button></td><td>caret-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-right" /> faCaretRight</Button></td><td>caret-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-square-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-square-down" /> faCaretSquareDown</Button></td><td>caret-square-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-square-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-square-left" /> faCaretSquareLeft</Button></td><td>caret-square-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-square-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-square-right" /> faCaretSquareRight</Button></td><td>caret-square-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-square-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-square-up" /> faCaretSquareUp</Button></td><td>caret-square-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="caret-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="caret-up" /> faCaretUp</Button></td><td>caret-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="carrot" /></td><td><Button variant="primary"><FontAwesomeIcon icon="carrot" /> faCarrot</Button></td><td>carrot</td></tr>
                  <tr><td><FontAwesomeIcon icon="cart-arrow-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cart-arrow-down" /> faCartArrowDown</Button></td><td>cart-arrow-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="cart-plus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cart-plus" /> faCartPlus</Button></td><td>cart-plus</td></tr>
                  <tr><td><FontAwesomeIcon icon="cash-register" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cash-register" /> faCashRegister</Button></td><td>cash-register</td></tr>
                  <tr><td><FontAwesomeIcon icon="cat" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cat" /> faCat</Button></td><td>cat</td></tr>
                  <tr><td><FontAwesomeIcon icon="certificate" /></td><td><Button variant="primary"><FontAwesomeIcon icon="certificate" /> faCertificate</Button></td><td>certificate</td></tr>
                  <tr><td><FontAwesomeIcon icon="chair" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chair" /> faChair</Button></td><td>chair</td></tr>
                  <tr><td><FontAwesomeIcon icon="chalkboard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chalkboard" /> faChalkboard</Button></td><td>chalkboard</td></tr>
                  <tr><td><FontAwesomeIcon icon="chalkboard-teacher" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chalkboard-teacher" /> faChalkboardTeacher</Button></td><td>chalkboard-teacher</td></tr>
                  <tr><td><FontAwesomeIcon icon="charging-station" /></td><td><Button variant="primary"><FontAwesomeIcon icon="charging-station" /> faChargingStation</Button></td><td>charging-station</td></tr>
                  <tr><td><FontAwesomeIcon icon="chart-area" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chart-area" /> faChartArea</Button></td><td>chart-area</td></tr>
                  <tr><td><FontAwesomeIcon icon="chart-bar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chart-bar" /> faChartBar</Button></td><td>chart-bar</td></tr>
                  <tr><td><FontAwesomeIcon icon="chart-line" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chart-line" /> faChartLine</Button></td><td>chart-line</td></tr>
                  <tr><td><FontAwesomeIcon icon="chart-pie" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chart-pie" /> faChartPie</Button></td><td>chart-pie</td></tr>
                  <tr><td><FontAwesomeIcon icon="check" /></td><td><Button variant="primary"><FontAwesomeIcon icon="check" /> faCheck</Button></td><td>check</td></tr>
                  <tr><td><FontAwesomeIcon icon="check-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="check-circle" /> faCheckCircle</Button></td><td>check-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="check-double" /></td><td><Button variant="primary"><FontAwesomeIcon icon="check-double" /> faCheckDouble</Button></td><td>check-double</td></tr>
                  <tr><td><FontAwesomeIcon icon="check-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="check-square" /> faCheckSquare</Button></td><td>check-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="cheese" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cheese" /> faCheese</Button></td><td>cheese</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess" /> faChess</Button></td><td>chess</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-bishop" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-bishop" /> faChessBishop</Button></td><td>chess-bishop</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-board" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-board" /> faChessBoard</Button></td><td>chess-board</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-king" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-king" /> faChessKing</Button></td><td>chess-king</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-knight" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-knight" /> faChessKnight</Button></td><td>chess-knight</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-pawn" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-pawn" /> faChessPawn</Button></td><td>chess-pawn</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-queen" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-queen" /> faChessQueen</Button></td><td>chess-queen</td></tr>
                  <tr><td><FontAwesomeIcon icon="chess-rook" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chess-rook" /> faChessRook</Button></td><td>chess-rook</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-circle-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-circle-down" /> faChevronCircleDown</Button></td><td>chevron-circle-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-circle-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-circle-left" /> faChevronCircleLeft</Button></td><td>chevron-circle-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-circle-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-circle-right" /> faChevronCircleRight</Button></td><td>chevron-circle-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-circle-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-circle-up" /> faChevronCircleUp</Button></td><td>chevron-circle-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-down" /> faChevronDown</Button></td><td>chevron-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-left" /> faChevronLeft</Button></td><td>chevron-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-right" /> faChevronRight</Button></td><td>chevron-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="chevron-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="chevron-up" /> faChevronUp</Button></td><td>chevron-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="child" /></td><td><Button variant="primary"><FontAwesomeIcon icon="child" /> faChild</Button></td><td>child</td></tr>
                  <tr><td><FontAwesomeIcon icon="church" /></td><td><Button variant="primary"><FontAwesomeIcon icon="church" /> faChurch</Button></td><td>church</td></tr>
                  <tr><td><FontAwesomeIcon icon="circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="circle" /> faCircle</Button></td><td>circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="circle-notch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="circle-notch" /> faCircleNotch</Button></td><td>circle-notch</td></tr>
                  <tr><td><FontAwesomeIcon icon="city" /></td><td><Button variant="primary"><FontAwesomeIcon icon="city" /> faCity</Button></td><td>city</td></tr>
                  <tr><td><FontAwesomeIcon icon="clinic-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="clinic-medical" /> faClinicMedical</Button></td><td>clinic-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="clipboard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="clipboard" /> faClipboard</Button></td><td>clipboard</td></tr>
                  <tr><td><FontAwesomeIcon icon="clipboard-check" /></td><td><Button variant="primary"><FontAwesomeIcon icon="clipboard-check" /> faClipboardCheck</Button></td><td>clipboard-check</td></tr>
                  <tr><td><FontAwesomeIcon icon="clipboard-list" /></td><td><Button variant="primary"><FontAwesomeIcon icon="clipboard-list" /> faClipboardList</Button></td><td>clipboard-list</td></tr>
                  <tr><td><FontAwesomeIcon icon="clock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="clock" /> faClock</Button></td><td>clock</td></tr>
                  <tr><td><FontAwesomeIcon icon="clone" /></td><td><Button variant="primary"><FontAwesomeIcon icon="clone" /> faClone</Button></td><td>clone</td></tr>
                  <tr><td><FontAwesomeIcon icon="closed-captioning" /></td><td><Button variant="primary"><FontAwesomeIcon icon="closed-captioning" /> faClosedCaptioning</Button></td><td>closed-captioning</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud" /> faCloud</Button></td><td>cloud</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-download-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-download-alt" /> faCloudDownloadAlt</Button></td><td>cloud-download-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-meatball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-meatball" /> faCloudMeatball</Button></td><td>cloud-meatball</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-moon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-moon" /> faCloudMoon</Button></td><td>cloud-moon</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-moon-rain" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-moon-rain" /> faCloudMoonRain</Button></td><td>cloud-moon-rain</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-rain" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-rain" /> faCloudRain</Button></td><td>cloud-rain</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-showers-heavy" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-showers-heavy" /> faCloudShowersHeavy</Button></td><td>cloud-showers-heavy</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-sun" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-sun" /> faCloudSun</Button></td><td>cloud-sun</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-sun-rain" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-sun-rain" /> faCloudSunRain</Button></td><td>cloud-sun-rain</td></tr>
                  <tr><td><FontAwesomeIcon icon="cloud-upload-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cloud-upload-alt" /> faCloudUploadAlt</Button></td><td>cloud-upload-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="cocktail" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cocktail" /> faCocktail</Button></td><td>cocktail</td></tr>
                  <tr><td><FontAwesomeIcon icon="code" /></td><td><Button variant="primary"><FontAwesomeIcon icon="code" /> faCode</Button></td><td>code</td></tr>
                  <tr><td><FontAwesomeIcon icon="code-branch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="code-branch" /> faCodeBranch</Button></td><td>code-branch</td></tr>
                  <tr><td><FontAwesomeIcon icon="coffee" /></td><td><Button variant="primary"><FontAwesomeIcon icon="coffee" /> faCoffee</Button></td><td>coffee</td></tr>
                  <tr><td><FontAwesomeIcon icon="cog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cog" /> faCog</Button></td><td>cog</td></tr>
                  <tr><td><FontAwesomeIcon icon="cogs" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cogs" /> faCogs</Button></td><td>cogs</td></tr>
                  <tr><td><FontAwesomeIcon icon="coins" /></td><td><Button variant="primary"><FontAwesomeIcon icon="coins" /> faCoins</Button></td><td>coins</td></tr>
                  <tr><td><FontAwesomeIcon icon="columns" /></td><td><Button variant="primary"><FontAwesomeIcon icon="columns" /> faColumns</Button></td><td>columns</td></tr>
                  <tr><td><FontAwesomeIcon icon="comment" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comment" /> faComment</Button></td><td>comment</td></tr>
                  <tr><td><FontAwesomeIcon icon="comment-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comment-alt" /> faCommentAlt</Button></td><td>comment-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="comment-dollar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comment-dollar" /> faCommentDollar</Button></td><td>comment-dollar</td></tr>
                  <tr><td><FontAwesomeIcon icon="comment-dots" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comment-dots" /> faCommentDots</Button></td><td>comment-dots</td></tr>
                  <tr><td><FontAwesomeIcon icon="comment-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comment-medical" /> faCommentMedical</Button></td><td>comment-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="comment-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comment-slash" /> faCommentSlash</Button></td><td>comment-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="comments" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comments" /> faComments</Button></td><td>comments</td></tr>
                  <tr><td><FontAwesomeIcon icon="comments-dollar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="comments-dollar" /> faCommentsDollar</Button></td><td>comments-dollar</td></tr>
                  <tr><td><FontAwesomeIcon icon="compact-disc" /></td><td><Button variant="primary"><FontAwesomeIcon icon="compact-disc" /> faCompactDisc</Button></td><td>compact-disc</td></tr>
                  <tr><td><FontAwesomeIcon icon="compass" /></td><td><Button variant="primary"><FontAwesomeIcon icon="compass" /> faCompass</Button></td><td>compass</td></tr>
                  <tr><td><FontAwesomeIcon icon="compress" /></td><td><Button variant="primary"><FontAwesomeIcon icon="compress" /> faCompress</Button></td><td>compress</td></tr>
                  <tr><td><FontAwesomeIcon icon="compress-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="compress-alt" /> faCompressAlt</Button></td><td>compress-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="compress-arrows-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="compress-arrows-alt" /> faCompressArrowsAlt</Button></td><td>compress-arrows-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="concierge-bell" /></td><td><Button variant="primary"><FontAwesomeIcon icon="concierge-bell" /> faConciergeBell</Button></td><td>concierge-bell</td></tr>
                  <tr><td><FontAwesomeIcon icon="cookie" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cookie" /> faCookie</Button></td><td>cookie</td></tr>
                  <tr><td><FontAwesomeIcon icon="cookie-bite" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cookie-bite" /> faCookieBite</Button></td><td>cookie-bite</td></tr>
                  <tr><td><FontAwesomeIcon icon="copy" /></td><td><Button variant="primary"><FontAwesomeIcon icon="copy" /> faCopy</Button></td><td>copy</td></tr>
                  <tr><td><FontAwesomeIcon icon="copyright" /></td><td><Button variant="primary"><FontAwesomeIcon icon="copyright" /> faCopyright</Button></td><td>copyright</td></tr>
                  <tr><td><FontAwesomeIcon icon="couch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="couch" /> faCouch</Button></td><td>couch</td></tr>
                  <tr><td><FontAwesomeIcon icon="credit-card" /></td><td><Button variant="primary"><FontAwesomeIcon icon="credit-card" /> faCreditCard</Button></td><td>credit-card</td></tr>
                  <tr><td><FontAwesomeIcon icon="crop" /></td><td><Button variant="primary"><FontAwesomeIcon icon="crop" /> faCrop</Button></td><td>crop</td></tr>
                  <tr><td><FontAwesomeIcon icon="crop-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="crop-alt" /> faCropAlt</Button></td><td>crop-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="cross" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cross" /> faCross</Button></td><td>cross</td></tr>
                  <tr><td><FontAwesomeIcon icon="crosshairs" /></td><td><Button variant="primary"><FontAwesomeIcon icon="crosshairs" /> faCrosshairs</Button></td><td>crosshairs</td></tr>
                  <tr><td><FontAwesomeIcon icon="crow" /></td><td><Button variant="primary"><FontAwesomeIcon icon="crow" /> faCrow</Button></td><td>crow</td></tr>
                  <tr><td><FontAwesomeIcon icon="crown" /></td><td><Button variant="primary"><FontAwesomeIcon icon="crown" /> faCrown</Button></td><td>crown</td></tr>
                  <tr><td><FontAwesomeIcon icon="crutch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="crutch" /> faCrutch</Button></td><td>crutch</td></tr>
                  <tr><td><FontAwesomeIcon icon="cube" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cube" /> faCube</Button></td><td>cube</td></tr>
                  <tr><td><FontAwesomeIcon icon="cubes" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cubes" /> faCubes</Button></td><td>cubes</td></tr>
                  <tr><td><FontAwesomeIcon icon="cut" /></td><td><Button variant="primary"><FontAwesomeIcon icon="cut" /> faCut</Button></td><td>cut</td></tr>
                  <tr><td><FontAwesomeIcon icon="database" /></td><td><Button variant="primary"><FontAwesomeIcon icon="database" /> faDatabase</Button></td><td>database</td></tr>
                  <tr><td><FontAwesomeIcon icon="deaf" /></td><td><Button variant="primary"><FontAwesomeIcon icon="deaf" /> faDeaf</Button></td><td>deaf</td></tr>
                  <tr><td><FontAwesomeIcon icon="democrat" /></td><td><Button variant="primary"><FontAwesomeIcon icon="democrat" /> faDemocrat</Button></td><td>democrat</td></tr>
                  <tr><td><FontAwesomeIcon icon="desktop" /></td><td><Button variant="primary"><FontAwesomeIcon icon="desktop" /> faDesktop</Button></td><td>desktop</td></tr>
                  <tr><td><FontAwesomeIcon icon="dharmachakra" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dharmachakra" /> faDharmachakra</Button></td><td>dharmachakra</td></tr>
                  <tr><td><FontAwesomeIcon icon="diagnoses" /></td><td><Button variant="primary"><FontAwesomeIcon icon="diagnoses" /> faDiagnoses</Button></td><td>diagnoses</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice" /> faDice</Button></td><td>dice</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-d20" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-d20" /> faDiceD20</Button></td><td>dice-d20</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-d6" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-d6" /> faDiceD6</Button></td><td>dice-d6</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-five" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-five" /> faDiceFive</Button></td><td>dice-five</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-four" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-four" /> faDiceFour</Button></td><td>dice-four</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-one" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-one" /> faDiceOne</Button></td><td>dice-one</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-six" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-six" /> faDiceSix</Button></td><td>dice-six</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-three" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-three" /> faDiceThree</Button></td><td>dice-three</td></tr>
                  <tr><td><FontAwesomeIcon icon="dice-two" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dice-two" /> faDiceTwo</Button></td><td>dice-two</td></tr>
                  <tr><td><FontAwesomeIcon icon="digital-tachograph" /></td><td><Button variant="primary"><FontAwesomeIcon icon="digital-tachograph" /> faDigitalTachograph</Button></td><td>digital-tachograph</td></tr>
                  <tr><td><FontAwesomeIcon icon="directions" /></td><td><Button variant="primary"><FontAwesomeIcon icon="directions" /> faDirections</Button></td><td>directions</td></tr>
                  <tr><td><FontAwesomeIcon icon="disease" /></td><td><Button variant="primary"><FontAwesomeIcon icon="disease" /> faDisease</Button></td><td>disease</td></tr>
                  <tr><td><FontAwesomeIcon icon="divide" /></td><td><Button variant="primary"><FontAwesomeIcon icon="divide" /> faDivide</Button></td><td>divide</td></tr>
                  <tr><td><FontAwesomeIcon icon="dizzy" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dizzy" /> faDizzy</Button></td><td>dizzy</td></tr>
                  <tr><td><FontAwesomeIcon icon="dna" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dna" /> faDna</Button></td><td>dna</td></tr>
                  <tr><td><FontAwesomeIcon icon="dog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dog" /> faDog</Button></td><td>dog</td></tr>
                  <tr><td><FontAwesomeIcon icon="dollar-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dollar-sign" /> faDollarSign</Button></td><td>dollar-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="dolly" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dolly" /> faDolly</Button></td><td>dolly</td></tr>
                  <tr><td><FontAwesomeIcon icon="dolly-flatbed" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dolly-flatbed" /> faDollyFlatbed</Button></td><td>dolly-flatbed</td></tr>
                  <tr><td><FontAwesomeIcon icon="donate" /></td><td><Button variant="primary"><FontAwesomeIcon icon="donate" /> faDonate</Button></td><td>donate</td></tr>
                  <tr><td><FontAwesomeIcon icon="door-closed" /></td><td><Button variant="primary"><FontAwesomeIcon icon="door-closed" /> faDoorClosed</Button></td><td>door-closed</td></tr>
                  <tr><td><FontAwesomeIcon icon="door-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="door-open" /> faDoorOpen</Button></td><td>door-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="dot-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dot-circle" /> faDotCircle</Button></td><td>dot-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="dove" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dove" /> faDove</Button></td><td>dove</td></tr>
                  <tr><td><FontAwesomeIcon icon="download" /></td><td><Button variant="primary"><FontAwesomeIcon icon="download" /> faDownload</Button></td><td>download</td></tr>
                  <tr><td><FontAwesomeIcon icon="drafting-compass" /></td><td><Button variant="primary"><FontAwesomeIcon icon="drafting-compass" /> faDraftingCompass</Button></td><td>drafting-compass</td></tr>
                  <tr><td><FontAwesomeIcon icon="dragon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dragon" /> faDragon</Button></td><td>dragon</td></tr>
                  <tr><td><FontAwesomeIcon icon="draw-polygon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="draw-polygon" /> faDrawPolygon</Button></td><td>draw-polygon</td></tr>
                  <tr><td><FontAwesomeIcon icon="drum" /></td><td><Button variant="primary"><FontAwesomeIcon icon="drum" /> faDrum</Button></td><td>drum</td></tr>
                  <tr><td><FontAwesomeIcon icon="drum-steelpan" /></td><td><Button variant="primary"><FontAwesomeIcon icon="drum-steelpan" /> faDrumSteelpan</Button></td><td>drum-steelpan</td></tr>
                  <tr><td><FontAwesomeIcon icon="drumstick-bite" /></td><td><Button variant="primary"><FontAwesomeIcon icon="drumstick-bite" /> faDrumstickBite</Button></td><td>drumstick-bite</td></tr>
                  <tr><td><FontAwesomeIcon icon="dumbbell" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dumbbell" /> faDumbbell</Button></td><td>dumbbell</td></tr>
                  <tr><td><FontAwesomeIcon icon="dumpster" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dumpster" /> faDumpster</Button></td><td>dumpster</td></tr>
                  <tr><td><FontAwesomeIcon icon="dumpster-fire" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dumpster-fire" /> faDumpsterFire</Button></td><td>dumpster-fire</td></tr>
                  <tr><td><FontAwesomeIcon icon="dungeon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="dungeon" /> faDungeon</Button></td><td>dungeon</td></tr>
                  <tr><td><FontAwesomeIcon icon="edit" /></td><td><Button variant="primary"><FontAwesomeIcon icon="edit" /> faEdit</Button></td><td>edit</td></tr>
                  <tr><td><FontAwesomeIcon icon="egg" /></td><td><Button variant="primary"><FontAwesomeIcon icon="egg" /> faEgg</Button></td><td>egg</td></tr>
                  <tr><td><FontAwesomeIcon icon="eject" /></td><td><Button variant="primary"><FontAwesomeIcon icon="eject" /> faEject</Button></td><td>eject</td></tr>
                  <tr><td><FontAwesomeIcon icon="ellipsis-h" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ellipsis-h" /> faEllipsisH</Button></td><td>ellipsis-h</td></tr>
                  <tr><td><FontAwesomeIcon icon="ellipsis-v" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ellipsis-v" /> faEllipsisV</Button></td><td>ellipsis-v</td></tr>
                  <tr><td><FontAwesomeIcon icon="envelope" /></td><td><Button variant="primary"><FontAwesomeIcon icon="envelope" /> faEnvelope</Button></td><td>envelope</td></tr>
                  <tr><td><FontAwesomeIcon icon="envelope-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="envelope-open" /> faEnvelopeOpen</Button></td><td>envelope-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="envelope-open-text" /></td><td><Button variant="primary"><FontAwesomeIcon icon="envelope-open-text" /> faEnvelopeOpenText</Button></td><td>envelope-open-text</td></tr>
                  <tr><td><FontAwesomeIcon icon="envelope-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="envelope-square" /> faEnvelopeSquare</Button></td><td>envelope-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="equals" /></td><td><Button variant="primary"><FontAwesomeIcon icon="equals" /> faEquals</Button></td><td>equals</td></tr>
                  <tr><td><FontAwesomeIcon icon="eraser" /></td><td><Button variant="primary"><FontAwesomeIcon icon="eraser" /> faEraser</Button></td><td>eraser</td></tr>
                  <tr><td><FontAwesomeIcon icon="ethernet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ethernet" /> faEthernet</Button></td><td>ethernet</td></tr>
                  <tr><td><FontAwesomeIcon icon="euro-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="euro-sign" /> faEuroSign</Button></td><td>euro-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="exchange-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="exchange-alt" /> faExchangeAlt</Button></td><td>exchange-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="exclamation" /></td><td><Button variant="primary"><FontAwesomeIcon icon="exclamation" /> faExclamation</Button></td><td>exclamation</td></tr>
                  <tr><td><FontAwesomeIcon icon="exclamation-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="exclamation-circle" /> faExclamationCircle</Button></td><td>exclamation-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="exclamation-triangle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="exclamation-triangle" /> faExclamationTriangle</Button></td><td>exclamation-triangle</td></tr>
                  <tr><td><FontAwesomeIcon icon="expand" /></td><td><Button variant="primary"><FontAwesomeIcon icon="expand" /> faExpand</Button></td><td>expand</td></tr>
                  <tr><td><FontAwesomeIcon icon="expand-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="expand-alt" /> faExpandAlt</Button></td><td>expand-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="expand-arrows-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="expand-arrows-alt" /> faExpandArrowsAlt</Button></td><td>expand-arrows-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="external-link-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="external-link-alt" /> faExternalLinkAlt</Button></td><td>external-link-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="external-link-square-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="external-link-square-alt" /> faExternalLinkSquareAlt</Button></td><td>external-link-square-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="eye" /></td><td><Button variant="primary"><FontAwesomeIcon icon="eye" /> faEye</Button></td><td>eye</td></tr>
                  <tr><td><FontAwesomeIcon icon="eye-dropper" /></td><td><Button variant="primary"><FontAwesomeIcon icon="eye-dropper" /> faEyeDropper</Button></td><td>eye-dropper</td></tr>
                  <tr><td><FontAwesomeIcon icon="eye-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="eye-slash" /> faEyeSlash</Button></td><td>eye-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="fan" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fan" /> faFan</Button></td><td>fan</td></tr>
                  <tr><td><FontAwesomeIcon icon="fast-backward" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fast-backward" /> faFastBackward</Button></td><td>fast-backward</td></tr>
                  <tr><td><FontAwesomeIcon icon="fast-forward" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fast-forward" /> faFastForward</Button></td><td>fast-forward</td></tr>
                  <tr><td><FontAwesomeIcon icon="faucet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="faucet" /> faFaucet</Button></td><td>faucet</td></tr>
                  <tr><td><FontAwesomeIcon icon="fax" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fax" /> faFax</Button></td><td>fax</td></tr>
                  <tr><td><FontAwesomeIcon icon="feather" /></td><td><Button variant="primary"><FontAwesomeIcon icon="feather" /> faFeather</Button></td><td>feather</td></tr>
                  <tr><td><FontAwesomeIcon icon="feather-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="feather-alt" /> faFeatherAlt</Button></td><td>feather-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="female" /></td><td><Button variant="primary"><FontAwesomeIcon icon="female" /> faFemale</Button></td><td>female</td></tr>
                  <tr><td><FontAwesomeIcon icon="fighter-jet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fighter-jet" /> faFighterJet</Button></td><td>fighter-jet</td></tr>
                  <tr><td><FontAwesomeIcon icon="file" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file" /> faFile</Button></td><td>file</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-alt" /> faFileAlt</Button></td><td>file-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-archive" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-archive" /> faFileArchive</Button></td><td>file-archive</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-audio" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-audio" /> faFileAudio</Button></td><td>file-audio</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-code" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-code" /> faFileCode</Button></td><td>file-code</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-contract" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-contract" /> faFileContract</Button></td><td>file-contract</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-csv" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-csv" /> faFileCsv</Button></td><td>file-csv</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-download" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-download" /> faFileDownload</Button></td><td>file-download</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-excel" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-excel" /> faFileExcel</Button></td><td>file-excel</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-export" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-export" /> faFileExport</Button></td><td>file-export</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-image" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-image" /> faFileImage</Button></td><td>file-image</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-import" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-import" /> faFileImport</Button></td><td>file-import</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-invoice" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-invoice" /> faFileInvoice</Button></td><td>file-invoice</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-invoice-dollar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-invoice-dollar" /> faFileInvoiceDollar</Button></td><td>file-invoice-dollar</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-medical" /> faFileMedical</Button></td><td>file-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-medical-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-medical-alt" /> faFileMedicalAlt</Button></td><td>file-medical-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-pdf" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-pdf" /> faFilePdf</Button></td><td>file-pdf</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-powerpoint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-powerpoint" /> faFilePowerpoint</Button></td><td>file-powerpoint</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-prescription" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-prescription" /> faFilePrescription</Button></td><td>file-prescription</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-signature" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-signature" /> faFileSignature</Button></td><td>file-signature</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-upload" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-upload" /> faFileUpload</Button></td><td>file-upload</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-video" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-video" /> faFileVideo</Button></td><td>file-video</td></tr>
                  <tr><td><FontAwesomeIcon icon="file-word" /></td><td><Button variant="primary"><FontAwesomeIcon icon="file-word" /> faFileWord</Button></td><td>file-word</td></tr>
                  <tr><td><FontAwesomeIcon icon="fill" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fill" /> faFill</Button></td><td>fill</td></tr>
                  <tr><td><FontAwesomeIcon icon="fill-drip" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fill-drip" /> faFillDrip</Button></td><td>fill-drip</td></tr>
                  <tr><td><FontAwesomeIcon icon="film" /></td><td><Button variant="primary"><FontAwesomeIcon icon="film" /> faFilm</Button></td><td>film</td></tr>
                  <tr><td><FontAwesomeIcon icon="filter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="filter" /> faFilter</Button></td><td>filter</td></tr>
                  <tr><td><FontAwesomeIcon icon="fingerprint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fingerprint" /> faFingerprint</Button></td><td>fingerprint</td></tr>
                  <tr><td><FontAwesomeIcon icon="fire" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fire" /> faFire</Button></td><td>fire</td></tr>
                  <tr><td><FontAwesomeIcon icon="fire-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fire-alt" /> faFireAlt</Button></td><td>fire-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="fire-extinguisher" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fire-extinguisher" /> faFireExtinguisher</Button></td><td>fire-extinguisher</td></tr>
                  <tr><td><FontAwesomeIcon icon="first-aid" /></td><td><Button variant="primary"><FontAwesomeIcon icon="first-aid" /> faFirstAid</Button></td><td>first-aid</td></tr>
                  <tr><td><FontAwesomeIcon icon="fish" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fish" /> faFish</Button></td><td>fish</td></tr>
                  <tr><td><FontAwesomeIcon icon="fist-raised" /></td><td><Button variant="primary"><FontAwesomeIcon icon="fist-raised" /> faFistRaised</Button></td><td>fist-raised</td></tr>
                  <tr><td><FontAwesomeIcon icon="flag" /></td><td><Button variant="primary"><FontAwesomeIcon icon="flag" /> faFlag</Button></td><td>flag</td></tr>
                  <tr><td><FontAwesomeIcon icon="flag-checkered" /></td><td><Button variant="primary"><FontAwesomeIcon icon="flag-checkered" /> faFlagCheckered</Button></td><td>flag-checkered</td></tr>
                  <tr><td><FontAwesomeIcon icon="flag-usa" /></td><td><Button variant="primary"><FontAwesomeIcon icon="flag-usa" /> faFlagUsa</Button></td><td>flag-usa</td></tr>
                  <tr><td><FontAwesomeIcon icon="flask" /></td><td><Button variant="primary"><FontAwesomeIcon icon="flask" /> faFlask</Button></td><td>flask</td></tr>
                  <tr><td><FontAwesomeIcon icon="flushed" /></td><td><Button variant="primary"><FontAwesomeIcon icon="flushed" /> faFlushed</Button></td><td>flushed</td></tr>
                  <tr><td><FontAwesomeIcon icon="folder" /></td><td><Button variant="primary"><FontAwesomeIcon icon="folder" /> faFolder</Button></td><td>folder</td></tr>
                  <tr><td><FontAwesomeIcon icon="folder-minus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="folder-minus" /> faFolderMinus</Button></td><td>folder-minus</td></tr>
                  <tr><td><FontAwesomeIcon icon="folder-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="folder-open" /> faFolderOpen</Button></td><td>folder-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="folder-plus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="folder-plus" /> faFolderPlus</Button></td><td>folder-plus</td></tr>
                  <tr><td><FontAwesomeIcon icon="font" /></td><td><Button variant="primary"><FontAwesomeIcon icon="font" /> faFont</Button></td><td>font</td></tr>
                  <tr><td><FontAwesomeIcon icon="font-awesome-logo-full" /></td><td><Button variant="primary"><FontAwesomeIcon icon="font-awesome-logo-full" /> faFontAwesomeLogoFull</Button></td><td>font-awesome-logo-full</td></tr>
                  <tr><td><FontAwesomeIcon icon="football-ball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="football-ball" /> faFootballBall</Button></td><td>football-ball</td></tr>
                  <tr><td><FontAwesomeIcon icon="forward" /></td><td><Button variant="primary"><FontAwesomeIcon icon="forward" /> faForward</Button></td><td>forward</td></tr>
                  <tr><td><FontAwesomeIcon icon="frog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="frog" /> faFrog</Button></td><td>frog</td></tr>
                  <tr><td><FontAwesomeIcon icon="frown" /></td><td><Button variant="primary"><FontAwesomeIcon icon="frown" /> faFrown</Button></td><td>frown</td></tr>
                  <tr><td><FontAwesomeIcon icon="frown-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="frown-open" /> faFrownOpen</Button></td><td>frown-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="funnel-dollar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="funnel-dollar" /> faFunnelDollar</Button></td><td>funnel-dollar</td></tr>
                  <tr><td><FontAwesomeIcon icon="futbol" /></td><td><Button variant="primary"><FontAwesomeIcon icon="futbol" /> faFutbol</Button></td><td>futbol</td></tr>
                  <tr><td><FontAwesomeIcon icon="gamepad" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gamepad" /> faGamepad</Button></td><td>gamepad</td></tr>
                  <tr><td><FontAwesomeIcon icon="gas-pump" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gas-pump" /> faGasPump</Button></td><td>gas-pump</td></tr>
                  <tr><td><FontAwesomeIcon icon="gavel" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gavel" /> faGavel</Button></td><td>gavel</td></tr>
                  <tr><td><FontAwesomeIcon icon="gem" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gem" /> faGem</Button></td><td>gem</td></tr>
                  <tr><td><FontAwesomeIcon icon="genderless" /></td><td><Button variant="primary"><FontAwesomeIcon icon="genderless" /> faGenderless</Button></td><td>genderless</td></tr>
                  <tr><td><FontAwesomeIcon icon="ghost" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ghost" /> faGhost</Button></td><td>ghost</td></tr>
                  <tr><td><FontAwesomeIcon icon="gift" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gift" /> faGift</Button></td><td>gift</td></tr>
                  <tr><td><FontAwesomeIcon icon="gifts" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gifts" /> faGifts</Button></td><td>gifts</td></tr>
                  <tr><td><FontAwesomeIcon icon="glass-cheers" /></td><td><Button variant="primary"><FontAwesomeIcon icon="glass-cheers" /> faGlassCheers</Button></td><td>glass-cheers</td></tr>
                  <tr><td><FontAwesomeIcon icon="glass-martini" /></td><td><Button variant="primary"><FontAwesomeIcon icon="glass-martini" /> faGlassMartini</Button></td><td>glass-martini</td></tr>
                  <tr><td><FontAwesomeIcon icon="glass-martini-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="glass-martini-alt" /> faGlassMartiniAlt</Button></td><td>glass-martini-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="glass-whiskey" /></td><td><Button variant="primary"><FontAwesomeIcon icon="glass-whiskey" /> faGlassWhiskey</Button></td><td>glass-whiskey</td></tr>
                  <tr><td><FontAwesomeIcon icon="glasses" /></td><td><Button variant="primary"><FontAwesomeIcon icon="glasses" /> faGlasses</Button></td><td>glasses</td></tr>
                  <tr><td><FontAwesomeIcon icon="globe" /></td><td><Button variant="primary"><FontAwesomeIcon icon="globe" /> faGlobe</Button></td><td>globe</td></tr>
                  <tr><td><FontAwesomeIcon icon="globe-africa" /></td><td><Button variant="primary"><FontAwesomeIcon icon="globe-africa" /> faGlobeAfrica</Button></td><td>globe-africa</td></tr>
                  <tr><td><FontAwesomeIcon icon="globe-americas" /></td><td><Button variant="primary"><FontAwesomeIcon icon="globe-americas" /> faGlobeAmericas</Button></td><td>globe-americas</td></tr>
                  <tr><td><FontAwesomeIcon icon="globe-asia" /></td><td><Button variant="primary"><FontAwesomeIcon icon="globe-asia" /> faGlobeAsia</Button></td><td>globe-asia</td></tr>
                  <tr><td><FontAwesomeIcon icon="globe-europe" /></td><td><Button variant="primary"><FontAwesomeIcon icon="globe-europe" /> faGlobeEurope</Button></td><td>globe-europe</td></tr>
                  <tr><td><FontAwesomeIcon icon="golf-ball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="golf-ball" /> faGolfBall</Button></td><td>golf-ball</td></tr>
                  <tr><td><FontAwesomeIcon icon="gopuram" /></td><td><Button variant="primary"><FontAwesomeIcon icon="gopuram" /> faGopuram</Button></td><td>gopuram</td></tr>
                  <tr><td><FontAwesomeIcon icon="graduation-cap" /></td><td><Button variant="primary"><FontAwesomeIcon icon="graduation-cap" /> faGraduationCap</Button></td><td>graduation-cap</td></tr>
                  <tr><td><FontAwesomeIcon icon="greater-than" /></td><td><Button variant="primary"><FontAwesomeIcon icon="greater-than" /> faGreaterThan</Button></td><td>greater-than</td></tr>
                  <tr><td><FontAwesomeIcon icon="greater-than-equal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="greater-than-equal" /> faGreaterThanEqual</Button></td><td>greater-than-equal</td></tr>
                  <tr><td><FontAwesomeIcon icon="grimace" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grimace" /> faGrimace</Button></td><td>grimace</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin" /> faGrin</Button></td><td>grin</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-alt" /> faGrinAlt</Button></td><td>grin-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-beam" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-beam" /> faGrinBeam</Button></td><td>grin-beam</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-beam-sweat" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-beam-sweat" /> faGrinBeamSweat</Button></td><td>grin-beam-sweat</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-hearts" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-hearts" /> faGrinHearts</Button></td><td>grin-hearts</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-squint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-squint" /> faGrinSquint</Button></td><td>grin-squint</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-squint-tears" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-squint-tears" /> faGrinSquintTears</Button></td><td>grin-squint-tears</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-stars" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-stars" /> faGrinStars</Button></td><td>grin-stars</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-tears" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-tears" /> faGrinTears</Button></td><td>grin-tears</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-tongue" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-tongue" /> faGrinTongue</Button></td><td>grin-tongue</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-tongue-squint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-tongue-squint" /> faGrinTongueSquint</Button></td><td>grin-tongue-squint</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-tongue-wink" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-tongue-wink" /> faGrinTongueWink</Button></td><td>grin-tongue-wink</td></tr>
                  <tr><td><FontAwesomeIcon icon="grin-wink" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grin-wink" /> faGrinWink</Button></td><td>grin-wink</td></tr>
                  <tr><td><FontAwesomeIcon icon="grip-horizontal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grip-horizontal" /> faGripHorizontal</Button></td><td>grip-horizontal</td></tr>
                  <tr><td><FontAwesomeIcon icon="grip-lines" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grip-lines" /> faGripLines</Button></td><td>grip-lines</td></tr>
                  <tr><td><FontAwesomeIcon icon="grip-lines-vertical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grip-lines-vertical" /> faGripLinesVertical</Button></td><td>grip-lines-vertical</td></tr>
                  <tr><td><FontAwesomeIcon icon="grip-vertical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="grip-vertical" /> faGripVertical</Button></td><td>grip-vertical</td></tr>
                  <tr><td><FontAwesomeIcon icon="guitar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="guitar" /> faGuitar</Button></td><td>guitar</td></tr>
                  <tr><td><FontAwesomeIcon icon="h-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="h-square" /> faHSquare</Button></td><td>h-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="hamburger" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hamburger" /> faHamburger</Button></td><td>hamburger</td></tr>
                  <tr><td><FontAwesomeIcon icon="hammer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hammer" /> faHammer</Button></td><td>hammer</td></tr>
                  <tr><td><FontAwesomeIcon icon="hamsa" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hamsa" /> faHamsa</Button></td><td>hamsa</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-holding" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-holding" /> faHandHolding</Button></td><td>hand-holding</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-holding-heart" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-holding-heart" /> faHandHoldingHeart</Button></td><td>hand-holding-heart</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-holding-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-holding-medical" /> faHandHoldingMedical</Button></td><td>hand-holding-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-holding-usd" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-holding-usd" /> faHandHoldingUsd</Button></td><td>hand-holding-usd</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-holding-water" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-holding-water" /> faHandHoldingWater</Button></td><td>hand-holding-water</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-lizard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-lizard" /> faHandLizard</Button></td><td>hand-lizard</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-middle-finger" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-middle-finger" /> faHandMiddleFinger</Button></td><td>hand-middle-finger</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-paper" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-paper" /> faHandPaper</Button></td><td>hand-paper</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-peace" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-peace" /> faHandPeace</Button></td><td>hand-peace</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-point-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-point-down" /> faHandPointDown</Button></td><td>hand-point-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-point-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-point-left" /> faHandPointLeft</Button></td><td>hand-point-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-point-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-point-right" /> faHandPointRight</Button></td><td>hand-point-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-point-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-point-up" /> faHandPointUp</Button></td><td>hand-point-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-pointer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-pointer" /> faHandPointer</Button></td><td>hand-pointer</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-rock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-rock" /> faHandRock</Button></td><td>hand-rock</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-scissors" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-scissors" /> faHandScissors</Button></td><td>hand-scissors</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-sparkles" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-sparkles" /> faHandSparkles</Button></td><td>hand-sparkles</td></tr>
                  <tr><td><FontAwesomeIcon icon="hand-spock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hand-spock" /> faHandSpock</Button></td><td>hand-spock</td></tr>
                  <tr><td><FontAwesomeIcon icon="hands" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hands" /> faHands</Button></td><td>hands</td></tr>
                  <tr><td><FontAwesomeIcon icon="hands-helping" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hands-helping" /> faHandsHelping</Button></td><td>hands-helping</td></tr>
                  <tr><td><FontAwesomeIcon icon="hands-wash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hands-wash" /> faHandsWash</Button></td><td>hands-wash</td></tr>
                  <tr><td><FontAwesomeIcon icon="handshake" /></td><td><Button variant="primary"><FontAwesomeIcon icon="handshake" /> faHandshake</Button></td><td>handshake</td></tr>
                  <tr><td><FontAwesomeIcon icon="handshake-alt-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="handshake-alt-slash" /> faHandshakeAltSlash</Button></td><td>handshake-alt-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="handshake-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="handshake-slash" /> faHandshakeSlash</Button></td><td>handshake-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="hanukiah" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hanukiah" /> faHanukiah</Button></td><td>hanukiah</td></tr>
                  <tr><td><FontAwesomeIcon icon="hard-hat" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hard-hat" /> faHardHat</Button></td><td>hard-hat</td></tr>
                  <tr><td><FontAwesomeIcon icon="hashtag" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hashtag" /> faHashtag</Button></td><td>hashtag</td></tr>
                  <tr><td><FontAwesomeIcon icon="hat-cowboy" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hat-cowboy" /> faHatCowboy</Button></td><td>hat-cowboy</td></tr>
                  <tr><td><FontAwesomeIcon icon="hat-cowboy-side" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hat-cowboy-side" /> faHatCowboySide</Button></td><td>hat-cowboy-side</td></tr>
                  <tr><td><FontAwesomeIcon icon="hat-wizard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hat-wizard" /> faHatWizard</Button></td><td>hat-wizard</td></tr>
                  <tr><td><FontAwesomeIcon icon="hdd" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hdd" /> faHdd</Button></td><td>hdd</td></tr>
                  <tr><td><FontAwesomeIcon icon="head-side-cough" /></td><td><Button variant="primary"><FontAwesomeIcon icon="head-side-cough" /> faHeadSideCough</Button></td><td>head-side-cough</td></tr>
                  <tr><td><FontAwesomeIcon icon="head-side-cough-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="head-side-cough-slash" /> faHeadSideCoughSlash</Button></td><td>head-side-cough-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="head-side-mask" /></td><td><Button variant="primary"><FontAwesomeIcon icon="head-side-mask" /> faHeadSideMask</Button></td><td>head-side-mask</td></tr>
                  <tr><td><FontAwesomeIcon icon="head-side-virus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="head-side-virus" /> faHeadSideVirus</Button></td><td>head-side-virus</td></tr>
                  <tr><td><FontAwesomeIcon icon="heading" /></td><td><Button variant="primary"><FontAwesomeIcon icon="heading" /> faHeading</Button></td><td>heading</td></tr>
                  <tr><td><FontAwesomeIcon icon="headphones" /></td><td><Button variant="primary"><FontAwesomeIcon icon="headphones" /> faHeadphones</Button></td><td>headphones</td></tr>
                  <tr><td><FontAwesomeIcon icon="headphones-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="headphones-alt" /> faHeadphonesAlt</Button></td><td>headphones-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="headset" /></td><td><Button variant="primary"><FontAwesomeIcon icon="headset" /> faHeadset</Button></td><td>headset</td></tr>
                  <tr><td><FontAwesomeIcon icon="heart" /></td><td><Button variant="primary"><FontAwesomeIcon icon="heart" /> faHeart</Button></td><td>heart</td></tr>
                  <tr><td><FontAwesomeIcon icon="heart-broken" /></td><td><Button variant="primary"><FontAwesomeIcon icon="heart-broken" /> faHeartBroken</Button></td><td>heart-broken</td></tr>
                  <tr><td><FontAwesomeIcon icon="heartbeat" /></td><td><Button variant="primary"><FontAwesomeIcon icon="heartbeat" /> faHeartbeat</Button></td><td>heartbeat</td></tr>
                  <tr><td><FontAwesomeIcon icon="helicopter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="helicopter" /> faHelicopter</Button></td><td>helicopter</td></tr>
                  <tr><td><FontAwesomeIcon icon="highlighter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="highlighter" /> faHighlighter</Button></td><td>highlighter</td></tr>
                  <tr><td><FontAwesomeIcon icon="hiking" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hiking" /> faHiking</Button></td><td>hiking</td></tr>
                  <tr><td><FontAwesomeIcon icon="hippo" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hippo" /> faHippo</Button></td><td>hippo</td></tr>
                  <tr><td><FontAwesomeIcon icon="history" /></td><td><Button variant="primary"><FontAwesomeIcon icon="history" /> faHistory</Button></td><td>history</td></tr>
                  <tr><td><FontAwesomeIcon icon="hockey-puck" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hockey-puck" /> faHockeyPuck</Button></td><td>hockey-puck</td></tr>
                  <tr><td><FontAwesomeIcon icon="holly-berry" /></td><td><Button variant="primary"><FontAwesomeIcon icon="holly-berry" /> faHollyBerry</Button></td><td>holly-berry</td></tr>
                  <tr><td><FontAwesomeIcon icon="home" /></td><td><Button variant="primary"><FontAwesomeIcon icon="home" /> faHome</Button></td><td>home</td></tr>
                  <tr><td><FontAwesomeIcon icon="horse" /></td><td><Button variant="primary"><FontAwesomeIcon icon="horse" /> faHorse</Button></td><td>horse</td></tr>
                  <tr><td><FontAwesomeIcon icon="horse-head" /></td><td><Button variant="primary"><FontAwesomeIcon icon="horse-head" /> faHorseHead</Button></td><td>horse-head</td></tr>
                  <tr><td><FontAwesomeIcon icon="hospital" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hospital" /> faHospital</Button></td><td>hospital</td></tr>
                  <tr><td><FontAwesomeIcon icon="hospital-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hospital-alt" /> faHospitalAlt</Button></td><td>hospital-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="hospital-symbol" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hospital-symbol" /> faHospitalSymbol</Button></td><td>hospital-symbol</td></tr>
                  <tr><td><FontAwesomeIcon icon="hospital-user" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hospital-user" /> faHospitalUser</Button></td><td>hospital-user</td></tr>
                  <tr><td><FontAwesomeIcon icon="hot-tub" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hot-tub" /> faHotTub</Button></td><td>hot-tub</td></tr>
                  <tr><td><FontAwesomeIcon icon="hotdog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hotdog" /> faHotdog</Button></td><td>hotdog</td></tr>
                  <tr><td><FontAwesomeIcon icon="hotel" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hotel" /> faHotel</Button></td><td>hotel</td></tr>
                  <tr><td><FontAwesomeIcon icon="hourglass" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hourglass" /> faHourglass</Button></td><td>hourglass</td></tr>
                  <tr><td><FontAwesomeIcon icon="hourglass-end" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hourglass-end" /> faHourglassEnd</Button></td><td>hourglass-end</td></tr>
                  <tr><td><FontAwesomeIcon icon="hourglass-half" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hourglass-half" /> faHourglassHalf</Button></td><td>hourglass-half</td></tr>
                  <tr><td><FontAwesomeIcon icon="hourglass-start" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hourglass-start" /> faHourglassStart</Button></td><td>hourglass-start</td></tr>
                  <tr><td><FontAwesomeIcon icon="house-damage" /></td><td><Button variant="primary"><FontAwesomeIcon icon="house-damage" /> faHouseDamage</Button></td><td>house-damage</td></tr>
                  <tr><td><FontAwesomeIcon icon="house-user" /></td><td><Button variant="primary"><FontAwesomeIcon icon="house-user" /> faHouseUser</Button></td><td>house-user</td></tr>
                  <tr><td><FontAwesomeIcon icon="hryvnia" /></td><td><Button variant="primary"><FontAwesomeIcon icon="hryvnia" /> faHryvnia</Button></td><td>hryvnia</td></tr>
                  <tr><td><FontAwesomeIcon icon="i-cursor" /></td><td><Button variant="primary"><FontAwesomeIcon icon="i-cursor" /> faICursor</Button></td><td>i-cursor</td></tr>
                  <tr><td><FontAwesomeIcon icon="ice-cream" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ice-cream" /> faIceCream</Button></td><td>ice-cream</td></tr>
                  <tr><td><FontAwesomeIcon icon="icicles" /></td><td><Button variant="primary"><FontAwesomeIcon icon="icicles" /> faIcicles</Button></td><td>icicles</td></tr>
                  <tr><td><FontAwesomeIcon icon="icons" /></td><td><Button variant="primary"><FontAwesomeIcon icon="icons" /> faIcons</Button></td><td>icons</td></tr>
                  <tr><td><FontAwesomeIcon icon="id-badge" /></td><td><Button variant="primary"><FontAwesomeIcon icon="id-badge" /> faIdBadge</Button></td><td>id-badge</td></tr>
                  <tr><td><FontAwesomeIcon icon="id-card" /></td><td><Button variant="primary"><FontAwesomeIcon icon="id-card" /> faIdCard</Button></td><td>id-card</td></tr>
                  <tr><td><FontAwesomeIcon icon="id-card-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="id-card-alt" /> faIdCardAlt</Button></td><td>id-card-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="igloo" /></td><td><Button variant="primary"><FontAwesomeIcon icon="igloo" /> faIgloo</Button></td><td>igloo</td></tr>
                  <tr><td><FontAwesomeIcon icon="image" /></td><td><Button variant="primary"><FontAwesomeIcon icon="image" /> faImage</Button></td><td>image</td></tr>
                  <tr><td><FontAwesomeIcon icon="images" /></td><td><Button variant="primary"><FontAwesomeIcon icon="images" /> faImages</Button></td><td>images</td></tr>
                  <tr><td><FontAwesomeIcon icon="inbox" /></td><td><Button variant="primary"><FontAwesomeIcon icon="inbox" /> faInbox</Button></td><td>inbox</td></tr>
                  <tr><td><FontAwesomeIcon icon="indent" /></td><td><Button variant="primary"><FontAwesomeIcon icon="indent" /> faIndent</Button></td><td>indent</td></tr>
                  <tr><td><FontAwesomeIcon icon="industry" /></td><td><Button variant="primary"><FontAwesomeIcon icon="industry" /> faIndustry</Button></td><td>industry</td></tr>
                  <tr><td><FontAwesomeIcon icon="infinity" /></td><td><Button variant="primary"><FontAwesomeIcon icon="infinity" /> faInfinity</Button></td><td>infinity</td></tr>
                  <tr><td><FontAwesomeIcon icon="info" /></td><td><Button variant="primary"><FontAwesomeIcon icon="info" /> faInfo</Button></td><td>info</td></tr>
                  <tr><td><FontAwesomeIcon icon="info-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="info-circle" /> faInfoCircle</Button></td><td>info-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="italic" /></td><td><Button variant="primary"><FontAwesomeIcon icon="italic" /> faItalic</Button></td><td>italic</td></tr>
                  <tr><td><FontAwesomeIcon icon="jedi" /></td><td><Button variant="primary"><FontAwesomeIcon icon="jedi" /> faJedi</Button></td><td>jedi</td></tr>
                  <tr><td><FontAwesomeIcon icon="joint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="joint" /> faJoint</Button></td><td>joint</td></tr>
                  <tr><td><FontAwesomeIcon icon="journal-whills" /></td><td><Button variant="primary"><FontAwesomeIcon icon="journal-whills" /> faJournalWhills</Button></td><td>journal-whills</td></tr>
                  <tr><td><FontAwesomeIcon icon="kaaba" /></td><td><Button variant="primary"><FontAwesomeIcon icon="kaaba" /> faKaaba</Button></td><td>kaaba</td></tr>
                  <tr><td><FontAwesomeIcon icon="key" /></td><td><Button variant="primary"><FontAwesomeIcon icon="key" /> faKey</Button></td><td>key</td></tr>
                  <tr><td><FontAwesomeIcon icon="keyboard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="keyboard" /> faKeyboard</Button></td><td>keyboard</td></tr>
                  <tr><td><FontAwesomeIcon icon="khanda" /></td><td><Button variant="primary"><FontAwesomeIcon icon="khanda" /> faKhanda</Button></td><td>khanda</td></tr>
                  <tr><td><FontAwesomeIcon icon="kiss" /></td><td><Button variant="primary"><FontAwesomeIcon icon="kiss" /> faKiss</Button></td><td>kiss</td></tr>
                  <tr><td><FontAwesomeIcon icon="kiss-beam" /></td><td><Button variant="primary"><FontAwesomeIcon icon="kiss-beam" /> faKissBeam</Button></td><td>kiss-beam</td></tr>
                  <tr><td><FontAwesomeIcon icon="kiss-wink-heart" /></td><td><Button variant="primary"><FontAwesomeIcon icon="kiss-wink-heart" /> faKissWinkHeart</Button></td><td>kiss-wink-heart</td></tr>
                  <tr><td><FontAwesomeIcon icon="kiwi-bird" /></td><td><Button variant="primary"><FontAwesomeIcon icon="kiwi-bird" /> faKiwiBird</Button></td><td>kiwi-bird</td></tr>
                  <tr><td><FontAwesomeIcon icon="landmark" /></td><td><Button variant="primary"><FontAwesomeIcon icon="landmark" /> faLandmark</Button></td><td>landmark</td></tr>
                  <tr><td><FontAwesomeIcon icon="language" /></td><td><Button variant="primary"><FontAwesomeIcon icon="language" /> faLanguage</Button></td><td>language</td></tr>
                  <tr><td><FontAwesomeIcon icon="laptop" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laptop" /> faLaptop</Button></td><td>laptop</td></tr>
                  <tr><td><FontAwesomeIcon icon="laptop-code" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laptop-code" /> faLaptopCode</Button></td><td>laptop-code</td></tr>
                  <tr><td><FontAwesomeIcon icon="laptop-house" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laptop-house" /> faLaptopHouse</Button></td><td>laptop-house</td></tr>
                  <tr><td><FontAwesomeIcon icon="laptop-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laptop-medical" /> faLaptopMedical</Button></td><td>laptop-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="laugh" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laugh" /> faLaugh</Button></td><td>laugh</td></tr>
                  <tr><td><FontAwesomeIcon icon="laugh-beam" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laugh-beam" /> faLaughBeam</Button></td><td>laugh-beam</td></tr>
                  <tr><td><FontAwesomeIcon icon="laugh-squint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laugh-squint" /> faLaughSquint</Button></td><td>laugh-squint</td></tr>
                  <tr><td><FontAwesomeIcon icon="laugh-wink" /></td><td><Button variant="primary"><FontAwesomeIcon icon="laugh-wink" /> faLaughWink</Button></td><td>laugh-wink</td></tr>
                  <tr><td><FontAwesomeIcon icon="layer-group" /></td><td><Button variant="primary"><FontAwesomeIcon icon="layer-group" /> faLayerGroup</Button></td><td>layer-group</td></tr>
                  <tr><td><FontAwesomeIcon icon="leaf" /></td><td><Button variant="primary"><FontAwesomeIcon icon="leaf" /> faLeaf</Button></td><td>leaf</td></tr>
                  <tr><td><FontAwesomeIcon icon="lemon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lemon" /> faLemon</Button></td><td>lemon</td></tr>
                  <tr><td><FontAwesomeIcon icon="less-than" /></td><td><Button variant="primary"><FontAwesomeIcon icon="less-than" /> faLessThan</Button></td><td>less-than</td></tr>
                  <tr><td><FontAwesomeIcon icon="less-than-equal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="less-than-equal" /> faLessThanEqual</Button></td><td>less-than-equal</td></tr>
                  <tr><td><FontAwesomeIcon icon="level-down-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="level-down-alt" /> faLevelDownAlt</Button></td><td>level-down-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="level-up-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="level-up-alt" /> faLevelUpAlt</Button></td><td>level-up-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="life-ring" /></td><td><Button variant="primary"><FontAwesomeIcon icon="life-ring" /> faLifeRing</Button></td><td>life-ring</td></tr>
                  <tr><td><FontAwesomeIcon icon="lightbulb" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lightbulb" /> faLightbulb</Button></td><td>lightbulb</td></tr>
                  <tr><td><FontAwesomeIcon icon="link" /></td><td><Button variant="primary"><FontAwesomeIcon icon="link" /> faLink</Button></td><td>link</td></tr>
                  <tr><td><FontAwesomeIcon icon="lira-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lira-sign" /> faLiraSign</Button></td><td>lira-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="list" /></td><td><Button variant="primary"><FontAwesomeIcon icon="list" /> faList</Button></td><td>list</td></tr>
                  <tr><td><FontAwesomeIcon icon="list-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="list-alt" /> faListAlt</Button></td><td>list-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="list-ol" /></td><td><Button variant="primary"><FontAwesomeIcon icon="list-ol" /> faListOl</Button></td><td>list-ol</td></tr>
                  <tr><td><FontAwesomeIcon icon="list-ul" /></td><td><Button variant="primary"><FontAwesomeIcon icon="list-ul" /> faListUl</Button></td><td>list-ul</td></tr>
                  <tr><td><FontAwesomeIcon icon="location-arrow" /></td><td><Button variant="primary"><FontAwesomeIcon icon="location-arrow" /> faLocationArrow</Button></td><td>location-arrow</td></tr>
                  <tr><td><FontAwesomeIcon icon="lock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lock" /> faLock</Button></td><td>lock</td></tr>
                  <tr><td><FontAwesomeIcon icon="lock-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lock-open" /> faLockOpen</Button></td><td>lock-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="long-arrow-alt-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="long-arrow-alt-down" /> faLongArrowAltDown</Button></td><td>long-arrow-alt-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="long-arrow-alt-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="long-arrow-alt-left" /> faLongArrowAltLeft</Button></td><td>long-arrow-alt-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="long-arrow-alt-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="long-arrow-alt-right" /> faLongArrowAltRight</Button></td><td>long-arrow-alt-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="long-arrow-alt-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="long-arrow-alt-up" /> faLongArrowAltUp</Button></td><td>long-arrow-alt-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="low-vision" /></td><td><Button variant="primary"><FontAwesomeIcon icon="low-vision" /> faLowVision</Button></td><td>low-vision</td></tr>
                  <tr><td><FontAwesomeIcon icon="luggage-cart" /></td><td><Button variant="primary"><FontAwesomeIcon icon="luggage-cart" /> faLuggageCart</Button></td><td>luggage-cart</td></tr>
                  <tr><td><FontAwesomeIcon icon="lungs" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lungs" /> faLungs</Button></td><td>lungs</td></tr>
                  <tr><td><FontAwesomeIcon icon="lungs-virus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="lungs-virus" /> faLungsVirus</Button></td><td>lungs-virus</td></tr>
                  <tr><td><FontAwesomeIcon icon="magic" /></td><td><Button variant="primary"><FontAwesomeIcon icon="magic" /> faMagic</Button></td><td>magic</td></tr>
                  <tr><td><FontAwesomeIcon icon="magnet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="magnet" /> faMagnet</Button></td><td>magnet</td></tr>
                  <tr><td><FontAwesomeIcon icon="mail-bulk" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mail-bulk" /> faMailBulk</Button></td><td>mail-bulk</td></tr>
                  <tr><td><FontAwesomeIcon icon="male" /></td><td><Button variant="primary"><FontAwesomeIcon icon="male" /> faMale</Button></td><td>male</td></tr>
                  <tr><td><FontAwesomeIcon icon="map" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map" /> faMap</Button></td><td>map</td></tr>
                  <tr><td><FontAwesomeIcon icon="map-marked" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map-marked" /> faMapMarked</Button></td><td>map-marked</td></tr>
                  <tr><td><FontAwesomeIcon icon="map-marked-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map-marked-alt" /> faMapMarkedAlt</Button></td><td>map-marked-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="map-marker" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map-marker" /> faMapMarker</Button></td><td>map-marker</td></tr>
                  <tr><td><FontAwesomeIcon icon="map-marker-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map-marker-alt" /> faMapMarkerAlt</Button></td><td>map-marker-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="map-pin" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map-pin" /> faMapPin</Button></td><td>map-pin</td></tr>
                  <tr><td><FontAwesomeIcon icon="map-signs" /></td><td><Button variant="primary"><FontAwesomeIcon icon="map-signs" /> faMapSigns</Button></td><td>map-signs</td></tr>
                  <tr><td><FontAwesomeIcon icon="marker" /></td><td><Button variant="primary"><FontAwesomeIcon icon="marker" /> faMarker</Button></td><td>marker</td></tr>
                  <tr><td><FontAwesomeIcon icon="mars" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mars" /> faMars</Button></td><td>mars</td></tr>
                  <tr><td><FontAwesomeIcon icon="mars-double" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mars-double" /> faMarsDouble</Button></td><td>mars-double</td></tr>
                  <tr><td><FontAwesomeIcon icon="mars-stroke" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mars-stroke" /> faMarsStroke</Button></td><td>mars-stroke</td></tr>
                  <tr><td><FontAwesomeIcon icon="mars-stroke-h" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mars-stroke-h" /> faMarsStrokeH</Button></td><td>mars-stroke-h</td></tr>
                  <tr><td><FontAwesomeIcon icon="mars-stroke-v" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mars-stroke-v" /> faMarsStrokeV</Button></td><td>mars-stroke-v</td></tr>
                  <tr><td><FontAwesomeIcon icon="mask" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mask" /> faMask</Button></td><td>mask</td></tr>
                  <tr><td><FontAwesomeIcon icon="medal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="medal" /> faMedal</Button></td><td>medal</td></tr>
                  <tr><td><FontAwesomeIcon icon="medkit" /></td><td><Button variant="primary"><FontAwesomeIcon icon="medkit" /> faMedkit</Button></td><td>medkit</td></tr>
                  <tr><td><FontAwesomeIcon icon="meh" /></td><td><Button variant="primary"><FontAwesomeIcon icon="meh" /> faMeh</Button></td><td>meh</td></tr>
                  <tr><td><FontAwesomeIcon icon="meh-blank" /></td><td><Button variant="primary"><FontAwesomeIcon icon="meh-blank" /> faMehBlank</Button></td><td>meh-blank</td></tr>
                  <tr><td><FontAwesomeIcon icon="meh-rolling-eyes" /></td><td><Button variant="primary"><FontAwesomeIcon icon="meh-rolling-eyes" /> faMehRollingEyes</Button></td><td>meh-rolling-eyes</td></tr>
                  <tr><td><FontAwesomeIcon icon="memory" /></td><td><Button variant="primary"><FontAwesomeIcon icon="memory" /> faMemory</Button></td><td>memory</td></tr>
                  <tr><td><FontAwesomeIcon icon="menorah" /></td><td><Button variant="primary"><FontAwesomeIcon icon="menorah" /> faMenorah</Button></td><td>menorah</td></tr>
                  <tr><td><FontAwesomeIcon icon="mercury" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mercury" /> faMercury</Button></td><td>mercury</td></tr>
                  <tr><td><FontAwesomeIcon icon="meteor" /></td><td><Button variant="primary"><FontAwesomeIcon icon="meteor" /> faMeteor</Button></td><td>meteor</td></tr>
                  <tr><td><FontAwesomeIcon icon="microchip" /></td><td><Button variant="primary"><FontAwesomeIcon icon="microchip" /> faMicrochip</Button></td><td>microchip</td></tr>
                  <tr><td><FontAwesomeIcon icon="microphone" /></td><td><Button variant="primary"><FontAwesomeIcon icon="microphone" /> faMicrophone</Button></td><td>microphone</td></tr>
                  <tr><td><FontAwesomeIcon icon="microphone-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="microphone-alt" /> faMicrophoneAlt</Button></td><td>microphone-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="microphone-alt-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="microphone-alt-slash" /> faMicrophoneAltSlash</Button></td><td>microphone-alt-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="microphone-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="microphone-slash" /> faMicrophoneSlash</Button></td><td>microphone-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="microscope" /></td><td><Button variant="primary"><FontAwesomeIcon icon="microscope" /> faMicroscope</Button></td><td>microscope</td></tr>
                  <tr><td><FontAwesomeIcon icon="minus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="minus" /> faMinus</Button></td><td>minus</td></tr>
                  <tr><td><FontAwesomeIcon icon="minus-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="minus-circle" /> faMinusCircle</Button></td><td>minus-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="minus-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="minus-square" /> faMinusSquare</Button></td><td>minus-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="mitten" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mitten" /> faMitten</Button></td><td>mitten</td></tr>
                  <tr><td><FontAwesomeIcon icon="mobile" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mobile" /> faMobile</Button></td><td>mobile</td></tr>
                  <tr><td><FontAwesomeIcon icon="mobile-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mobile-alt" /> faMobileAlt</Button></td><td>mobile-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="money-bill" /></td><td><Button variant="primary"><FontAwesomeIcon icon="money-bill" /> faMoneyBill</Button></td><td>money-bill</td></tr>
                  <tr><td><FontAwesomeIcon icon="money-bill-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="money-bill-alt" /> faMoneyBillAlt</Button></td><td>money-bill-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="money-bill-wave" /></td><td><Button variant="primary"><FontAwesomeIcon icon="money-bill-wave" /> faMoneyBillWave</Button></td><td>money-bill-wave</td></tr>
                  <tr><td><FontAwesomeIcon icon="money-bill-wave-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="money-bill-wave-alt" /> faMoneyBillWaveAlt</Button></td><td>money-bill-wave-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="money-check" /></td><td><Button variant="primary"><FontAwesomeIcon icon="money-check" /> faMoneyCheck</Button></td><td>money-check</td></tr>
                  <tr><td><FontAwesomeIcon icon="money-check-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="money-check-alt" /> faMoneyCheckAlt</Button></td><td>money-check-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="monument" /></td><td><Button variant="primary"><FontAwesomeIcon icon="monument" /> faMonument</Button></td><td>monument</td></tr>
                  <tr><td><FontAwesomeIcon icon="moon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="moon" /> faMoon</Button></td><td>moon</td></tr>
                  <tr><td><FontAwesomeIcon icon="mortar-pestle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mortar-pestle" /> faMortarPestle</Button></td><td>mortar-pestle</td></tr>
                  <tr><td><FontAwesomeIcon icon="mosque" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mosque" /> faMosque</Button></td><td>mosque</td></tr>
                  <tr><td><FontAwesomeIcon icon="motorcycle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="motorcycle" /> faMotorcycle</Button></td><td>motorcycle</td></tr>
                  <tr><td><FontAwesomeIcon icon="mountain" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mountain" /> faMountain</Button></td><td>mountain</td></tr>
                  <tr><td><FontAwesomeIcon icon="mouse" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mouse" /> faMouse</Button></td><td>mouse</td></tr>
                  <tr><td><FontAwesomeIcon icon="mouse-pointer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mouse-pointer" /> faMousePointer</Button></td><td>mouse-pointer</td></tr>
                  <tr><td><FontAwesomeIcon icon="mug-hot" /></td><td><Button variant="primary"><FontAwesomeIcon icon="mug-hot" /> faMugHot</Button></td><td>mug-hot</td></tr>
                  <tr><td><FontAwesomeIcon icon="music" /></td><td><Button variant="primary"><FontAwesomeIcon icon="music" /> faMusic</Button></td><td>music</td></tr>
                  <tr><td><FontAwesomeIcon icon="network-wired" /></td><td><Button variant="primary"><FontAwesomeIcon icon="network-wired" /> faNetworkWired</Button></td><td>network-wired</td></tr>
                  <tr><td><FontAwesomeIcon icon="neuter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="neuter" /> faNeuter</Button></td><td>neuter</td></tr>
                  <tr><td><FontAwesomeIcon icon="newspaper" /></td><td><Button variant="primary"><FontAwesomeIcon icon="newspaper" /> faNewspaper</Button></td><td>newspaper</td></tr>
                  <tr><td><FontAwesomeIcon icon="not-equal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="not-equal" /> faNotEqual</Button></td><td>not-equal</td></tr>
                  <tr><td><FontAwesomeIcon icon="notes-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="notes-medical" /> faNotesMedical</Button></td><td>notes-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="object-group" /></td><td><Button variant="primary"><FontAwesomeIcon icon="object-group" /> faObjectGroup</Button></td><td>object-group</td></tr>
                  <tr><td><FontAwesomeIcon icon="object-ungroup" /></td><td><Button variant="primary"><FontAwesomeIcon icon="object-ungroup" /> faObjectUngroup</Button></td><td>object-ungroup</td></tr>
                  <tr><td><FontAwesomeIcon icon="oil-can" /></td><td><Button variant="primary"><FontAwesomeIcon icon="oil-can" /> faOilCan</Button></td><td>oil-can</td></tr>
                  <tr><td><FontAwesomeIcon icon="om" /></td><td><Button variant="primary"><FontAwesomeIcon icon="om" /> faOm</Button></td><td>om</td></tr>
                  <tr><td><FontAwesomeIcon icon="otter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="otter" /> faOtter</Button></td><td>otter</td></tr>
                  <tr><td><FontAwesomeIcon icon="outdent" /></td><td><Button variant="primary"><FontAwesomeIcon icon="outdent" /> faOutdent</Button></td><td>outdent</td></tr>
                  <tr><td><FontAwesomeIcon icon="pager" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pager" /> faPager</Button></td><td>pager</td></tr>
                  <tr><td><FontAwesomeIcon icon="paint-brush" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paint-brush" /> faPaintBrush</Button></td><td>paint-brush</td></tr>
                  <tr><td><FontAwesomeIcon icon="paint-roller" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paint-roller" /> faPaintRoller</Button></td><td>paint-roller</td></tr>
                  <tr><td><FontAwesomeIcon icon="palette" /></td><td><Button variant="primary"><FontAwesomeIcon icon="palette" /> faPalette</Button></td><td>palette</td></tr>
                  <tr><td><FontAwesomeIcon icon="pallet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pallet" /> faPallet</Button></td><td>pallet</td></tr>
                  <tr><td><FontAwesomeIcon icon="paper-plane" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paper-plane" /> faPaperPlane</Button></td><td>paper-plane</td></tr>
                  <tr><td><FontAwesomeIcon icon="paperclip" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paperclip" /> faPaperclip</Button></td><td>paperclip</td></tr>
                  <tr><td><FontAwesomeIcon icon="parachute-box" /></td><td><Button variant="primary"><FontAwesomeIcon icon="parachute-box" /> faParachuteBox</Button></td><td>parachute-box</td></tr>
                  <tr><td><FontAwesomeIcon icon="paragraph" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paragraph" /> faParagraph</Button></td><td>paragraph</td></tr>
                  <tr><td><FontAwesomeIcon icon="parking" /></td><td><Button variant="primary"><FontAwesomeIcon icon="parking" /> faParking</Button></td><td>parking</td></tr>
                  <tr><td><FontAwesomeIcon icon="passport" /></td><td><Button variant="primary"><FontAwesomeIcon icon="passport" /> faPassport</Button></td><td>passport</td></tr>
                  <tr><td><FontAwesomeIcon icon="pastafarianism" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pastafarianism" /> faPastafarianism</Button></td><td>pastafarianism</td></tr>
                  <tr><td><FontAwesomeIcon icon="paste" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paste" /> faPaste</Button></td><td>paste</td></tr>
                  <tr><td><FontAwesomeIcon icon="pause" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pause" /> faPause</Button></td><td>pause</td></tr>
                  <tr><td><FontAwesomeIcon icon="pause-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pause-circle" /> faPauseCircle</Button></td><td>pause-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="paw" /></td><td><Button variant="primary"><FontAwesomeIcon icon="paw" /> faPaw</Button></td><td>paw</td></tr>
                  <tr><td><FontAwesomeIcon icon="peace" /></td><td><Button variant="primary"><FontAwesomeIcon icon="peace" /> faPeace</Button></td><td>peace</td></tr>
                  <tr><td><FontAwesomeIcon icon="pen" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pen" /> faPen</Button></td><td>pen</td></tr>
                  <tr><td><FontAwesomeIcon icon="pen-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pen-alt" /> faPenAlt</Button></td><td>pen-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="pen-fancy" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pen-fancy" /> faPenFancy</Button></td><td>pen-fancy</td></tr>
                  <tr><td><FontAwesomeIcon icon="pen-nib" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pen-nib" /> faPenNib</Button></td><td>pen-nib</td></tr>
                  <tr><td><FontAwesomeIcon icon="pen-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pen-square" /> faPenSquare</Button></td><td>pen-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="pencil-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pencil-alt" /> faPencilAlt</Button></td><td>pencil-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="pencil-ruler" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pencil-ruler" /> faPencilRuler</Button></td><td>pencil-ruler</td></tr>
                  <tr><td><FontAwesomeIcon icon="people-arrows" /></td><td><Button variant="primary"><FontAwesomeIcon icon="people-arrows" /> faPeopleArrows</Button></td><td>people-arrows</td></tr>
                  <tr><td><FontAwesomeIcon icon="people-carry" /></td><td><Button variant="primary"><FontAwesomeIcon icon="people-carry" /> faPeopleCarry</Button></td><td>people-carry</td></tr>
                  <tr><td><FontAwesomeIcon icon="pepper-hot" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pepper-hot" /> faPepperHot</Button></td><td>pepper-hot</td></tr>
                  <tr><td><FontAwesomeIcon icon="percent" /></td><td><Button variant="primary"><FontAwesomeIcon icon="percent" /> faPercent</Button></td><td>percent</td></tr>
                  <tr><td><FontAwesomeIcon icon="percentage" /></td><td><Button variant="primary"><FontAwesomeIcon icon="percentage" /> faPercentage</Button></td><td>percentage</td></tr>
                  <tr><td><FontAwesomeIcon icon="person-booth" /></td><td><Button variant="primary"><FontAwesomeIcon icon="person-booth" /> faPersonBooth</Button></td><td>person-booth</td></tr>
                  <tr><td><FontAwesomeIcon icon="phone" /></td><td><Button variant="primary"><FontAwesomeIcon icon="phone" /> faPhone</Button></td><td>phone</td></tr>
                  <tr><td><FontAwesomeIcon icon="phone-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="phone-alt" /> faPhoneAlt</Button></td><td>phone-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="phone-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="phone-slash" /> faPhoneSlash</Button></td><td>phone-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="phone-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="phone-square" /> faPhoneSquare</Button></td><td>phone-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="phone-square-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="phone-square-alt" /> faPhoneSquareAlt</Button></td><td>phone-square-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="phone-volume" /></td><td><Button variant="primary"><FontAwesomeIcon icon="phone-volume" /> faPhoneVolume</Button></td><td>phone-volume</td></tr>
                  <tr><td><FontAwesomeIcon icon="photo-video" /></td><td><Button variant="primary"><FontAwesomeIcon icon="photo-video" /> faPhotoVideo</Button></td><td>photo-video</td></tr>
                  <tr><td><FontAwesomeIcon icon="piggy-bank" /></td><td><Button variant="primary"><FontAwesomeIcon icon="piggy-bank" /> faPiggyBank</Button></td><td>piggy-bank</td></tr>
                  <tr><td><FontAwesomeIcon icon="pills" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pills" /> faPills</Button></td><td>pills</td></tr>
                  <tr><td><FontAwesomeIcon icon="pizza-slice" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pizza-slice" /> faPizzaSlice</Button></td><td>pizza-slice</td></tr>
                  <tr><td><FontAwesomeIcon icon="place-of-worship" /></td><td><Button variant="primary"><FontAwesomeIcon icon="place-of-worship" /> faPlaceOfWorship</Button></td><td>place-of-worship</td></tr>
                  <tr><td><FontAwesomeIcon icon="plane" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plane" /> faPlane</Button></td><td>plane</td></tr>
                  <tr><td><FontAwesomeIcon icon="plane-arrival" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plane-arrival" /> faPlaneArrival</Button></td><td>plane-arrival</td></tr>
                  <tr><td><FontAwesomeIcon icon="plane-departure" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plane-departure" /> faPlaneDeparture</Button></td><td>plane-departure</td></tr>
                  <tr><td><FontAwesomeIcon icon="plane-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plane-slash" /> faPlaneSlash</Button></td><td>plane-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="play" /></td><td><Button variant="primary"><FontAwesomeIcon icon="play" /> faPlay</Button></td><td>play</td></tr>
                  <tr><td><FontAwesomeIcon icon="play-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="play-circle" /> faPlayCircle</Button></td><td>play-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="plug" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plug" /> faPlug</Button></td><td>plug</td></tr>
                  <tr><td><FontAwesomeIcon icon="plus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plus" /> faPlus</Button></td><td>plus</td></tr>
                  <tr><td><FontAwesomeIcon icon="plus-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plus-circle" /> faPlusCircle</Button></td><td>plus-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="plus-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="plus-square" /> faPlusSquare</Button></td><td>plus-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="podcast" /></td><td><Button variant="primary"><FontAwesomeIcon icon="podcast" /> faPodcast</Button></td><td>podcast</td></tr>
                  <tr><td><FontAwesomeIcon icon="poll" /></td><td><Button variant="primary"><FontAwesomeIcon icon="poll" /> faPoll</Button></td><td>poll</td></tr>
                  <tr><td><FontAwesomeIcon icon="poll-h" /></td><td><Button variant="primary"><FontAwesomeIcon icon="poll-h" /> faPollH</Button></td><td>poll-h</td></tr>
                  <tr><td><FontAwesomeIcon icon="poo" /></td><td><Button variant="primary"><FontAwesomeIcon icon="poo" /> faPoo</Button></td><td>poo</td></tr>
                  <tr><td><FontAwesomeIcon icon="poo-storm" /></td><td><Button variant="primary"><FontAwesomeIcon icon="poo-storm" /> faPooStorm</Button></td><td>poo-storm</td></tr>
                  <tr><td><FontAwesomeIcon icon="poop" /></td><td><Button variant="primary"><FontAwesomeIcon icon="poop" /> faPoop</Button></td><td>poop</td></tr>
                  <tr><td><FontAwesomeIcon icon="portrait" /></td><td><Button variant="primary"><FontAwesomeIcon icon="portrait" /> faPortrait</Button></td><td>portrait</td></tr>
                  <tr><td><FontAwesomeIcon icon="pound-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pound-sign" /> faPoundSign</Button></td><td>pound-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="power-off" /></td><td><Button variant="primary"><FontAwesomeIcon icon="power-off" /> faPowerOff</Button></td><td>power-off</td></tr>
                  <tr><td><FontAwesomeIcon icon="pray" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pray" /> faPray</Button></td><td>pray</td></tr>
                  <tr><td><FontAwesomeIcon icon="praying-hands" /></td><td><Button variant="primary"><FontAwesomeIcon icon="praying-hands" /> faPrayingHands</Button></td><td>praying-hands</td></tr>
                  <tr><td><FontAwesomeIcon icon="prescription" /></td><td><Button variant="primary"><FontAwesomeIcon icon="prescription" /> faPrescription</Button></td><td>prescription</td></tr>
                  <tr><td><FontAwesomeIcon icon="prescription-bottle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="prescription-bottle" /> faPrescriptionBottle</Button></td><td>prescription-bottle</td></tr>
                  <tr><td><FontAwesomeIcon icon="prescription-bottle-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="prescription-bottle-alt" /> faPrescriptionBottleAlt</Button></td><td>prescription-bottle-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="print" /></td><td><Button variant="primary"><FontAwesomeIcon icon="print" /> faPrint</Button></td><td>print</td></tr>
                  <tr><td><FontAwesomeIcon icon="procedures" /></td><td><Button variant="primary"><FontAwesomeIcon icon="procedures" /> faProcedures</Button></td><td>procedures</td></tr>
                  <tr><td><FontAwesomeIcon icon="project-diagram" /></td><td><Button variant="primary"><FontAwesomeIcon icon="project-diagram" /> faProjectDiagram</Button></td><td>project-diagram</td></tr>
                  <tr><td><FontAwesomeIcon icon="pump-medical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pump-medical" /> faPumpMedical</Button></td><td>pump-medical</td></tr>
                  <tr><td><FontAwesomeIcon icon="pump-soap" /></td><td><Button variant="primary"><FontAwesomeIcon icon="pump-soap" /> faPumpSoap</Button></td><td>pump-soap</td></tr>
                  <tr><td><FontAwesomeIcon icon="puzzle-piece" /></td><td><Button variant="primary"><FontAwesomeIcon icon="puzzle-piece" /> faPuzzlePiece</Button></td><td>puzzle-piece</td></tr>
                  <tr><td><FontAwesomeIcon icon="qrcode" /></td><td><Button variant="primary"><FontAwesomeIcon icon="qrcode" /> faQrcode</Button></td><td>qrcode</td></tr>
                  <tr><td><FontAwesomeIcon icon="question" /></td><td><Button variant="primary"><FontAwesomeIcon icon="question" /> faQuestion</Button></td><td>question</td></tr>
                  <tr><td><FontAwesomeIcon icon="question-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="question-circle" /> faQuestionCircle</Button></td><td>question-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="quidditch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="quidditch" /> faQuidditch</Button></td><td>quidditch</td></tr>
                  <tr><td><FontAwesomeIcon icon="quote-left" /></td><td><Button variant="primary"><FontAwesomeIcon icon="quote-left" /> faQuoteLeft</Button></td><td>quote-left</td></tr>
                  <tr><td><FontAwesomeIcon icon="quote-right" /></td><td><Button variant="primary"><FontAwesomeIcon icon="quote-right" /> faQuoteRight</Button></td><td>quote-right</td></tr>
                  <tr><td><FontAwesomeIcon icon="quran" /></td><td><Button variant="primary"><FontAwesomeIcon icon="quran" /> faQuran</Button></td><td>quran</td></tr>
                  <tr><td><FontAwesomeIcon icon="radiation" /></td><td><Button variant="primary"><FontAwesomeIcon icon="radiation" /> faRadiation</Button></td><td>radiation</td></tr>
                  <tr><td><FontAwesomeIcon icon="radiation-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="radiation-alt" /> faRadiationAlt</Button></td><td>radiation-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="rainbow" /></td><td><Button variant="primary"><FontAwesomeIcon icon="rainbow" /> faRainbow</Button></td><td>rainbow</td></tr>
                  <tr><td><FontAwesomeIcon icon="random" /></td><td><Button variant="primary"><FontAwesomeIcon icon="random" /> faRandom</Button></td><td>random</td></tr>
                  <tr><td><FontAwesomeIcon icon="receipt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="receipt" /> faReceipt</Button></td><td>receipt</td></tr>
                  <tr><td><FontAwesomeIcon icon="record-vinyl" /></td><td><Button variant="primary"><FontAwesomeIcon icon="record-vinyl" /> faRecordVinyl</Button></td><td>record-vinyl</td></tr>
                  <tr><td><FontAwesomeIcon icon="recycle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="recycle" /> faRecycle</Button></td><td>recycle</td></tr>
                  <tr><td><FontAwesomeIcon icon="redo" /></td><td><Button variant="primary"><FontAwesomeIcon icon="redo" /> faRedo</Button></td><td>redo</td></tr>
                  <tr><td><FontAwesomeIcon icon="redo-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="redo-alt" /> faRedoAlt</Button></td><td>redo-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="registered" /></td><td><Button variant="primary"><FontAwesomeIcon icon="registered" /> faRegistered</Button></td><td>registered</td></tr>
                  <tr><td><FontAwesomeIcon icon="remove-format" /></td><td><Button variant="primary"><FontAwesomeIcon icon="remove-format" /> faRemoveFormat</Button></td><td>remove-format</td></tr>
                  <tr><td><FontAwesomeIcon icon="reply" /></td><td><Button variant="primary"><FontAwesomeIcon icon="reply" /> faReply</Button></td><td>reply</td></tr>
                  <tr><td><FontAwesomeIcon icon="reply-all" /></td><td><Button variant="primary"><FontAwesomeIcon icon="reply-all" /> faReplyAll</Button></td><td>reply-all</td></tr>
                  <tr><td><FontAwesomeIcon icon="republican" /></td><td><Button variant="primary"><FontAwesomeIcon icon="republican" /> faRepublican</Button></td><td>republican</td></tr>
                  <tr><td><FontAwesomeIcon icon="restroom" /></td><td><Button variant="primary"><FontAwesomeIcon icon="restroom" /> faRestroom</Button></td><td>restroom</td></tr>
                  <tr><td><FontAwesomeIcon icon="retweet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="retweet" /> faRetweet</Button></td><td>retweet</td></tr>
                  <tr><td><FontAwesomeIcon icon="ribbon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ribbon" /> faRibbon</Button></td><td>ribbon</td></tr>
                  <tr><td><FontAwesomeIcon icon="ring" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ring" /> faRing</Button></td><td>ring</td></tr>
                  <tr><td><FontAwesomeIcon icon="road" /></td><td><Button variant="primary"><FontAwesomeIcon icon="road" /> faRoad</Button></td><td>road</td></tr>
                  <tr><td><FontAwesomeIcon icon="robot" /></td><td><Button variant="primary"><FontAwesomeIcon icon="robot" /> faRobot</Button></td><td>robot</td></tr>
                  <tr><td><FontAwesomeIcon icon="rocket" /></td><td><Button variant="primary"><FontAwesomeIcon icon="rocket" /> faRocket</Button></td><td>rocket</td></tr>
                  <tr><td><FontAwesomeIcon icon="route" /></td><td><Button variant="primary"><FontAwesomeIcon icon="route" /> faRoute</Button></td><td>route</td></tr>
                  <tr><td><FontAwesomeIcon icon="rss" /></td><td><Button variant="primary"><FontAwesomeIcon icon="rss" /> faRss</Button></td><td>rss</td></tr>
                  <tr><td><FontAwesomeIcon icon="rss-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="rss-square" /> faRssSquare</Button></td><td>rss-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="ruble-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ruble-sign" /> faRubleSign</Button></td><td>ruble-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="ruler" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ruler" /> faRuler</Button></td><td>ruler</td></tr>
                  <tr><td><FontAwesomeIcon icon="ruler-combined" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ruler-combined" /> faRulerCombined</Button></td><td>ruler-combined</td></tr>
                  <tr><td><FontAwesomeIcon icon="ruler-horizontal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ruler-horizontal" /> faRulerHorizontal</Button></td><td>ruler-horizontal</td></tr>
                  <tr><td><FontAwesomeIcon icon="ruler-vertical" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ruler-vertical" /> faRulerVertical</Button></td><td>ruler-vertical</td></tr>
                  <tr><td><FontAwesomeIcon icon="running" /></td><td><Button variant="primary"><FontAwesomeIcon icon="running" /> faRunning</Button></td><td>running</td></tr>
                  <tr><td><FontAwesomeIcon icon="rupee-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="rupee-sign" /> faRupeeSign</Button></td><td>rupee-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="sad-cry" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sad-cry" /> faSadCry</Button></td><td>sad-cry</td></tr>
                  <tr><td><FontAwesomeIcon icon="sad-tear" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sad-tear" /> faSadTear</Button></td><td>sad-tear</td></tr>
                  <tr><td><FontAwesomeIcon icon="satellite" /></td><td><Button variant="primary"><FontAwesomeIcon icon="satellite" /> faSatellite</Button></td><td>satellite</td></tr>
                  <tr><td><FontAwesomeIcon icon="satellite-dish" /></td><td><Button variant="primary"><FontAwesomeIcon icon="satellite-dish" /> faSatelliteDish</Button></td><td>satellite-dish</td></tr>
                  <tr><td><FontAwesomeIcon icon="save" /></td><td><Button variant="primary"><FontAwesomeIcon icon="save" /> faSave</Button></td><td>save</td></tr>
                  <tr><td><FontAwesomeIcon icon="school" /></td><td><Button variant="primary"><FontAwesomeIcon icon="school" /> faSchool</Button></td><td>school</td></tr>
                  <tr><td><FontAwesomeIcon icon="screwdriver" /></td><td><Button variant="primary"><FontAwesomeIcon icon="screwdriver" /> faScrewdriver</Button></td><td>screwdriver</td></tr>
                  <tr><td><FontAwesomeIcon icon="scroll" /></td><td><Button variant="primary"><FontAwesomeIcon icon="scroll" /> faScroll</Button></td><td>scroll</td></tr>
                  <tr><td><FontAwesomeIcon icon="sd-card" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sd-card" /> faSdCard</Button></td><td>sd-card</td></tr>
                  <tr><td><FontAwesomeIcon icon="search" /></td><td><Button variant="primary"><FontAwesomeIcon icon="search" /> faSearch</Button></td><td>search</td></tr>
                  <tr><td><FontAwesomeIcon icon="search-dollar" /></td><td><Button variant="primary"><FontAwesomeIcon icon="search-dollar" /> faSearchDollar</Button></td><td>search-dollar</td></tr>
                  <tr><td><FontAwesomeIcon icon="search-location" /></td><td><Button variant="primary"><FontAwesomeIcon icon="search-location" /> faSearchLocation</Button></td><td>search-location</td></tr>
                  <tr><td><FontAwesomeIcon icon="search-minus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="search-minus" /> faSearchMinus</Button></td><td>search-minus</td></tr>
                  <tr><td><FontAwesomeIcon icon="search-plus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="search-plus" /> faSearchPlus</Button></td><td>search-plus</td></tr>
                  <tr><td><FontAwesomeIcon icon="seedling" /></td><td><Button variant="primary"><FontAwesomeIcon icon="seedling" /> faSeedling</Button></td><td>seedling</td></tr>
                  <tr><td><FontAwesomeIcon icon="server" /></td><td><Button variant="primary"><FontAwesomeIcon icon="server" /> faServer</Button></td><td>server</td></tr>
                  <tr><td><FontAwesomeIcon icon="shapes" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shapes" /> faShapes</Button></td><td>shapes</td></tr>
                  <tr><td><FontAwesomeIcon icon="share" /></td><td><Button variant="primary"><FontAwesomeIcon icon="share" /> faShare</Button></td><td>share</td></tr>
                  <tr><td><FontAwesomeIcon icon="share-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="share-alt" /> faShareAlt</Button></td><td>share-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="share-alt-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="share-alt-square" /> faShareAltSquare</Button></td><td>share-alt-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="share-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="share-square" /> faShareSquare</Button></td><td>share-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="shekel-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shekel-sign" /> faShekelSign</Button></td><td>shekel-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="shield-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shield-alt" /> faShieldAlt</Button></td><td>shield-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="shield-virus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shield-virus" /> faShieldVirus</Button></td><td>shield-virus</td></tr>
                  <tr><td><FontAwesomeIcon icon="ship" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ship" /> faShip</Button></td><td>ship</td></tr>
                  <tr><td><FontAwesomeIcon icon="shipping-fast" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shipping-fast" /> faShippingFast</Button></td><td>shipping-fast</td></tr>
                  <tr><td><FontAwesomeIcon icon="shoe-prints" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shoe-prints" /> faShoePrints</Button></td><td>shoe-prints</td></tr>
                  <tr><td><FontAwesomeIcon icon="shopping-bag" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shopping-bag" /> faShoppingBag</Button></td><td>shopping-bag</td></tr>
                  <tr><td><FontAwesomeIcon icon="shopping-basket" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shopping-basket" /> faShoppingBasket</Button></td><td>shopping-basket</td></tr>
                  <tr><td><FontAwesomeIcon icon="shopping-cart" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shopping-cart" /> faShoppingCart</Button></td><td>shopping-cart</td></tr>
                  <tr><td><FontAwesomeIcon icon="shower" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shower" /> faShower</Button></td><td>shower</td></tr>
                  <tr><td><FontAwesomeIcon icon="shuttle-van" /></td><td><Button variant="primary"><FontAwesomeIcon icon="shuttle-van" /> faShuttleVan</Button></td><td>shuttle-van</td></tr>
                  <tr><td><FontAwesomeIcon icon="sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sign" /> faSign</Button></td><td>sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="sign-in-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sign-in-alt" /> faSignInAlt</Button></td><td>sign-in-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sign-language" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sign-language" /> faSignLanguage</Button></td><td>sign-language</td></tr>
                  <tr><td><FontAwesomeIcon icon="sign-out-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sign-out-alt" /> faSignOutAlt</Button></td><td>sign-out-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="signal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="signal" /> faSignal</Button></td><td>signal</td></tr>
                  <tr><td><FontAwesomeIcon icon="signature" /></td><td><Button variant="primary"><FontAwesomeIcon icon="signature" /> faSignature</Button></td><td>signature</td></tr>
                  <tr><td><FontAwesomeIcon icon="sim-card" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sim-card" /> faSimCard</Button></td><td>sim-card</td></tr>
                  <tr><td><FontAwesomeIcon icon="sink" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sink" /> faSink</Button></td><td>sink</td></tr>
                  <tr><td><FontAwesomeIcon icon="sitemap" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sitemap" /> faSitemap</Button></td><td>sitemap</td></tr>
                  <tr><td><FontAwesomeIcon icon="skating" /></td><td><Button variant="primary"><FontAwesomeIcon icon="skating" /> faSkating</Button></td><td>skating</td></tr>
                  <tr><td><FontAwesomeIcon icon="skiing" /></td><td><Button variant="primary"><FontAwesomeIcon icon="skiing" /> faSkiing</Button></td><td>skiing</td></tr>
                  <tr><td><FontAwesomeIcon icon="skiing-nordic" /></td><td><Button variant="primary"><FontAwesomeIcon icon="skiing-nordic" /> faSkiingNordic</Button></td><td>skiing-nordic</td></tr>
                  <tr><td><FontAwesomeIcon icon="skull" /></td><td><Button variant="primary"><FontAwesomeIcon icon="skull" /> faSkull</Button></td><td>skull</td></tr>
                  <tr><td><FontAwesomeIcon icon="skull-crossbones" /></td><td><Button variant="primary"><FontAwesomeIcon icon="skull-crossbones" /> faSkullCrossbones</Button></td><td>skull-crossbones</td></tr>
                  <tr><td><FontAwesomeIcon icon="slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="slash" /> faSlash</Button></td><td>slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="sleigh" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sleigh" /> faSleigh</Button></td><td>sleigh</td></tr>
                  <tr><td><FontAwesomeIcon icon="sliders-h" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sliders-h" /> faSlidersH</Button></td><td>sliders-h</td></tr>
                  <tr><td><FontAwesomeIcon icon="smile" /></td><td><Button variant="primary"><FontAwesomeIcon icon="smile" /> faSmile</Button></td><td>smile</td></tr>
                  <tr><td><FontAwesomeIcon icon="smile-beam" /></td><td><Button variant="primary"><FontAwesomeIcon icon="smile-beam" /> faSmileBeam</Button></td><td>smile-beam</td></tr>
                  <tr><td><FontAwesomeIcon icon="smile-wink" /></td><td><Button variant="primary"><FontAwesomeIcon icon="smile-wink" /> faSmileWink</Button></td><td>smile-wink</td></tr>
                  <tr><td><FontAwesomeIcon icon="smog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="smog" /> faSmog</Button></td><td>smog</td></tr>
                  <tr><td><FontAwesomeIcon icon="smoking" /></td><td><Button variant="primary"><FontAwesomeIcon icon="smoking" /> faSmoking</Button></td><td>smoking</td></tr>
                  <tr><td><FontAwesomeIcon icon="smoking-ban" /></td><td><Button variant="primary"><FontAwesomeIcon icon="smoking-ban" /> faSmokingBan</Button></td><td>smoking-ban</td></tr>
                  <tr><td><FontAwesomeIcon icon="sms" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sms" /> faSms</Button></td><td>sms</td></tr>
                  <tr><td><FontAwesomeIcon icon="snowboarding" /></td><td><Button variant="primary"><FontAwesomeIcon icon="snowboarding" /> faSnowboarding</Button></td><td>snowboarding</td></tr>
                  <tr><td><FontAwesomeIcon icon="snowflake" /></td><td><Button variant="primary"><FontAwesomeIcon icon="snowflake" /> faSnowflake</Button></td><td>snowflake</td></tr>
                  <tr><td><FontAwesomeIcon icon="snowman" /></td><td><Button variant="primary"><FontAwesomeIcon icon="snowman" /> faSnowman</Button></td><td>snowman</td></tr>
                  <tr><td><FontAwesomeIcon icon="snowplow" /></td><td><Button variant="primary"><FontAwesomeIcon icon="snowplow" /> faSnowplow</Button></td><td>snowplow</td></tr>
                  <tr><td><FontAwesomeIcon icon="soap" /></td><td><Button variant="primary"><FontAwesomeIcon icon="soap" /> faSoap</Button></td><td>soap</td></tr>
                  <tr><td><FontAwesomeIcon icon="socks" /></td><td><Button variant="primary"><FontAwesomeIcon icon="socks" /> faSocks</Button></td><td>socks</td></tr>
                  <tr><td><FontAwesomeIcon icon="solar-panel" /></td><td><Button variant="primary"><FontAwesomeIcon icon="solar-panel" /> faSolarPanel</Button></td><td>solar-panel</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort" /> faSort</Button></td><td>sort</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-alpha-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-alpha-down" /> faSortAlphaDown</Button></td><td>sort-alpha-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-alpha-down-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-alpha-down-alt" /> faSortAlphaDownAlt</Button></td><td>sort-alpha-down-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-alpha-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-alpha-up" /> faSortAlphaUp</Button></td><td>sort-alpha-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-alpha-up-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-alpha-up-alt" /> faSortAlphaUpAlt</Button></td><td>sort-alpha-up-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-amount-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-amount-down" /> faSortAmountDown</Button></td><td>sort-amount-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-amount-down-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-amount-down-alt" /> faSortAmountDownAlt</Button></td><td>sort-amount-down-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-amount-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-amount-up" /> faSortAmountUp</Button></td><td>sort-amount-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-amount-up-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-amount-up-alt" /> faSortAmountUpAlt</Button></td><td>sort-amount-up-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-down" /> faSortDown</Button></td><td>sort-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-numeric-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-numeric-down" /> faSortNumericDown</Button></td><td>sort-numeric-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-numeric-down-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-numeric-down-alt" /> faSortNumericDownAlt</Button></td><td>sort-numeric-down-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-numeric-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-numeric-up" /> faSortNumericUp</Button></td><td>sort-numeric-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-numeric-up-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-numeric-up-alt" /> faSortNumericUpAlt</Button></td><td>sort-numeric-up-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="sort-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sort-up" /> faSortUp</Button></td><td>sort-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="spa" /></td><td><Button variant="primary"><FontAwesomeIcon icon="spa" /> faSpa</Button></td><td>spa</td></tr>
                  <tr><td><FontAwesomeIcon icon="space-shuttle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="space-shuttle" /> faSpaceShuttle</Button></td><td>space-shuttle</td></tr>
                  <tr><td><FontAwesomeIcon icon="spell-check" /></td><td><Button variant="primary"><FontAwesomeIcon icon="spell-check" /> faSpellCheck</Button></td><td>spell-check</td></tr>
                  <tr><td><FontAwesomeIcon icon="spider" /></td><td><Button variant="primary"><FontAwesomeIcon icon="spider" /> faSpider</Button></td><td>spider</td></tr>
                  <tr><td><FontAwesomeIcon icon="spinner" /></td><td><Button variant="primary"><FontAwesomeIcon icon="spinner" /> faSpinner</Button></td><td>spinner</td></tr>
                  <tr><td><FontAwesomeIcon icon="splotch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="splotch" /> faSplotch</Button></td><td>splotch</td></tr>
                  <tr><td><FontAwesomeIcon icon="spray-can" /></td><td><Button variant="primary"><FontAwesomeIcon icon="spray-can" /> faSprayCan</Button></td><td>spray-can</td></tr>
                  <tr><td><FontAwesomeIcon icon="square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="square" /> faSquare</Button></td><td>square</td></tr>
                  <tr><td><FontAwesomeIcon icon="square-full" /></td><td><Button variant="primary"><FontAwesomeIcon icon="square-full" /> faSquareFull</Button></td><td>square-full</td></tr>
                  <tr><td><FontAwesomeIcon icon="square-root-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="square-root-alt" /> faSquareRootAlt</Button></td><td>square-root-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="stamp" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stamp" /> faStamp</Button></td><td>stamp</td></tr>
                  <tr><td><FontAwesomeIcon icon="star" /></td><td><Button variant="primary"><FontAwesomeIcon icon="star" /> faStar</Button></td><td>star</td></tr>
                  <tr><td><FontAwesomeIcon icon="star-and-crescent" /></td><td><Button variant="primary"><FontAwesomeIcon icon="star-and-crescent" /> faStarAndCrescent</Button></td><td>star-and-crescent</td></tr>
                  <tr><td><FontAwesomeIcon icon="star-half" /></td><td><Button variant="primary"><FontAwesomeIcon icon="star-half" /> faStarHalf</Button></td><td>star-half</td></tr>
                  <tr><td><FontAwesomeIcon icon="star-half-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="star-half-alt" /> faStarHalfAlt</Button></td><td>star-half-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="star-of-david" /></td><td><Button variant="primary"><FontAwesomeIcon icon="star-of-david" /> faStarOfDavid</Button></td><td>star-of-david</td></tr>
                  <tr><td><FontAwesomeIcon icon="star-of-life" /></td><td><Button variant="primary"><FontAwesomeIcon icon="star-of-life" /> faStarOfLife</Button></td><td>star-of-life</td></tr>
                  <tr><td><FontAwesomeIcon icon="step-backward" /></td><td><Button variant="primary"><FontAwesomeIcon icon="step-backward" /> faStepBackward</Button></td><td>step-backward</td></tr>
                  <tr><td><FontAwesomeIcon icon="step-forward" /></td><td><Button variant="primary"><FontAwesomeIcon icon="step-forward" /> faStepForward</Button></td><td>step-forward</td></tr>
                  <tr><td><FontAwesomeIcon icon="stethoscope" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stethoscope" /> faStethoscope</Button></td><td>stethoscope</td></tr>
                  <tr><td><FontAwesomeIcon icon="sticky-note" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sticky-note" /> faStickyNote</Button></td><td>sticky-note</td></tr>
                  <tr><td><FontAwesomeIcon icon="stop" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stop" /> faStop</Button></td><td>stop</td></tr>
                  <tr><td><FontAwesomeIcon icon="stop-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stop-circle" /> faStopCircle</Button></td><td>stop-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="stopwatch" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stopwatch" /> faStopwatch</Button></td><td>stopwatch</td></tr>
                  <tr><td><FontAwesomeIcon icon="stopwatch-20" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stopwatch-20" /> faStopwatch20</Button></td><td>stopwatch-20</td></tr>
                  <tr><td><FontAwesomeIcon icon="store" /></td><td><Button variant="primary"><FontAwesomeIcon icon="store" /> faStore</Button></td><td>store</td></tr>
                  <tr><td><FontAwesomeIcon icon="store-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="store-alt" /> faStoreAlt</Button></td><td>store-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="store-alt-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="store-alt-slash" /> faStoreAltSlash</Button></td><td>store-alt-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="store-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="store-slash" /> faStoreSlash</Button></td><td>store-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="stream" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stream" /> faStream</Button></td><td>stream</td></tr>
                  <tr><td><FontAwesomeIcon icon="street-view" /></td><td><Button variant="primary"><FontAwesomeIcon icon="street-view" /> faStreetView</Button></td><td>street-view</td></tr>
                  <tr><td><FontAwesomeIcon icon="strikethrough" /></td><td><Button variant="primary"><FontAwesomeIcon icon="strikethrough" /> faStrikethrough</Button></td><td>strikethrough</td></tr>
                  <tr><td><FontAwesomeIcon icon="stroopwafel" /></td><td><Button variant="primary"><FontAwesomeIcon icon="stroopwafel" /> faStroopwafel</Button></td><td>stroopwafel</td></tr>
                  <tr><td><FontAwesomeIcon icon="subscript" /></td><td><Button variant="primary"><FontAwesomeIcon icon="subscript" /> faSubscript</Button></td><td>subscript</td></tr>
                  <tr><td><FontAwesomeIcon icon="subway" /></td><td><Button variant="primary"><FontAwesomeIcon icon="subway" /> faSubway</Button></td><td>subway</td></tr>
                  <tr><td><FontAwesomeIcon icon="suitcase" /></td><td><Button variant="primary"><FontAwesomeIcon icon="suitcase" /> faSuitcase</Button></td><td>suitcase</td></tr>
                  <tr><td><FontAwesomeIcon icon="suitcase-rolling" /></td><td><Button variant="primary"><FontAwesomeIcon icon="suitcase-rolling" /> faSuitcaseRolling</Button></td><td>suitcase-rolling</td></tr>
                  <tr><td><FontAwesomeIcon icon="sun" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sun" /> faSun</Button></td><td>sun</td></tr>
                  <tr><td><FontAwesomeIcon icon="superscript" /></td><td><Button variant="primary"><FontAwesomeIcon icon="superscript" /> faSuperscript</Button></td><td>superscript</td></tr>
                  <tr><td><FontAwesomeIcon icon="surprise" /></td><td><Button variant="primary"><FontAwesomeIcon icon="surprise" /> faSurprise</Button></td><td>surprise</td></tr>
                  <tr><td><FontAwesomeIcon icon="swatchbook" /></td><td><Button variant="primary"><FontAwesomeIcon icon="swatchbook" /> faSwatchbook</Button></td><td>swatchbook</td></tr>
                  <tr><td><FontAwesomeIcon icon="swimmer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="swimmer" /> faSwimmer</Button></td><td>swimmer</td></tr>
                  <tr><td><FontAwesomeIcon icon="swimming-pool" /></td><td><Button variant="primary"><FontAwesomeIcon icon="swimming-pool" /> faSwimmingPool</Button></td><td>swimming-pool</td></tr>
                  <tr><td><FontAwesomeIcon icon="synagogue" /></td><td><Button variant="primary"><FontAwesomeIcon icon="synagogue" /> faSynagogue</Button></td><td>synagogue</td></tr>
                  <tr><td><FontAwesomeIcon icon="sync" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sync" /> faSync</Button></td><td>sync</td></tr>
                  <tr><td><FontAwesomeIcon icon="sync-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="sync-alt" /> faSyncAlt</Button></td><td>sync-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="syringe" /></td><td><Button variant="primary"><FontAwesomeIcon icon="syringe" /> faSyringe</Button></td><td>syringe</td></tr>
                  <tr><td><FontAwesomeIcon icon="table" /></td><td><Button variant="primary"><FontAwesomeIcon icon="table" /> faTable</Button></td><td>table</td></tr>
                  <tr><td><FontAwesomeIcon icon="table-tennis" /></td><td><Button variant="primary"><FontAwesomeIcon icon="table-tennis" /> faTableTennis</Button></td><td>table-tennis</td></tr>
                  <tr><td><FontAwesomeIcon icon="tablet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tablet" /> faTablet</Button></td><td>tablet</td></tr>
                  <tr><td><FontAwesomeIcon icon="tablet-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tablet-alt" /> faTabletAlt</Button></td><td>tablet-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="tablets" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tablets" /> faTablets</Button></td><td>tablets</td></tr>
                  <tr><td><FontAwesomeIcon icon="tachometer-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tachometer-alt" /> faTachometerAlt</Button></td><td>tachometer-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="tag" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tag" /> faTag</Button></td><td>tag</td></tr>
                  <tr><td><FontAwesomeIcon icon="tags" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tags" /> faTags</Button></td><td>tags</td></tr>
                  <tr><td><FontAwesomeIcon icon="tape" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tape" /> faTape</Button></td><td>tape</td></tr>
                  <tr><td><FontAwesomeIcon icon="tasks" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tasks" /> faTasks</Button></td><td>tasks</td></tr>
                  <tr><td><FontAwesomeIcon icon="taxi" /></td><td><Button variant="primary"><FontAwesomeIcon icon="taxi" /> faTaxi</Button></td><td>taxi</td></tr>
                  <tr><td><FontAwesomeIcon icon="teeth" /></td><td><Button variant="primary"><FontAwesomeIcon icon="teeth" /> faTeeth</Button></td><td>teeth</td></tr>
                  <tr><td><FontAwesomeIcon icon="teeth-open" /></td><td><Button variant="primary"><FontAwesomeIcon icon="teeth-open" /> faTeethOpen</Button></td><td>teeth-open</td></tr>
                  <tr><td><FontAwesomeIcon icon="temperature-high" /></td><td><Button variant="primary"><FontAwesomeIcon icon="temperature-high" /> faTemperatureHigh</Button></td><td>temperature-high</td></tr>
                  <tr><td><FontAwesomeIcon icon="temperature-low" /></td><td><Button variant="primary"><FontAwesomeIcon icon="temperature-low" /> faTemperatureLow</Button></td><td>temperature-low</td></tr>
                  <tr><td><FontAwesomeIcon icon="tenge" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tenge" /> faTenge</Button></td><td>tenge</td></tr>
                  <tr><td><FontAwesomeIcon icon="terminal" /></td><td><Button variant="primary"><FontAwesomeIcon icon="terminal" /> faTerminal</Button></td><td>terminal</td></tr>
                  <tr><td><FontAwesomeIcon icon="text-height" /></td><td><Button variant="primary"><FontAwesomeIcon icon="text-height" /> faTextHeight</Button></td><td>text-height</td></tr>
                  <tr><td><FontAwesomeIcon icon="text-width" /></td><td><Button variant="primary"><FontAwesomeIcon icon="text-width" /> faTextWidth</Button></td><td>text-width</td></tr>
                  <tr><td><FontAwesomeIcon icon="th" /></td><td><Button variant="primary"><FontAwesomeIcon icon="th" /> faTh</Button></td><td>th</td></tr>
                  <tr><td><FontAwesomeIcon icon="th-large" /></td><td><Button variant="primary"><FontAwesomeIcon icon="th-large" /> faThLarge</Button></td><td>th-large</td></tr>
                  <tr><td><FontAwesomeIcon icon="th-list" /></td><td><Button variant="primary"><FontAwesomeIcon icon="th-list" /> faThList</Button></td><td>th-list</td></tr>
                  <tr><td><FontAwesomeIcon icon="theater-masks" /></td><td><Button variant="primary"><FontAwesomeIcon icon="theater-masks" /> faTheaterMasks</Button></td><td>theater-masks</td></tr>
                  <tr><td><FontAwesomeIcon icon="thermometer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thermometer" /> faThermometer</Button></td><td>thermometer</td></tr>
                  <tr><td><FontAwesomeIcon icon="thermometer-empty" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thermometer-empty" /> faThermometerEmpty</Button></td><td>thermometer-empty</td></tr>
                  <tr><td><FontAwesomeIcon icon="thermometer-full" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thermometer-full" /> faThermometerFull</Button></td><td>thermometer-full</td></tr>
                  <tr><td><FontAwesomeIcon icon="thermometer-half" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thermometer-half" /> faThermometerHalf</Button></td><td>thermometer-half</td></tr>
                  <tr><td><FontAwesomeIcon icon="thermometer-quarter" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thermometer-quarter" /> faThermometerQuarter</Button></td><td>thermometer-quarter</td></tr>
                  <tr><td><FontAwesomeIcon icon="thermometer-three-quarters" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thermometer-three-quarters" /> faThermometerThreeQuarters</Button></td><td>thermometer-three-quarters</td></tr>
                  <tr><td><FontAwesomeIcon icon="thumbs-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thumbs-down" /> faThumbsDown</Button></td><td>thumbs-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="thumbs-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thumbs-up" /> faThumbsUp</Button></td><td>thumbs-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="thumbtack" /></td><td><Button variant="primary"><FontAwesomeIcon icon="thumbtack" /> faThumbtack</Button></td><td>thumbtack</td></tr>
                  <tr><td><FontAwesomeIcon icon="ticket-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="ticket-alt" /> faTicketAlt</Button></td><td>ticket-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="times" /></td><td><Button variant="primary"><FontAwesomeIcon icon="times" /> faTimes</Button></td><td>times</td></tr>
                  <tr><td><FontAwesomeIcon icon="times-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="times-circle" /> faTimesCircle</Button></td><td>times-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="tint" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tint" /> faTint</Button></td><td>tint</td></tr>
                  <tr><td><FontAwesomeIcon icon="tint-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tint-slash" /> faTintSlash</Button></td><td>tint-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="tired" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tired" /> faTired</Button></td><td>tired</td></tr>
                  <tr><td><FontAwesomeIcon icon="toggle-off" /></td><td><Button variant="primary"><FontAwesomeIcon icon="toggle-off" /> faToggleOff</Button></td><td>toggle-off</td></tr>
                  <tr><td><FontAwesomeIcon icon="toggle-on" /></td><td><Button variant="primary"><FontAwesomeIcon icon="toggle-on" /> faToggleOn</Button></td><td>toggle-on</td></tr>
                  <tr><td><FontAwesomeIcon icon="toilet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="toilet" /> faToilet</Button></td><td>toilet</td></tr>
                  <tr><td><FontAwesomeIcon icon="toilet-paper" /></td><td><Button variant="primary"><FontAwesomeIcon icon="toilet-paper" /> faToiletPaper</Button></td><td>toilet-paper</td></tr>
                  <tr><td><FontAwesomeIcon icon="toilet-paper-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="toilet-paper-slash" /> faToiletPaperSlash</Button></td><td>toilet-paper-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="toolbox" /></td><td><Button variant="primary"><FontAwesomeIcon icon="toolbox" /> faToolbox</Button></td><td>toolbox</td></tr>
                  <tr><td><FontAwesomeIcon icon="tools" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tools" /> faTools</Button></td><td>tools</td></tr>
                  <tr><td><FontAwesomeIcon icon="tooth" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tooth" /> faTooth</Button></td><td>tooth</td></tr>
                  <tr><td><FontAwesomeIcon icon="torah" /></td><td><Button variant="primary"><FontAwesomeIcon icon="torah" /> faTorah</Button></td><td>torah</td></tr>
                  <tr><td><FontAwesomeIcon icon="torii-gate" /></td><td><Button variant="primary"><FontAwesomeIcon icon="torii-gate" /> faToriiGate</Button></td><td>torii-gate</td></tr>
                  <tr><td><FontAwesomeIcon icon="tractor" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tractor" /> faTractor</Button></td><td>tractor</td></tr>
                  <tr><td><FontAwesomeIcon icon="trademark" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trademark" /> faTrademark</Button></td><td>trademark</td></tr>
                  <tr><td><FontAwesomeIcon icon="traffic-light" /></td><td><Button variant="primary"><FontAwesomeIcon icon="traffic-light" /> faTrafficLight</Button></td><td>traffic-light</td></tr>
                  <tr><td><FontAwesomeIcon icon="trailer" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trailer" /> faTrailer</Button></td><td>trailer</td></tr>
                  <tr><td><FontAwesomeIcon icon="train" /></td><td><Button variant="primary"><FontAwesomeIcon icon="train" /> faTrain</Button></td><td>train</td></tr>
                  <tr><td><FontAwesomeIcon icon="tram" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tram" /> faTram</Button></td><td>tram</td></tr>
                  <tr><td><FontAwesomeIcon icon="transgender" /></td><td><Button variant="primary"><FontAwesomeIcon icon="transgender" /> faTransgender</Button></td><td>transgender</td></tr>
                  <tr><td><FontAwesomeIcon icon="transgender-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="transgender-alt" /> faTransgenderAlt</Button></td><td>transgender-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="trash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trash" /> faTrash</Button></td><td>trash</td></tr>
                  <tr><td><FontAwesomeIcon icon="trash-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trash-alt" /> faTrashAlt</Button></td><td>trash-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="trash-restore" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trash-restore" /> faTrashRestore</Button></td><td>trash-restore</td></tr>
                  <tr><td><FontAwesomeIcon icon="trash-restore-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trash-restore-alt" /> faTrashRestoreAlt</Button></td><td>trash-restore-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="tree" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tree" /> faTree</Button></td><td>tree</td></tr>
                  <tr><td><FontAwesomeIcon icon="trophy" /></td><td><Button variant="primary"><FontAwesomeIcon icon="trophy" /> faTrophy</Button></td><td>trophy</td></tr>
                  <tr><td><FontAwesomeIcon icon="truck" /></td><td><Button variant="primary"><FontAwesomeIcon icon="truck" /> faTruck</Button></td><td>truck</td></tr>
                  <tr><td><FontAwesomeIcon icon="truck-loading" /></td><td><Button variant="primary"><FontAwesomeIcon icon="truck-loading" /> faTruckLoading</Button></td><td>truck-loading</td></tr>
                  <tr><td><FontAwesomeIcon icon="truck-monster" /></td><td><Button variant="primary"><FontAwesomeIcon icon="truck-monster" /> faTruckMonster</Button></td><td>truck-monster</td></tr>
                  <tr><td><FontAwesomeIcon icon="truck-moving" /></td><td><Button variant="primary"><FontAwesomeIcon icon="truck-moving" /> faTruckMoving</Button></td><td>truck-moving</td></tr>
                  <tr><td><FontAwesomeIcon icon="truck-pickup" /></td><td><Button variant="primary"><FontAwesomeIcon icon="truck-pickup" /> faTruckPickup</Button></td><td>truck-pickup</td></tr>
                  <tr><td><FontAwesomeIcon icon="tshirt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tshirt" /> faTshirt</Button></td><td>tshirt</td></tr>
                  <tr><td><FontAwesomeIcon icon="tty" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tty" /> faTty</Button></td><td>tty</td></tr>
                  <tr><td><FontAwesomeIcon icon="tv" /></td><td><Button variant="primary"><FontAwesomeIcon icon="tv" /> faTv</Button></td><td>tv</td></tr>
                  <tr><td><FontAwesomeIcon icon="umbrella" /></td><td><Button variant="primary"><FontAwesomeIcon icon="umbrella" /> faUmbrella</Button></td><td>umbrella</td></tr>
                  <tr><td><FontAwesomeIcon icon="umbrella-beach" /></td><td><Button variant="primary"><FontAwesomeIcon icon="umbrella-beach" /> faUmbrellaBeach</Button></td><td>umbrella-beach</td></tr>
                  <tr><td><FontAwesomeIcon icon="underline" /></td><td><Button variant="primary"><FontAwesomeIcon icon="underline" /> faUnderline</Button></td><td>underline</td></tr>
                  <tr><td><FontAwesomeIcon icon="undo" /></td><td><Button variant="primary"><FontAwesomeIcon icon="undo" /> faUndo</Button></td><td>undo</td></tr>
                  <tr><td><FontAwesomeIcon icon="undo-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="undo-alt" /> faUndoAlt</Button></td><td>undo-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="universal-access" /></td><td><Button variant="primary"><FontAwesomeIcon icon="universal-access" /> faUniversalAccess</Button></td><td>universal-access</td></tr>
                  <tr><td><FontAwesomeIcon icon="university" /></td><td><Button variant="primary"><FontAwesomeIcon icon="university" /> faUniversity</Button></td><td>university</td></tr>
                  <tr><td><FontAwesomeIcon icon="unlink" /></td><td><Button variant="primary"><FontAwesomeIcon icon="unlink" /> faUnlink</Button></td><td>unlink</td></tr>
                  <tr><td><FontAwesomeIcon icon="unlock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="unlock" /> faUnlock</Button></td><td>unlock</td></tr>
                  <tr><td><FontAwesomeIcon icon="unlock-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="unlock-alt" /> faUnlockAlt</Button></td><td>unlock-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="upload" /></td><td><Button variant="primary"><FontAwesomeIcon icon="upload" /> faUpload</Button></td><td>upload</td></tr>
                  <tr><td><FontAwesomeIcon icon="user" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user" /> faUser</Button></td><td>user</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-alt" /> faUserAlt</Button></td><td>user-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-alt-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-alt-slash" /> faUserAltSlash</Button></td><td>user-alt-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-astronaut" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-astronaut" /> faUserAstronaut</Button></td><td>user-astronaut</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-check" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-check" /> faUserCheck</Button></td><td>user-check</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-circle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-circle" /> faUserCircle</Button></td><td>user-circle</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-clock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-clock" /> faUserClock</Button></td><td>user-clock</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-cog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-cog" /> faUserCog</Button></td><td>user-cog</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-edit" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-edit" /> faUserEdit</Button></td><td>user-edit</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-friends" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-friends" /> faUserFriends</Button></td><td>user-friends</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-graduate" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-graduate" /> faUserGraduate</Button></td><td>user-graduate</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-injured" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-injured" /> faUserInjured</Button></td><td>user-injured</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-lock" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-lock" /> faUserLock</Button></td><td>user-lock</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-md" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-md" /> faUserMd</Button></td><td>user-md</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-minus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-minus" /> faUserMinus</Button></td><td>user-minus</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-ninja" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-ninja" /> faUserNinja</Button></td><td>user-ninja</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-nurse" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-nurse" /> faUserNurse</Button></td><td>user-nurse</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-plus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-plus" /> faUserPlus</Button></td><td>user-plus</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-secret" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-secret" /> faUserSecret</Button></td><td>user-secret</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-shield" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-shield" /> faUserShield</Button></td><td>user-shield</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-slash" /> faUserSlash</Button></td><td>user-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-tag" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-tag" /> faUserTag</Button></td><td>user-tag</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-tie" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-tie" /> faUserTie</Button></td><td>user-tie</td></tr>
                  <tr><td><FontAwesomeIcon icon="user-times" /></td><td><Button variant="primary"><FontAwesomeIcon icon="user-times" /> faUserTimes</Button></td><td>user-times</td></tr>
                  <tr><td><FontAwesomeIcon icon="users" /></td><td><Button variant="primary"><FontAwesomeIcon icon="users" /> faUsers</Button></td><td>users</td></tr>
                  <tr><td><FontAwesomeIcon icon="users-cog" /></td><td><Button variant="primary"><FontAwesomeIcon icon="users-cog" /> faUsersCog</Button></td><td>users-cog</td></tr>
                  <tr><td><FontAwesomeIcon icon="users-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="users-slash" /> faUsersSlash</Button></td><td>users-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="utensil-spoon" /></td><td><Button variant="primary"><FontAwesomeIcon icon="utensil-spoon" /> faUtensilSpoon</Button></td><td>utensil-spoon</td></tr>
                  <tr><td><FontAwesomeIcon icon="utensils" /></td><td><Button variant="primary"><FontAwesomeIcon icon="utensils" /> faUtensils</Button></td><td>utensils</td></tr>
                  <tr><td><FontAwesomeIcon icon="vector-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vector-square" /> faVectorSquare</Button></td><td>vector-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="venus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="venus" /> faVenus</Button></td><td>venus</td></tr>
                  <tr><td><FontAwesomeIcon icon="venus-double" /></td><td><Button variant="primary"><FontAwesomeIcon icon="venus-double" /> faVenusDouble</Button></td><td>venus-double</td></tr>
                  <tr><td><FontAwesomeIcon icon="venus-mars" /></td><td><Button variant="primary"><FontAwesomeIcon icon="venus-mars" /> faVenusMars</Button></td><td>venus-mars</td></tr>
                  <tr><td><FontAwesomeIcon icon="vest" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vest" /> faVest</Button></td><td>vest</td></tr>
                  <tr><td><FontAwesomeIcon icon="vest-patches" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vest-patches" /> faVestPatches</Button></td><td>vest-patches</td></tr>
                  <tr><td><FontAwesomeIcon icon="vial" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vial" /> faVial</Button></td><td>vial</td></tr>
                  <tr><td><FontAwesomeIcon icon="vials" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vials" /> faVials</Button></td><td>vials</td></tr>
                  <tr><td><FontAwesomeIcon icon="video" /></td><td><Button variant="primary"><FontAwesomeIcon icon="video" /> faVideo</Button></td><td>video</td></tr>
                  <tr><td><FontAwesomeIcon icon="video-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="video-slash" /> faVideoSlash</Button></td><td>video-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="vihara" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vihara" /> faVihara</Button></td><td>vihara</td></tr>
                  <tr><td><FontAwesomeIcon icon="virus" /></td><td><Button variant="primary"><FontAwesomeIcon icon="virus" /> faVirus</Button></td><td>virus</td></tr>
                  <tr><td><FontAwesomeIcon icon="virus-slash" /></td><td><Button variant="primary"><FontAwesomeIcon icon="virus-slash" /> faVirusSlash</Button></td><td>virus-slash</td></tr>
                  <tr><td><FontAwesomeIcon icon="viruses" /></td><td><Button variant="primary"><FontAwesomeIcon icon="viruses" /> faViruses</Button></td><td>viruses</td></tr>
                  <tr><td><FontAwesomeIcon icon="voicemail" /></td><td><Button variant="primary"><FontAwesomeIcon icon="voicemail" /> faVoicemail</Button></td><td>voicemail</td></tr>
                  <tr><td><FontAwesomeIcon icon="volleyball-ball" /></td><td><Button variant="primary"><FontAwesomeIcon icon="volleyball-ball" /> faVolleyballBall</Button></td><td>volleyball-ball</td></tr>
                  <tr><td><FontAwesomeIcon icon="volume-down" /></td><td><Button variant="primary"><FontAwesomeIcon icon="volume-down" /> faVolumeDown</Button></td><td>volume-down</td></tr>
                  <tr><td><FontAwesomeIcon icon="volume-mute" /></td><td><Button variant="primary"><FontAwesomeIcon icon="volume-mute" /> faVolumeMute</Button></td><td>volume-mute</td></tr>
                  <tr><td><FontAwesomeIcon icon="volume-off" /></td><td><Button variant="primary"><FontAwesomeIcon icon="volume-off" /> faVolumeOff</Button></td><td>volume-off</td></tr>
                  <tr><td><FontAwesomeIcon icon="volume-up" /></td><td><Button variant="primary"><FontAwesomeIcon icon="volume-up" /> faVolumeUp</Button></td><td>volume-up</td></tr>
                  <tr><td><FontAwesomeIcon icon="vote-yea" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vote-yea" /> faVoteYea</Button></td><td>vote-yea</td></tr>
                  <tr><td><FontAwesomeIcon icon="vr-cardboard" /></td><td><Button variant="primary"><FontAwesomeIcon icon="vr-cardboard" /> faVrCardboard</Button></td><td>vr-cardboard</td></tr>
                  <tr><td><FontAwesomeIcon icon="walking" /></td><td><Button variant="primary"><FontAwesomeIcon icon="walking" /> faWalking</Button></td><td>walking</td></tr>
                  <tr><td><FontAwesomeIcon icon="wallet" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wallet" /> faWallet</Button></td><td>wallet</td></tr>
                  <tr><td><FontAwesomeIcon icon="warehouse" /></td><td><Button variant="primary"><FontAwesomeIcon icon="warehouse" /> faWarehouse</Button></td><td>warehouse</td></tr>
                  <tr><td><FontAwesomeIcon icon="water" /></td><td><Button variant="primary"><FontAwesomeIcon icon="water" /> faWater</Button></td><td>water</td></tr>
                  <tr><td><FontAwesomeIcon icon="wave-square" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wave-square" /> faWaveSquare</Button></td><td>wave-square</td></tr>
                  <tr><td><FontAwesomeIcon icon="weight" /></td><td><Button variant="primary"><FontAwesomeIcon icon="weight" /> faWeight</Button></td><td>weight</td></tr>
                  <tr><td><FontAwesomeIcon icon="weight-hanging" /></td><td><Button variant="primary"><FontAwesomeIcon icon="weight-hanging" /> faWeightHanging</Button></td><td>weight-hanging</td></tr>
                  <tr><td><FontAwesomeIcon icon="wheelchair" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wheelchair" /> faWheelchair</Button></td><td>wheelchair</td></tr>
                  <tr><td><FontAwesomeIcon icon="wifi" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wifi" /> faWifi</Button></td><td>wifi</td></tr>
                  <tr><td><FontAwesomeIcon icon="wind" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wind" /> faWind</Button></td><td>wind</td></tr>
                  <tr><td><FontAwesomeIcon icon="window-close" /></td><td><Button variant="primary"><FontAwesomeIcon icon="window-close" /> faWindowClose</Button></td><td>window-close</td></tr>
                  <tr><td><FontAwesomeIcon icon="window-maximize" /></td><td><Button variant="primary"><FontAwesomeIcon icon="window-maximize" /> faWindowMaximize</Button></td><td>window-maximize</td></tr>
                  <tr><td><FontAwesomeIcon icon="window-minimize" /></td><td><Button variant="primary"><FontAwesomeIcon icon="window-minimize" /> faWindowMinimize</Button></td><td>window-minimize</td></tr>
                  <tr><td><FontAwesomeIcon icon="window-restore" /></td><td><Button variant="primary"><FontAwesomeIcon icon="window-restore" /> faWindowRestore</Button></td><td>window-restore</td></tr>
                  <tr><td><FontAwesomeIcon icon="wine-bottle" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wine-bottle" /> faWineBottle</Button></td><td>wine-bottle</td></tr>
                  <tr><td><FontAwesomeIcon icon="wine-glass" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wine-glass" /> faWineGlass</Button></td><td>wine-glass</td></tr>
                  <tr><td><FontAwesomeIcon icon="wine-glass-alt" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wine-glass-alt" /> faWineGlassAlt</Button></td><td>wine-glass-alt</td></tr>
                  <tr><td><FontAwesomeIcon icon="won-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="won-sign" /> faWonSign</Button></td><td>won-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="wrench" /></td><td><Button variant="primary"><FontAwesomeIcon icon="wrench" /> faWrench</Button></td><td>wrench</td></tr>
                  <tr><td><FontAwesomeIcon icon="x-ray" /></td><td><Button variant="primary"><FontAwesomeIcon icon="x-ray" /> faXRay</Button></td><td>x-ray</td></tr>
                  <tr><td><FontAwesomeIcon icon="yen-sign" /></td><td><Button variant="primary"><FontAwesomeIcon icon="yen-sign" /> faYenSign</Button></td><td>yen-sign</td></tr>
                  <tr><td><FontAwesomeIcon icon="yin-yang" /></td><td><Button variant="primary"><FontAwesomeIcon icon="yin-yang" /> faYinYang</Button></td><td>yin-yang</td></tr>
                </tbody>
              </Table>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between mx-0">
                <Button variant="danger">
                  Cancel
                </Button>
                <Button variant="primary">
                  Save
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </ListGroup.Item>


      </ListGroup>
    )
  }
}

export default Message;
