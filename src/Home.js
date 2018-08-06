import React, { Component } from "react";
import {Button} from "react-bootstrap";
import Center from 'react-center';
import { Link } from "react-router-dom";
import "./Home.css";
import logo from './Homewise.png'

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
         <Center>
            <img src={logo} style={{width: 60, height: 70, paddingBottom: 0, textAlign: 'center'}}/>
          </Center>
          <h1>HomeWise</h1>
          <p>A personal assistant at your fingertips</p>
          <Button
            block
            bsSize="large"
            onClick={() => this.props.history.replace('/ClientReg')}
          >
            Client Registration
          </Button>
      <Button
            block
            bsSize="large"
            onClick={() => this.props.history.replace('/Reg')}
          >
            Registration
          </Button>  
      <Button
            block
            bsSize="large"
            onClick={() => this.props.history.replace('/VendorReg')}
          >
            Vendor Registration
      </Button>  
      <p> If already a user, please click <Link to="/login">here</Link> </p>
        </div>
      </div>
    );
  }
}