import { useEffect, useState, useRef } from "react";
import ProviderService from "../services/provider.service";


export function useGetProviders(setError, setDone, setMessage){
    const [providers, setProviders] = useState([])
    const  isMounted = useRef(true);

    useEffect(()=>{
        return ()=>{isMounted.current =false }
    },[])

    useEffect(()=>{
        const reciving = ( ) =>{
            ProviderService.getProviders()
            .then((data)=>{
                if(data.success){
                    if(isMounted){
                        setProviders(data.data)
                    }
                    setError(false)
                    setDone(true)
                    setMessage('Proveedores cargados correctamente')
                }else{
                    setDone(false)
                    setError(true)
                    setMessage('Error Cargando los proveedores')
                }
            }).catch((err)=>{
                setDone(false)
                setError(true)
                setMessage(err.message)
            })
        }
        reciving()
        console.log(providers)
        console.log(isMounted)
    },[])
    return [providers]
}