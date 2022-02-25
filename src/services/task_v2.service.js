import axios from 'axios';
import authHeader from './auth-header';
import { mutators,viewers } from '../session/context/manager'

const API_URL = process.env.REACT_APP_API_URL;

class Task_v2Service {
    markTaskAsDone(id){
        return axios.put(API_URL+`task_v2/markAsDone/${id}`,{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                const contextTasks = viewers('getTasks');
                var filteredTasks = contextTasks.filter(function(task){
                    return task._id!==id
                })
                mutators('setTasks',filteredTasks);
                return data
            }
            return data

        }).catch((err)=>{
            return err.message
        })
    }
    getTasks(){
        return axios.get(API_URL+'task_v2/',{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                mutators('setTasks',data.data)
                return data.data
            }
            return data.data
        }).catch((err)=>{
            return err.message
        })
    }
    createTask(info){
        return axios.post(API_URL+'task_v2/create',info,{headers:authHeader()})
        .then((data)=>{
            if(data.data.success){
                const tasks = viewers('getTasks')
                const updatedTasks = tasks.concat(info)
                mutators('setTasks',updatedTasks)
                return data.data
            }
            return data.data
        }).catch((err)=>{
            return err.message
        })
    }

}



export default new Task_v2Service();