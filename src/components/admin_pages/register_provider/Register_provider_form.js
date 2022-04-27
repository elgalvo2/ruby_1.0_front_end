import React, {useEffect, useState} from 'react';
import {viewers} from '../../../session/context/manager'
import isValidEmail from '../../../helpers/isValidEmail'
import {TextField,Paper,Grid,FormControlLabel,Select,FormControl,Typography, MenuItem, Menu, Button} from '@material-ui/core'


const initialValues ={
    provider_no:null,
    razon_social:"",
    rep_legal:"",
    rfc:"",
    domicilio:"",
    telefono:null,
    email:"",
    giro:""
}




export default function Register_provider_form(){

    const [form, setForm] = useState(initialValues);
    const [error, setError] = useState(false);
    const [next, setNext] = useState(false);

    const handleChangeEmail = (e)=>{
        const isEmail = isValidEmail(e.target.value);
        if(!isEmail){
            setError(true);
        }else{
            setError(false);
        }
        setForm({...form,email:e.target.value})
    }

    useEffect(()=>{
        const varifiedFields = ()=>{
            if(form.email=="" || error == true){
                setNext(false)
            }else{
                console.log('entra aui en el useState')
                setNext(true)
            }
        }
        varifiedFields();
    },[form])


    
 
    return(
        <Grid container direction='column' alingItems='center' justifyContent='center' component={Paper} elevation={3} spacing={5}>
            <Grid item lg={5} md={5} >
                <Typography>Registrar de Propiedad</Typography>
                <FormControl>
                    <TextField 
                        margin='dense'
                        value={form.provider_no}
                        onChange={(e)=>setForm({...form,provider_no: e.target.value})}
                        id='numero de proveedor'
                        label='Número de proveedor'
                        type='number'
                    />
                    <TextField 
                        margin='dense'
                        value={form.razon_social}
                        onChange={(e)=>setForm({...form,razon_social: e.target.value})}
                        id='razon_social'
                        label='Razon Social'
                        type='text'
                    />
                    <TextField 
                        margin='dense'
                        value={form.rep_legal}
                        onChange={(e)=>setForm({...form,rep_legal: e.target.value})}
                        id='rep_legal'
                        label='Representante legal'
                        type='text'
                    />
                    <TextField
                        margin='dense'
                        value={form.rfc}
                        onChange={(e)=>setForm({...form,rfc: e.target.value})}
                        id='rfc'
                        label="RFC"
                        type='text'
                    />
                     <TextField
                        margin='dense'
                        value={form.telefono}
                        onChange={(e)=>setForm({...form,telefono: e.target.value})}
                        id='telefono'
                        label="Telefono"                    
                        type='number'
                    />
                     <TextField
                        margin='dense'
                        value={form.email}
                        onChange={(e)=>handleChangeEmail(e)}
                        error={error}
                        id='E-mail'
                        label="email"                    
                        type='text'
                    />
                                 
                </FormControl>
            </Grid>
            <Grid container direction='row' aligItems='center'>
                        <Grid itme><Button >Limpiar</Button></Grid>
                        <Grid itme><Button  disabled={!next}>Continuar </Button></Grid>
                    </Grid> 
        </Grid>        
    )
}