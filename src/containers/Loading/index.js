import React, { Component } from 'react';
import { Table, Column } from '@blueprintjs/table';
import './loading.css';

class Loading extends Component {
  render () {
    return (
      <div class='orderbook'>
        <h2>Loading Metamask</h2>
        <img className='metamask-logo' src='/metamask.png' />
      </div>
    );
  }
}

export default Loading;
