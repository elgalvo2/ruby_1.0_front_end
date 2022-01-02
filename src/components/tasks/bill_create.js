import React, { useState, useEffect } from 'react';
import styles from './bill_create.module.css';

import { Box, Typography, Divider, FormControl, Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions, IconButton, Tooltip } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

import NumeroALetras from '../../helpers/number_to_letter'



const context = {
    unidades: {
        umf_36: {
            "circunscripcion": ["26", "Sinaloa"],
            "localidad": "Culiacán",
            "unidad_informacion": "262401",
            "centro_costos": "142902",
            "domicilio_inmu": "Bldv. Enrique Cabrera ####",
            "telefono_inmu": "750-20-90",
            "jefe_conservacion": "Ing. Jose Luis Casillas Bovio",
            "director": "Dr. Sergio Oswaldo Pacheco",
            "administrador": "Lic. Lizette Gallardo Piña",
        },
        guarderia: {
            "circunscripcion": ["26", "Sinaloa"],
            "localidad": "Culiacán",
            "unidad_informacion": "266301",
            "centro_costos": "320200",
            "domicilio_inmu": "C. Ruperto L. Paliza #154 NTE. Col Centro C.P. 80000",
            "telefono_inmu": "750-20-60",
            "jefe_conservacion": "Ing. Jose Luis Casillas Bovio",
            "director": "Lic. Vianney Paredes Castro",
            "administrador": "- - - - - - ",
        },
        deportivo: {
            "circunscripcion": ["26", "Sinaloa"],
            "localidad": "Culiacán",
            "unidad_informacion": "269901",
            "centro_costos": "50200",
            "domicilio_inmu": "Vialidad Sector Poniente SN Central Milenium",
            "telefono_inmu": "750-80-99",
            "jefe_conservacion": "Ing. Jose Luis Casillas Bovio",
            "director": "Dr. Cesar Noe Angulo Parra",
            "administrador": " - - - - - -  - -",
        },
        pericos: {
            "circunscripcion": ["26", "Sinaloa"],
            "localidad": "Pericos",
            "unidad_informacion": "262409",
            "centro_costos": "142902",
            "domicilio_inmu": "Av. Revolución S/N Col Centro C.P. 80900",
            "telefono_inmu": "750-80-99",
            "jefe_conservacion": "Ing. Jose Luis Casillas Bovio",
            "director": "Dr. Enrique Medina Limas",
            "administrador": " - - - - - -  - -",
        },
        tienda: {
            "circunscripcion": ["26", "Sinaloa"],
            "localidad": "Culiacán",
            "unidad_informacion": "265901",
            "centro_costos": "142902",
            "domicilio_inmu": "C. Miguel Hidalgo #994 OTE. Col. Las Vegas C.P. 80090",
            "telefono_inmu": "750-80-99",
            "jefe_conservacion": "Ing. Jose Luis Casillas Bovio",
            "director": "Lic. Hector Javier Gomez Ramirez",
            "administrador": " - - - - - -  - -",
        }
    },
    listado_partidas: {
        2502: "Subrogacion de servicios, para muebles y equipos moviles",
        2506: "Subrogacion de servicios para inmuebles y equipos fijos",
        2517: "Refacciones y materiales para conservación",
        2503: "Contratos consolidados"
    },
    listado_especialidades: {
        "01": "Obra Civil",
        "02": "Equipo Medico",
        "03": "Electricidad",
        "04": "Casa de Máquinas",
        "05": "Aire Acondicionado",
        "06": "Lavanderia",
        "07": "Cocina",
        "08": "Tratamiento de Agua",
        "09": "Equipo de Telecomunicación",
        "10": "Equipos de Seguridad y Saneamiento Ambiental",
        "11": "Sistemas de Conservación, Máquinas de Oficinas",
        "12": "Equipos de Transportacion",
        "13": "Mobiliario",
        "14": "Equipos y Herrramienta",
    },
    listado_subes: {
        "01": {
            "01": "Plomeria",
            "02": "Herreria y Canceleria",
            "03": "Pintura",
            "04": "Acabados",
            "05": "Carpinteria",
            "06": "Cerrajeria",
            "07": "Vidrieria",
            "08": "Señalización",
            "09": "Jardineria"
        },
        "02": {
            "01": "Rayos X",
            "02": "Electronica",
            "03": "Laboratorio",
            "04": "Consulta Especialidades",
            "05": "Medicina Nuclear",
        },
        "03": {
            "01": "Subestacion",
            "02": "Sistemas de Energia",
            "03": "Tableros y Controles de Equipos",
            "04": "Instalaciones y Alumbrado",
            "05": "Motores electricos",
            "06": "Sistemas de proteccion"
        },
        "04": {
            "01": "Distribución de Fluidos y Energéticos",
            "02": "Generadores de Vapor y agua caliente",
            "03": "Almacenamiento de Energéticos",
            "04": "Almacenamientoy distribución de fluidos medicinales",
            "05": "Equipos de incineración",
            "06": "Protecciones anticorrosivas",
        },
        "05": {
            "01": "Aire Acondicionado",
            "02": "Refrigeración",
            "03": "Calefacción",
            "04": "Vetilación y extensión"
        },
        "06": {
            "01": "Lavado",
            "02": "Secado",
            "03": "Planchado",
            "04": "De Acondicionamiento",
            "05": "Complementarios",
        },
        "07": {
            "01": "Almacenamiento y distribución",
            "02": "Para preparación de alimentos",
            "03": "Para cocción de alimentos",
            "04": "De lavado de alimentos",
            "05": "Complementarios",
        },
        "08": {
            "01": "Recepcion y distribución de agua",
            "02": "Tratamiento de agua de uso general",
            "03": "Tratamiento de agua de desecho",
            "04": "Materiales y productos químicos",

        },
        "09": {
            "01": "Telefonia",
            "02": "Radiocomunicación",
            "03": "Intercomunicaciones",
            "04": "Sistemas de teleinformativa",
            "05": "Sistemas de video y proyección",
            "06": "Sistema de audio",
            "07": "Enlaces de comunición",
            "08": "Teleseñalización",
            "09": "Canalización y tableros"
        },
        "10": {
            "01": "Limpieza",
            "02": "Desechos sólidos",
            "03": "Sistemas de control de fauna nociva urbana",
            "04": "Contaminación atmosférica",
            "05": "Protección de técnicos de conservación y contratados",
            "06": "Evacuación de inmueble",
            "07": "Instalaciones de equipo de incendio",
            "08": "Sistemas de apoyo ante siniestros",
        },
        "11": {
            "01": "Máquinas de escribir eléctricas",
            "02": "Máquinas de escribir mecánicas",
            "03": "Máquinas calculadoras",
            "04": "Computadoras",
            "05": "Relojes checadores",
            "06": "Grabadoras",
            "07": "Máquinas copiadoras",
            "08": "Máquinas registradoras",
            "09": "Etiquetadoras y fechadores",
            "10": "Engargolados",
            "11": "Cortadoras",
        },
        "12": {
            "01": "Elevadores de tipo convencional",
            "02": "Montacargas",
            "03": "Escaleras eléctricas",
            "04": "Funicular"
        },
        "13": {
            "01": "De linea",
            "02": "Diseño",
            "03": "Muebles sanitarios"
        },
        "14": {
            "01": "Herramientas electromecánicas",
            "02": "Diagnostico y calibración",
            "03": "Laboratorio y supervision",
        }
    }
}




