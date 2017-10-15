import React, { Component } from 'react';

import { Grid, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Table } from 'react-bootstrap';

class TokenSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: this.props.tokens,
      tokenData: [{ name: "Gnosis", symbol: 'GNO' }, { name: "Augur", symbol: 'REP' }]
    };

    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  componentWillMount() {
    // Using the token information, get other metadata
    // and populate it into tokenData
  }

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
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tokenData.map(token => 
                <tr key={token.name}>
                  <td>{token.name}</td>
                  <td>{token.symbol}</td>
                  <td>X</td>
                </tr>)}
              </tbody>              
            </Table>
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

export default TokenSelection;
