import axios from 'axios';

export class UserRepo {

    url = 'http://localhost:8000/';
    config = {

    };

    registerUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'register', {body: user})
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        });
    }

    userLogin(user) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'login', { body: user })
                .then(resp => {
                    resolve(resp.data);
                    localStorage.setItem('email', resp.data.email);
                    localStorage.setItem('firstName', resp.data.firstName);
                    localStorage.setItem('lastName', resp.data.lastName);
                    localStorage.setItem('state', resp.data.state);
                    localStorage.setItem('user_type', resp.data.user_type);
                    localStorage.setItem('code', resp.data.code);
                    localStorage.setItem('id', resp.data.id);
                })
                .catch(resp => reject(resp));
        });
    }
}