pragma solidity ^0.4.11;

import './StandardToken.sol';
import './ERC20.sol';
import './SafeMath.sol';

contract IndexFund is StandardToken {
  string public name;
  string public symbol;
  uint8 public decimals;

  address[] public tokens;
  uint[] public units;

  event LogIssued(address _sender, uint _quantity);
  event LogRedemption(address _sender, uint _quantity);

	// These token units / figures need to somehow be abstracted
  // Questions - does this index fund like need a name?
  // function IndexFund(address _tokenA, uint _unitsA) {
  function IndexFund(address[] _tokens, uint[] _units, string _name, string _symbol) {
    tokens = _tokens;
    units = _units;

    name = _name;
    symbol = _symbol;
    decimals = 18;
  }

  // TODO - all tokens need to be approved ahead of time

  // Issue new tokens and perform a swap of user’s tokens and ERC20 token
  // Anyone can call this function
  function issue(uint quantity) public returns (bool success) {
    // Transfers the tokens to the contract
    for (uint i = 0; i < tokens.length; i++) {
      address currentToken = tokens[i];
      uint currentUnits = units[i];

      assert(ERC20(currentToken).transferFrom(msg.sender, this, currentUnits * quantity));      
    }

    // If successful, increment the balance of the user’s index token
    balances[msg.sender] = SafeMath.add(balances[msg.sender], quantity);

    // Increment the total token supply
    totalSupply = SafeMath.add(totalSupply, quantity);

    LogIssued(msg.sender, quantity);

    return true;
  }

  function redeem(uint quantity) public returns (bool success) {
    for (uint i = 0; i < tokens.length; i++) {
      address currentToken = tokens[i];
      uint currentUnits = units[i];
      
      assert(ERC20(currentToken).transfer(msg.sender, currentUnits * quantity));
    }

    // If successful, decrement the balance of the user’s index token
    balances[msg.sender] = SafeMath.sub(balances[msg.sender], quantity);

    // Decrement the total token supply
    totalSupply = SafeMath.sub(totalSupply, quantity);

    LogRedemption(msg.sender, quantity);

    return true;
  }
}
