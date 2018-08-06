import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';


import Header from './components/Header';
import TimelineBox from './components/TimelineBox';
import SideNav from './components/SideNav';
import AuthService from './AuthService';
import withAuth from './withAuth';
import { withRouter } from 'react-router'
import steps from './steps.css'

import './static/fonts/font.css';
import './App.css';

const Auth = new AuthService();
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Steps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completedPercent: 0,
      selectedItemIndex: null,
      timelineItems: [],
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      client_type: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      vendor_region: '', 
      tags: '',
      steps_percentage: 0,
      commission_val: 0,
      total_steps: 0,
      total_steps_copy: 0,
      steps_complete: 0,
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


openModal(id, tags) {
    let vendor_region = this.state.vendor_region
    this.setState({modalIsOpen: true});
    console.log(id);
    console.log(tags);
    console.log(vendor_region);
    this.props.history.push({
    pathname: '/SingleStep',
    state: {id: id, tags: tags, vendor_region: vendor_region}
    })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    console.log('hi');
  }

  componentDidMount(){
   let email_var =  this.props.location.state.email
   let client_type_var = this.props.location.state.client_type;
    this.setState({
      email: email_var,
      client_type: client_type_var, 
    })
  let token = Auth.getToken();
  var config = {
        headers: {'Authorization': "Bearer " + token}
   };
  axios.post('http://127.0.0.1:8000/agent/GetClient/', {email: email_var, client_type: client_type_var }, config).then(resp => {
    console.log('Response', resp)
    let responseJson = resp.data
    this.setState({
      id: responseJson[0].id,
      first_name: responseJson[0].first_name,
      last_name: responseJson[0].last_name,
      email: responseJson[0].email,
      client_type: responseJson[0].client_type,
      phone_number: responseJson[0].phone_number,
      address: responseJson[0].address,
      city: responseJson[0].city,
      state: responseJson[0].state,
      zipcode: responseJson[0].zipcode,
      steps_percentage: responseJson[0].steps_percentage,
      total_steps: responseJson[0].total_steps,
      steps_complete: responseJson[0].steps_complete,
      commission_val: responseJson[0].commission_val,
      total_steps_copy: responseJson[0].total_steps,
      steps_complete_copy: responseJson[0].steps_complete,
      vendor_region: responseJson[0].vendor_region
    })
    console.log('data');
  }).catch(err => {
    console.log('Error', err.response)
  });
  var config = {
        headers: {'Authorization': "Bearer " + token}
   };
  axios.post('http://127.0.0.1:8000/agent/ClientSteps/', { email: email_var, client_type: client_type_var }, config).then(resp => {
    console.log('Response', resp)
    let responseJson = resp.data
    //alert(responseJson);
    this.setState({
      timelineItems: responseJson,
    })
    console.log('data');
  }).catch(err => {
    console.log('Error', err.response)
  });
}

  setPercent = (percent) => {
    this.setState({
      completedPercent: percent,
    })
  }

  onItemClick = (i) => {
    let newItems = this.state.timelineItems.map((item, index) => {
      item.selected = (index <= i ) ? true : false;
      return item;
    })
    this.setState({
      selectedItemIndex: i,
      timelineItems: newItems
    })
    if (i===0) {
      this.setPercent(Math.floor( 100 / this.state.timelineItems.length ))
    } else {
      this.setPercent(Math.floor((i+1) / this.state.timelineItems.length * 100))
    }
  }

  render() {
    const { selectedItemIndex, timelineItems } = this.state;
    let left_border_percent = 100;
    const timeline_count = timelineItems.length;

    if (selectedItemIndex === 0) {
      left_border_percent = 0
    } else {
      const percent_per_item = 100 / timeline_count;
      left_border_percent = Math.floor( percent_per_item * (selectedItemIndex + 1) - percent_per_item / 2 )
    }

    return (
      <div>
          <Header completedPercent={this.state.completedPercent} address={this.state.address} city={this.state.city} 
          state={this.state.state} first_name={this.state.first_name} last_name={this.state.last_name}/>

          <div className="common responsive">
            <div className="d-flex" style={{paddingBottom: 20, marginLeft: 95}}>

              <div className="timline-box">
        <p>Timeline</p>
        <div className="d-flex position-relative">
        <div className="timeline-border" style={{height: `${left_border_percent}%`}}/>
        <div className="timeline-cont">
            {
            timelineItems.map((item, i) => {
                return (
                <div className={"panel-piece cursor"} onClick={() => this.openModal(item.id, item.tags)}>
     
        <div className="item-cont">
            <div className={"item-pnl" + (item.first ? " first": "") + (item.last ? " last": "")  + (item.selected ? " selected" : "")}>
                <div className="item-cnt">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <p>{item.date}</p>
                        <p>{item.month}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-start flex-column">
                        <p>{item.name}</p>
                        <p>{item.date}</p>
                    </div>
                </div>
            </div>

            <div className={"check-pnl" + (item.selected ? " selected" : "")}>
                <i className="fa fa-check-circle" aria-hidden="true"></i>
            </div>
        </div>
    </div>
                )
            })
            }
        </div>
        </div>
    </div>
            </div>
          </div>
      </div>
    );
  }
}

export default withAuth(withRouter(Steps));
