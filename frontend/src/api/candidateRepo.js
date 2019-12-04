import axios from 'axios';

export class CandidateRepo {

    url = '';
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