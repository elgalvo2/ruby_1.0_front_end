import React from "react";
import styles from './sessionInitForm.module.css'
import {Button,Typography,TextField} from '@material-ui/core'

export default function SessionInitForm({methods, props={matricula:'',password:''}}){
    let height = window.innerHeight;
    let width = window.innerWidth

    return(
        <div style={{height,width,backgroundColor:"#00a5e5"}}>
            <div className={styles.form}>
                <div className={styles.header}>
                    <Typography variant="h4">Iniciar Sesion</Typography>
                </div>
                <div className={styles.fields}>
                    <TextField
                        fullWidth
                        className={styles.field}
                        onChange={(e)=>methods.handleChangeForm(e)}
                        margin='dense'
                        value={props.matricula}
                        name='matricula'
                        id='matricula'
                        label='Matricula'
                        type='text'
                        variant='outlined'
                    />
                    <TextField
                        fullWidth
                        className={styles.field}
                        onChange={(e)=>methods.handleChangeForm(e)}
                        value={props.password}
                        margin='dense'
                        name='password'
                        id='password'
                        label='Contrasena'
                        type='password'
                        variant='outlined'
                    />
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.butt} onClick={()=>methods.sessionInit()}>Iniciar Sesion</Button>
                </div>
            </div>
        </div>
    )
}