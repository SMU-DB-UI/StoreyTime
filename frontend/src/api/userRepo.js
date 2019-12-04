import axios from 'axios';

export class UserRepo {

    url = 'http://ec2-18-191-12-251.us-east-2.compute.amazonaws.com/';
    config = {

    };

    registerUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'register', user)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        });
    }

    userLogin(user) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'login', user)
                .then(resp => {
                    resolve(resp.data);
                    localStorage.setItem('email', resp.data.email);
                    localStorage.setItem('firstName', resp.data.firstName);
                    localStorage.setItem('lastName', resp.data.lastName);
                    localStorage.setItem('state', resp.data.state_residence);
                    localStorage.setItem('user_type', resp.data.user_type);
                    localStorage.setItem('code', resp.data.code);
                    localStorage.setItem('id', resp.data.id);
                })
                .catch(resp => reject(resp));
        });
    }

    getUser(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.url + 'user/' + id)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

    changeFirstName(firstName) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/update/firstName/' + localStorage.getItem('id'), { firstName }, this.config)
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

    changeLastName(lastName) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/update/lastName/' + localStorage.getItem('id'), { lastName }, this.config)
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

    changeEmail(email) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/update/email/' + localStorage.getItem('id'), {email}, this.config)
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

    changePassword(pass) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/update/password/' + localStorage.getItem('id'), {pass}, this.config)
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

    changeState(state_residence) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/update/state_residence/' + localStorage.getItem('id'), {state_residence}, this.config)
                .then(resp => res(resp.data))
                .catch(resp => rej(resp));
        })
    }
}