import axios from 'axios';
import authHeader from './auth-header';
import {mutators} from '../session/context/manager'
import {saveAs} from 'file-saver';
const download = require('downloadjs')

const API_URL = process.env.REACT_APP_API_URL;


/*
funcion sen to pdf 
recibe objeto 

{
    "unit_data":{
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
    "provider_data":{
    "razon_social":"Aristeo Garcia Gonzalez",
    "no_proveedor":"77714",
    "rfc":"GAGA-600912B87",
    "rep_legal":"Aristeo Garcia Gonzalez",
    "domicilio":"Luis M Rojas #1311",
    "telefono":"6671950725"
    },
    "order_data":{
    "orden_id":"A21R02020",
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
     

*/


class AdminService{
    register(user){
        console.log(user.role)
        if(user.role=="TECNICO"){
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()})
            .then((data)=>{
                axios.get(API_URL+"account/technicians",{headers:authHeader()}).then((data)=>{
                    console.log('data from getting technicians', data.data.data)
                    const res = mutators('setTechnicians',data.data);
                    console.log('respuesta mutter', res);   
                })
                return data;
            }).catch((err)=>{
                console.error(err);
            })
        }else{
            return axios.post(API_URL+"account/signup",{user},{headers:authHeader()});
        }
        
    }
    send_order_topdf(order){
        return axios.post(API_URL+'pdf_generator/orden_compra',{order},{headers:authHeader()})
        .then((data)=>{
            if(data.data.success)
            return true
        }).catch((err)=>console.log(err))
    }

    get_pdf(name,type){
        return axios.get(API_URL+`pdf_generator/${type}`,{headers:{'Content-Type':"multipart/form-data"},responseType:"blob"})
        .then((data)=>{
            console.log(data)
            window.saveAs(data.data,`orden_compra_${name}.pdf`)
            return true;
        }).catch(err=>err)
    }
    
}




export default new AdminService();