import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="container navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Materiële Restwaarde Calculator</Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/history" className="nav-link">Historie</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="nav-link">Over</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}