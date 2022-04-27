import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import Siguiente_etapa from './ventana_siguiente_etapa/Siguiente_etapa';
import styles from './modal_adjudicacion.module.css'


export default function Modal_adjudicacion({ open = false, methods,
    adjudicacion = {
        need_type:'',
        by_contract:false,
        creation_date:'dd/mm/aaaa',
        provider_no:null,
        proposed_cost:null,
        aut_no:'',
        items:[],
        approved_cost:null,
        order_no:'',
        start_date:'dd/mm/aaaa',
        finish_date:'dd/mm/aaaa',
        recived:false,
        notes:[],
        signed:false,
        authorized:false,
        sended_to_sign:false,
        sended_to_pay:false,
        date_of_sended_to_pay:'dd/mm/aaaa',
        provider: 'Los olivos',
        use: 'Uso ludico',
        bill_no: 'na',
        amount: '$000.00',
        date: 'dd/mm/aaaa',
        property: 'no'


    }
}) {

    const [openNext, setOpenNext] = useState(false)


    return (
        <div>
            <Dialog
                open={open}
                maxWidth='md'
                fullWidth
                onClose={() => methods.handleOpenAdModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle className={styles.dialogTitle}>Datos de la Adjudicacion
                    <IconButton className={styles.nextButton} onClick={() => setOpenNext(!openNext)}>
                        <ArrowForward ></ArrowForward>
                    </IconButton>
                </DialogTitle>
                    <p>Hola, yo muestro la informacion de la adjudicacion seleccionada</p>
                <DialogActions>
                    <Button>Editar</Button>
                    <Button onClick={() => methods.handleOpenAdModal(false)}>Cancelar </Button>
                    <Button>Guardar</Button>
                </DialogActions>

            </Dialog>
            <Siguiente_etapa open={openNext} setOpenNext={setOpenNext} />
        </div>

    )
}




// function Modal_adjudicacion_desarrollo(){
//     return(
//         <p>Soy el modal para las adjudicaciones en la etapa de desarrollo</p>
//     )
// }

// function Modal_adjudicacion_firmas(){
//     return(
//         <p>Soy el modal para las adjudicaciones en la etapa de recolecta de firmas </p>
//     )
// }

// function Modal_adjudicacion_pago(){
//     return(
//         <p>Soy el modal para las adjudicaciones en la etapa de pago</p>
//     )
// }

// function Modal_adjudicacion_terminadas(){

// }