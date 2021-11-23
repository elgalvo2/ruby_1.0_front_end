import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

class AuoService{
    createTask(task){
        return axios.post(API_URL+'tasks',{task},{headers:authHeader()}); // crea un task nuevo
    }
    getAllTasks(){
        return axios.get(API_URL+'tasks/all',{headers:authHeader()}); // obtener todos los tasks
    }

    getTodayTask(){
        console.log('get today tasks at: ',API_URL+'tasks/today')
        return axios.get(API_URL+'tasks/today',{headers:authHeader()}); // obtener los task creados este dia
    }
    updateTask(task,folio){
        return axios.put(API_URL+`tasks/${folio}`,{task},{headers:authHeader()});
    }

    deleteTask(folio){
        return axios.delete(API_URL+`tasks/${folio}`,{headers:authHeader()});
    }
    
}

export default new AuoService(); 


