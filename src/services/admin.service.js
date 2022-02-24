import axios from 'axios';
import authHeader from './auth-header';
import {mutators} from '../session/context/manager'


const API_URL = process.env.REACT_APP_API_URL;



class AdminService{
    register(user){
        if(user.role==="TECNICO"){
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()})
            .then((data)=>{
                axios.get(API_URL+"account/technicians",{headers:authHeader()}).then((data)=>{
                    
                    mutators('setTechnicians',data.data);
                    
                })
                return data.data;
            }).catch((err)=>{
                console.error(err);
            })
        }else if(user.role === 'OPERADOR'){
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()})
            .then((data)=>{
                axios.get(API_URL+"account/operators",{headers:authHeader()}).then((data)=>{
                    
                    mutators('setOperators',data.data);
                    
                })
                return data.data;
            }).catch((err)=>{
                console.error(err);
            })
        }
        else{
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()});
        }
        
    }
    send_order_topdf(order){
        return axios.post(API_URL+'pdf_generator/orden_compra',{order},{headers:authHeader()})
        .then((data)=>{
            if(data.data.success)
            return true
        }).catch((err)=>console.log(err))
    }

    get_pdf(name,type){
        return axios.get(API_URL+`pdf_generator/${type}`,{headers:{'Content-Type':"multipart/form-data"},responseType:"blob"})
        .then((data)=>{
            console.log(data)
            window.saveAs(data.data,`orden_${name}.pdf`)
            return true;
        }).catch(err=>err)
    }
    
    
}




export default new AdminService();