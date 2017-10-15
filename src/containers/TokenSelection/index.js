import React, { Component } from 'react';

import TokenDropdown from '../TokenDropdown';

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

class TokenSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: this.props.tokens
    };

    this.removeToken = this.removeToken.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  componentWillMount() {
    // Using the token information, get other metadata
    // and populate it into tokenData
  }

  addToken() {
    // Fetch new token data and add it to our tokens
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

    var data = this.state;

    this.props.saveData(data);
    this.props.nextStep();
  }

  render () {
    return (
      <div>
        <Grid>
          <Row>
            <TokenDropdown />
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
