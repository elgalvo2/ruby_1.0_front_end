import React from 'react'
import styles from './register_user_formV2.module.css'
import { TextField, Button, Select, MenuItem,IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

export default function Register_user_formV2({ methods, helperText = '', props = {
    matricula: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm_password: '',
    role: ''
}, error = {
    matricula: '',
    password: '',
    confirm_password: '',
    role: '',
    form:''
} , visibility=false, ready=false}) {
    return (
        <div className={styles.layout}>
            
            <div className={styles.formulario}>
                <div className={styles.field}>
                    <TextField
                        margin='dense'
                        onChange={(e)=>methods.handleChange(e)}
                        value={props.matricula}
                        id='matricula'
                        name='matricula'
                        error={error.matricula}
                        helperText={error.matricula}
                        label='Matricula'
                        type='text'
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        fullWidth
                        margin='dense'
                        onChange={(e)=>methods.handleChange(e)}
                        value={props.firstName}
                        id='firstName'
                        name='firstName'
                        label='Nombre'
                        type='text'
                    />
                </div>
                <div className={styles.field}>
                    <TextField
                        margin='dense'
                        onChange={(e)=>methods.handleChange(e)}
                        fullWidth
                        value={props.lastName}
                        name='lastName'
                        id='lastName'
                        label='Apellido'
                        type='text'
                    />
                </div>
                <div className={styles.password}>
                    <TextField
                        margin='dense'
                        onChange={(e)=>methods.handleChange(e)}
                        value={props.password}
                        className={styles.passwordfield}
                        id='password'
                        name='password'
                        label="Contraseña"
                        error={error.password}
                        helperText={error.password}
                        type={(visibility)?'text':'password'}
                    />
                    <IconButton className={styles.visible} onClick={()=>methods.setPasswordVisible(!visibility)}>
                    {(visibility)?<VisibilityOffIcon/>:<VisibilityIcon/>}
                    </IconButton>
                    
                    
                </div>
                <div className={styles.password}>
                    <TextField
                    onChange={(e)=>methods.handleChange(e)}
                        className={styles.passwordfield}
                        margin='dense'
                        value={props.confirm_password}
                        name='confirm_password'
                        id='confirm_password'
                        label="Confirmar Contraseña"
                        error={error.confirm_password}
                        helperText={error.confirm_password}
                        type={(visibility)?'text':'password'}
                    />
                </div>
                <div className={styles.field}>
                    <Select
                        className={styles.selector}

                        label="Rol"
                        id="rol"
                        name='rol'
                        value={props.role}
                        displayEmpty
                        onChange={(e)=>{methods.handleMenu(e.target.value)}}
                    >
                        <MenuItem value="AUO">
                            AUO
                        </MenuItem>
                        <MenuItem value="TECNICO">
                            Tecnico
                        </MenuItem>
                        <MenuItem value="OPERADOR">
                            Operador
                        </MenuItem>
                        <MenuItem value="">
                            Selecciona Rol
                        </MenuItem>
                    </Select>
                </div>
                <div className={styles.botones}>
                    <Button className={styles.limpiar} onClick={()=>methods.handleClean()}>Limpiar</Button>
                    <Button className={styles.continuar} disabled={!ready} onClick={()=>methods.handleSend()}>Continuar </Button>
                </div>
            </div>
        </div>
    )
}