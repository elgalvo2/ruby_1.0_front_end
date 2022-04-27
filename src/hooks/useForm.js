import React, {useState,useEffect} from "react";

export function useForm(initialValue={}){
    const [formValues, setFormValues] = useState(initialValue)

    const handleChangeForm=(event)=>{
        console.log(event)
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value,
        })
    }

    const handleReset =( )=>{
        setFormValues(initialValue)
    }

    return [formValues, handleChangeForm, handleReset];

}