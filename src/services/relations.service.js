import axios from 'axios';
import authHeader from './auth-header';
import { mutators, viewers } from '../session/context/manager'

const API_URL = process.env.REACT_APP_API_URL;

class Relations_Service {
    getTaskRelationByArea(area_id){
        return axios.get(API_URL+`tasks_relations/createTaskRelationByArea/${area_id}`,{headers:{'Content-Type':"multipart/form-data"},responseType:"blob"})
        .then((data)=>{
            console.log('data in relations sevice',data.data)
            window.saveAs(data.data,'relacion_ordenes.pdf')
            return data.data
        }).catch((err)=>{
            return err
        })
    }
}



export default new Relations_Service();