import axios from 'axios'
import {mutators} from '../session/context/manager'
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class AuthService{
    login(matricula, password){

        return axios
            .post(API_URL+"account/login",{matricula,password})
            .then((response)=>{
                    
                    if(response.data.success){
                        mutators('setUser',response.data);
                        axios.get(API_URL+"account/technicians",{headers:authHeader()}).then((data)=>{
                            mutators('setTechnicians',data.data);            
                        })
                        
                    }
                
                return response.data;
            }).catch((err)=>{
                return err
            });
    }

    logout(){
        
        const loggedout = mutators('removeUser',"");
        if(loggedout){
            let removed = mutators('removeTechnicians',"");
            
            if(removed){
                return true
            }else{
                return false
            }
        
        }
        return false
    }
}

export default new AuthService();