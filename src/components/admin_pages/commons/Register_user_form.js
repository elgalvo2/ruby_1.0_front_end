import React, {useEffect, useState} from 'react';
import {viewers} from '../../../session/context/manager'
import {TextField,Paper,Grid,FormControlLabel,Select,FormControl,Typography, MenuItem, Menu, Button} from '@material-ui/core'


const initialValues = {
    matricula:"",
    password:'',
    confirm_password:"",
    firstName:"",
    lastName:"",
    role:null
}

const roles = {
    sudo:["ADMIN","TECNICO","AUO"],
    admin:["TECNICO","AUO"],
}




export default function Register_user_form ({to_signup}){

    const [form, setForm] = useState(initialValues);
    const [error, setError] = useState(false);
    const [verifyPasswordError, setVerifyPasswordError] = useState(false);
    const [matriculaError, setMatriculaError] = useState(false);

    const [global_error, setGlobal_error] = useState(false);
    const [next, setNext] = useState(false);
    const [rol, setRol] = useState([]);

    useEffect(()=>{
        const setRegRole = ()=>{
            const user = viewers('getUser');
            if(user.role==="SUDO"){
                setRol(roles.sudo);
            };
            if(user.role === "ADMIN"){
                setRol(roles.admin);
            }
            
        }
        setRegRole();
    })

    useEffect(()=>{
        const check_password = ()=>{

            var matriculaValidator = ~~(form.matricula)
            if(matriculaValidator===0 && form.matricula!=''){
                setMatriculaError('La matricula solo puede contener numeros')
            }else{
                if(form.matricula!=0 && form.matricula.length!=8){
                    setMatriculaError('La matricula debe contener 8 numeros')
                }else{
                    setMatriculaError(false)
                }
            }

            


            if(form.password.length!=0 && form.password.length<8){
                setError('La contraseña debe tener almenos 8 caracteres');
            }else{
                setError(false);
            }

            if(form.confirm_password.length!=0 && (form.confirm_password!=form.password)){
                setVerifyPasswordError('Las contraseñas no coinciden');
            }else{
                setVerifyPasswordError(false);
            }

            if(form.matricula && form.lastName && form.lastName && form.role && !error && !verifyPasswordError){
                setNext(true)
            }else{
                setNext(false)
            }
           
        }
        check_password();
    },[form])

    const handleContinue = ()=>{
        const f = form;
        delete f.confirm_password;
        to_signup(f);
        handleReset();
    }   

    const handleReset = ()=>{
        setForm(initialValues);
        setNext(false);
    }

    return(
        <Grid container direction='column' alingItems='center' justifyContent='center' component={Paper} elevation={3} spacing={5}>
            <Grid item lg={5} md={5} >
                <Typography>Registro de Usuario</Typography>
                <FormControl>
                    <TextField 
                        margin='dense'
                        value={form.matricula}
                        onChange={(e)=>setForm({...form,matricula: e.target.value})}
                        id='matricula'
                        error= {matriculaError}
                        helperText={matriculaError}
                        label='Matricula'
                        type='text'
                    />
                    <TextField 
                        margin='dense'
                        value={form.firstName}
                        onChange={(e)=>setForm({...form,firstName: e.target.value})}
                        id='nombre'
                        label='Nombre'
                        type='text'
                    />
                    <TextField 
                        margin='dense'
                        value={form.lastName}
                        onChange={(e)=>setForm({...form,lastName: e.target.value})}
                        id='apellido'
                        label='Apellido'
                        type='text'
                    />
                    <TextField
                        margin='dense'
                        value={form.password}
                        onChange={(e)=>setForm({...form,password: e.target.value})}
                        id='password'
                        label="Contraseña"
                        error= {error}
                        helperText={error}
                        type='text'
                    />
                     <TextField
                        margin='dense'
                        value={form.confirm_password}
                        onChange={(e)=>setForm({...form,confirm_password: e.target.value})}
                        id='confirm_password'
                        label="Confirmar Contraseña"
                        error= {verifyPasswordError}
                        helperText={verifyPasswordError}
                        type='text'
                    />
                    <Select
                        label="tecnico"
                        id="tecnico"
                        value={form.role}
                        onChange={(e)=>setForm({...form,role: e.target.value})}
                        displayEmpty
                    >
                        <MenuItem value="">
                            Selecciona Rol
                        </MenuItem>
                        {rol.map((el)=>(
                            <MenuItem value={el}>{el}</MenuItem>
                        ))}
                    </Select>  
                                 
                </FormControl>
            </Grid>
            <Grid container direction='row' aligItems='center'>
                        <Grid itme><Button onClick={handleReset}>Limpiar</Button></Grid>
                        <Grid itme><Button onClick={handleContinue} disabled={!next}>Continuar </Button></Grid>
                    </Grid> 
        </Grid>        
    )
}