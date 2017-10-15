import React, { Component } from 'react';
import logo from './logo.svg';

import { Link } from 'react-router-dom'
import './Header.css';

class Header extends Component {
  render () {
    return (
      <header className='header'>
        <h1 className='header-1'>Zero Exchange</h1>
        <img src={logo} className='App-logo' alt='logo' />
        <p className='content-1'> Swap your tokens instantly. </p>
        <p className='content-1'> <Link to="/set"> Check out Set Portfolios </Link> </p>
      </header>
    );
  }
}

export default Header;
