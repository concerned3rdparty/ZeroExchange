import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Well, Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

//Number of decimals to use (for ETH and ZRX)
const DECIMALS = 18;

const IndexFund = require('../../helpers/IndexFund.json');
const ERC20 = require('../../helpers/ERC20.json');

// Handle approving the composing assets
class FundSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      symbol: '',
      tokenA: null,
      tokenB: null,
      unitA: null,
      unitB: null,
      account: null
    }
    this.submitAndContinue = this.submitAndContinue.bind(this);
    this.authorizeTokenA = this.authorizeTokenA.bind(this);
    this.authorizeTokenB = this.authorizeTokenB.bind(this);
  }

  async componentWillMount() {
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const selectedIndexFundContract = this.props.selectedFund;

    console.log(selectedIndexFundContract);

    const name = await selectedIndexFundContract.name();
    this.setState({ name });

    const symbol = await selectedIndexFundContract.symbol();
    this.setState({ symbol });

    const tokenA = await selectedIndexFundContract.tokens(0);
    this.setState( { tokenA });
    const tokenB = await selectedIndexFundContract.tokens(1);
    this.setState( { tokenB });

    const unitA = await selectedIndexFundContract.units(0);
    this.setState( { unitA: unitA.toString() });
    const unitB = await selectedIndexFundContract.units(1);
    this.setState( { unitB: unitB.toString() });
  }

  async authorizeTokenA() {
    const selectedIndexFundContract = this.props.selectedFund;

    var ERC20Contract = contract(ERC20);
    ERC20Contract.setProvider(window.web3.eth.currentProvider);

    let tokenAContract = await ERC20Contract.at(this.state.tokenA);

    const txnReceipt = tokenAContract.approve(selectedIndexFundContract.address, this.state.unitA, { from: this.state.account });
    console.log(txnReceipt);
  }

  async authorizeTokenB() {
    const selectedIndexFundContract = this.props.selectedFund;

    var ERC20Contract = contract(ERC20);
    ERC20Contract.setProvider(window.web3.eth.currentProvider);

    let tokenBContract = await ERC20Contract.at(this.state.tokenB);

    const txnReceipt = tokenBContract.approve(selectedIndexFundContract.address, this.state.unitB, { from: this.state.account });
    console.log(txnReceipt);
  }
  submitAndContinue(e) {
    e.preventDefault();

    this.props.nextStep();
  }

  render () {
    return (
      <Grid>
        <Row>
          <h3>Authorize Your Funds to Issue {this.state.name} ({this.state.symbol})</h3>
          <Well>
            <form>
              <FormGroup
                controlId="formBasicText">
                <div>
                  <label>{this.state.tokenA} (Units: {this.state.unitA})</label>
                </div>
                <Button onClick={this.authorizeTokenA}>Authorize Transfer</Button>
              </FormGroup>
              <FormGroup
                controlId="formBasicText">
                <div>
                  <label>{this.state.tokenB} (Units: {this.state.unitB})</label>
                </div>
                <Button onClick={this.authorizeTokenB}>Authorize Transfer</Button>
              </FormGroup>
            </form>
          </Well>
        </Row>
        <Row>
          <Button onClick={this.props.previousStep}>Go Back</Button>
          <Button onClick={this.submitAndContinue}>Next Step</Button>
        </Row>
      </Grid>
    );
  }
}

export default FundSelection;
