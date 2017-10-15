import React, { Component } from 'react';

import { DropdownButton, MenuItem } from 'react-bootstrap';

const ALL_TOKENS = require('../../helpers/tokens.json').map(token => { return { value: token.address, label: token.symbol }});

class TokenDropdown extends Component {


  constructor(props) {
    super(props);

    this.selectToken = this.selectToken.bind(this);
  }

  selectToken(value) {
    if (this.props.select) {
      this.props.select(value);
    }
  }

  render () {
    return (
      <DropdownButton title="Select Your Token" id="token-dropdown" onSelect={this.selectToken}>
        {ALL_TOKENS.map(token => <MenuItem key={token.value} eventKey={token.value}>{token.label}</MenuItem>)}
      </DropdownButton>
    );
  }
}

export default TokenDropdown;
