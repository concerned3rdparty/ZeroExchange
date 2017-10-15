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
  }

  handleQuantityChange(e) {
    var newValue = e.target.value;
    var currentIndex = e.target.index;
    console.log('index', currentIndex, e.target);

    var currentUnits = this.props.units;
    currentUnits[currentIndex] = newValue;
    console.log('Intermediate', currentUnits);

    this.setState({ units: currentUnits });
    console.log('New State', this.state.units)
  }

  // Take the current selected tokens
  // Add unit selections for each token in the basket

  submitAndContinue() {
    // Transform the quantity/unit in each token 
    // And form it into an array


    // Move forward
  }

  render () {
    return (
      <div> 
       <Grid>
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
                  onChange={this.handleQuantityChange}
                />
              </FormGroup>              
            </form>
          </Well>)}
       </Grid>
      </div>
    );
  }
}



export default TokenQuantity;
