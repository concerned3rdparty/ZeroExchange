import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

var deployedIndexFundHubContractAddress = '0x43bc9f424a9bd0dd87b2df801fc137b8d5c879ec';

const IndexFundHub = require('../../helpers/IndexFundHub.json');

class TokenSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tokens: this.props.tokens,
      units: this.props.units,
      symbol: this.props.symbol,
      name: this.props.name,
      account: '',
    }
    this.submit = this.submit.bind(this);
  }

  async componentWillMount() {
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  async submit() {
    const { name, symbol, tokens, units } = this.state;

    let transformedUnits = tokens.map(token => token.address);

    console.log('Name', name);
    console.log('Symbol', symbol);
    console.log('tokens', tokens);
    console.log('Units', units);

    let IndexFundHubContract = contract(IndexFundHub);
    IndexFundHubContract.setProvider(window.web3.eth.currentProvider);

    let indexFundInstance = await IndexFundHubContract.at(deployedIndexFundHubContractAddress);

    const createReceipt = await indexFundInstance.create(transformedUnits, units, name, symbol, { from: this.state.account });

    console.log(createReceipt);

  }

  render () {
    return (
      <Grid>
        <Row>Portfolio Summary</Row>
        <Row>Name: {this.state.name}</Row>
        <Row>Symbol: {this.state.symbol}</Row>
        <Row>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tokens.map((token, index) => 
                <tr key={token.name}>
                  <td>{token.name}</td>
                  <td>{token.symbol}</td>
                  <td>{this.state.units[index]}</td>
                </tr>)}
              </tbody>              
            </Table>
          </Row>
          <Row>
            <Button onClick={this.submit}>Create Your Portfolio!</Button>
          </Row>

      </Grid>
    );
  }
}

export default TokenSummary;
