import axios from 'axios';

export class GroupRepo {

    url = '';
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