// import truffle provider that takes care of unlocking account,
// which then can be used to make a transaction
const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//two args - metamask mnemonic and infura.io node key
const provider = new HDWalletProvider(
    'hint element pool afford you bitter bridge raw sell chaos mail key',
    'https://rinkeby.infura.io/qxWAU2nUuddgWO2ZcYuv'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('see here --->', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        //important: throws an error if a hex indicator '0x' is not added 
        .deploy({ data: '0x' + bytecode })
        .send({ gas: 1000000, from: accounts[0] });

    console.log('address of deployed contract', result.options.address);
};

deploy();
