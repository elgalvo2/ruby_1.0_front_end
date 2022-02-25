import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Button} from '@material-ui/core'
import styles from './createTaskForm.module.css'


export default function CreateTaskForm({open=false, methods}){
    return(
        <Dialog open={open} fullWidth onClose={()=>methods.handleClose()} >
            <DialogTitle>Crear Nueva Orden de Servicio</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline
                    onChange={(e)=>methods.handleChange(e)}
                    maxRows={3}
                    margin='dense'
                    name='description'
                    id='description'
                    label='Descripcion del trabajo'
                    type='text'
                    variant='outlined'
                />
            </DialogContent>
            <DialogActions style={{"marginTop":"15px"}}>
                <Button
                    className={styles.cancelB}
                    onClick={()=>methods.handleClose()}
                >
                    Cancelar
                </Button>
                <Button
                    className={styles.aceptarB}
                    onClick={()=>methods.handleSendTask()}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
