import React from 'react'
import styles from './mobileDesk.module.css'
import { TextField, Button } from '@material-ui/core'
import MobileAppBar from '../mobile_app_bar/MobileAppBar';
import TaskCard from '../task_card/TaskCard';
import CreateTaskForm from '../create_task_form/CreateTaskForm';
import MarkDoneDialog from '../mark_done_modal/MarkDoneDialog';
import SessionInitForm from '../Session_init_form/SessionInitForm';
import { useSessionForm } from '../../hooks/useSessionForm';
import { useNewTaskForm } from '../../hooks/useNewTaskForm'
import SessionCloseDialog from '../sesion_close_dialog/SessionCloseDialog';
import { useManageTasks } from '../../hooks/useManageTasks';
import DeleteTaskModal from '../delete_task_modal/DeleteTaskModel';

const sessionInitalValue = { matricula: '', password: '' }
const newTaskInitialValue = {description:'',area_id:''}

export default function MobileDesk() {
    const width = window.innerWidth;
    const [formValues,logedin,openSesionCloseDialog,sessionError,errorMessage,handleChangeForm,sessionInit,sessionClose, setOpenCloseSesionDialog]= useSessionForm(sessionInitalValue)
    const [open, taskFormValues,newTask,handleChangeTaskForm, sendForm, setOpen, handleClose,areas] = useNewTaskForm(newTaskInitialValue,logedin)
    const  [tasks,openSendMarkDone, markDoneId,removetask,markAsDone,handleMarkDone, handleDeleteTask,openDeleteTask,folio]= useManageTasks(logedin,newTask)




    return (
        <>
            {(logedin) ?
                <>
                    <div className={styles.layout} style={{ width }}>
                        <div className={styles.appBar}>
                            <MobileAppBar methods={{ setOpenCloseSesionDialog }}/>
                        </div>
                        <div className={styles.visor}>
                            {tasks.map((task, index)=>(
                                <TaskCard methods={{handleMarkDone,handleDeleteTask}} key={index} cardData={task} onClick={()=>handleMarkDone(true,task._id)}/>
                            ))}
                        </div>
                        <Button className={styles.butto} onClick={()=>setOpen(true)}>+</Button>
                    </div>
                    <CreateTaskForm open={open} props={taskFormValues} methods={{handleClose,handleChangeTaskForm,sendForm}}  areas={areas}/>
                    <MarkDoneDialog open={openSendMarkDone} methods={{markAsDone,handleMarkDone}} folio={folio}/>
                    <SessionCloseDialog methods={{setOpenCloseSesionDialog,sessionClose}} open={openSesionCloseDialog}/>
                    <DeleteTaskModal open={openDeleteTask} methods={{handleDeleteTask,removetask}} folio={folio}/>
                </>
                : <SessionInitForm methods={{ handleChangeForm, sessionInit }} props={formValues} error={sessionError} errorMessage={errorMessage}/>}
        </>
    )
}