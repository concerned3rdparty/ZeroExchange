var IndexFundHub = artifacts.require("./IndexFundHub.sol");

var StandardTokenMock = artifacts.require("./StandardTokenMock.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(IndexFundHub);

  var metamask = '0xe63c9341Ed19F602a958022F8b6D93197Ef7c1f3';

  deployer.deploy(StandardTokenMock, metamask, 10000000000000000);
  deployer.deploy(StandardTokenMock, metamask, 20000000000000000);
};
