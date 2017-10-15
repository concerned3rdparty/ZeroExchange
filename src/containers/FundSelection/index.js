import React, { Component } from 'react';
import contract from 'truffle-contract'; 

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

const IndexFund = require('../../helpers/IndexFund.json');

// Pick the fund that we'll be working with
class FundSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  async componentWillMount() {
  }

  render () {
    return (
      <Grid>
        <Row><h3>Input Your Desired Index Fund</h3></Row>
        <Row>
          <Button onClick={this.props.previousStep}>Go Back</Button>
          <Button onClick={this.props.nextStep}>Next Step</Button>
        </Row>
      </Grid>
    );
  }
}

export default FundSelection;
