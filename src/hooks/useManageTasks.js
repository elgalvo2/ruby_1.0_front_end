import { useState, useEffect } from 'react'
import task_v2Service from '../services/task_v2.service'
import { viewers } from '../session/context/manager'
import setOperators from '../session/context/setOperators'

export function useManageTasks(logedin, newTask) {
    const [tasks, setTasks] = useState([])
    const [openSendMarkDone, setOpenMarkDone] = useState(false)
    const [markDoneId, SetMarkDoneId] = useState('')

    useEffect(() => {
        const getTasks = () => {
            if (logedin) {
                const { _id } = viewers('getUser')
                const areas = viewers('getAreas')
                const tasks = viewers('getTasks')
                
                // const readyTasks = tasks.map((task)=>{
                //     const task_area = areas.map(function(area){
                //             console.log('area',area)
                //             // if(area._id == task.area_id){
                //             //     return area
                //             // }
                //         })
                    
                //     if(task_area){
                //         task.area_name = task_area.name
                //         return task
                //     }else{
                //         task.area_name = 'UNKNOW'
                //         return task
                //     }
                // })
                const readyTasks = areas.map((area)=>{
                    var areaTask = tasks.filter(function(task){
                        return task.area_id === area._id;
                    })
                    var namedTasks = areaTask.map((task)=>{
                        task.area_name = area.name
                        return task
                    }) 
                    return namedTasks

                })


                setTasks(tasks)
                // task_v2Service.getTasksByCreator(_id)
                //     .then((data) => {
                //         if (data.success) {
                //             const unDoneTasks = data.data.filter(function (task) {
                //                 return task.done === false
                //             })
                //             const readyTasks = unDoneTasks.map((task)=>{
                //                 const task_area = areas.find(function(area){
                //                     return area._id = task._id
                //                 })
                                
                //                 if(task_area){
                //                     task.area_name = task_area.name
                //                     return task
                //                 }else{
                //                     task.area_name = 'UNKNOW'
                //                     return task
                //                 }
                //             })
                //             console.log('reade tasks',readyTasks)
                            
                //             setTasks(readyTasks)
                //         }
                //     })
            } else {
                setTasks([])
            }
        }
        getTasks()
    }, [logedin, newTask,openSendMarkDone])

    const removetask = (taskid) => {
        task_v2Service.deleteTask(taskid)
            .then((data) => {
                if (data.success) {

                    const filtered_tasks = tasks.filter(function (task) {
                        return task._id !== taskid
                    })
                    setTasks(filtered_tasks)
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
                    setOpenMarkDone(false)
                    SetMarkDoneId('')
                }
            })
    }

    const handleMarkDone = (open, id = '') => {
        if (open) {
            setOpenMarkDone(true)
            SetMarkDoneId(id)
        } else {
            setOpenMarkDone(false)
            SetMarkDoneId('')
        }


    }

    return [tasks, openSendMarkDone, markDoneId, removetask, markAsDone, handleMarkDone]



}