import axios from 'axios';
import authHeader from './auth-header';
import {mutators, viewers} from '../session/context/manager'


const API_URL = process.env.REACT_APP_API_URL;



class AdminService{
    register(user){
        if(user.role==="TECNICO"){
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()})
            .then((data)=>{
                const tech = viewers('getTechnicians')

                const {_id, firstName, lastName, matricula, role} = data.data.data;

                const updateContext ={data:[...tech,{
                    _id, firstName, lastName, matricula, role
                }]}

                console.log('setTechnicians',updateContext)

                mutators('setTechnicians',updateContext)

                console.log('tech afeter insertion',viewers('getTechnicians'))

                // axios.get(API_URL+"account/technicians",{headers:authHeader()}).then((data)=>{
                    
                //     mutators('setTechnicians',{data:data.data});
                    
                // })
                return data.data;
            }).catch((err)=>{
                console.error(err);
            })
        }else if(user.role === 'OPERADOR'){
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()})
            .then((data)=>{
                const tech = viewers('getOperators')

                const {_id, firstName, lastName, matricula, role} = data.data.data;

                const updateContext ={data:[...tech,{
                    _id, firstName, lastName, matricula, role
                }]}

                console.log('setOperators',updateContext)

                mutators('setOperators',updateContext)
                return data.data
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
    
    getTaskRelationByArea(area_id){
        return axios.get(API_URL+`tasks_relations/createTaskRelationByArea/${area_id}`,{headers:{'Content-Type':"multipart/form-data"},responseType:"blob"})
        .then((data)=>{
            
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(data.data)
            link.download =`task_relation-${new Date()}.pdf`
            link.click()
            link.remove()
            // window.saveAs(data)
            return true
        }).catch((err)=>{
            return err
        })
    }

    getTaskRelationByTechnician(technician_id){
        return axios.get(API_URL+`tasks_relations/createTaskRelationByTechnician/${technician_id}`,{headers:{'Content-Type':"multipart/form-data"},responseType:"blob"})
        .then((data)=>{
            
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(data.data)
            link.download =`task_relation-${new Date()}.pdf`
            link.click()
            link.remove()
            // window.saveAs(data)
            return true
        }).catch((err)=>{
            return err
        })
    }
    
}




export default new AdminService();