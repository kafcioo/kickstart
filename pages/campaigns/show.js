import React, {Component} from 'react';
import Layout from '../../componenets/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../componenets/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {

  static async getInitialProps (props){
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();


    return{
      address: props.query.address,
      miniumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
      };
    }


renderCards(){
  const {
    balance,
    manager,
    miniumContribution,
    requestsCount,
    approversCount
  } = this.props;

  const items =[{
    header: manager,
    meta: 'Address of manager',
    description: 'The manager created this campaign and create reqest to withdraw money',
    style: {overflowWrap: 'break-word'}

  },
  {
    header: miniumContribution,
    meta: 'Minium Contribution (wei)',
    description: 'You must contribute at least this much wei',

  },
  {
    header:requestsCount,
    meta: 'number of reqests',
    description: 'A reqest tries to withdraw money from the  contract and need to be approved '
  },
  {
    header: approversCount,
    meta: 'number of approvers',
    description: 'number of people who have allredy contribute'
  },
  {
    header: web3.utils.fromWei(balance, 'ether'),
    meta: 'Campaign balance (ether)',
    description: ' How much money this campaign has to spend'

  }

];
    return <Card.Group items ={items} />;
  }



  render (){
    return(
      <Layout>
      <h3> Campaign Show </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width ={10}>
              {this.renderCards()}
            </Grid.Column>

            <Grid.Column width = {6}>
              <ContributeForm address ={this.props.address}/>
            </Grid.Column>
         </Grid.Row>

      <Grid.Row>
        <Grid.Column>
        <Link route ={`/campaigns/${this.props.address}/requests`}>
            <a>
              <Button primary> View Reqest! </Button>
            </a>
          </Link>
        </Grid.Column>
      </Grid.Row>
     </Grid>
    </Layout>
   );

  }
}

export default CampaignShow;
