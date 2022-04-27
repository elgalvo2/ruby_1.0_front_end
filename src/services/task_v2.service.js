import axios from 'axios';
import authHeader from './auth-header';
import { mutators, viewers } from '../session/context/manager'

const API_URL = process.env.REACT_APP_API_URL;

class Task_v2Service {
    markTaskAsDone(id) {
        return axios.put(API_URL + `task_v2/markAsDone/${id}`, { headers: authHeader() })
            .then((data) => {
                if (data.data.success) {
                    const contextTasks = viewers('getTasks');
                    var filteredTasks = contextTasks.filter(function (task) {
                        return task._id !== id
                    })
                    mutators('setTasks', {data:filteredTasks});
                    return data.data
                }else{
                    console.log(data.data)
                    return data.data
                }

            }).catch((err) => {
                return err.message
            })
    }
    getTasks() {
        return axios.get(API_URL + 'task_v2/', { headers: authHeader() })
            .then((data) => {
                if (data.data.success) {
                    // mutators('setTasks',data.data)
                    return data.data
                }
                return data.data
            }).catch((err) => {
                return err.message
            })
    }
    getTasksByCreator(_id) {
        return axios.get(API_URL + `task_v2/getByCreator/${_id}`, { headers: authHeader() })
            .then((data) => {
                if (data.data.success) {
                    // mutators('setTasks',data.data.data)
                }
                return data.data
            })
    }
    createTask(info) {
        return axios.post(API_URL + 'task_v2/create', info, { headers: authHeader() })
            .then((data) => {
                if (data.data.success) {
                    const tasks = viewers('getTasks')
                    console.log('tasks en taskv2 service', tasks)
                    const update_context = { data: [...tasks, data.data.data] }
                    mutators('setTasks', update_context)
                    return data.data
                }
                return data.data
            }).catch((err) => {
                return err.message
            })
    }
    deleteTask(id) {
        return axios.delete(API_URL + `task_v2/${id}`)
            .then((data) => {
                if (data.data.success) {
                    const contextTasks = viewers('getTasks');
                    var filteredTasks = contextTasks.filter(function (task) {
                        return task._id !== id
                    })
                    mutators('setTasks', {data:filteredTasks});
                    return data.data
                }
                return data.data

            }).catch((err) => {
                return err.message
            })
    }

}



export default new Task_v2Service();