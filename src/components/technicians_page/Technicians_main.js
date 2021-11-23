import React, {useState, useEffect} from 'react';

import App_bar from './common/App_bar';

import Terminate_task from './Terminate_task'
import Front_page from './Front_page'



import TechnicianService from '../../services/technician.service';

export default function Technicians_main_page({setDone, setError, setMessage}){
    const [technician_tasks, setTechnician_tasks] = useState([]);
    const [to_terminate, setTo_terminate] = useState({});

    useEffect(()=>{
      const getTasks = ()=>{
        TechnicianService.getTechnicianTasks()
        .then((data)=>{
          if(data.data.success){
            setDone(true);
            setMessage('Ordenes cargadas correctamente')
            setTechnician_tasks(data.data.data);
          }else{
            setDone(true);
            setError(true);
            setMessage('Error cargando Ordenes... Revisa tus permisos');
          }})
          .catch((err)=>{
            setDone(true);
            setError(true);
            if(err.message=="Request failed with status code 500"){

              setMessage("No tienes permisos para cargar ordenes");
            }else{
              setMessage(err.message);
            }
          })
      }
      getTasks();
    },[])

    useEffect(()=>{
      console.log("entra aqui")
      const terminate=()=>{
        if(JSON.stringify(to_terminate)=="{}"){
          console.log('skip this')
          return;
        }else{
        TechnicianService.terminateTask(to_terminate.folio,"")
        .then((data)=>{
          if(data.data.success){
            setDone(true);
            setMessage('Ordenes marcada como terminada')
            handleRefrechTechTask();
            setTo_terminate({});
          }else{
            setDone(true);
            setError(true);
            setMessage(data.data.error);
          }})
          .catch((err)=>{
            setDone(true);
            setError(true);
            setMessage(err.message);
          })
        }
      }
      terminate();
    },[to_terminate])

    const handleRefrechTechTask = ()=>{
      TechnicianService.getTechnicianTasks()
        .then((data)=>{
          if(data.data.success){
            setTechnician_tasks(data.data.data);
          }else{
            setMessage('Error refrescando ordenes');
          }})
          .catch((err)=>{
            setDone(true);
            setError(true);
            setMessage(err.message);
          })
      
    }

  

    return(
        <>

            <App_bar 
                Front={<Front_page />} 
                window1={<Terminate_task technician_tasks={technician_tasks} setTo_terminate={setTo_terminate} />}
                
              
              >
                
                

            </App_bar>


        </>
    );
   
}