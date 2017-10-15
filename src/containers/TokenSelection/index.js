import React, { Component } from 'react';

import TokenDropdown from '../TokenDropdown';
import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';
const ERC20 = require('../../helpers/tokens.json');

var contract = require("truffle-contract");
var ERC20Contract;

class TokenSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ERC20instance: '',
      tokens: this.props.tokens
    };

    this.addToken = this.addToken.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  componentWillMount() {
    // Using the token information, get other metadata
    // and populate it into tokenData
    // For each token, populate the data
    // LEAVE THIS 
  }

  async addToken(tokenAddress) {
    // console.log(window.web3);
    // ERC20Contract = contract(ERC20)
    // ERC20Contract.setProvider(window.web3.currentProvider);

    // const instance = await ERC20Contract.at(tokenAddress);
    
    // // Fetch token information
    // console.log(instance);

    // Push token to the tokens
    let updatedTokens = this.state.tokens;
    this.setState({ tokens: updatedTokens });
  }

  removeToken(tokenAddress) {
    console.log(this.state);
    var remainingTokens = this.state.tokens.filter(address => {
      return address != tokenAddress;
    });

    this.setState({ tokens: remainingTokens });
  }

  saveAndContinue(e) {
    e.preventDefault();

    var data = this.state.tokens;

    this.props.saveData(data);
    this.props.nextStep();
  }

  render () {
    return (
      <div>
        <Grid>
          <Row>
            <TokenDropdown select={this.addToken} />
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tokens.map(token => 
                <tr key={token.name}>
                  <td>{token.name}</td>
                  <td>{token.symbol}</td>
                  <td onClick={() => this.removeToken(token.address)}>X</td>
                </tr>)}
              </tbody>              
            </Table>
          </Row>
          <Row>
            <Button onClick={this.props.previousStep}>Go Back</Button>
            <Button onClick={this.saveAndContinue}>Save and Continue</Button>
          </Row>
        </Grid>
        
       
      </div>
    );
  }
}

export default TokenSelection;
