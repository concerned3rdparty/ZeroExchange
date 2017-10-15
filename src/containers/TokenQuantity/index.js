import React, { Component } from 'react';
import { Col, Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table, Well } from 'react-bootstrap';

class TokenQuantity extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tokens: this.props.tokens,
      units: this.props.units
    }

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  handleQuantityChange(index, e) {
    if (!e.target.value ) return;

    var newValue = parseInt(e.target.value);

    var currentUnits = this.props.units;
    currentUnits[index] = newValue;

    this.setState({ units: currentUnits });
  }

  // Take the current selected tokens
  // Add unit selections for each token in the basket

  saveAndContinue(e) {
    e.preventDefault();

    var data = this.state.units;

    this.props.saveData(data);
    this.props.nextStep();
  }

  render () {
    return (
      <div> 
       <Grid>
        <Row>
          {this.state.tokens.map((token, index) => 
            <Well key={index}>
              <form>
                <FormGroup
                  controlId="formBasicText">
                  <label>Token Name</label>
                  <div>{token.name}</div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Symbol</ControlLabel>
                  <FormControl
                    type="text"
                    index={index}
                    value={this.state.units[index]}
                    placeholder="0"
                    onChange={(e) => this.handleQuantityChange(index, e)}
                  />
                </FormGroup>              
              </form>
            </Well>)}
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



export default TokenQuantity;
