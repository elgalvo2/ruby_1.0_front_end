import React from 'react'
import styles from './mobileDesk.module.css'
import { TextField, Button } from '@material-ui/core'
import MobileAppBar from '../mobile_app_bar/MobileAppBar';
import TaskCard from '../task_card/TaskCard';
import CreateTaskForm from '../create_task_form/CreateTaskForm';
import MarkDoneDialog from '../mark_done_modal/MarkDoneDialog';
import SessionInitForm from '../Session_init_form/SessionInitForm';
import { useSession } from '../../hooks/useSessionHook';
import { useNewTaskForm } from '../../hooks/useNewTaskForm';

const sessionInitialValues = {matricula:'',password:''}
const newTaskInitialValue = {description:''}


export default function MobileDesk() {
    const width = window.innerWidth;
    const [formValues, logedin, handleChangeForm, sessionInit, sessionClose] = useSession(sessionInitialValues)
    const [sendForm] = useNewTaskForm(newTaskInitialValue,logedin)



    return (
        <>
            {(logedin) ?
                <>
                    <div className={styles.layout} style={{ width }}>
                        <div className={styles.appBar}>
                            <MobileAppBar methods={{sessionClose}}/>
                        </div>
                        <div className={styles.visor}>
                            <TaskCard />
                        </div>
                        <Button className={styles.butto} onClick={()=>sendForm()}>+</Button>
                    </div>
                    <CreateTaskForm />
                    <MarkDoneDialog />
                </>
                :<SessionInitForm methods={{handleChangeForm, sessionInit}} props={formValues} />}
        </>
    )
}