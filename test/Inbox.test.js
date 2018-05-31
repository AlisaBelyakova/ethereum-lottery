//build-in module 
const assert = require('assert');

//bring outter modules
const ganache = require('ganache-cli');
const Web3 = require('web3');

// export the compiled contract
const { interface, bytecode } = require('../compile');

/* 
make an instance of web3, 
setup a provider as a 'communication layer' between web3 and a specific e.network,
that how we can send request and recieve responce, then connect to eth.network 
*/
const provider = ganache.provider();
const web3 = new Web3(provider);

/* 
mocha testing - get a list of all accounts, returns a promise,
use one of the accounts to deploy the contract
*/
let accounts;
let inbox;
const INITIAL_MES = 'Hi there!';

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MES] })
        .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('sets a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MES);
    });

    it('updates the message', async () => {
        const NEW_MES = 'Bye!';
        await inbox.methods.setMessage(NEW_MES).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_MES);
    })
})