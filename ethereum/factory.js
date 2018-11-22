import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xF693eD53C5799f146A8787ab37614Fb487b494bD'
);
export default instance;
