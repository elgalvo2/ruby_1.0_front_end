import React, {useState,useEffect} from "react";
import authService from '../services/auth.service'
import {viewers} from '../session/context/manager'

export function useSessionForm(initalValue={}){
    const [formValues, setFormValues] = useState(initalValue);
    const [logedin, setLogedIn] = useState(false)
    const [openSesionCloseDialog, setOpenCloseSesionDialog] = useState(false)
    const [sessionError, setSessionError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(()=>{
        const newSession=()=>{
            
            const sessionAlive = viewers('getUser')
            if(sessionAlive._id){
                setLogedIn(true)
            }else{
                authService.logout()
            }
        }
        newSession()
    },[])

    // useEffect(()=>{
    //     const comprobeSession= ()=>{
    //         if(!logedin){
    //         }
    //     }
    //     comprobeSession()
    // },[logedin])

    
    const handleChangeForm=(event)=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    }


    const sessionInit = ()=>{
        const {matricula, password} = formValues;
        authService.login(matricula,password)
        .then((data)=>{
            if(data.success){
                setLogedIn(true)
                setFormValues(initalValue)
                setSessionError(false)
            }else{
                setSessionError(true)
                setErrorMessage(data.error)

            }

        })
    }

    const sessionClose = () =>{
        setOpenCloseSesionDialog(false)
        authService.logout();
        setLogedIn(false) 
    }


    return [formValues,logedin,openSesionCloseDialog,sessionError,errorMessage,handleChangeForm,sessionInit,sessionClose, setOpenCloseSesionDialog]


}