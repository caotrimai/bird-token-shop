const path = require('path')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    develop: {
      host: "https://data-seed-prebsc-1-s1.binance.org",
      port: 8545,
      network_id: "*", // match any network
      websockets: true
    },
  },
  compilers: {
    solc: {
      version: '0.8.0', // A version or constraint - Ex. "^0.5.0"
      // Can be set to "native" to use a native solc or
      // "pragma" which attempts to autodetect compiler versions
      parser: 'solcjs',  // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
        },
        evmVersion: 'istanbul', // Default: "istanbul"
      },
    },
  },
}
