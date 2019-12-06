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

    registerCandidate(candidate) {
        return new Promise((resolve, reject) => {
            axios.post(this.url + 'register/politician', candidate)
            .then(resp => resolve(resp.data))
            .catch(resp => reject(resp));
        })
    }

    getCandidate(id) {
        return new Promise((resolve, reject) => {
            axios.get(this.url + 'user/getPoliticianInfo/' + id)
            .then(resp => resolve(resp.data))
            .catch(resp => reject(resp));
        })
    }

    changeOfficePhone(office_phone) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/politician/updateOfficePhone/' + localStorage.getItem('id'), { office_phone })
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

    changeOfficeEmail(office_email) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/politician/updateOfficeEmail/' + localStorage.getItem('id'), { office_email })
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

    changeCandidateType(politician_type) {
        return new Promise((res, rej) => {
            axios.put(this.url + 'user/politician/updatePoliticianType/' + localStorage.getItem('id'), { politician_type })
                .then(resp => {
                    res(resp.data);
                })
                .catch(resp => rej(resp));
        })
    }

}