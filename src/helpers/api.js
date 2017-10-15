import axios from 'axios';

const API = axios.create({
    baseURL: 'https://zeroexchange.herokuapp.com'
});

export function getCompanyDetails(markerToken, takerToken) {
    return API.get(`/rates/${markerToken.toUpperCase()}-${takerToken.toUpperCase()}`);
}
