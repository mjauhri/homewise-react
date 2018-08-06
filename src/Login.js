import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Login.css';
import AuthService from './AuthService';
import axios from 'axios';
import logo from './Homewise.png';
import TextField from '@material-ui/core/TextField';
import Center from 'react-center';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      user_type: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  login(email, password){
    axios.post('http://127.0.0.1:8000/agent/Login/', { email: email, password: password}).then(resp => {
      let expDate = new Date();
      expDate.setSeconds(expDate.getSeconds() + Number(resp.data.expires_in));
      //console.log(resp.data.access_token);
      this.Auth.setToken(resp.data.access_token, expDate.toString()); // Setting the token in localStorage
    //alert('hi');
      this.props.history.replace('/AllClients');
      //console.log('hi')
      return Promise.resolve(resp);
    }).catch(err => {
      alert('Error', err)
    });
  }

   handlePassword = (text) => {
      this.setState({ password: text })
   }
    handleEmail = (text) => {
      this.setState({ email: text })
   }
   handleChange(event) {
    this.setState({
      user_type: event.target.value
    });
  }

    //const {email, password } = this.state
    // if(email === '' || password === ''){
    //     //alert('All Fields Required')
    // }
    // else{
    //   var reqBody = {
    //     'email': email,
    //     'password': password
    //   };

    // fetch('http://127.0.0.1:8000/agent/Login/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
      
    //   },
    //   body: JSON.stringify(reqBody),
    //   })
    //   .then((response) => {
    //             // Check response HTTP Status
    //             if (response.ok) {
    //               response.json()
    //                 .then((responseJson) => {
    //                   var tokenExpiryDate = new Date();
    //                   tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + Number(responseJson.expires_in));
    //                   //alert('logged in');
    //                   console.log(responseJson);
    //                   (err) => {
    //                     if(err) {
    //                       alert("Error: " + err);
    //                     } else {
    //                       // Auth is valid
    //                       // Go back to auth loading screen
    //                       alert('Success!');
    //                     }
    //                   }
    //                 })
    //             } else {
    //               if (Number(response.status) === 404) {
    //                 // No agent found
    //                 response.json()
    //                   .then((responseJson) => {
    //                     alert(responseJson.message);
    //                   })
    //               } else if (Number(response.status) === 400) {
    //                 response.json()
    //                   .then((responseJson) => {
    //                     if (Number(responseJson.code) === 1) {
    //                       // Incorrect password entered
    //                       alert(responseJson.message);
    //                     } else if (Number(responseJson.code) === 2) {
    //                       // Handle temporary password flow
    //                       alert(responseJson.message);
    //                     }
    //                   })
    //               }
    //             }

    //           })
    //           .catch((error) => {
    //               alert(error);
    //           });
    //     }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChanges = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(e){
    this.login(this.state.email,this.state.password);
  }
/*componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/GetAgent');
}*/

  render() {
    return (
      <div className="Login">
       <Center>
            <img src={logo} style={{width: 60, height: 70, paddingBottom: 0, textAlign: 'center'}}/>
       </Center>
        <form>
        <p className="title">Select a user:</p>
            <label>
              <input
                type="radio"
                value="Agent"
                checked={this.state.user_type === "Agent"}
                onChange={this.handleChange}
              />
              Agent
            </label>
    
            <label>
              <input
                type="radio"
                value="Client"
                checked={this.state.user_type === "Client"}
                onChange={this.handleChange}
              />
              Client
            </label>
            <label>
              <input
                type="radio"
                value="Vendor"
                checked={this.state.user_type === "Vendor"}
                onChange={this.handleChange}
              />
              Vendor
            </label>
          <TextField
          id="email"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChanges}
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
          onChange={this.handleChanges}
          fullWidth
          margin="normal"
        />
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            onClick={() => this.handleSubmit()}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}