const initialValues = {
    //datos de la unidad
    "circunscripcion": ["26", "Sinaloa"],
    "localidad": "",
    "inmueble": "",
    "unidad_informacion": "",
    "centro_costos": "",
    "domicilio_inmu": "",
    "telefono_inmu": "",
    "jefe_conservacion": "Ing. Jose Luis Casillas Bovio",
    "director": "",
    "administrador": "",
    //datos del proveedor
    "razon_social": "",
    "no_proveedor": "",
    "rfc": "",
    "rep_legal": "",
    "domicilio_prov": "",
    "telefono_prov": "",
    //datos del orden
    "orden_id": "",
    "autorizacion_id": "",
    "fundamento_adjudicacion": "",
    "uso": "",
    "texto_antecedente": "",
    "texto_consideraciones": "",
    "importe_texto": "",
    "subtotal_text": "",
    "hora_acta": "",
    "importe_iva": 0,
    "importe_no_iva": 0,
    "iva": 0,
    "fecha_inicio": "dd/mm/aaaa",
    "fecha_termino": "DD/MM/AA",
    "partida_presu": ["", ""],
    "especialidad": ["", "articulos diversos"],
    "sub_especialidad": ["", "articulos diversos"],
    "firmador_alt": ["", ""],
    "articulos": [],
    "plazo_entrega": ""


}

