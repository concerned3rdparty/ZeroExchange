import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';

class Header extends Component {
  render () {
    return (
      <header className='header'>
        <h1 className='header-1'>Zero Exchange</h1>
        <img src={logo} className='App-logo' alt='logo' />
        <p className='content-1'> Swap your tokens instantly. </p>
      </header>
    );
  }
}

export default Header;
