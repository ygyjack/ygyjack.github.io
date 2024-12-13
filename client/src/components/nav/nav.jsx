import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Dropdown, ButtonToolbar } from 'react-bootstrap';
import { useTranslation } from "react-i18next"; // TRANSLATION IN HOOKS
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './../../services/auth';
import images from '../../images/index.js';
import './nav.css';
import "react-datepicker/dist/react-datepicker.css";

export default function Navtop() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(Auth.checkToken());

  const logOut = () => {
    Auth.logout();
    navigate('/login');
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const user = Auth.checkToken();
    if (user === null) {
      logOut();
    } else {
      setLoggedIn(user);
    }
  }, []);

  return (
    <header>
      <ToastContainer />
      <Navbar bg={ loggedIn ? 'success' : 'secondary' } variant="dark">
        <Navbar.Brand href="/"><img src={images.logo} className="logo-height" /></Navbar.Brand>
        { loggedIn ? <Nav>
          <Link className="nav-link" to="/dashboard">Home</Link>
          <Link className="nav-link" to="/counter">{t('navtop.counter')}</Link>
          <Link className="nav-link" to="/message">{t('navtop.message')}</Link>
          <NavDropdown title={t('navtop.menu.expense.label')} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/expensesearch">{t('navtop.menu.expense.search')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/expenselist">{t('navtop.menu.expense.list')}</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={t('navtop.menu.functionality.label')} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/ticketserach">{t('navtop.menu.functionality.ticket')}</NavDropdown.Item>
            <NavDropdown.Item href="/tracklist">{t('navtop.menu.functionality.track')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/propertylist">{t('navtop.menu.functionality.property')}</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={t('navtop.menu.admin.label')} id="collasible-nav-dropdown">
            <NavDropdown.Item href="/userlist">{t('navtop.menu.admin.user')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/loglist">{t('navtop.menu.admin.log')}</NavDropdown.Item>
          </NavDropdown>
        </Nav> : <Nav>
          <Link className="nav-link" to="/">{t('navtop.home')}</Link>
          <Link className="nav-link" to="/validate">validate</Link>
        </Nav> }
        <Navbar.Brand href="/" className="mx-3"><FontAwesomeIcon icon="child" pulse /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Form className="d-flex px-2">
            <FormControl type="text" placeholder={t('navtop.search')} />
            <Button variant="outline-light"> <FontAwesomeIcon icon="search" /> </Button>
          </Form>
          <Dropdown className="p-0">
            <Dropdown.Toggle id="bg-nested-dropdown" variant="success">
              {t('navtop.language.label')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage('en')}><img src={images.uk} className="flag-height" /> {t('navtop.language.English')}</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('zh')}><img src={images.cn} className="flag-height" /> {t('navtop.language.Chinese')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ButtonToolbar className="px-2">
            { loggedIn ?
              <Button onClick={() => logOut()} variant="danger"> <FontAwesomeIcon icon="sign-out-alt" /> {t('navtop.signout')} </Button> :
              <Link className="btn btn-primary" to="/login"> <FontAwesomeIcon icon="sign-in-alt" /> {t('navtop.signin')} </Link>
            }
          </ButtonToolbar>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}