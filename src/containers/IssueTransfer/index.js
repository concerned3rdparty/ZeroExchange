import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Well, Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

const IndexFund = require('../../helpers/IndexFund.json');
const ERC20 = require('../../helpers/ERC20.json');

// Handle approving the composing assets
class IssueTransfer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tokenA: '',
      tokenB: '',
      tokenABalance: 0,
      tokenBBalance: 0,
      account: null,
      indexTokens: 0
    }
    this.issueToken = this.issueToken.bind(this);
  }

  async componentWillMount() {
    const accounts = await window.web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const selectedIndexFundContract = this.props.selectedFund;

    const tokenA = await selectedIndexFundContract.tokens(0);
    this.setState( { tokenA });
    const tokenB = await selectedIndexFundContract.tokens(1);
    this.setState( { tokenB });

    var ERC20Contract = contract(ERC20);
    ERC20Contract.setProvider(window.web3.eth.currentProvider);

    let tokenAContract = await ERC20Contract.at(this.state.tokenA);
    const tokenABalance = await tokenAContract.balanceOf(this.state.account, { from: this.state.account});
    this.setState({ tokenABalance: tokenABalance.toString() });

    let tokenBContract = await ERC20Contract.at(this.state.tokenB);
    const tokenBBalance = await tokenBContract.balanceOf(this.state.account, { from: this.state.account});
    this.setState({ tokenBBalance: tokenBBalance.toString() });
  }

  async issueToken() {
    const selectedIndexFundContract = this.props.selectedFund;

    const receipt = await selectedIndexFundContract.issue(1, { from: this.state.account });
    console.log(receipt);

    const indexTokenIssued = await selectedIndexFundContract.balanceOf(this.state.account, { from: this.state.account});
    this.setState({ indexTokens: indexTokenIssued.toString() });

    var ERC20Contract = contract(ERC20);
    ERC20Contract.setProvider(window.web3.eth.currentProvider);

    let tokenAContract = await ERC20Contract.at(this.state.tokenA);
    const tokenABalance = await tokenAContract.balanceOf(this.state.account, { from: this.state.account});
    this.setState({ tokenABalance: tokenABalance.toString() });

    let tokenBContract = await ERC20Contract.at(this.state.tokenB);
    const tokenBBalance = await tokenBContract.balanceOf(this.state.account, { from: this.state.account});
    this.setState({ tokenBBalance: tokenBBalance.toString() });
  }


  render () {
    return (
      <Grid>
        <Row>
          <h3>Get Your Index Tokens Now!</h3>
          <Button onClick={this.issueToken}>GET YOUR INDEX TOKEN!</Button>
        </Row>
        <Row>Index Token Count: {this.state.indexTokens}</Row>
        <Row>Token A Count: {this.state.tokenABalance}</Row>
        <Row>Token B Count: {this.state.tokenBBalance}</Row>
      </Grid>
    );
  }
}

export default IssueTransfer;
