import React, { Component } from 'react';
import { Table, Column } from '@blueprintjs/table';
import './orderbook.css';

class Orderbook extends Component {
  render () {
    return (
      <div class='orderbook'>
        <h2>Orderbook</h2>
        <table class='pt-table pt-striped pt-bordered centered table'>
          <thead>
            <tr>
              <th>ORDER HASH</th>
              <th>ZRX</th>
              <th>Rate</th>
              <th>WETH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0xA90WFEJJAFJ90A32FIJ3AFJI0I3</td>
              <td>100</td>
              <td>0.01</td>
              <td>1</td>
            </tr>
            <tr>
              <td>0xA90WFEJJAFJ90A32FIJ3AFJI0I3</td>
              <td>100</td>
              <td>0.01</td>
              <td>1</td>
            </tr>
            <tr>
              <td>0xA90WFEJJAFJ90A32FIJ3AFJI0I3</td>
              <td>100</td>
              <td>0.01</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orderbook;
