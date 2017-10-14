pragma solidity ^0.4.11;

import './IndexFund.sol';

contract IndexFundHub {
	address[] public indexFunds;
	function indexFundCount() public constant returns(uint length) { return indexFunds.length; }

	mapping (bytes32 => bool) private hashedIndexFunds;
	mapping (address => bool) public indexFundExists;

	event IndexFundCreated(address newIndexFund, address[] tokens, uint[] units);

	function IndexFundHub() {}

	// Create function creates a new index fund
	function create(address[] tokens, uint[] units, string name, string symbol) public returns(address newIndexFundAddress) {
		// Do not allow duplicate contracts to be created
		// For now, we hash all the inputs to see an existing contract exists
		bytes32 hashedInputs = keccak256(tokens, units);
		require(!hashedIndexFunds[hashedInputs]);

	  // Instantiate that contract with correct input parameters
	  IndexFund newIndexFund = new IndexFund(tokens, units, name, symbol);
	  
	  // Keep track of the token contract
	 	indexFunds.push(address(newIndexFund));

	  // Mark index fund as created
	  indexFundExists[address(newIndexFund)] = true;

	  // Mark unique fund configuraiton as exists
	  hashedIndexFunds[hashedInputs] = true;

	  // Log contract creation
	  IndexFundCreated(newIndexFund, tokens, units);

	  return newIndexFund;
	}
}
