import React, { Component } from 'react';
import {
  input,
  select,
  label,
  Icon,
  Button,
  Dialog,
  Intent,
  Classes,
  IBackdropProps,
  IOverlayableProps
} from '@blueprintjs/core';
import './Form.css';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import client from '../../helpers/socket';
const ZeroEx = require('0x.js').ZeroEx;
const BigNumber = require('bignumber.js');
var makerAddress = '';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      openModal: false,
      loading: false,
      makerAmount: '',
      takerAmount: ''
    };
    this.submitOrder = this.submitOrder.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  componentDidMount () {
    var self = this;
    window.web3.eth.getAccounts()
      .then(function (accounts) {
        makerAddress = accounts[0].toLowerCase();
        return window.zeroEx.token.getBalanceAsync('0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570', accounts[0].toLowerCase());
      })
      .then(function (balance) {
        var balance = balance.toNumber() / 1000;
        self.setState({ makerAmount: window.web3.utils.fromWei(balance, 'ether') });
      })
      .catch(function (err) {
        console.log('Failed to get balance', err);
      });
  }

  render () {
    const classes = classNames(Classes.CARD, Classes.ELEVATION_4, 'docs-overlay-example-transition', this.props.themeName);
    return (
      <div>
        <div class='form'>
          <div class='pt-card pt-elevation-0 pt-interactive'>
            <h5><a href='#'>ZRX</a></h5>
            <img src='/0x.png' />
          </div>
          <div class='form-arrow'>
            <Icon iconName='pt-icon-arrow-right' />
          </div>
          <div class='pt-card pt-elevation-0 pt-interactive'>
            <h5><a href='#'>WETH</a></h5>
            <img src='/ether.png' />
          </div>
        </div>
        <div class='form'>
          <div class='pt-form-group'>
            <label class='pt-label' for='makerAmount'>
              Amount Sent
            </label>
            <input id='makerAmount' value={this.state.makerAmount} class='pt-input pt-round' style={{width: '300px', textAlign: 'center'}} placeholder='Amount of ZRX' type='number' dir='auto' />
            <div class='pt-form-helper-text'>The amount you want to trade</div>
          </div>
          <button loading={this.state.loading} class='pt-button pt-large' onClick={this.submitOrder}>
            Submit Request
          </button>
          <div class='pt-form-group'>
            <label class='pt-label' for='price'>
              Amount Received
            </label>
            <input id='takerAmount' disabled value={this.state.takerAmount} class='pt-input pt-round' style={{width: '300px', textAlign: 'center'}} placeholder='Amount of WETH' type='number' dir='auto' />
            <div class='pt-form-helper-text'>Estimated best price</div>
          </div>
        </div>
        <Dialog
          iconName='build'
          isOpen={this.state.isOpen}
          onClose={this.toggleDialog}
          title='Ethereum Network Connection'>
          <div className='pt-dialog-body'>
            {this.state.message}
          </div>
          <div className='pt-dialog-footer'>
            <div className='pt-dialog-footer-actions'>
              <Button
                intent={Intent.PRIMARY}
                onClick={this.toggleDialog}
                text='Close' />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  submitOrder () {
    var self = this;
    var order = {
      exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
      expirationUnixTimestampSec: new BigNumber((Date.now()) + 3600*1000),
      feeRecipient: '0xefa1958b3248a95c08f0a964ad844848f1d7e0a3',
      maker: makerAddress,
      makerFee: new BigNumber(0),
      makerTokenAddress: '0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570',
      makerTokenAmount: new BigNumber(1000),
      salt: new BigNumber(0),
      taker: ZeroEx.NULL_ADDRESS,
      takerFee: new BigNumber(0),
      takerTokenAddress: '0x05d090b51c40b020eab3bfcb6a2dff130df22e9c',
      takerTokenAmount: new BigNumber(1)
    };
    return window.web3.eth.net.getId()
      .then(function (network) {
        // Check For Rovan Network
        if (network == 42) {
          self.setState({
            loading: true
          });
          // Create and sign new order
          var orderHash = ZeroEx.getOrderHashHex(order);
          return window.zeroEx.signOrderHashAsync(orderHash, makerAddress);
        } else {
          self.setState({
            message: 'Please connect to the Kovan network, Main network coming soon!',
            isOpen: true
          });
        }
      })
      .then(function (result) {
        // Approve transfer of tokens to the proxy contract
        order = Object.assign(order, result);
        console.log('Congrats! Here is your signed order', order);
        return window.zeroEx.token.setUnlimitedProxyAllowanceAsync('0x6ff6c0ff1d68b964901f986d4c9fa3ac68346570', makerAddress);
      })
      .then(function (result) {
        // Publish the order to the orderbook
        console.log('Order being submitted to zero exchange...', order);
        client.event.emit('orders', order);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  toggleDialog () {
    this.setState({isOpen: !this.state.isOpen});
  }
}

export default connect(
  null,
  null
)(Form);