const preDatos = {
    //datos de la unidad
    "partida_presu": "",
    "especialidad": "",
    "sub_especialidad": "",
}



const articuloInitialValue = {
    "descripcion": "",
    "unidad": "",
    "cantidad": 0.00,
    "precio_unitario": 0.00,
    "importe": 0,
}

const serviceInitialValue = {
    "partida": "",
    "descripcion": "",
    "unidad": "SERV",
    "cantidad": 0,
    "precio_unitario": 0,
    "importe": 0,
}


export default function Bill_create({ open, closeFunction, methods }) {

    const [form, setForm] = useState(initialValues);
    const [articulo, setArticulo] = useState(articuloInitialValue);
    const [inmue, setInmue] = useState([0, 0, 0,0,0]);
    const [ready, setReady] = useState(false);
    const [isService, setIsService] = useState(false);


    const handleDownload = () => {
        if (isService) {
            methods.download_pdf(form.orden_id, "service_order")
        } else {
            methods.download_pdf(form.orden_id, "purchase_order")
        }
    }

    const handleSend = () => {
        var total = 0;
        var subtotal = 0;
        var iva = 0;
        let fecha_fin = "";

        form.articulos.map((art) => {
            subtotal += art.importe;
            total += art.importe * 1.16;
            iva += art.importe * .16;
        })



        var dat = form;

        const letra = NumeroALetras(total);
        const subtotal_texto = NumeroALetras(subtotal)
        console.log("letra", letra)
        const date = form.fecha_inicio.split('/');
        var dia = date[0];
        var mes = date[1];
        var año = date[2];
        fecha_fin = new Date(año, mes - 1, dia)
        fecha_fin.setDate(fecha_fin.getDate() + parseInt(form.plazo_entrega));
        var fecha_entrega = new Date(fecha_fin).toISOString();
        fecha_entrega = fecha_entrega.split('T')[0];
        fecha_entrega = fecha_entrega.split('-');
        fecha_entrega = fecha_entrega.reverse();


        dat.fecha_termino = fecha_entrega[0] + '/' + fecha_entrega[1] + '/' + fecha_entrega[2];
        dat.importe_no_iva = subtotal.toFixed(2);
        dat.importe_iva = total.toFixed(2);
        dat.iva = iva.toFixed(2);
        dat.importe_texto = letra;
        dat.subtotal_text = subtotal_texto;
        setForm(dat)
        console.log('form nuevo', form);
        const order = setFormatter(form)
        console.log(order)
        methods.generar_pdf(order);
    }

    const handleOrderType = (e) => {
        const string = e.target.value[0] + e.target.value[1];

        if (string == "os" || string == 'OS') {
            setIsService(true);
            setArticulo(serviceInitialValue)

        } else {
            setIsService(false);
            setArticulo(articuloInitialValue)
        }

        setForm({ ...form, orden_id: e.target.value.toUpperCase() })
    }

    const setFormatter = (dat) => {
        const unit_data = {
            "circunscripcion": dat.circunscripcion,
            "localidad": dat.localidad,
            "inmueble": dat.inmueble,
            "unidad_informacion": dat.unidad_informacion,
            "centro_costos": dat.centro_costos,
            "domicilio_inmu": dat.domicilio_inmu,
            "telefono_inmu": dat.telefono_inmu,
            "jefe_conservacion": dat.jefe_conservacion,
            "director": dat.director,
            "administrador": dat.administrador,
        }

        const provider_data = {
            "razon_social": dat.razon_social,
            "no_proveedor": dat.no_proveedor,
            "rfc": dat.rfc,
            "rep_legal": dat.rep_legal,
            "domicilio_prov": dat.domicilio_prov,
            "telefono_prov": dat.telefono_prov,
        }

        const order_data = {
            "orden_id": dat.orden_id,
            "autorizacion_id": dat.autorizacion_id,
            "fundamento_adjudicacion": dat.fundamento_adjudicacion,
            "uso": dat.uso,
            "texto_antecedente": dat.texto_antecedente,
            "texto_consideraciones": dat.texto_consideraciones,
            "subtotal_text": dat.subtotal_text,
            "importe_texto": dat.importe_texto,
            "importe_iva": dat.importe_iva,
            "importe_no_iva": dat.importe_no_iva,
            "iva": dat.iva,
            "hora_acta": dat.hora_acta,
            "fecha_inicio": dat.fecha_inicio,
            "fecha_termino": dat.fecha_termino,
            "partida_presu": dat.partida_presu,
            "especialidad": dat.especialidad,
            "sub_especialidad": dat.sub_especialidad,
            "firmador_alt": dat.firmador_alt,
            "articulos": dat.articulos,
            "plazo_entrega": dat.plazo_entrega
        }



        var order_type = "";

        if (isService) {
            order_type = "service_order";

        } else {
            order_type = "purchase_order";
        }


        console.log("servicios", dat.articulos)
        console.log("order_data", order_data)

        return {
            unit_data,
            provider_data,
            order_data,
            order_type
        }
    }

    useEffect(() => {
        const validaciones = () => {
            if (form.fecha_inicio == "") {
                setReady(false);
            }

            if (form.plazo_entrega != "" && form.plazo_entrega != 0 && form.fecha_inicio != "") {
                setReady(true);
            }
        }
        validaciones();
    }, [form])


    const handleChange = (num) => {
        if (num == 1) {
            setInmue([1, 0, 0, 0, 0])
            let dat = form;
            dat.inmueble = "UMF #36";
            dat.circunscripcion[0] = context.unidades.umf_36.circunscripcion[0];
            dat.circunscripcion[1] = context.unidades.umf_36.circunscripcion[1];
            dat.localidad = context.unidades.umf_36.localidad;
            dat.unidad_informacion = context.unidades.umf_36.unidad_informacion;
            dat.centro_costos = context.unidades.umf_36.centro_costos;
            dat.domicilio_inmu = context.unidades.umf_36.domicilio_inmu;
            dat.telefono_inmu = context.unidades.umf_36.telefono_inmu;
            dat.jefe_conservacion = context.unidades.umf_36.jefe_conservacion;
            dat.director = context.unidades.umf_36.director;
            dat.administrador = context.unidades.umf_36.administrador;
            setForm(dat);



        } else if (num == 2) {
            setInmue([0, 1, 0, 0,0])

            let dat = form;
            dat.inmueble = "Guarderia Ordinaria G 001";
            dat.circunscripcion[0] = context.unidades.guarderia.circunscripcion[0];
            dat.circunscripcion[1] = context.unidades.guarderia.circunscripcion[1];
            dat.localidad = context.unidades.guarderia.localidad;
            dat.unidad_informacion = context.unidades.guarderia.unidad_informacion;
            dat.centro_costos = context.unidades.guarderia.centro_costos;
            dat.domicilio_inmu = context.unidades.guarderia.domicilio_inmu;
            dat.telefono_inmu = context.unidades.guarderia.telefono_inmu;
            dat.jefe_conservacion = context.unidades.guarderia.jefe_conservacion;
            dat.director = context.unidades.guarderia.director;
            dat.administrador = context.unidades.guarderia.administrador;
            setForm(dat);

        } else if (num == 3) {
            setInmue([0, 0, 1,0,0])


            let dat = form;
            dat.inmueble = "Deportivo SNTSS";
            dat.circunscripcion[0] = context.unidades.deportivo.circunscripcion[0];
            dat.circunscripcion[1] = context.unidades.deportivo.circunscripcion[1];
            dat.localidad = context.unidades.deportivo.localidad;
            dat.unidad_informacion = context.unidades.deportivo.unidad_informacion;
            dat.centro_costos = context.unidades.deportivo.centro_costos;
            dat.domicilio_inmu = context.unidades.deportivo.domicilio_inmu;
            dat.telefono_inmu = context.unidades.deportivo.telefono_inmu;
            dat.jefe_conservacion = context.unidades.deportivo.jefe_conservacion;
            dat.director = context.unidades.deportivo.director;
            dat.administrador = context.unidades.deportivo.administrador;
            setForm(dat);
        } else if (num == 4) {
            setInmue([0, 0 ,0,1,0])


            let dat = form;
            dat.inmueble = "Tienda IMSS";
            dat.circunscripcion[0] = context.unidades.tienda.circunscripcion[0];
            dat.circunscripcion[1] = context.unidades.tienda.circunscripcion[1];
            dat.localidad = context.unidades.tienda.localidad;
            dat.unidad_informacion = context.unidades.tienda.unidad_informacion;
            dat.centro_costos = context.unidades.tienda.centro_costos;
            dat.domicilio_inmu = context.unidades.tienda.domicilio_inmu;
            dat.telefono_inmu = context.unidades.tienda.telefono_inmu;
            dat.jefe_conservacion = context.unidades.tienda.jefe_conservacion;
            dat.director = context.unidades.tienda.director;
            dat.administrador = context.unidades.tienda.administrador;
            setForm(dat);
        }else if(num==5){
            setInmue([0, 0,0,0,1])


            let dat = form;
            dat.inmueble = "UMF #20";
            dat.circunscripcion[0] = context.unidades.pericos.circunscripcion[0];
            dat.circunscripcion[1] = context.unidades.pericos.circunscripcion[1];
            dat.localidad = context.unidades.pericos.localidad;
            dat.unidad_informacion = context.unidades.pericos.unidad_informacion;
            dat.centro_costos = context.unidades.pericos.centro_costos;
            dat.domicilio_inmu = context.unidades.pericos.domicilio_inmu;
            dat.telefono_inmu = context.unidades.pericos.telefono_inmu;
            dat.jefe_conservacion = context.unidades.pericos.jefe_conservacion;
            dat.director = context.unidades.pericos.director;
            dat.administrador = context.unidades.pericos.administrador;
            setForm(dat);
        }
    }


    const handleChangeSubes = (e) => {


        let entrie = e.target.value.slice(0, 2);


        let ind = 0;

        const especialidad = form.especialidad[0];

        let encontrado = false;

        const espe = Object.entries(context.listado_subes)

        var sub_es = {};



        espe.map((espe, index) => {
            if (especialidad == espe[0]) {

                sub_es = espe;
                ind = index;
            }
        })

        const asing = Object.entries(sub_es[1]);
        let indexi = 0;


        asing.map((sub_, index) => {
            if (entrie == sub_[0]) {
                encontrado = true;
                indexi = index;
            }
        })

        if (encontrado) {

            setForm({ ...form, sub_especialidad: asing[indexi] })


        } else {
            setForm({ ...form, sub_especialidad: [entrie, form.sub_especialidad[1]] })
        }

        /*
espe_selected.map((sub,indez)=>{
    if(entrie==sub[0]){
        console.log('sub',sub)
    }
})
*/



        /*
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
        }*/

    }

    const handleChangeEsp = (e) => {
        let entrie = e.target.value.slice(0, 2);
        let ind = 0;
        let encontrado = false;
        const obt = Object.entries(context.listado_especialidades)
        obt.map((art, index) => {
            if (entrie == art[0]) {
                ind = index;
                encontrado = true;
            }
        })
        if (encontrado) {
            setForm({ ...form, especialidad: obt[ind] })
        } else {
            setForm({ ...form, especialidad: [entrie, form.especialidad[1]] })
        }

    }

    const handleChangePP = (e) => {

        let entrie = e.target.value.slice(0, 4);
        let ind = 0;
        let encontrado = false;
        const obt = Object.entries(context.listado_partidas)
        obt.map((art, index) => {
            if (entrie == art[0]) {
                ind = index;
                encontrado = true;
            }
        })
        if (encontrado) {
            setForm({ ...form, partida_presu: obt[ind] })
        } else {
            setForm({ ...form, partida_presu: [entrie, form.partida_presu[1]] })
        }

    }

    const handleReset = () => {
        setInmue([1, 0, 0])
        setForm(initialValues);
        setArticulo(articuloInitialValue);
        setIsService(false);
        setReady(false);
        methods.setReadyPdf(false)

    }

    const handleEliminarArt = (index) => {
        let art = form.articulos;
        art.splice(index, 1);
        setForm({ ...form, articulos: art });
    }

    const handleAgregar = () => {
        articulo.importe = articulo.cantidad * articulo.precio_unitario;
        let art = form.articulos;
        let gart = [...art, articulo];
        setForm({ ...form, articulos: gart });
        if (isService) {
            setArticulo(serviceInitialValue);

        } else {
            setArticulo(articuloInitialValue);

        }
    }






    return (
        <>
            <Dialog open={open} onClose={() => closeFunction(false)} aria-labelledby="modal-title" maxWidth='lg' fullWidth={true} className={styles.page}>

                
                <DialogContent className={styles.page_content}>
                    <>
                        <FormControl>

                            <Typography variant='h4' className={styles.subtitulo}>Datos del Inmueble</Typography>
                            <div className={styles.top}>
                                <label>Inmueble:</label>
                                <label>UMF #36</label>
                                <input type='checkbox'
                                    checked={inmue[0]}
                                    onChange={() => handleChange(1)}
                                ></input>

                                <label>Guarderia Ordinaria G001</label>
                                <input type='checkbox'
                                    checked={inmue[1]}
                                    onChange={() => handleChange(2)}
                                ></input>


                                <label>Deportivo SNTSS</label>
                                <input type='checkbox'
                                    checked={inmue[2]}
                                    onChange={() => handleChange(3)}
                                ></input>

                                <label>Tienda Trabajadores Imss</label>
                                <input type='checkbox'
                                    checked={inmue[3]}
                                    onChange={() => handleChange(4)}
                                ></input>

                                <label>UMF #20</label>
                                <input type='checkbox'
                                    checked={inmue[4]}
                                    onChange={() => handleChange(5)}
                                ></input>


                            </div>
                            <div className={styles.container}>

                                <div className={styles.datos}>

                                    <div>
                                        <p>Inmueble: <span>{form.inmueble}</span></p>
                                        <p>Circunscripcion: <span>{form.circunscripcion[0] + " "}</span><span>{" " + form.circunscripcion[1]}</span></p>
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
                                        value={form.razon_social}
                                        onChange={(e) => setForm({ ...form, razon_social: e.target.value.toUpperCase() })}
                                        id='razon_social'
                                        label='Razon social'
                                        type="text"
                                    />


                                    <TextField

                                        margin="dense"
                                        value={form.no_proveedor}
                                        onChange={(e) => setForm({ ...form, no_proveedor: e.target.value.toUpperCase() })}
                                        id='no_proveedor'
                                        label='No. de proveedor'
                                        type="text"
                                    />

                                    <TextField

                                        margin="dense"
                                        value={form.rfc}
                                        onChange={(e) => setForm({ ...form, rfc: e.target.value.toUpperCase() })}
                                        id='rfc'
                                        label='Rfc'
                                        type="text"
                                    />

                                    <TextField

                                        margin="dense"
                                        value={form.rep_legal}
                                        onChange={(e) => setForm({ ...form, rep_legal: e.target.value.toUpperCase() })}
                                        id='rfc'
                                        label='Representante legal'
                                        type="text"
                                    />

                                    <TextField
                                        className={styles.campo_prov_dom}
                                        margin="dense"
                                        value={form.domicilio_prov}
                                        onChange={(e) => setForm({ ...form, domicilio_prov: e.target.value.toUpperCase() })}
                                        id='domicilio'
                                        label='Domicilio'
                                        type="text"
                                    />

                                    <TextField
                                        margin="dense"
                                        value={form.telefono_prov}
                                        onChange={(e) => setForm({ ...form, telefono_prov: e.target.value.toUpperCase() })}
                                        id='telefono'
                                        label='Telefono'
                                        type="text"
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
                                                onChange={(e) => handleOrderType(e)}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>
                                            <label>Numero de Autorizacion:</label>
                                            <input
                                                value={form.autorizacion_id}
                                                onChange={(e) => setForm({ ...form, autorizacion_id: e.target.value.toUpperCase() })}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>

                                            <label>Fundamento de Adjudicacion:</label>
                                            <input
                                                value={form.fundamento_adjudicacion}
                                                onChange={(e) => setForm({ ...form, fundamento_adjudicacion: e.target.value.toUpperCase() })}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>
                                            <label>Uso:</label>
                                            <textarea
                                                className={styles.uso}
                                                value={form.uso}
                                                onChange={(e) => setForm({ ...form, uso: e.target.value.toUpperCase() })}></textarea>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                        {(isService) && <div>
                                            <label>Hora para acta de entrega:</label>
                                            <input
                                                value={form.hora_acta}
                                                onChange={(e) => setForm({ ...form, hora_acta: e.target.value })}
                                            ></input>
                                        </div>}

                                    </div>



                                    <div className={styles.orden_data_der}>
                                        <div>
                                            <label>Antecedente:</label>
                                            <textarea
                                                className={styles.antecedentes}
                                                value={form.texto_antecedente}
                                                onChange={(e) => setForm({ ...form, texto_antecedente: e.target.value.toUpperCase() })}></textarea>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                        <div>
                                            <label>Consideraciones:</label>
                                            <textarea
                                                className={styles.consideraciones}
                                                value={form.texto_consideraciones}
                                                onChange={(e) => setForm({ ...form, texto_consideraciones: e.target.value.toUpperCase() })}></textarea>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>

                                            <label>Fecha de Inicio:</label>

                                            <input
                                                value={form.fecha_inicio}
                                                onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value.toUpperCase() })}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>

                                        <div>
                                            <label>Plazo de Entrega:</label>
                                            <input
                                                value={form.plazo_entrega}
                                                onChange={(e) => setForm({ ...form, plazo_entrega: e.target.value.toUpperCase() })}></input>
                                            <div className={styles.clearFix}></div>
                                        </div>



                                    </div>

                                    <div className={styles.clearFix}></div>


                                    <div className={styles.orden_data_center}>
                                        <div>

                                            <label>Partida Presupuesta:</label>
                                            <input
                                                value={form.partida_presu[0]}
                                                onChange={(e) => handleChangePP(e)}></input>
                                            <input
                                                maxLength="8"
                                                value={form.partida_presu[1]}
                                                onChange={(e) => setForm({ ...form, partida_presu: [form.partida_presu[0], e.target.value] })}
                                            ></input>
                                            <div className={styles.clearFix}></div>

                                        </div>
                                        <div>
                                            <label>Especialidad:</label>
                                            <input
                                                value={form.especialidad[0]}
                                                onChange={(e) => handleChangeEsp(e)}></input>
                                            <input
                                                maxLength="2"
                                                value={form.especialidad[1]}
                                                onChange={(e) => setForm({ ...form, especilidad: [form.especialidad[0], e.target.value] })}
                                            ></input>
                                            <div className={styles.clearFix}></div>

                                        </div>
                                        <div>
                                            <label>Subespecialidad:</label>
                                            <input
                                                value={form.sub_especialidad[0]}
                                                onChange={(e) => handleChangeSubes(e)}></input>
                                            <input
                                                value={form.sub_especialidad[1]}
                                                onChange={(e) => setForm({ ...form, sub_especialidad: [form.sub_especialidad[0], e.target.value] })}
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
                                            onChange={(e) => setArticulo({ ...articulo, unidad: e.target.value.toLowerCase() })}></input>
                                    </div>
                                    {(isService) &&
                                        <div>
                                            <label>Partida:</label>
                                            <input
                                                value={articulo.partida}
                                                onChange={(e) => setArticulo({ ...articulo, partida: e.target.value })}></input>
                                        </div>
                                    }
                                    <div>
                                        <label>Descripcion: </label>
                                        <textarea
                                            className={styles.descripcion}
                                            value={articulo.descripcion}
                                            onChange={(e) => setArticulo({ ...articulo, descripcion: e.target.value.toLowerCase() })}></textarea>

                                    </div>

                                    <div>
                                        <label>Cantidad:</label>
                                        <input
                                            value={articulo.cantidad}
                                            onChange={(e) => setArticulo({ ...articulo, cantidad: e.target.value })}></input>
                                    </div>

                                    <div>
                                        <label>Precio Unitario:</label>
                                        <input
                                            value={articulo.precio_unitario}
                                            onChange={(e) => setArticulo({ ...articulo, precio_unitario: e.target.value })}></input>
                                    </div>



                                    <p>Importe: $<span>{articulo.precio_unitario * articulo.cantidad}</span></p>
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
                                    {form.articulos.map((art, index) => (
                                        <div className={styles.art_tabla}>
                                            <p>{index + 1}</p>
                                            <p>{(isService) ? <>{art.partida + "-" + art.descripcion}</> : <>{art.descripcion}</>}</p>
                                            <p>{art.unidad}</p>
                                            <p>{art.cantidad}</p>
                                            <p>$ {art.precio_unitario}</p>
                                            <p>$ {art.importe}</p>
                                            <button onClick={() => handleEliminarArt(index)}>-</button>
                                            <div className={styles.clearFix}></div>
                                        </div>
                                    ))}

                                </div>






                            </div>

                        </FormControl>
                    </>
                </DialogContent>
                <DialogActions className={styles.buttons}>

                    <Button className={styles.cancelar} onClick={() => closeFunction(false)}>Cancelar</Button>
                    <Button onClick={handleReset}>Limpiar</Button>

                    {(ready) && <>

                        <Tooltip title={"crear pdf orden de compra: " + form.orden_id}>
                            <Button className={styles.crear_button} disabled={methods.send_topdf} onClick={handleSend}>Crear Orden</Button>
                        </Tooltip>

                    </>}

                    {
                        (methods.readyPdf) &&
                        <>
                            <Tooltip title={"DEscargar pdf: " + form.orden_id}>
                                <IconButton onClick={handleDownload}><SaveIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    }

                </DialogActions>





            </Dialog>

        </>
    )

}