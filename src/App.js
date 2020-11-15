import React from 'react';
import './App.css';
import { Route, Switch ,Link, BrowserRouter as Router } from 'react-router-dom';
import Post from './components/Post';
import Category from './components/Category';
import NotFound from './components/404';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import store from './store';
import { Provider } from 'react-redux';

const configStore = store();

function App() {
  return (
    <Provider store={configStore}>
    <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="javascript:void(0)"><Link to='/'>React-CRUD</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='javascript:void(0)'><Link to='/'>Posts</Link></Nav.Link>
          <Nav.Link href='javascript:void(0)'><Link to='/category'>Category</Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
        <Route exact path="/" component={Post} />
        <Route path="/category" component={Category} />
        <Route component={NotFound} />
    </Switch>
  </Router>
  </Provider>
  );
}

export default App;
