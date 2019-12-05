import axios from 'axios';

export class CandidateRepo {

    url = 'http://localhost:8000/';
    config = {

    };

    getCandidates() {
        return new Promise((resolve, reject) => {
            axios.get(this.url + 'getPoliticians')
            .then(res => resolve(res.data))
            .catch(res => reject(res));
        })
    }

    registerCandidate(candidate) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'register/politician', candidate)
            .then(resp => resolve(resp.data))
            .catch(resp => reject(resp));
        })
    }

    getCandidate(id) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'user/getPoliticianInfo/' + id)
            .then(resp => resolve(resp.data))
            .catch(resp => reject(resp));
        })
    }

}