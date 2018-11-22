import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../componenets/Layout';


class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient:'',
    loading: false
  };

static async getInitialProps(props){
  const {address} = props.query;
  return {address};
};

  onSubmit = async event => {
    event.preventDefault();
    const campaign =Campaign(this.props.address);
    const {description, value, recipient} =this.state;
    this.setState({ loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0]

        });
        Router.pushRoute(`/campaigns/${this.props.address}/request`);
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});
  };


  render(){
    return (
<Layout>
<h3>Create a request </h3>
    <Form onSubmit ={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
        <label> Descryption </label>
          <Input value={this.state.description}
            onChange ={event=> this.setState({description: event.target.value})}
          />
      </Form.Field>

      <Form.Field>
        <label> Value in Eth </label>
        <Input value={this.state.value}
          onChange ={event=> this.setState({value: event.target.value})}
        />
      </Form.Field>

      <Form.Field>
      <label> Recipient </label>
      <Input value={this.state.recipient}
        onChange ={event=> this.setState({recipient: event.target.value})}
      />
      </Form.Field>

      <Message error header= "Ops" content ={this.state.errorMessage} />
      <Button loading={this.state.loading} primary >New request</Button>

    </Form>
  </Layout>
    );
  }
}
export default RequestNew;
