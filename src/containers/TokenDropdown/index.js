import React, { Component } from 'react';

const ALL_TOKENS = require('../../helpers/tokens.json');

class TokenDropdown extends Component {

  constructor(props) {
    super(props);

    this.selectToken = this.selectToken.bind(this);

    this.state.options = ALL_TOKENS.map(token => { return { value: token.address, label: token.symbol }});
  }

  selectToken(value) {
    if (this.props.select) {
      this.props.select(value);
    }
  }

  render () {
    return (
      <select>
        {this.state.options.map(token => <option key={token.value} value={token.value}>{token.symbol}</option>)}
      </select>
    );
  }
}

export default TokenDropdown;
