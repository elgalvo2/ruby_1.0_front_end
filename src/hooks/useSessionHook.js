import { useState, useEffect, useRef } from "react";
import authService from "../services/auth.service";
import { viewers } from "../session/context/manager";


export function useSession(initalValue={}){
    const [formValues, setFormValues] = useState(initalValue);
    const [logedin, setLogedIn] = useState(false)

    

    useEffect(()=>{
        const verifySession = () =>{
            setInterval(()=>{
                setLogedIn(viewers('getSessionState'))
            },60000)     
        }
        verifySession()
    },[])


    const handleChangeForm=(event)=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        })
    }

   

    const sessionInit = ()=>{
        const {matricula, password} = formValues;
        setFormValues(initalValue)
        authService.login(matricula,password)
        .then((data)=>{
            console.log('data in useSessionhook',data)
            if(data.sucess){
                setLogedIn(viewers('getSessionState')) 
            }
            else{
                console.log(data.error)
            }
        })
    }

    const sessionClose = () =>{
        authService.logout();
        setLogedIn(viewers('getSessionState')) 
    }

    return [formValues,logedin, handleChangeForm,  sessionInit, sessionClose]


}