// build-in modules
const path = require("path");
const fs = require("fs");

// solidity compiler 
const solc = require("solc");

//define the path and compile
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];

