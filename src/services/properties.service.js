import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class PropertyService{
    register(property){
        return axios.post(API_URL+'properties/setProperty',{property},{headers:authHeader()})
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
    updateProperty(update){
        return axios.post(API_URL+'properties/updateProperty',{update},{headers:authHeader()})
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
    deleteProperty(id){
        return axios.delete(API_URL+'properties/deleteProperty',{id},{headers:authHeader()})
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
    getProperties(){
        return axios.get(API_URL+'properties/getProperties',{headers:authHeader()})
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
    getProperty(id){
        return axios.get(API_URL+`properties/${id}`,{headers:authHeader()})
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

export default new PropertyService();