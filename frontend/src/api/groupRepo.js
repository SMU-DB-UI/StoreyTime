import axios from 'axios';

export class GroupRepo {

    url = 'http://localhost:8000/';
    config = {

    };

    createGroup(group_name) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/groups/createNewGroup/' + localStorage.getItem('id'), {group_name})
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp.data));
        });
    }

    getAllMembers(group_id) {
        return new Promise((resolve, reject) => {
            axios.get(this.url + 'user/group/getAllMembers/' + group_id)
            .then(resp => resolve(resp.data))
            .catch(resp => reject(resp.data));
        });
    }

    joinGroup(group_id, id){
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/group/addNewMembers/' + group_id, {id})
            .then(resp => resolve(resp.data))
            .catch(resp => reject(resp.data));
        });
    }

    getAllGroups() {
        return new Promise((res, rej) => {
            axios.get(this.url + 'getGroups')
            .then(resp => res(resp.data))
            .catch(resp => rej(resp.data));
        })
    }
}