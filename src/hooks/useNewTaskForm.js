import {useState, useEffect} from 'react'
import task_v2Service from '../services/task_v2.service'
import { viewers } from "../session/context/manager";

export function useNewTaskForm(initialValue={description:''},loggedIn ){
    const [formValues, setFormValues] = useState(initialValue)
    const [open, setOpen] = useState(false)
    const [creator_id, setCreator_id] = useState(null)
    
    useEffect(()=>{
        const init =()=>{
            const {_id} = viewers('getUser')
            setCreator_id(_id)
            setFormValues({
                ...formValues,
                creator_id,
            })
        }
        init()
    },[loggedIn])
    
    const handleChangeForm=(event)=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    }

    const handleReset=()=>{
        setFormValues(initialValue)
    }

    const sendForm = ()=>{
        console.log('user' ,formValues)
        // task_v2Service.createTask(formValues);
    }

    return [sendForm]
}