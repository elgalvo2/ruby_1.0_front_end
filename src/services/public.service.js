import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.API_URL;

class PublicService{
    getPublicInfo(email){
        return axios.post(API_URL+"account/current_user",{email},{headers:authHeader});
    }
}

export default new PublicService();