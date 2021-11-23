import React, {useState, useEffect} from 'react';

import Task_create from './Task_create';
import Task_edit from './Task_edit';
import Task_update from './Task_update';
import Task_view from './Task_view';
import Front_page from './Front_page';

import App_bar from './common/App_bar';

import AuoService from '../../services/auo.service';




export default function Task_main({setDone, setError, setMessage}){

   

    const [today_tasks, setToday_tasks] = useState([]);
    const [to_create, setTo_create] = useState({});
    const [all_tasks, setAll_tasks] = useState([]);
    const [to_update, setTo_update] = useState(null);
    const [to_delete, setTo_delete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const init = ()=>{
            setLoading(true);
            try{ 
                
                AuoService.getAllTasks()
                .then((data)=>{
                    if(data.data.success){
                        setAll_tasks(data.data.data.tasks);
                        console.log(data.data.data.tasks)
                        setDone(true);
                        setMessage('Ordenes del cargadas correctamente');
                        
                    }else{
                        console.log('Nosuccess')
                        setDone(true);
                        setError(true);
                        setMessage('Error cargando Ordenes... Revisa tus permisos');
                    }
                }).catch((err)=>{
                    const message = err.message || err;
                    console.log(message);
                    setDone(true);
                    setError(true);
                    setMessage(message);
                    
                }).then(()=>{
                AuoService.getTodayTask()
                .then((data)=>{
                    if(data.data.success){
                        console.log('success today')
                        setToday_tasks(data.data.data.tasks);
                        setDone(true);
                        setMessage('Ordenes de hoy cargados correctamente')
                    }else{
                        setDone(true);
                        setError(true);
                        setMessage(data.error);
                    }
                }).catch((err)=>{
                    const message = err.message || err;
                    setDone(true)
                    setError(true)
                    setMessage(message);
                    console.log(message);
                });
                
                }).catch((err)=>{
                    
                })
            }catch(err){
                setDone(true);
                setError(true);
                setMessage('Ocurrio un error inesperado')
          
            }finally{
                setLoading(false);
            }
        }
        init();
    },[])

    const refresh_today_tasks = ()=>{
        try{
            AuoService.getTodayTask()
            .then((data)=>{
                if(data.data.success){
                    setToday_tasks(data.data.data.tasks);
                }else{
                    setError(data.error);
                }
            }).catch((err)=>{
                 
                setDone(true);
                setMessage('Ocurrio un error inesperado');
                setError(true);
            });
        }catch(err){
             
            setDone(true);
            setMessage('Ocurrio un error inesperado');
            setError(true);
        }
    }

    const refresh_all_tasks = ()=>{
        try{
            AuoService.getAllTasks()
            .then((data)=>{
                if(data.data.success){
                    setAll_tasks(data.data.data.tasks);
                }else{
                    setError(data.error);
                }
            }).catch((err)=>{
                 
                setDone(true);
                setMessage('Ocurrio un error inesperado');
                setError(true);
            });
        }catch(err){
             
            setDone(true);
            setMessage('Ocurrio un error inesperado');
            setError(true);
        }
    }

    useEffect(()=>{
        const toUpdate = (sended_to_update)=>{
            if(sended_to_update!=null){
                const folio = sended_to_update.folio;
                delete sended_to_update.folio;
                try{
                    AuoService.updateTask(sended_to_update, folio)
                    .then((data)=>{
                        if(data.data.success){
                            setDone(true);
                            refresh_today_tasks();
                            refresh_all_tasks();
                            setMessage('Oreden Actualizada')
                        }
                        else{
                            setDone(true);
                            setMessage('No se actualizo la orden... Revisa tus permisos');
                            setError(true);
                        }
                    }).catch((err)=>{
                        
                        setDone(true);
                        setMessage('Ocurrio un error inesperado');
                        setError(true);
                    })
                }catch(err){
                    
                    setDone(true);
                    setMessage('Ocurrio un error inesperado');
                    setError(true);
                }
            }
        }
        toUpdate(to_update);
    },[to_update])

    useEffect(()=>{
        const Todelete = (folio)=>{
            if(to_delete!=null){
                try{
                    AuoService.deleteTask(folio)
                    .then((data)=>{
                        if(data.data.success){
                            setDone(true);
                            refresh_today_tasks();
                            refresh_all_tasks();
                            setMessage('Orden eliminada correctamente')
                        }
                        else{
                            setDone(true);
                            setError(true);
                            setMessage(data.data.error);

                        }
                    }).catch((err)=>{
                        setDone(true)
                        setError(true)
                        setMessage('Ocurrio un error inesperado')
                    })
                }catch(err){
                    
                    setDone(true)
                    setError(true)
                    setMessage('Ocurrio un error inesperado')
                }
            }
        }
        Todelete(to_delete);

    },[to_delete])

    useEffect(()=>{
        const send_task = ()=>{
            console.log('to create',to_create)
            if(JSON.stringify(to_create)!="{}"){
                try{
                    AuoService.createTask(to_create)
                    .then((data)=>{
                        if(data.data.success){
                            setDone(true);
                            refresh_today_tasks();
                            refresh_all_tasks();
                            setMessage('Orden creada correctamente')
                        }
                        else{
                            setDone(true);
                            setError(true);
                            setMessage(data.data.error);

                        }
                    }).catch((err)=>{
                        setDone(true)
                        setError(true)
                        setMessage('Ocurrio un error inesperado')
                    })
                }catch(err){
                    console.log(err);
                };
            }
        };
        send_task();
    },[to_create])

  

    return(
        <>

            <App_bar 
                Front={<Front_page loading = {loading} all_tasks={all_tasks.length} today_tasks={today_tasks.length}/>} 
                window1={<Task_create today_tasks={today_tasks} setTo_create={setTo_create} refresh={refresh_today_tasks} to_delete={setTo_delete} setTo_update={setTo_update} />} 
                window4={<Task_view all_tasks={all_tasks}/>}>

            </App_bar>

        </>
    );
   
}
