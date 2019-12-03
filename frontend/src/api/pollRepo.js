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

    addTags(poll_id, tag_word) {
        return new Promise((resolve, reject) => {
            axios.put(this.url + 'user/newPoll/addTags/' + localStorage.getItem('id'), {poll_id, tag_word})
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    addOption(poll_id, answer_text) {
        return new Promise((resolve, reject) => {
            axios.put(this.url + 'user/newPoll/addOption/' + poll_id, answer_text)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }


}