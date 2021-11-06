import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, TextField, Dialog, DialogContent,DialogActions,FormControl, DialogTitle, Typography, Grid} from '@material-ui/core';
import * as authActions from '../../actions/auth';
import * as message from '../../actions/message';
import AuthService from '../../services/auth.service';
import Linear from '../LinearProgress';
import {isValidEmail} from '../../helpers'

const initialValues = {
    email:"",
    password:"",
};

const initialErrors = {
    email:false,
    password:false,
};

const initialErrorText = {
    email:'',
    password:"",
}

export default function Login({open, methods}){

    const [openW , setOpenw] = useState(open);
    const [log, setLog] = useState(initialValues);
    const [errors , setErrors] = useState(initialErrors);
    const [sending, setSending] = useState(false);
    const [globalMessage, setGlobalMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorText, setErrorText] = useState(initialErrorText);
    
    const handleReset = ()=>{
        setErrors(initialErrors);
        setErrorText(initialErrorText);
        setLog(initialValues);
        setSending(false);
        setGlobalMessage('');
        setDisabled(false);
        
    };

    const handleEmailChange = (e)=>{
        setLog({...log,email:e.target.value});
        if(!isValidEmail(e.target.value)){
            let e = errors;
            let m = errorText;

            e.email = true;
            m.email = 'Email is invalid';

            setErrors(e);
            setErrorText(m)
        }else{
            let e = errors;
            let m = errorText;

            e.email = false;
            m.email = '';

            setErrors(e);
            setErrorText(m)
        }
    }

    const handlePasswordChange=(e)=>{
        setLog({...log,password:e.target.value});
        if(e.target.value.length<=5){
            let e = errors;
            let m = errorText;

            e.password = true;
            m.password = 'Passwrod length must be 6 at least';

            setErrors(e);
            setErrorText(m)
        }else{
            let e = errors;
            let m = errorText;

            e.password = false;
            m.password = '';

            setErrors(e);
            setErrorText(m)
        }
    }

    const handleLogin = ()=>{
        if(!errors.email && !errors.password ){
            setDisabled(true);
            setSending(true);
            AuthService.login(log.email, log.password)
                .then((data)=>{
                    setSending(false);
                    setGlobalMessage(JSON.stringify(data));
                    if(data.success){
                        setTimeout(()=>{
                        handleReset();
                        setErrorText(initialErrorText);
                        methods.setLogwindow(false);
                    },3000);
                    }else{
                        setDisabled(false);
                    }
                }).catch((err)=>{
                    setErrorText(initialErrorText);
                    setSending(false);
                    const message = err.message || err;
                    setGlobalMessage(message);
                    setDisabled(false);
                })
        }else{
            setGlobalMessage('Completa el formulario correctamente'); 
        }
    }

    const handleClose = ()=>{
        handleReset();
        methods.setLogwindow(false);
    }



    return(
        <>
            <Dialog open={openW} onClose={handleReset} maxWidth='xs' fullWidth={true}>
                <DialogTitle>
                    <Grid container direction = 'column'>
                        <Grid item><Typography variant = 'h5'>LOG IN</Typography></Grid>
                        <Grid item>{(sending)&&<Linear/>}</Grid>
                    </Grid>
                    </DialogTitle>
                <DialogContent>
                    <>
                        <FormControl>
                            {(globalMessage!='')&&<Typography variant = 'body'>{globalMessage}</Typography>}
                            <TextField
                                margin="dense"
                                value = {log.email}
                                error = {errors.email}
                                helperText={errorText.email}
                                onChange= {(e)=>handleEmailChange(e)}
                                id='email'
                                label='Email'
                                type = "text"
                            />
                            <TextField
                                margin="dense"
                                value = {log.password}
                                error = {errors.password}
                                helperText = {errorText.password}
                                onChange= {(e)=>handlePasswordChange(e)}
                                id='password'
                                label='Contraseña'
                                type = 'password'
                            />
                        </FormControl>
                    </>
                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin} disabled = {disabled} color = 'primary' variant = 'contained'>Log In</Button>

                </DialogActions>
            </Dialog>
        </>
    );
}
