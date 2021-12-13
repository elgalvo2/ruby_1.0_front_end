import React, {useState, useEffect} from 'react';
import styles from './bill_create.module.css';

import {Box,Typography,Divider,FormControl, Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import NumeroALetras from '../../helpers/number_to_letter'



const context={
    unidades:{
        umf_36:{
        "circunscripcion":["26","Sinaloa"],
        "localidad":"Culiacán",
        "unidad_informacion":"262401",
        "centro_costos":"142902",
        "domicilio_inmu":"Bldv. Enrique Cabrera ####",
        "telefono_inmu":"750-20-90",
        "jefe_conservacion":"Ing. Jose Luis Casillas Bovio",
        "director":"Dr. Sergio Oswaldo Pacheco",
        "administrador":"Lic. Lizette Gallardo Piña",
        },
        guarderia:{
            "circunscripcion":["26","Sinaloa"],
            "localidad":"Culiacán",
            "unidad_informacion":"000001",
            "centro_costos":"000001",
            "domicilio_inmu":"Bldv. Enrique Cabrera ####",
            "telefono_inmu":"750-20-60",
            "jefe_conservacion":"Ing. Jose Luis Casillas Bovio",
            "director":"Sr. director de guarderia",
            "administrador":"Sra. administradora de guarderia",
        },
        deportivo:{
            "circunscripcion":["26","Sinaloa"],
            "localidad":"Culiacán",
            "unidad_informacion":"333001",
            "centro_costos":"1223001",
            "domicilio_inmu":"Bldv. Enrique Cabrera ####",
            "telefono_inmu":"750-80-99",
            "jefe_conservacion":"Ing. Jose Luis Casillas Bovio",
            "director":"Sr. director del deportivo",
            "administrador":"Sra. administradora de deportivo",
        }
    },
    listado_partidas:{
        12345678:"comer pollo",
        87654321:"comer tacos",
    },
    listado_especialidades:{
        "01":"articulos de limpieza",
        "02":"articulos de aseo",
        "03":"articulos diversos"
    },
    listado_subes:{
        "01":"comida para caballo",
        "02":"limpiar baños",
        "03":"limpiar consultorios",
    }
}




const initialValues = {
    //datos de la unidad
    "circunscripcion":["26","Sinaloa"],
    "localidad":"",
    "inmueble":"",
    "unidad_informacion":"",
    "centro_costos":"",
    "domicilio_inmu":"",
    "telefono_inmu":"",
    "jefe_conservacion":"Ing. Jose Luis Casillas Bovio",
    "director":"",
    "administrador":"",
    //datos del proveedor
    "razon_social":"",
    "no_proveedor":"",
    "rfc":"",
    "rep_legal":"",
    "domicilio_prov":"",
    "telefono_prov":"",
    //datos del orden
    "orden_id":"",
    "autorizacion_id":"",
    "fundamento_adjudicacion":"",
    "uso":"",
    "texto_antecedente":"",
    "texto_consideraciones":"",
    "importe_texto":"",
    "importe_iva":0,
    "importe_no_iva":0,
    "iva":0,
    "fecha_inicio":"dd/mm/aaaa",
    "fecha_termino":"DD/MM/AA",
    "partida_presu":["",""],
    "especialidad":["","articulos diversos"],
    "sub_especialidad":["","articulos diversos"],
    "firmador_alt":["",""],
    "articulos":[],
    "plazo_entrega":""


}

const preDatos = {
    //datos de la unidad
    "partida_presu":"",
    "especialidad":"",
    "sub_especialidad":"",
}



const articuloInitialValue={
        "descripcion":"",
        "unidad":"",
        "cantidad":0.00,
        "precio_unitario":0.00,
        "importe":0,
    }


export default function Bill_create({open, closeFunction,methods}){

    const [form, setForm] = useState(initialValues);
    const [articulo, setArticulo] = useState(articuloInitialValue);
    const [inmue, setInmue] = useState([1,0,0]);
    const [ready, setReady] = useState(false);

    const handleSend = ()=>{
        var total = 0;
        var subtotal = 0;
        var iva = 0;
        let fecha_fin = "";
        form.articulos.map((art)=>{
            subtotal += art.importe;
            total += art.importe*1.16;
            iva += art.importe*.16;
        })

        var dat = form;

        const letra = NumeroALetras(total);  
        console.log("letra",letra)      
        const date = form.fecha_inicio.split('/');
        var dia = date[0];
        var mes =date[1];
        var año = date[2];
        fecha_fin = new Date(año,mes-1,dia)
        fecha_fin.setDate(fecha_fin.getDate()+parseInt(form.plazo_entrega));
        var fecha_entrega = new Date(fecha_fin).toISOString();
         fecha_entrega = fecha_entrega.split('T')[0];
         fecha_entrega = fecha_entrega.split('-');
         fecha_entrega = fecha_entrega.reverse();


        dat.fecha_termino=fecha_entrega[0]+'/'+fecha_entrega[1]+'/'+fecha_entrega[2];
        dat.importe_no_iva = subtotal.toFixed(2);
        dat.importe_iva = total.toFixed(2);
        dat.iva = iva.toFixed(2);
        dat.importe_texto = letra;
        setForm(dat)        
        console.log('form nuevo',form);
        const order = setFormatter(form)
        methods.generar_pdf(order);
    }

    const setFormatter = (dat)=>{
        const unit_data={
            "circunscripcion":dat.circunscripcion,
            "localidad":dat.localidad,
            "inmueble":dat.inmueble,
            "unidad_informacion":dat.unidad_informacion,
            "centro_costos":dat.centro_costos,
            "domicilio_inmu":dat.domicilio_inmu,
            "telefono_inmu":dat.telefono_inmu,
            "jefe_conservacion":dat.jefe_conservacion,
            "director":dat.director,
            "administrador":dat.administrador,
        }

        const provider_data={
            "razon_social":dat.razon_social,
            "no_proveedor":dat.no_proveedor,
            "rfc":dat.rfc,
            "rep_legal":dat.rep_legal,
            "domicilio_prov":dat.domicilio_prov,
            "telefono_prov":dat.telefono_prov,
        }

        const order_data = {
            "orden_id":dat.orden_id,
            "autorizacion_id":dat.autorizacion_id,
            "fundamento_adjudicacion":dat.fundamento_adjudicacion,
            "uso":dat.uso,
            "texto_antecedente":dat.texto_antecedente,
            "texto_consideraciones":dat.texto_consideraciones,
            "importe_texto":dat.importe_texto,
            "importe_iva":dat.importe_iva,
            "importe_no_iva":dat.importe_no_iva,
            "iva":dat.iva,
            "fecha_inicio":dat.fecha_inicio,
            "fecha_termino":dat.fecha_termino,
            "partida_presu":dat.partida_presu,
            "especialidad":dat.especialidad,
            "sub_especialidad":dat.sub_especialidad,
            "firmador_alt":dat.firmador_alt,
            "articulos":dat.articulos,
            "plazo_entrega":dat.plazo_entrega
        }


        return{
            unit_data,
            provider_data,
            order_data,
        }
    }

    useEffect(()=>{
        const validaciones = ()=>{
            if(form.fecha_inicio==""){
                setReady(false);
            }

            if(form.plazo_entrega!="" && form.plazo_entrega!=0 && form.fecha_inicio!=""){
                setReady(true);
            }
        }
        validaciones();
    },[form])
    

   const handleChange = (num)=>{
    if(num==1){
        setInmue([1,0,0])
        let dat = form;
        dat.inmueble="UMF #36";
        dat.circunscripcion[0]=context.unidades.umf_36.circunscripcion[0];
        dat.circunscripcion[1]=context.unidades.umf_36.circunscripcion[1];
        dat.localidad=context.unidades.umf_36.localidad;
        dat.unidad_informacion=context.unidades.umf_36.unidad_informacion;
        dat.centro_costos = context.unidades.umf_36.centro_costos;
        dat.domicilio_inmu= context.unidades.umf_36.domicilio_inmu;
        dat.telefono_inmu = context.unidades.umf_36.telefono_inmu;
        dat.jefe_conservacion = context.unidades.umf_36.jefe_conservacion;
        dat.director = context.unidades.umf_36.director;
        dat.administrador = context.unidades.umf_36.administrador;
        setForm(dat); 



    }else if(num==2){
        setInmue([0,1,0])

        let dat = form;
        dat.inmueble="Guarderia Ordinaria G 001";
        dat.circunscripcion[0]=context.unidades.guarderia.circunscripcion[0];
        dat.circunscripcion[1]=context.unidades.guarderia.circunscripcion[1];
        dat.localidad=context.unidades.guarderia.localidad;
        dat.unidad_informacion=context.unidades.guarderia.unidad_informacion;
        dat.centro_costos = context.unidades.guarderia.centro_costos;
        dat.domicilio_inmu= context.unidades.guarderia.domicilio_inmu;
        dat.telefono_inmu = context.unidades.guarderia.telefono_inmu;
        dat.jefe_conservacion = context.unidades.guarderia.jefe_conservacion;
        dat.director = context.unidades.guarderia.director;
        dat.administrador = context.unidades.guarderia.administrador;
        setForm(dat); 

    }else if(num==3){
        setInmue([0,0,1])


        let dat = form;
        dat.inmueble="Deportivo SNTSS";
        dat.circunscripcion[0]=context.unidades.deportivo.circunscripcion[0];
        dat.circunscripcion[1]=context.unidades.deportivo.circunscripcion[1];
        dat.localidad=context.unidades.deportivo.localidad;
        dat.unidad_informacion=context.unidades.deportivo.unidad_informacion;
        dat.centro_costos = context.unidades.deportivo.centro_costos;
        dat.domicilio_inmu= context.unidades.deportivo.domicilio_inmu;
        dat.telefono_inmu = context.unidades.deportivo.telefono_inmu;
        dat.jefe_conservacion = context.unidades.deportivo.jefe_conservacion;
        dat.director = context.unidades.deportivo.director;
        dat.administrador = context.unidades.deportivo.administrador;
        setForm(dat); 
    }
   }


    const handleChangeSubes = (e)=>{
        let entrie = e.target.value.slice(0,2);
        let ind = 0;
        let encontrado = false;
        const obt = Object.entries(context.listado_subes)
        obt.map((art, index)=>{
            if(entrie==art[0]){
                ind = index;
                encontrado = true;
        }})
        if(encontrado){
            setForm({...form,sub_especialidad:obt[ind]})
        }else{
            setForm({...form,sub_especialidad:[entrie,form.sub_especialidad[1]]})
        }
        
    }

    const handleChangeEsp = (e)=>{
        let entrie = e.target.value.slice(0,2);
        let ind = 0;
        let encontrado = false;
        const obt = Object.entries(context.listado_especialidades)
        obt.map((art, index)=>{
            if(entrie==art[0]){
                ind = index;
                encontrado = true;
        }})
        if(encontrado){
            setForm({...form,especialidad:obt[ind]})
        }else{
            setForm({...form,especialidad:[entrie,form.especialidad[1]]})
        }
    
    }

   const handleChangePP = (e)=>{

        let entrie = e.target.value.slice(0,8);
        let ind = 0;
        let encontrado = false;
        const obt = Object.entries(context.listado_partidas)
        obt.map((art, index)=>{
            if(entrie==art[0]){
                ind = index;
                encontrado = true;
        }})
        if(encontrado){
            setForm({...form,partida_presu:obt[ind]})
        }else{
            setForm({...form,partida_presu:[entrie,form.partida_presu[1]]})
        }
    
   }

    const handleReset = ()=>{
        setInmue([1,0,0])
        setForm(initialValues);
        setArticulo(articuloInitialValue);
        setReady(false);
        methods.setReadyPdf(false)
       
    }

    const handleEliminarArt = (index)=>{
        let art = form.articulos;
        art.splice(index,1);
        setForm({...form,articulos:art});
    }

    const handleAgregar =()=>{
        articulo.importe=articulo.cantidad*articulo.precio_unitario;
        let art = form.articulos;
        let gart  = [...art,articulo];
        setForm({...form,articulos:gart});
        setArticulo(articuloInitialValue);
    }

   




    return (
        <> 
            <Dialog open={open} onClose={()=>closeFunction(false)} aria-labelledby="modal-title" maxWidth='md' fullWidth={true} className={styles.page}>

                <DialogTitle className={styles.page_content}>
                    <Typography variant='h3' className={styles.titulo}>Formulario orden de compra</Typography>
                </DialogTitle>
                <DialogContent  className={styles.page_content}>
                    <>
                        <FormControl>

                            <Typography variant='h4' className={styles.subtitulo}>Datos del Inmueble</Typography>
                            <div className={styles.top}>
                                <label>Inmueble:</label>
                                <label>UMF #36</label>
                                <input type='checkbox'
                                checked={inmue[0]}
                                onChange={()=>handleChange(1)}
                                ></input>

                                <label>Guarderia Ordinaria G001</label>
                                <input type='checkbox'
                                checked={inmue[1]}
                                onChange={()=>handleChange(2)}
                                ></input>

                                
                                <label>Deportivo SNTSS</label>
                                <input type='checkbox'
                                checked={inmue[2]}
                                onChange={()=>handleChange(3)}
                                ></input>


                            </div>
                            <div className={styles.container}>

                                <div className={styles.datos}>

                                    <div>
                                        <p>Inmueble: <span>{form.inmueble}</span></p>
                                        <p>Circunscripcion: <span>{form.circunscripcion[0]+" "}</span><span>{" "+form.circunscripcion[1]}</span></p>
                                        <p>Localidad: <span>{form.localidad}</span></p>
                                        <p>Unidad de informacion: <span>{form.unidad_informacion}</span></p>
                                        <p>Centro de costos: <span>{form.centro_costos}</span></p>
                                        <p>Domicilio: <span>{form.domicilio_inmu}</span></p>
                                    </div>
                                    <div>        
                                        <p>Telefono: <span>{form.telefono_inmu}</span></p>
                                        <p>Jefe Conservacion: <span>{form.jefe_conservacion}</span></p>
                                        <p>Director: <span>{form.director}</span></p>
                                        <p>Administrador: <span>{form.administrador}</span></p>
                                    </div>
                                    <div className={styles.clearFix}></div>
                                </div>


                                    <Typography variant='h4' className={styles.subtitulo}>Datos del proveedor</Typography>
                                <div className={styles.proveedor}>

                                    <TextField
                                        margin="dense"
                                        value = {form.razon_social}
                                        onChange= {(e)=>setForm({...form,razon_social:e.target.value.toUpperCase()})}
                                        id='razon_social'
                                        label='Razon social'
                                        type = "text"
                                    />


                                    <TextField
                                
                                        margin="dense"
                                        value = {form.no_proveedor}
                                        onChange= {(e)=>setForm({...form,no_proveedor:e.target.value.toUpperCase()})}
                                        id='no_proveedor'
                                        label='No. de proveedor'
                                        type = "text"
                                    />

                                    <TextField
                                        
                                        margin="dense"
                                        value = {form.rfc}
                                        onChange= {(e)=>setForm({...form,rfc:e.target.value.toUpperCase()})}
                                        id='rfc'
                                        label='Rfc'
                                        type = "text"
                                    />

                                    <TextField
                                        
                                        margin="dense"
                                        value = {form.rep_legal}
                                        onChange= {(e)=>setForm({...form,rep_legal:e.target.value.toUpperCase()})}
                                        id='rfc'
                                        label='Representante legal'
                                        type = "text"
                                    />

                                    <TextField
                                        className={styles.campo_prov_dom}
                                        margin="dense"
                                        value = {form.domicilio_prov}
                                        onChange= {(e)=>setForm({...form,domicilio_prov:e.target.value.toUpperCase()})}
                                        id='domicilio'
                                        label='Domicilio'
                                        type = "text"
                                    />

                                    <TextField
                                        margin="dense"
                                        value = {form.telefono_prov}
                                        onChange= {(e)=>setForm({...form,telefono_prov:e.target.value.toUpperCase()})}
                                        id='telefono'
                                        label='Telefono'
                                        type = "text"
                                    />

                                </div>
                             
                                <Divider />
                                <Typography variant='h4' className={styles.subtitulo}>Datos de Orden</Typography>
                            
                                <div className={styles.orden_data}>
                                    <div className={styles.orden_data_izq}>
                                        <div>
                                            <label>Numero de Orden:</label>
                                            <input
                                            value={form.orden_id}
                                            onChange={(e)=>setForm({...form,orden_id:e.target.value})}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                    
                                        <div>
                                            <label>Numero de Autorizacion:</label>
                                            <input 
                                            value={form.autorizacion_id}
                                            onChange= {(e)=>setForm({...form,autorizacion_id:e.target.value.toUpperCase()})}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>

                                            <label>Fundamento de Adjudicacion:</label>
                                            <input
                                            value={form.fundamento_adjudicacion}
                                            onChange= {(e)=>setForm({...form,fundamento_adjudicacion:e.target.value.toUpperCase()})}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                    
                                        <div>
                                            <label>Uso:</label>
                                            <textarea 
                                            className={styles.uso}
                                            value={form.uso}
                                            onChange= {(e)=>setForm({...form,uso:e.target.value.toUpperCase()})}></textarea>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                    
                                    </div>



                                    <div className={styles.orden_data_der}>
                                        <div>
                                            <label>Antecedente:</label>
                                            <textarea
                                            className={styles.antecedentes}
                                            value={form.texto_antecedente}
                                            onChange= {(e)=>setForm({...form,texto_antecedente:e.target.value.toUpperCase()})}></textarea>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                        <div>
                                            <label>Consideraciones:</label>
                                            <textarea
                                            className={styles.consideraciones}
                                            value={form.texto_consideraciones}
                                            onChange= {(e)=>setForm({...form,texto_consideraciones:e.target.value.toUpperCase()})}></textarea>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                        
                                        <div>

                                            <label>Fecha de Inicio:</label>

                                            <input
                                            value={form.fecha_inicio}
                                            onChange= {(e)=>setForm({...form,fecha_inicio:e.target.value.toUpperCase()})}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>
                                            <label>Plazo de Entrega:</label>
                                            <input 
                                            value={form.plazo_entrega}
                                            onChange= {(e)=>setForm({...form,plazo_entrega:e.target.value.toUpperCase()})}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        

                                    </div>

                                    <div className={styles.clearFix}></div>


                                    <div className={styles.orden_data_center}>
                                        <div>

                                            <label>Partida Presupuesta:</label>
                                           <input 
                                           value={form.partida_presu[0]}
                                           onChange= {(e)=>handleChangePP(e)}></input>
                                           <input
                                           maxLength="8"
                                           value={form.partida_presu[1]}
                                           onChange={(e)=>setForm({...form,partida_presu:[form.partida_presu[0],e.target.value]})}
                                           ></input>
                                            <div className={styles.clearFix}></div>

                                        </div>
                                        <div>
                                            <label>Especialidad:</label>
                                            <input 
                                            value={form.especialidad[0]}
                                            onChange= {(e)=>handleChangeEsp(e)}></input>
                                            <input
                                            maxLength="2"
                                            value={form.especialidad[1]}
                                            onChange={(e)=>setForm({...form,especilidad:[form.especialidad[0],e.target.value]})}
                                            ></input>
                                            <div className={styles.clearFix}></div>

                                        </div>
                                        <div>
                                            <label>Subespecialidad:</label>
                                            <input 
                                            value={form.sub_especialidad[0]}
                                            onChange= {(e)=>handleChangeSubes(e)}></input>
                                            <input
                                            maxLength="2"
                                            value={form.sub_especialidad[1]}
                                            onChange={(e)=>setForm({...form,sub_especialidad:[form.sub_especialidad[0],e.target.value]})}
                                            ></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                    </div>

                                </div>
                            
                                <Typography variant='h4' className={styles.subtitulo}>Articulos de la factura</Typography>

                            
                                <div className={styles.datos_articulos}>
                                    
                                         <div>   
                                            <label>Unidad: </label>
                                            <input
                                            value={articulo.unidad}
                                             onChange= {(e)=>setArticulo({...articulo,unidad:e.target.value.toLowerCase()})}></input>
                                        </div>
                                        <div>    
                                            <label>Descripcion: </label>
                                            <textarea 
                                            className={styles.descripcion}
                                            value={articulo.descripcion}
                                            onChange= {(e)=>setArticulo({...articulo,descripcion:e.target.value.toLowerCase()})}></textarea>

                                        </div>

                                        <div>
                                            <label>Cantidad:</label>
                                            <input
                                            value={articulo.cantidad}
                                            onChange= {(e)=>setArticulo({...articulo,cantidad:e.target.value})}></input>
                                        </div>

                                        <div>
                                            <label>Precio Unitario:</label>
                                            <input 
                                            value={articulo.precio_unitario}
                                            onChange= {(e)=>setArticulo({...articulo,precio_unitario:e.target.value})}></input>
                                        </div>
                                    
                                        <p>Importe: $<span>{articulo.precio_unitario*articulo.cantidad}</span></p>
                                        <button className={styles.agregar} onClick={handleAgregar} >Agregar</button>
                                </div>

                                <div className={styles.articulos_tabla}>
                                    <div>
                                            <p>Relacion</p>
                                            <p>Descripcion</p>
                                            <p>Unidad</p>
                                            <p>Cantidad</p>
                                            <p>Precio Unitario</p>
                                            <p>Importe</p>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                    {form.articulos.map((art, index)=>(
                                        <div className = {styles.art_tabla}>
                                            <p>{index+1}</p>
                                            <p>{art.descripcion}</p>
                                            <p>{art.unidad}</p>
                                            <p>{art.cantidad}</p>
                                            <p>$ {art.precio_unitario}</p>
                                            <p>$ {art.importe}</p>
                                            <button onClick={()=>handleEliminarArt(index)}>-</button>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                    ))}

                                </div>
                            


                                

                            
                            </div>
                           
                        </FormControl>
                    </>
                </DialogContent>
                <DialogActions className={styles.buttons}>
                    
                    <Button className={styles.cancelar} onClick={()=>closeFunction(false)}>Cancelar</Button>
                    <Button onClick={handleReset}>Limpiar</Button>

                    <Tooltip title={"crear pdf orden de compra: "+form.orden_id}>
                    <Button className={styles.crear_button} disabled={!ready} onClick={handleSend}>Crear Orden</Button>
                    </Tooltip>

                    {
                    (methods.readyPdf)&&
                    <>
                    <Tooltip title={"DEscargar pdf: "+form.orden_id}>
                    <IconButton  onClick={()=>methods.download_pdf(form.orden_id)}><SaveIcon/>
                    </IconButton>
                    </Tooltip>
                    </>
                    }

                </DialogActions>
                

                
            </Dialog>

        </>
    )

}