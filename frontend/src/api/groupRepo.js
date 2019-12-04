import axios from 'axios';

export class GroupRepo {

    url = 'http://ec2-18-191-12-251.us-east-2.compute.amazonaws.com:8000/';
    config = {

    };

    createGroup(group) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/createGroup/' + localStorage.getItem('id'), group)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

    getGroupMember(firstName, lastName) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/createGroup/findMembers', {firstName, lastName})
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }
}