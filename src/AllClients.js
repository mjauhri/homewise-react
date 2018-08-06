import React, { Component } from "react";
import axios from 'axios';
import AuthService from './AuthService';
import withAuth from './withAuth';
import { withRouter } from 'react-router'
const Auth = new AuthService();

class AllClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      mls_region: '',
      mls_id:'',
      id: '',
      agent: '',
      agent_email: '',
      client_type: true,
      buyingClients: [],
      sellingClients: []
    }
    this.handleClick= this.handleClick.bind(this);
  }


componentDidMount(){
  let token = Auth.getToken();
  var config = {
        headers: {'Authorization': "Bearer " + token}
   };

  axios.get('http://127.0.0.1:8000/agent/Clients/?client_type=B', config ).then(resp => {
    console.log('Response', resp)
    let data = resp.data
    console.log('data');
    this.setState({
      buyingClients: data
    })
  }).catch(err => {
    console.log('Error', err.response)
  });


  //let token = Auth.getToken();
  var config = {
        headers: {'Authorization': "Bearer " + token}
   };

  axios.get('http://127.0.0.1:8000/agent/Clients/?client_type=S', config ).then(resp => {
    console.log('Response', resp)
    let data = resp.data
    console.log('data');
    this.setState({
     sellingClients: data
    })
  }).catch(err => {
    console.log('Error', err.response)
  });

  //let token = Auth.getToken();
  var config = {
        headers: {'Authorization': "Bearer " + token}
   };

  axios.get('http://127.0.0.1:8000/agent/UpcomingSteps', config ).then(resp => {
    console.log('Response', resp)
    let data = resp.data
    console.log('data');
    this.setState({
      agent: data.agent,
      agent_email: data.agent_email,
    })
  }).catch(err => {
    console.log('Error', err.response)
  });
 
}

handleClick(email, client_type){
  this.props.history.push({
    pathname: '/Steps',
    state: {email: email, client_type: client_type}
    })
}

render(){
  const listItems = this.state.buyingClients.map((client) =>
     <div onClick={() => this.handleClick(client.email, client.client_type)}>
      <li>{client.first_name} {client.last_name}</li>
    </div>
   );
  const listItems3 = this.state.sellingClients.map((client) =>
    <div onClick={() => this.handleClick(client.email, client.client_type)}>
      <li>
        {client.first_name} {client.last_name}
      </li>
    </div>
   );
  return (
    <div>
    <ul>{listItems}</ul>
    <ul>{listItems3}</ul>
    </div>
  );
 }
}
export default withAuth(withRouter(AllClients));