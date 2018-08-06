import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Center from 'react-center';
import TextField from '@material-ui/core/TextField';
import logo from './Homewise.png'




export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      retypePass:'',
      mls_region: '',
      mls_id:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

register(first_name, last_name, email, date, password, retypePass, mls_region, mls_id){
    axios.post('http://127.0.0.1:8000/agent/Registration/', { first_name: first_name, last_name: last_name, 
      email: email, birthday: date, password: password, retypePass: retypePass, mls_region: mls_region, mls_id: mls_id}).then(resp => {
      //let expDate = new Date();
      //expDate.setSeconds(expDate.getSeconds() + Number(resp.data.expires_in));
      //console.log(resp.data.access_token);
      //this.Auth.setToken(resp.data.access_token, expDate.toString()); // Setting the token in localStorage
    //alert('hi');
      this.props.history.replace('/login');
      //console.log('hi')
      return Promise.resolve(resp);
    }).catch(err => {
      alert('Error', err)
    });
  }

handleChangeDate(date) {
    this.setState({
      date: date
    });
}

handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

handleSubmit(e){
    this.register(this.state.first_name, this.state.last_name,this.state.email,this.state.date,this.state.password,
      this.state.retypePass, this.state.mls_region, this.state.mls_id);
  }



render() {
    return (
      <div className="Login">
      <Center>
            <img src={logo} style={{width: 60, height: 70, paddingBottom: 0, textAlign: 'center'}}/>
      </Center>
      <Center>
        <form>
           <TextField
          id="first_name"
          /*InputLabelProps={{
            shrink: true,
          }}*/
          placeholder="First Name"
          value={this.state.first_name}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="last_name"
          /*InputLabelProps={{
            shrink: true,
          }}*/
          placeholder="Last Name"
          value={this.state.last_name}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
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
        <DatePicker
              dateFormat="MM/DD/YYYY"
              showYearDropdown
              scrollableYearDropdown
              selected={this.state.date}
              onChange={this.handleChangeDate}
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
        <TextField
          id="retypePass"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Retype Password"
          value={this.state.retypePass}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="mls_region"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="MLS Region"
          value={this.state.mls_region}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="mls_id"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="MLS ID"
          value={this.state.mls_id}
          onChange={this.handleChange}
          fullWidth
          margin="normal"
        />
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