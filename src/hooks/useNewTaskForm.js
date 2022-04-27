import {useState, useEffect} from 'react'
import task_v2Service from '../services/task_v2.service'
import { viewers } from "../session/context/manager";

export function useNewTaskForm(initialValue={description:'',area_id:''},loggedIn ){
    const [areas, setAreas] = useState([])
    const [taskFormValues, setFormValues] = useState(initialValue)
    const [open, setOpen] = useState(false)
    const [creator_id, setCreator_id] = useState(null)
    const [newTask, setNewTask] = useState(false)
    
    useEffect(()=>{
        const init =(initialValue)=>{
            console.log('logedin in',loggedIn)
            if(loggedIn){
                const {_id} = viewers('getUser')
                const areas = viewers('getAreas')
                console.log(_id)
                setCreator_id(_id)
                setAreas(areas)
            }else{
                setFormValues(initialValue)
                setCreator_id(null)
            }
        }
        init(initialValue)
    },[loggedIn])


    useEffect(()=>{
        const opened = ( initialValue,creator_id,taskFormValues)=>{
            if(open){
                setFormValues({
                    ...taskFormValues,
                    creator_id,
                })
            }else{
                setFormValues(initialValue)
            }
        }
        opened(initialValue,creator_id,taskFormValues)
    },[open])
    
    const handleChangeTaskForm=(event)=>{
        setFormValues({
            ...taskFormValues,
            [event.target.name]:event.target.value
        })
        console.log(taskFormValues)
    }

    const handleClose=()=>{
        setFormValues(initialValue)
        setOpen(false)
    }

    

    const sendForm = ()=>{
        console.log('user' ,taskFormValues)
        task_v2Service.createTask(taskFormValues)
        .then((data)=>{
            console.log(data)
            if(data.success){
                handleClose()
                setNewTask(!newTask)
            }else{
                console.log(data)
            }
        })
    }

    return [open, taskFormValues,newTask,handleChangeTaskForm, sendForm, setOpen, handleClose, areas]
}