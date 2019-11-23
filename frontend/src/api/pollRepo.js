import axios from 'axios';

export class PollRepo {

    url = 'http://localhost:8000/';
    config = {

    };

    createPoll (poll) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/newPoll/' + localStorage.getItem('id'), poll)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        });
    }


}