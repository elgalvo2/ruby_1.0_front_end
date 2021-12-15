import React, {useState, useEffect} from 'react';

import Task_create from './Task_create';
import Task_edit from './Task_edit';
import Task_update from './Task_update';
import Task_view from './Task_view';
import Front_page from './Front_page';
import App_bar from './common/App_bar';
import AuoService from '../../services/auo.service';
import AdminService from '../../services/admin.service';

import Bill_create from './bill_create';


const datos ={
    unit_data:{
    "circunscripcion":["26","Sinaloa"],
    "localidad":"Culiacan",
    "inmueble":"IMSS UMF 36",
    "unidad_informacion":"262401",
    "centro_costos":"142902",
    "domicilio":"Bldv. Enrique Cabrera ####",
    "telefono":"750-20-90",
    "jefe_conservacion":"Ing. Jose Luis Casillas Bovio",
    "director":"Dr. Sergio Oswaldo Pacheco",
    "administrador":"Lic. Lizette Gallardo Piña"
    },
    provider_data:{
    "razon_social":"Aristeo Garcia Gonzalez",
    "no_proveedor":"77714",
    "rfc":"GAGA-600912B87",
    "rep_legal":"Aristeo Garcia Gonzalez",
    "domicilio":"Luis M Rojas #1311",
    "telefono":"6671950725"
    },
    order_data:{
    "orden_id":"A21R00000",
    "autorizacion_id":"",
    "fundamento_adjudicacion":"Ley laassp, ART 42",
    "uso":"Refacion para instalacion de equipo de aire acondicionado tipo dividido de consultrio de nutrición",
    "texto_antecedente":"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "texto_consideraciones":"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "importe_texto":"#####################################",
    "importe_iva":"2204.01",
    "importe_no_iva":"1900.01",
    "iva":"304.00",
    "fecha_inicio":"03/06/2021",
    "fecha_termino":"03/06/2021",
    "partida_presu":["42062530","Refacciones y accesorios menores de maquinaria y otros equipos"],
    "especialidad":["05","Aire Acondicionado"],
    "sub_especialidad":["01","Aire Acondicionado"],
    "firmador_alt":["",""],
    "articulos":[{
        "descripcion":"Bomba de drenaje condensado AC-110-220V",
        "unidad":"pieza",
        "cantidad":"1",
        "precio_unitario":"1,900.01",
        "importe":"2,240.01"
    },{
        "descripcion":"Bomba de drenaje condensado AC-110-220V",
        "unidad":"pieza",
        "cantidad":"1",
        "precio_unitario":"1,900.01",
        "importe":"2,240.01"
    },{
        "descripcion":"Bomba de drenaje condensado AC-110-220V",
        "unidad":"pieza",
        "cantidad":"1",
        "precio_unitario":"1,900.01",
        "importe":"2,240.01"
    }],
    "plazo_entrega":"1"
    }   
}





export default function Task_main({setDone, setError, setMessage}){

   

    const [today_tasks, setToday_tasks] = useState([]);
    const [to_create, setTo_create] = useState({});
    const [all_tasks, setAll_tasks] = useState([]);
    const [to_update, setTo_update] = useState(null);
    const [to_delete, setTo_delete] = useState(null);
    const [loading, setLoading] = useState(true);

    const [send_topdf, setSend_topdf] = useState(false);
    const [readyPdf, setReadyPdf] =useState(false);

    const [modal_facturas, setModal_facturas] = useState(false)


    //modal generar pdf
    const [data_to_pdf, setData_to_pdf] =useState({});


    
    const generar_pdf = (dat)=>{
        setSend_topdf(true);
        console.log(dat);
        AdminService.send_order_topdf(dat)
        .then((data)=>{
            if(data){
                setDone(true);
                setMessage('Pdf creada correctamente y listo para descargar')
                setReadyPdf(true)
                setSend_topdf(false);
            }else{
                setDone(true);
                setError(true);
                setMessage("No se cargo el pdf");
                setSend_topdf(false);
            }
            
        })
    }

    const download_pdf = (name,type) =>{
        setReadyPdf(false)
        AdminService.get_pdf(name,type)
        .then((data)=>{
            if(data){
                setReadyPdf(true);
            }else{
                setDone(true);
                setError(true);
                setMessage("Error al descargar el pdf");
            }
        })
    }

    const methods = {
        setData_to_pdf,
        generar_pdf,
        readyPdf,
        download_pdf,
        setReadyPdf,
        send_topdf
    }
        
    
    // termina modal generar pdf


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
                Front={<Front_page loading = {loading} all_tasks={all_tasks.length} today_tasks={today_tasks.length} modalFacturas = {setModal_facturas} send_topdf={send_topdf} generar_pdf={generar_pdf} readyPdf={readyPdf} download_pdf={download_pdf}/>} 
                window1={<Task_create today_tasks={today_tasks} setTo_create={setTo_create} refresh={refresh_today_tasks} to_delete={setTo_delete} setTo_update={setTo_update} />} 
                window4={<Task_view all_tasks={all_tasks}/>}>
            </App_bar>

            <Bill_create open={modal_facturas} closeFunction={setModal_facturas} methods={methods}/>
            
        </>
    );
   
}
