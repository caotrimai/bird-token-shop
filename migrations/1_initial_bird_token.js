const BirdToken = artifacts.require("BIRD_TOKEN");

module.exports = function (deployer) {
  deployer.deploy(BirdToken, "FPLALLY BIRD TOKEN", "BIRD");
};
