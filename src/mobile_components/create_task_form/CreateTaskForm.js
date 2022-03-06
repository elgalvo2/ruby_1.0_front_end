import React from 'react'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControlLabel, Button, Select, MenuItem} from '@material-ui/core'
import styles from './createTaskForm.module.css'


export default function CreateTaskForm({open=false, methods, props={description:'',area_id:''},areas=[{_id:'',name:'Selecciona un area'}]}){
    console.log('props in task form',props)
    return(
        <Dialog open={open} fullWidth onClose={()=>methods.handleClose()} >
            <DialogTitle>Crear Nueva Orden de Servicio</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline
                    onChange={(e)=>methods.handleChangeTaskForm(e)}
                    maxRows={3}
                    value={props.description}
                    margin='dense'
                    name='description'
                    id='description'
                    label='Descripcion del trabajo'
                    type='text'
                    variant='outlined'
                />
                <Select
                    fullWidth
                    onChange={(e)=>methods.handleChangeTaskForm(e)}
                    value={props.area_id}
                    label='Selecciona un area'
                    id='area_id'
                    name='area_id'
                    displayEmpty
                >
                    <MenuItem value='' key={0}>
                            Selecciona un area
                        </MenuItem>
                    
                    {areas.map((area,index)=>(
                        <MenuItem value={area._id} key={index+1}>
                            {area.name}
                        </MenuItem>
                    ))}

                </Select>
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
                    onClick={()=>methods.sendForm()}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
