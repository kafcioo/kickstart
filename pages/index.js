import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import factory from '../ethereum/factory.js';
import Layout from '../componenets/Layout.js';
import { Link } from '../routes';

class CampaignIndex extends Component{

 static async getInitialProps(){
   const campaigns = await factory.methods.getDeployCampaigns().call();
   return { campaigns };
 }


renderCampaigns(){
  const items = this.props.campaigns.map(address => {
    return {
      header: address,
      description:(

       <Link route ={`/campaings/${address}`}>
       <a>View Campaign </a>
      </Link>),

      fluid: true
    };
  });
  return <Card.Group items ={items} />;
}

render() {
  return(
  <Layout>
   <div>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  <h3> Open capaigns </h3>

      <Link route='/campaigns/new'>
        <a className="item">
          <Button
            content ="Create Campaign"
            icon = "add"
            floated ='right'
            primary
            />
        </a>
      </Link>
      
      {this.renderCampaigns()}
    </div>
    </Layout>
);
  }
}
export default CampaignIndex;
