import axios from 'axios';
import authHeader from './auth-header';
import {mutators} from '../session/context/manager'

const API_URL = process.env.REACT_APP_API_URL;

class AdminService{
    register(user){
        console.log(user.role)
        if(user.role=="TECNICO"){
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()})
            .then((data)=>{
                axios.get(API_URL+"account/technicians",{headers:authHeader()}).then((data)=>{
                    console.log('data from getting technicians', data.data.data)
                    const res = mutators('setTechnicians',data.data);
                    console.log('respuesta mutter', res);   
                })
                return data;
            }).catch((err)=>{
                console.error(err);
            })
        }else{
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()});
        }
        
    }
    
}

export default new AdminService();