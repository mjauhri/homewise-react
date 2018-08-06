import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Center from 'react-center';
import axios from 'axios';
import logo from './Homewise.png'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})


export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name:'',
      last_name:'',
      email:'',
      password:'',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

register(first_name, last_name, email, password){
    axios.post('http://127.0.0.1:8000/agent/ClientRegistration/', { first_name: first_name, last_name: last_name, 
      email: email, password: password}).then(resp => {
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
    this.register(this.state.first_name, this.state.last_name,this.state.email,this.state.password);
  }



render() {
    return (
     <div className="ClientRegistration">
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