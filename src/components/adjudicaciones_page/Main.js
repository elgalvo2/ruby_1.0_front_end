import React, { useState } from 'react';
import Add_btn from './buttons/Add_btn';
import Direct_adj_btn from './buttons/Direct_adj_btn';
import Filter_btn from './buttons/Filter_btn';
import Search_btn from './buttons/Search_btn';
import Visor from './visor/Visor';
import styles from './Main.module.css'
import Filter_visor from './filter_visor/Filter_visor';
import Modal_adjudicacion from './modal_adjudicacion/Modal_adjudicacion'
import Crear_adjudicacion_modal from './modal_crear_adjudicacion/Crear_adjudicacion_modal';
import Modal_crear_directa from './modal_crear_directa/Modal_crear_directa';
import Bill_create from '../tasks/bill_create';

import AdminService from '../../services/admin.service';

import { Filter } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';



// export default function Main(){
//     return (
//         <Filter_visor/>
//     )
// }

export default function Main({methods}) {
    const [openCreateAd, setOpenCreateAd] = useState(false)
    const [openAdModal, setOpenAdModal] = useState(false)
    const [openModalCrearDiracta, setOpenModalCrearDirecta] = useState(false)

    const [data_to_pdf, setData_to_pdf] =useState({});
    const [readyPdf, setReadyPdf] =useState(false);
    const [send_topdf, setSend_topdf] = useState(false);

    //Modal window drivers

    const handleOpenModalCrearDirecta = (isOpen) => {
        setOpenModalCrearDirecta(isOpen)
    }

    const handleOpenAdModal = (isOpen) => {
        setOpenAdModal(isOpen);
    }

    const handleOpenCreateAd = (isOpen) => {
        setOpenCreateAd(isOpen);
    }

    //Create pdf drivers
    
    const generar_pdf = (dat)=>{
        setSend_topdf(true);
        console.log(dat);
        AdminService.send_order_topdf(dat)
        .then((data)=>{
            if(data){
                methods.setDone(true);
                methods.setMessage('Pdf creada correctamente y listo para descargar')
                setReadyPdf(true)
                setSend_topdf(false);
            }else{
                methods.setDone(true);
                methods.setError(true);
                methods.setMessage("No se cargo el pdf");
                methods.setSend_topdf(false);
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
                methods.setDone(true);
                methods.setError(true);
                methods.setMessage("Error al descargar el pdf");
            }
        })
    }

    //Wired methods

    const createAdMethods = {
        handleOpenCreateAd
    }

    const visorMethods = {
        handleOpenAdModal,
    }

    
    const createDirectaMethods = {
        setData_to_pdf,
        generar_pdf,
        readyPdf,
        download_pdf,
        setReadyPdf,
        send_topdf
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.search}>
                    <Search_btn />
                </div>


                <Tooltip title='Filtrar'>
                    <div className={styles.filter}>
                    <Filter_visor />
                </div>
                </Tooltip>

                <Tooltip title='Crear Directamente'>

                    <div className={styles.direct} onClick={()=>handleOpenModalCrearDirecta(true)}>
                        <Direct_adj_btn />
                    </div>
                </Tooltip>

                <Tooltip title='Nueva Adjudicacion'>
                    <div className={styles.add} onClick={()=>handleOpenCreateAd(true)}>
                        <Add_btn />

                </div>
                </Tooltip>
            </div>
            <div className={styles.visor}>
                <Visor methods={visorMethods} />
            </div>
        
            <Crear_adjudicacion_modal open={openCreateAd} methods={createAdMethods} />
            <Modal_adjudicacion open={openAdModal} methods={visorMethods} />
            <Bill_create open={openModalCrearDiracta} closeFunction={handleOpenModalCrearDirecta} methods={createDirectaMethods} />

        </>
    )
}


// export default function Main(){
//     return(
//         // <Crear_adjudicacion_modal/>
//         //<Modal_adjudicacion></Modal_adjudicacion>
//         <></>
//     )
// }