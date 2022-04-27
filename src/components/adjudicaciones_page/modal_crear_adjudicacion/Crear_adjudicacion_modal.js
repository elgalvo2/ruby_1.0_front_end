import React from 'react'

import styles from './crear_adjudicacion_modal.module.css'
import Modal_form from './modal_form/Modal_form'
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'


export default function Crear_adjudicacion_modal({ open=false , methods }) {
    return (
        <Dialog
            open={open}
            onClose={()=>methods.handleOpenCreateAd(false)}
            fullWidth={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DialogTitle>Crear Nueva Adjudicacion</DialogTitle>
            <DialogContent>
                <Modal_form></Modal_form>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>methods.handleOpenCreateAd(false)}>Cancelar</Button>
                <Button>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}

