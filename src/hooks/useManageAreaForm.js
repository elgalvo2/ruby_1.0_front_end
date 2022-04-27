import { useState, useEffect } from "react";
import { viewers } from "../session/context/manager";
import AreaService from "../services/area.service";

export function useManageAreaForm(
    initialValues = {
        name: '',
        program: '',
        inOperation: true,
        operator_id: '',
        technician_id: ''
    },setDone, setError, setMessage
) {
    const [form, setForm] = useState(initialValues);

    const [readyToSend, setReadyToSend] = useState(false);
    const [technician, setTechnicians]= useState([])
    const [operators, setOperators]= useState([])

    useEffect(()=>{
        const getTechnicians = ()=>{
            const techns = viewers('getTechnicians')
            setTechnicians(techns)
        }
        const getOperators = ()=>{
            const opera = viewers('getOperators')
            setOperators(opera)
        }
        getOperators()
        getTechnicians()
    },[])

    useEffect(()=>{
        const handleReadyToSend = (form)=>{
            
            if(form.name !== '' && form.program !== '' && form.operator_id !== '' && form.technician_id !== ''){
                setReadyToSend(true)
            }else{
                setReadyToSend(false)
            }
        }
        handleReadyToSend(form);
    },[form])

    
    
    const handleChangeAreaForm = (e) => {
        
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleChek = ( e) =>{
        setForm({
            ...form,
            'inOperation':e.target.checked
        })
    }

    const handleMenusAreaForm = (e) => {
        if(e.target.name==='operator_id' || e.target.name==='technician_id')
        setForm({
            ...form,
            [e.target.name]: e.target.value??''
        })
    }


    const handleResetForm = (value)=>{
        setForm(value)
    }

    const handleSendAreaForm = ()=>{
        console.log('areas disponibles',viewers('getAreas'))
        if(readyToSend){
                console.log('envio de formulario desde handle sender form: ',form)
            AreaService.registerArea(form)
            .then((data)=>{
                console.log('data en then formarea',data)
                if(data.success){
                    handleResetForm(initialValues)
                    setDone(true)
                    setMessage('Area registrada correctamente')
                }else{
                    setDone(true)
                    setError(true)
                    setMessage(data.error||'Error al registrar area')
                }
            }).catch((err)=>{
                    setDone(true)
                    setError(true)
                    setMessage(err||'Error al registrar area')
            })
        }else{
            console.log('no pueden enviar los datos... Hay errores en el formulario')
        }
    }



    return [form,handleResetForm, handleChangeAreaForm,handleMenusAreaForm, technician, operators, readyToSend, handleChek, handleSendAreaForm]



}