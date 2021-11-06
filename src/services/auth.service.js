import axios from 'axios'
import {mutators} from '../session/context/manager'

const API_URL = "http://localhost:8000/api/1.0/";

class AuthService{
    login(matricula, password){
        return axios
            .post(API_URL+"account/login",{matricula,password})
            .then((response)=>{
                    if(response.data.success){
                        console.log('axios working', response.data)
                        mutators('setUser',response.data);
                    }
                return response.data;
            });
    }

    logout(){
        const loggedout = mutators('removeUser',"");
        if(loggedout){
            return true
        }
        return false
    }
}

export default new AuthService();