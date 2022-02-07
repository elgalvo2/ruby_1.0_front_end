import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.REACT_APP_API_URL;

class ProviderService{
    register(provider){
        return axios.post(API_URL+'providers/register_provider',provider,{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                return data.data
            }
            else{
                return data.data.error;
            }
        }).catch((err)=>{
            return err.message
        })
    }
    getProviders(){
        return axios.get(API_URL+'providers/getProviders',{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                return data.data
            }
            else{
                return data.data.error;
            }
        }).catch((err)=>{
            return err.message
        })
    }
    getProviderByNumber(data){
        return axios.post(API_URL+'providers/getProviderByNumber',{data},{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                return data.data
            }
            else{
                return data.data.error;
            }
        }).catch((err)=>{
            return err.message
        })
    }
    updateProvider(data){
        return axios.post(API_URL+'providers/updateProvider',{data},{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                return data.data
            }
            else{
                return data.data.error;
            }
        }).catch((err)=>{
            return err.message
        })
    }

}
export default new ProviderService();