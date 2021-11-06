import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.API_URL;

class AdminService{
    register(email, password, firstName, lastName){
        return axios.post(API_URL+"account/signup",{email, password, firstName, lastName},{headers:authHeader});
            
    }
    getTasks(){
        return axios.get(API_URL+'tasks/',{headers:authHeader});
    }
    createTask(folio, created_date, description, area, material, done, done_date){
        return axios.post(API_URL+'tasks/',{folio, created_date, description, area, material, done, done_date},{headers:authHeader});
    }
    updateTask(task,folio){
        return axios.put(API_URL+`/${folio}`,{task},{headers:authHeader});
    }
    
}

export default new AdminService();