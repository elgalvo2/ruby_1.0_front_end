import { useState, useEffect } from 'react'
import task_v2Service from '../services/task_v2.service'
import { viewers } from '../session/context/manager'
import setOperators from '../session/context/setOperators'

export function useManageTasks(logedin, newTask) {
    const [tasks, setTasks] = useState([])
    const [openSendMarkDone, setOpenMarkDone] = useState(false)
    const [markDoneId, SetMarkDoneId] = useState('')
    const [folio,setFolio] = useState('')
    const [openDeleteTask, setOpenDeleteTask] = useState(false)
    const [deleteTaskID, setDeleteTaskId] = useState('')

    useEffect(() => {
        const getTasks = () => {
            if (logedin) {
                const { _id } = viewers('getUser')
                const areas = viewers('getAreas')
                const tasks = viewers('getTasks')
                console.log(tasks)
                var UnDoneTasks = tasks.filter(function(task){
                    return task.done === false
                })

                console.log('UnDoneTasks',UnDoneTasks)
                
                var namedTasks = UnDoneTasks.map((task)=>{
                    const area_name = areas.find(function(area){
                        return area._id == task.area_id 
                    })
                    console.log('area_name',area_name)
                    task.area_name = area_name.name
                    return task
                })
                console.log('namedTasks',namedTasks)
                setTasks(UnDoneTasks)
            } else {
                setTasks([])
            }
        }
        getTasks()
    }, [logedin, newTask, openSendMarkDone])

    const removetask = () => {
        task_v2Service.deleteTask(deleteTaskID)
            .then((data) => {
                if (data.success) {
                    const filtered_tasks = tasks.filter(function (task) {
                        return task._id !== deleteTaskID
                    })
                    setTasks(filtered_tasks)
                    handleDeleteTask(false,'','')
                }
            })
    }

    const markAsDone = () => {
        task_v2Service.markTaskAsDone(markDoneId)
            .then((data) => {
                if (data.success) {

                    const filtered_tasks = tasks.filter(function (task) {
                        return tasks._id !== markDoneId
                    })
                    setTasks(filtered_tasks)
                    handleMarkDone(false,'','')
                }
            })
    }

    const handleMarkDone = (open, id = '', folio) => {
        
            setOpenMarkDone(open)
            SetMarkDoneId(id)
            setFolio(folio)
        


    }

    const handleDeleteTask = (open, id = '',folio) => {

        setDeleteTaskId(id)
        setOpenDeleteTask(open)
        setFolio(folio)
        


    }

    return [tasks, openSendMarkDone, markDoneId, removetask, markAsDone, handleMarkDone,handleDeleteTask,openDeleteTask,folio]



}