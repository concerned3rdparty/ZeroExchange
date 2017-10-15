import React, { Component } from 'react';

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class TokenName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      symbol: this.props.symbol
    };

    this.handleName = this.handleName.bind(this);
    this.handleSymbol = this.handleSymbol.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  handleName(e) { this.setState({ name: e.target.value }); }
  handleSymbol(e) { this.setState({ symbol: e.target.value }); }

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
            <form>
              <FormGroup
                controlId="formBasicText">
                <ControlLabel>Portfolio Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Enter text"
                  onChange={this.handleName}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="formBasicText">
                <ControlLabel>Symbol</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.symbol}
                  placeholder="Enter text"
                  onChange={this.handleSymbol}
                />
                <FormControl.Feedback />
              </FormGroup>              
            </form>
          </Row>
          <Row>
            <Button onClick={this.saveAndContinue}>Save and Continue</Button>
          </Row>
        </Grid>
        
       
      </div>
    );
  }
}

export default TokenName;
