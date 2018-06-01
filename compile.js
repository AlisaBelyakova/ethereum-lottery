// build-in modules
const path = require("path");
const fs = require("fs");

// solidity compiler 
const solc = require("solc");

//define the path and compile
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Lottery'];

