var IndexFundHub = artifacts.require("./IndexFundHub.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(IndexFundHub);
};
