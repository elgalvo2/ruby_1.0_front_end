import axios from 'axios'
import authHeader from './auth-header'


const API_URL = process.env.REACT_APP_API_URL;

class NeedService{
    newNeed(need){
        return axios.post(API_URL+"needs/setNeed",{need},{headers:authHeader()})
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
   
    setProvider(data){
        return axios.put(API_URL+'needs/setProvider',{data},{headers:authHeader()})
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
    setAuth(data){
        return axios.put(API_URL+'needs/setAuth',{data},{headers:authHeader()})
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
    setDates(data){
        return axios.put(API_URL+'needs/setDates',{data},{headers:authHeader()})
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
    setRecived(data){
        return axios.put(API_URL+'needs/setRecived',{data},{headers:authHeader()})
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
    setBill(data){
        return axios.put(API_URL+'needs/setBill',{data},{headers:authHeader()})
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
    setSendToSign(data){
        return axios.put(API_URL+'needs/setSendToSign',{data},{headers:authHeader()})
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
    markAsSigned(data){
        return axios.put(API_URL+'needs/signed',{data},{headers:authHeader()})
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
    setSendToPay(data){
        return axios.put(API_URL+'needs/setSendToPay',{data},{headers:authHeader()})
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
    getNeeds(){
        return axios.get(API_URL+'needs/getNeeds',{headers:authHeader()})
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
    deleteNeed(){
        return axios.delete(API_URL+'needs/deleteNeed',{headers:authHeader()})
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
    getNeed(need){
        return axios.get(API_URL+`needs/${need}`,{headers:authHeader()})
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

    updateNeed(data){
        return axios.put(API_URL+'needs/updateNeed',{data},{headers:authHeader()})
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
    updateNotes(data){
        return axios.put(API_URL+'needs/updateNotes',{data},{headers:authHeader()})
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

export default new NeedService()