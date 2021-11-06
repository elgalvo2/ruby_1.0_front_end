import React, {useState, useEffect} from 'react';
import Task_create from './Task_create';
import Task_edit from './Task_edit';
import Task_update from './Task_update';
import Task_view from './Task_view';
import Front_page from './Front_page';

import App_bar from './common/App_bar';

import AuoService from '../../services/auo.service';


export default function Task_main(){

    const [today_tasks, setToday_tasks] = useState([]);
    const [to_create, setTo_create] = useState({});
    const [all_tasks, setAll_tasks] = useState([]);
    const [to_update, setTo_update] = useState({});
    const [to_delete, setTo_delete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [done, setDone]= useState(false);

    useEffect(()=>{
        const init = ()=>{
            setLoading(true);
            try{
                AuoService.getAllTasks()
                .then((data)=>{
                    if(data.data.success){
                        console.log(data.data.data.tasks)
                        setAll_tasks(data.data.data.tasks);
                    }else{
                        console.log(data)
                        setError('failed loading all tasks'+data.error);
                    }
                }).catch((err)=>{
                    const message = err.message || err;
                    setError(message);
                    console.log(message);
                });
                AuoService.getTodayTask()
                .then((data)=>{
                    if(data.data.success){
                        setToday_tasks(data.data.data.tasks);
                    }else{
                        setError(data.error);
                    }
                }).catch((err)=>{
                    const message = err.message || err;
                    setError('failed loading today task'+message);
                    console.log(message);
                });
                setLoading(false);
            }catch(err){
                setError(err);
            }
        }
        init();
    },[])

    const refresh_today_tasks = ()=>{
        try{
            AuoService.getAllTasks()
            .then((data)=>{
                if(data.data.success){
                    setToday_tasks(data.data.data.tasks);
                }else{
                    setError(data.error);
                }
            }).catch((err)=>{
                const message = err.message || err;
                setError('failed loading all task'+message);
                console.log('mesage refresh',message);
            });
        }catch(err){
            setError(err);
        }
    }

    const refresh_all_tasks = ()=>{
        try{
            AuoService.getTodayTask()
            .then((data)=>{
                if(data.data.success){
                    setToday_tasks(data.data.data.tasks);
                }else{
                    setError(data.error);
                }
            }).catch((err)=>{
                const message = err.message || err;
                setError('failed loading today task'+message);
                console.log('mesage refresh',message);
            });
        }catch(err){
            setError(err);
        }
    }

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
                            setTimeout(()=>{
                                setDone(false);
                            },3000);
                        }
                        else{
                            console.log('ocurrio un error', data.data.error)
                        }
                    }).catch((err)=>{
                        console.log('error al borrar', err);
                    })
                }catch(err){
                    console.log('error en service', err);
                }
            }
        }
        Todelete(to_delete);

    },[to_delete])

    useEffect(()=>{
        const send_task = ()=>{
            if(JSON.stringify(to_create)!="{}"){
                try{
                    AuoService.createTask(to_create)
                    .then((data)=>{
                        console.log("to createData",data)
                        if(data.data.success){
                            setDone(true);
                            refresh_all_tasks();
                            refresh_today_tasks();
                            setTimeout(()=>{
                                setDone(false);
                            },3000);
                        }else{
                            
                            console.log(data.data.error);
                            
                        }
                    }).catch((err)=>{
                        const message = err.message || err;
                        setError(message);
                        console.log(message);
                    });
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
                Front={<Front_page loading = {loading} error={error} all_tasks={all_tasks.length} today_tasks={today_tasks.length}/>} 
                window1={<Task_create today_tasks={today_tasks} setTo_create={setTo_create} done={done} refresh={refresh_today_tasks} to_delete={setTo_delete}/>} 
                window2={<Task_edit/>} 
                window3={<Task_update/>} 
                window4={<Task_view/>}>

            </App_bar>

        </>
    );
   
}
