const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require ('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
'pretty ecology chuckle bamboo will face battle grant box forest finish enact',
'https://rinkeby.infura.io/QqWsfQ60KqF4HCDRrP6I'

);
const web3 = new Web3(provider);

const deploy = async () =>{



accounts = await web3.eth.getAccounts(); // get accoutns list from web3

console.log('Attepting to deploy contract from ', accounts[0]);

  // Use one of those accounts to deploy the contract
const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
.deploy({data: compiledFactory.bytecode, })
.send({from: accounts[0], gas: '1000000'});


console.log('contract deployed to ', result.options.address);
};

deploy();
