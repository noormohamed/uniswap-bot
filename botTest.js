import Eth from 'web3-eth';
import Web3 from 'web3';
//almost there
import fs from 'fs';
import melonjs from '@melonproject/melonjs';

// Instantiate the environment where you'll create your fund
const eth = new Eth(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9136e09ace01493b86fed528cb6a87a5', {
  confirmTransactionBlocks: 1,
}));
const deployment = JSON.parse(fs.readFileSync('./rinkeby-deployment.json'));

// pass eth, the networkID, and the deployment to the DeployedEnvironment constructor
// for networkID: Mainnet 1, rinkeby 4, kovan 42, local 4447
const environment = new melonjs.DeployedEnvironment(eth, 1,  deployment);

console.log('script started');
console.log(environment);