import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class TechnicianService{
    getTechnicianTasks(){
        return axios.get(API_URL+`technicians/`,{headers:authHeader()}); // obtener todos los tasks
    }
    terminateTask(folio,report){
        return axios.post(API_URL+`technicians/terminateTask/${folio}`,{report},{headers:authHeader()});
    }
    updateReport(folio,update){
        return axios.put(API_URL+`technicians/updateReport/${folio}`,{update},{headers:authHeader()});
    }
    terminateTask_V01(folio){
        return axios.post(API_URL+`technicians/terminateTask/${folio}`,{headers:authHeader()});
    }

    
}

export default new TechnicianService(); 