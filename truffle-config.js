module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
  },
  //because we moved contracts folder into src folder --> we have to tell truffle for the new location of contracts
  contracts_directory: './src/contracts/',
  //api to change form after compile
  contracts_build_directory: './src/abis',



  compilers: {
    solc: {
      //version to compile
      version: '^0.8.0',
      //optimizer code
      optimizer: {
        enable: 'true',
        runs: 200
      }
    }
  }
};
