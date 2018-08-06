//import axios from 'axios';


export default class AuthService{

	loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        console.log(token);
        let x = !!token && !this.isTokenExpired(token);
        console.log(!!token)
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
        	
            const expDate = localStorage.getItem('expDate');
            console.log(expDate);

            let time_now = new Date();
            console.log(time_now);
            let time_expires = new Date(expDate);
            console.log(time_expires);

            if (time_now > time_expires) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken, expDate) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
        localStorage.setItem('expDate', expDate)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

	getProfile() {
        // Using jwt-decode npm package to decode the token
        return this.getToken();
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }
}