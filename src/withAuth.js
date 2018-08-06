import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    // Code here now
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
    	constructor() {
    		super();
    		this.state = {
    			user: null
    		}
    	}
    	componentWillMount() {
    		if (!Auth.loggedIn()) {
    			console.log('not logged in ');
    			this.props.history.replace('/')
    		}
    		else {
    			console.log('logged in');
    			try {
    				console.log('hi');
    				const agent = Auth.getProfile()
    				this.setState({
		                user: agent
		            });
    			}
    			catch(err){
    				alert('hi');
    				this.props.history.replace('/')
    			}
    		}
    	}
    	 render() {
    	 	if (this.state.user) {
    	 		return (
    	 			<AuthComponent history={this.props.history} user={this.state.user} />
    	 			)
    	 		} else {
    	 			return null
    	 		}
    	 	}
    }
}