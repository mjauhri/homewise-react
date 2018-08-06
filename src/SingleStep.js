import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import Center from 'react-center';
import axios from 'axios';
import moment from 'moment';
import AuthService from './AuthService';

const Auth = new AuthService();

class SingleStep extends Component {	
  constructor(props) {
    super(props);

    this.state = {
      client_id: '',
      id: '',
      name: '',
      name_copy: '',
      date: '',
      date_copy: '',
      tags: [],
      vendor_region: '',
      complete: false,
      modalVisible: false,

      vendors: [],

      editMode: false,
      updated: false
    }; 
  }


  handleChanges = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleChangeDate(date) {
    this.setState({
      date: date
    });
}

  componentDidMount(){
  	let token = Auth.getToken();
    let id_var =  this.props.location.state.id;
    let tags_var =  this.props.location.state.tags;
    let vendor_region_var =  this.props.location.state.vendor_region;
    console.log(id_var);
    console.log(tags_var);
    console.log(vendor_region_var);
    // Build fetch arguments
    var headerData = {
      'Authorization': 'Bearer ' + token 
    };
    axios.post('http://127.0.0.1:8000/agent/SingleStep/', {id:id_var}, headerData).then(resp => {
    console.log('Response', resp)
    let responseJson = resp.data
    this.setState({
      client_id: responseJson.client_id,
      id: responseJson.id,
      tags: responseJson.tags,
      name: responseJson.name,
      name_copy: responseJson.name,
      date: responseJson.date,
      date_copy: responseJson.date,
      complete: responseJson.complete, 
      vendor_region: responseJson.vendor_region
    })
    console.log('data');
  }).catch(err => {
    console.log('Error', err.response)
  });
  var config = {
        headers: {'Authorization': "Bearer " + token}
   };
  axios.post('http://127.0.0.1:8000/agent/GetVendors/', {vendor_region: vendor_region_var, tags: tags_var}, config)
  .then(resp => {
    console.log('Response', resp)
    let responseJson = resp.data
    console.log('vendor fetch')
    console.log(responseJson);
    if(responseJson != ""){
      this.setState({
        vendors: responseJson,
      })
    }
    console.log('data');
  }).catch(err => {
    console.log('vendor error')
    console.log('Error', err.response)
  }); 	
}

handleClick(){
  this.props.history.push({
    pathname: '/Steps',
    })
}
    // Fetch data
    /*fetch(url, {
      'method': 'POST',
      'headers': headerData,
      'body': JSON.stringify(bodyData)
    })
    .then((response) => {
      if (!response.ok) {
        // Handle error
        //alert('Error in response')
        //alert(response.status);
        //alert(response.statusText)
        console.log('error')
        console.log(response)
      } else {
        response.json().then((data) => {
            // Trigger refresh hook
            //hook = this.props.navigation.getParam('refresh_hook', () => {alert('No refresh hook found')});
            //hook();
            console.log('data')
            console.log(data)
            this.props.navigation.state.params.refresh();
            // Go to callback function
            callback(this, data);
        })
      }
    });*/

render() {
   let vendors = this.state.vendors;
   console.log(vendors);
   const listItems = vendors.map((item) =>
     <div onClick={() => this.handleClick()}>
      <li>{item.company_name} {item.phone_number} {item.email} {item.website_link}</li>
    </div>
   );
  return (
  	<div>
  	<label>Task</label>
  	 <TextField
          id="Name"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.name_copy}
          onChange={this.handleChanges}
          fullWidth
          margin="normal"
        />
    <label>Date</label>
  	 <DatePicker
        dateFormat="MM/DD/YYYY"
        showYearDropdown
        scrollableYearDropdown
        selected={moment(this.state.date)}
        onChange={this.handleChangeDate}
        />
        <ul> {listItems} </ul>
    </div>
  )
 }
}

export default SingleStep;