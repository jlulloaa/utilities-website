import React from 'react';
// Because I'm using them here, I have to import them from here, not in index.js
import {
  Routes,
  Route
} from 'react-router-dom';

import { BrowserRouter  as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './styles/App.css';

import NavBar from './components/navbar';
import WIP from './components/workinprogress';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Admin from './components/admin';

import About from './components/about';
import Footer from './components/footer';

function App() {
  return (
    <Container className="App">
      <Router>
          <h1> 
            <span> Home Utilities Management (HUM) </span>
            <span> <h3>Web application to manage utility bills</h3></span>        
          </h1>
        {/* Add the navigation bar */}
        <NavBar />
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path="/admin" exact element={<Admin/>} />
            <Route path="/about" exact element={<About/>} />
          </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
