const { Eth } = require('web3-eth');
const { HttpProvider } = require('web3-providers');
const { DeployedEnvironment } = require('@melonproject/melonjs');
const Web3 = require("web3");
// Instantiate the environment where you'll create your fund
//+const eth = new Eth(new HttpProvider('https://mainnet.infura.io/v3/9136e09ace01493b86fed528cb6a87a5', {
 
   const eth = new Eth(new HttpProvider('saved in deployment.json notepad++', {
  confirmTransactionBlocks: 1
}));

//replace the token after v3/{token} with your infura token
////const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"));
console.log("hello2");
////const from_account = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" //sender --> MainWallet

////let MainWalletETH = await web3.eth.getBalance(from_account);

const deployment = fs.readFileSync('./deployment.json');

// pass eth, the networkID, and the deployment to the DeployedEnvironment constructor
// for networkID: Mainnet 1, rinkeby 4, kovan 42, local 4447
const environment = new DeployedEnvironment(eth, 4,  deployment);
//////////////////////////////////////////trading//////////////////////////////