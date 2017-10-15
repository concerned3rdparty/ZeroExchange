import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

const IndexFund = require('../../helpers/IndexFund.json');

// Pick the fund that we'll be working with
class FundSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      address: '',
      name: '',
      symbol: '',
      fundInstance: null
    }

    this.validateAddress = this.validateAddress.bind(this);
    this.submitAndContinue = this.submitAndContinue.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  async handleAddress(e) {
    if (!e.target.value) { return }

    this.setState({ address: e.target.value });
  }

  async validateAddress() {
    let IndexFundContract = contract(IndexFund);
    IndexFundContract.setProvider(window.web3.eth.currentProvider);

    let indexFundInstance = await IndexFundContract.at(this.state.address);
    this.setState({ fundInstance: indexFundInstance });

    let indexFundName = await indexFundInstance.name();
    this.setState({ name: indexFundName })

    let indexFundSymbol = await indexFundInstance.symbol();
    this.setState({ symbol: indexFundSymbol })

    console.log(indexFundInstance);
  }

  submitAndContinue(e) {
    e.preventDefault();

    this.props.saveData(this.state.fundInstance);

    this.props.nextStep();
  }

  render () {
    return (
      <Grid>
        <Row>
          <h3>Input Your Desired Index Fund</h3>
           <form>
              <FormGroup
                controlId="formBasicText">
                <ControlLabel>Index Fund Address</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.address}
                  placeholder="Enter Address"
                  onChange={this.handleAddress}
                />
              </FormGroup>
            </form>
            <Button onClick={this.validateAddress}>Validate Address</Button>
            {this.state.name.length ? 
              <div>
                {this.state.name } ({this.state.symbol})
              </div> : ''
            }
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
