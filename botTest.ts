import { DeployedEnvironment } from '@melonproject/melonjs';
import { Eth } from 'web3-eth';
import { HttpProvider, WebsocketProvider, HttpProviderOptions, WebsocketProviderOptions } from 'web3-providers';
//import deployment from '../deployments/mainnet-deployment.json';

function createProvider(endpoint: string, options?: HttpProviderOptions | WebsocketProviderOptions) {
  if (endpoint.startsWith('https://') || endpoint.startsWith('http://')) {
    return new HttpProvider(endpoint, options as HttpProviderOptions);
  }

  if (endpoint.startsWith('wss://') || endpoint.startsWith('ws://')) {
    return new WebsocketProvider(endpoint, options as WebsocketProviderOptions);
  }

  throw new Error('Invalid endpoint protocol.');
}

export function createEnvironment() {
  const provider = createProvider(process.env.PROVIDER_ENDPOINT);
  const client = new Eth(provider, undefined, {
    transactionConfirmationBlocks: 1,
  });
