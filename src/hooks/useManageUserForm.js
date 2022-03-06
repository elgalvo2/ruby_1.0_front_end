import { useState, useEffect } from 'react'
import isValidForm from '../helpers/isValidForm';
import AdminService from '../services/admin.service'

export function useManageUserForm(
    initialValues = {
        matricula: "",
        firstName: "",
        lastName: "",
        password: "",
        confirm_password: "",
        role: ""
    },
    initialError = {
        matricula: '',
        password: '',
        confirm_password: '',
        role: '',
        form: ''
    }
) {
    const [form, setForm] = useState(initialValues);
    const [error, setError] = useState(initialError);
    const [readyToSend, setReadyToSend] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const manageReadyToSend = () => {
            let errores = Object.values(error)
            let counter = 0;
            if(JSON.stringify(form)!==JSON.stringify(initialValues)){
                for (let i=0; i < errores.length; i++) {
                    if (errores[i] === '' || errores[i]===undefined) {
                        console.log('entra qui')
                        counter = counter + 1
                        console.log('counter',counter)
                        console.log('errror length',errores.length)
                    } else {
                        setReadyToSend(false)
                        break;
                    }
                    if (counter+2 === errores.length) {
                        setReadyToSend(true)
                    }
                }
            }else{
                console.log('form e initial values son iguales')
                setReadyToSend(false)
            }
        }
        manageReadyToSend()
    },[form])



    const handleChange = (e) => {
        const pass = isValidForm(e.target.name, e.target.value, form.password, form.confirm_password)

        setError({
            ...error,
            [e.target.name]: pass,
        })
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })

    }


    const handleMenu = (v) => {
        setForm({
            ...form,
            "role": v
        })
    }

    const handleClean = () => {
        setForm(initialValues)
        setError(initialError)
    }

    const handleSend = () => {
        
        if(readyToSend){
            AdminService.register(form)
            .then((data)=>{
                console.log(data)
                if(data.success){
                    handleClean()
                }
            })
        }
    }





    return [form, handleChange, error, handleMenu, passwordVisible, setPasswordVisible, handleClean, readyToSend, handleSend]
}



