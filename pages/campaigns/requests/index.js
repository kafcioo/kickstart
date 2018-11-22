import React, {Component} from 'react';
import Layout from '../../../componenets/Layout';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../componenets/RequestRow';

class RequestIndex extends Component {

static async getInitialProps(props){
const {address} =props.query;


const campaign = Campaign(address);
console.log(campaign);
const getReqestCount = await campaign.methods.getReqestCount().call();
//const approversCount = await campaign.methods.approversCount().call();
const requests = await Promise.all(
  Array(parseInt(getReqestCount))
  .fill()
  .map((element, index)=> {
    return campaign.methods.requests(index).call()
  }));

return {address, requests, };
}
renderRows(){
  return this.props.requests.map((request,index)=>{
    return <RequestRow
      key ={index}
      request ={request}
      address = {this.props.address}
      id= {index}
      //approversCount ={this.props.approversCount}
    />;

  });

}
  render(){
    const {Header, Row, HeaderCell, Body} =Table;
    return(

      <Layout>
        <h3> Reqest  </h3>
        <Link route ={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary> Add Reqest </Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell> ID</HeaderCell>
              <HeaderCell> Descryption </HeaderCell>
              <HeaderCell> Amount</HeaderCell>
              <HeaderCell> Recipient</HeaderCell>
              <HeaderCell> Approval</HeaderCell>
              <HeaderCell>Approve </HeaderCell>
              <HeaderCell>Finalize </HeaderCell>
            </Row>
          </Header>
          <Body> {this.renderRows()} </Body>
        </Table>

      </Layout>



    );
  }
}
export default RequestIndex;
