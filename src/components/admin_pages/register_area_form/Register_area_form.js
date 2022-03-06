import React from 'react'
import styles from './register_area_form.module.css'
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem } from '@material-ui/core'


export default function Register_area_form({ methods, readyToSend,props = {
    name: '',
    program: '',
    inOperation: true,
    operator_id: '',
    technician_id: ''
}, error = {
    name: '',
    program: '',
    inOperation: '',

}, operadores=[{
    _id:'',
    firstName:'operador1',
    lastName:'operador1'
}], tecnicos=[{
    _id:'',
    firstName:'tecnico1',
    lastName:'tecnico'
}] }) {
    return (
        <div className={styles.layout}>
            
            <div className={styles.formulario}>
                <div className={styles.field}>
                    <TextField
                        margin='dense'
                        // InputLabelProps={{ shrink: true }}
                        onChange={(e)=>methods.handleChangeAreaForm(e)}
                        value={props.name}
                        name='name'
                        id='name'
                        error={error.name}
                        helperText={error.name}
                        label='Nombre del area'
                        type='text'
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        fullWidth
                        margin='dense'
                        // InputLabelProps={{ shrink: true }}
                        onChange={(e)=>methods.handleChangeAreaForm(e)}
                        value={props.program}
                        id='program'
                        name='program'
                        error={error.program}
                        helperText={error.program}
                        label='Servicio asociado'
                        type='text'
                    />
                </div>
                <div className={styles.field}>
                    <Select
                        className={styles.selector}
                        onChange={(e)=>methods.handleChangeAreaForm(e)}
                        label="Operador"
                        id="operator_id"
                        name='operator_id'
                        value={(!props.operator_id)?'':props.operator_id}
                        displayEmpty
                        
                    >
                        <MenuItem value="" key={0}>
                            Seleccione operador
                        </MenuItem>
                        {(operadores.map((operador,index) => (
                            <MenuItem value={operador._id} key={index+1}>
                                {operador.firstName +' '+operador.lastName}
                            </MenuItem>
                        )))}

                    </Select>
                </div>
                <div className={styles.field}>
                <Select
                        className={styles.selector}

                        label="Tecnico"
                        id="technician_id"
                        name='technician_id'
                        value={props.technician_id}
                        displayEmpty
                        onChange={(e)=>methods.handleChangeAreaForm(e)}
                    >
                        <MenuItem value="" key={0}>
                            Seleccione tecnico
                        </MenuItem>
                        {(tecnicos.map((tecnico,index) => (
                            <MenuItem value={tecnico._id} key={index+1}>
                                {tecnico.firstName +' '+tecnico.lastName}
                            </MenuItem>
                        )))}

                    </Select>
                </div>
                <FormControlLabel control={<Checkbox checked={props.inOperation} onChange={(e)=>methods.handleChek(e)}/>} label='En operacion' />


                <div className={styles.botones}>
                    <Button className={styles.limpiar} onClick={()=>methods.handleResetAreaForm()}>Limpiar</Button>
                    <Button className={styles.continuar} disabled={!readyToSend} onClick={()=>methods.handleSendAreaForm()}> Continuar </Button>
                </div>
            </div>
        </div>
    )
}