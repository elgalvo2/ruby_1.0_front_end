import React from 'react'
import styles from './siguiente_etapa.module.css'
import Etapa_autorizacion from './siguiente_etapa_forms/Etapa_autorizacion'
import {Dialog, DialogTitle, DialogActions, IconButton, Button, DialogContent} from '@material-ui/core'
import {Adjudicacion_form_setProvider, Adjudicacion_form_setAut, Adjudicacion_form_setFechas} from '../modal_adjudicacion_form/Adjudicacion_form_aut';

export default function Siguiente_etapa({open=false, setOpenNext}){
    return (
        <div>
            <Dialog
                open={open}
                maxWidth='md'
                fullWidth={true}
                onClose={()=>setOpenNext(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle className={styles.dialogTitle}>Continuar con la siguiente etapa
                    <IconButton className={styles.nextButton}>
        
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Adjudicacion_form_setFechas/>
                </DialogContent>
        
                <DialogActions>
                    
                    <Button onClick={()=>setOpenNext(false)}>Cancelar</Button>
                    <Button>Guardar</Button>
                </DialogActions>

            </Dialog>
        </div>

    )
}