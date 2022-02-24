import React, {useState, useEffect} from 'react'


export default function useProyect(){
    const [grad, setGrad] = useState(0.00)
    useEffect(()=>{
        const getGrades = async () =>{
            const response = await fetch('http://54.183.12.55:8000/data');
            const json = await response.json()
            if(json){
                setGrad(json.data)
            }
        }
        setInterval(()=>{
            getGrades();

        },200);
    },[])
    return [grad]
}