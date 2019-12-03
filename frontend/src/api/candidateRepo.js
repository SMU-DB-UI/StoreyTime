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

}