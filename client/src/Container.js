import React, { Component, useState } from "react";
import Counters from './components/counters';
import App from './App';
import Auth from './services/auth';
import Dashboard from './components/dashboard';
import Message from './components/message';
import Navtop from './components/nav/nav';
import Login from './components/login';
import Register from './components/register';
import PageNotFound from './components/ui/pagenotfound';
import Loglist from './components/log/loglist';
import Userlist from './components/user/userlist';
import Usersingle from './components/user/usersingle';
import Expenselist from './components/expense/expenselist';
import Expensesingle from './components/expense/expensesingle';
import Expensesearch from './components/expense/expensesearch';
import Tracklist from './components/flight/tracklist';
import Flightlist from './components/flight/flightlist';
import Ticketsearch from './components/flight/ticketsearch';
import Propertylist from './components/property/propertylist';
import Propertysingle from './components/property/propertysingle';

import Validate from './components/validate';
import AuthGoogle from './services/google';
import Loginhook from './components/loginhook';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function Container() {

  const [loggedIn, setLoggedIn] = useState(Auth.getAuthHeader());
  // const [payto, setPayto] = useState([]);
  // function handleLoggedIn(res) {
  //   if (res === false) {
  //     Auth.logout();
  //   }
  //   setLoggedIn(res);
  // };
  // function handlePayto(res) {
  //   setPayto(res);
  // };

  return (
    <Router>
      <Navtop />
      <Routes>

        <Route exact path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <App />} />

        {/* Test */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/message" element={<Message />} />
        <Route path="/counter" element={<Counters />} />
        <Route path="/validate" element={<Validate />} />

        <Route path="/auth/google" element={<AuthGoogle />} />

        <Route path="/loginhook" element={<Loginhook />} />

        {/* Login & Log */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loglist" element={<Loglist />} />

        {/* User */}
        <Route path="/userlist" element={<Userlist />} />
        <Route path="/usersingle/:id" element={<Usersingle />} />

        {/* Expense */}
        {/* <Route path="/expenselist" render={
          (props) => <Expenselist {...props} onLoggedIn={handleLoggedIn} onPayto={handlePayto} />
        } /> */}
        <Route path="/expenselist" element={<Expenselist />} />
        <Route path="/expensesingle/:id" element={<Expensesingle />} />
        <Route path="/expensesearch" element={<Expensesearch />} />

        {/* Flight */}
        <Route path="/tracklist" element={<Tracklist />} />
        <Route path="/flightlist/:id" element={<Flightlist />} />
        <Route path="/ticketserach" element={<Ticketsearch />} />
        
        {/* Property */}
        <Route path="/propertylist" element={<Propertylist />} />
        <Route path="/propertylist/:location" element={<Propertylist />} />
        <Route path="/propertysingle/:id" element={<Propertysingle />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default Container;
