import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import axios from 'axios';
import {StripeProvider} from 'react-stripe-elements';
import Center from 'react-center';
import TextField from '@material-ui/core/TextField';

import MyStoreCheckout from './MyStoreCheckout';
import logo from './Homewise.png'



export default class VendorRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

register(email, password){
    axios.post('http://127.0.0.1:8000/agent/VendorRegistration/', {email: email, password: password}).then(resp => {
      this.props.history.replace('/login');
      return Promise.resolve(resp);
    }).catch(err => {
      alert('Error', err)
    });
  }

handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

handleSubmit(e){
    this.register(this.state.email,this.state.password);
    e.preventDefault();
  }



render() {
    return (
      <div className="VendorRegistration">
      <Center>
            <img src={logo} style={{width: 60, height: 70, paddingBottom: 0, textAlign: 'center'}}/>
      </Center>
      <Center>
        <form>
        <TextField
          id="email"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="password"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
        </form>
        </Center>
           <StripeProvider apiKey="pk_test_YaYEw3mZOlTBF0LgKlwGedMp">
              <MyStoreCheckout />
          </StripeProvider>
          <Center>
            <form>
              <Button
                block
                bsSize="large"
                //disabled={!this.validateForm()}
                onClick={() => this.handleSubmit()}
              >
              Register
              </Button>
            </form>
          </Center>
      </div>
    );
  }
}