import axios from 'axios';

export class PollRepo {

    url = 'http://ec2-18-191-12-251.us-east-2.compute.amazonaws.com:8000/';
    config = {

    };

    createPoll (poll) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/newPoll/' + localStorage.getItem('id'), poll)
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        });
    }

    pollVote(post_id, answer_text, answer_count){
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/updateAnswerCount/' + post_id, {answer_count, answer_text})
            .then(resp => res(resp.data))
            .catch(resp => rej(resp));
        });
    }

    addTags(poll_id, tag_word) {
        return new Promise((resolve, reject) => {
            axios.put(this.url + 'user/newPoll/addTag/' + localStorage.getItem('id'), {poll_id, tag_word})
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    addOption(poll_id, answer_text) {
        return new Promise((resolve, reject) => {
            axios.put(this.url + 'user/newPoll/addOption/' + poll_id, {answer_text})
                .then(resp => resolve(resp.data))
                .catch(resp => reject(resp));
        })
    }

    getHomePolls() {
        return new Promise((res, rej) => {
            axios.get(this.url + 'pollsHome/' + localStorage.getItem('id'))
            .then(resp => res(resp.data))
            .catch(resp => rej(resp));
        })
    }

    getMyPolls() {
        return new Promise((res, rej) => {
            axios.get(this.url + 'user/getMyPolls/' + localStorage.getItem('id'))
            .then(resp => res(resp.data))
            .catch(resp => rej(resp));
        })
    }

    deletePoll(poll_id, creator_id) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/deletePoll/' + poll_id, {creator_id})
            .then(resp => res(resp.data))
            .catch(resp => rej(resp));

        })
    }

}