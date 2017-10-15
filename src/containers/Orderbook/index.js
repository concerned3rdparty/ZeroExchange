import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from '@blueprintjs/core';
import { Table, Column } from '@blueprintjs/table';
import { connect } from 'react-redux';
import { initSockets } from '../../redux/orderbook';
import './orderbook.css';
import moment from 'moment';
const _ = require('lodash');

class Orderbook extends Component {
  componentWillMount () {
    this.props.initSockets();
    console.log('orders', this.props.orderbook);
  }

  render () {
    const { orders, trades, cancels } = this.props.orderbook;
    return (
      <div class='orderbook'>
        <h2>Open Orderbook</h2>
        <table class='pt-table pt-striped pt-bordered centered table'>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Sender</th>
              <th>ZRX</th>
              <th>Rate</th>
              <th>WETH</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) =>
              <tr key={index}>
                <td>{moment(order.expirationUnixTimestampSec.toNumber()).format('MMM Do YYYY - h:mm:ss a')}</td>
                <td>{order.maker}</td>
                <td>{order.makerTokenAmount.toString()}</td>
                <td>{order.makerTokenAmount.toNumber() / order.takerTokenAmount.toNumber()} ZRX/WETH</td>
                <td>{order.takerTokenAmount.toString()}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initSockets: () => initSockets(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Orderbook);
