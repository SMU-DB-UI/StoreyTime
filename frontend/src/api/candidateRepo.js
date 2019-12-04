import axios from 'axios';

export class CandidateRepo {
    
    url = 'http://ec2-18-191-12-251.us-east-2.compute.amazonaws.com:8000/';
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