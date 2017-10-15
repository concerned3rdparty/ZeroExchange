import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

var deployedIndexFundHubContractAddress = '0xbe9f7b40a187f488f7a12cc4dbf2df922a3e2be8';

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
      indexFundAddress: ''
    }
    this.submit = this.submit.bind(this);
  }

  async componentWillMount() {
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  async submit() {
    const { name, symbol, tokens, units } = this.state;

    let transformedTokens = tokens.map(token => token.address);

    let IndexFundHubContract = contract(IndexFundHub);
    IndexFundHubContract.setProvider(window.web3.eth.currentProvider);

    let indexFundInstance = await IndexFundHubContract.at(deployedIndexFundHubContractAddress);

    const createReceipt = await indexFundInstance.create(transformedTokens, units, name, symbol, { from: this.state.account });

    this.setState({ indexFundAddress: createReceipt.logs[0].args.newIndexFund });
    console.log('New Index Fund', createReceipt.logs[0].args.newIndexFund);
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
        <Row>
          {this.state.indexFundAddress.length ? 
            <div>
              <p>New Index Fund Address: {this.state.indexFundAddress}</p>
              <Button onClick={this.props.nextStep}>Proceed to Issuing Token</Button>
            </div>
            : ''}
        </Row>
      </Grid>
    );
  }
}

export default TokenSummary;
