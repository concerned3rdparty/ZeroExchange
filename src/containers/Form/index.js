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

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      openModal: false,
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
          <button type='button' class='pt-button pt-default pt-large' onClick={this.submitOrder}>
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
    return window.web3.eth.net.getId()
      .then(function (data) {
        console.log('Network', data);
        // Check Correct Network
        if (data !== 42) {
          self.setState({
            message: 'Please connect to the Kovan network, Main network coming soon!',
            isOpen: true
          });
        } else if (data == 42) {
        } else {
          console.log('Congratulations!', data);
        }
        return;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  toggleDialog () {
    this.setState({isOpen: !this.state.isOpen});
  }
}

export default Form;
