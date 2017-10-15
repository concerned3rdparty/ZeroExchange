import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Well, Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

const IndexFund = require('../../helpers/IndexFund.json');

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
    }
    this.submitAndContinue = this.submitAndContinue.bind(this);
  }

  async componentWillMount() {
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
    this.setState( { unitA });
    const unitB = await selectedIndexFundContract.units(1);
    this.setState( { unitB });
  }

  async authorizeTransfer() {
    
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
                <label>{this.state.tokenA} (Units: {this.state.unitA})</label>
                <Button>Authorize Transfer</Button>
              </FormGroup>
              <FormGroup
                controlId="formBasicText">
                <label>{this.state.tokenB} (Units: {this.state.unitB})</label>
                <Button>Authorize Transfer</Button>
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
