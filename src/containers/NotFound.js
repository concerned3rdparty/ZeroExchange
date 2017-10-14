import React, { Component } from 'react';
import Header from './Header';

class NotFound extends Component {
  render () {
    return (
      <div className="NotFound">
        <Header />
        <h1> Page Not Found </h1>
      </div>
    );
  }
}

export default NotFound;
