import React from 'react'
import styles from './modal_crear_directa.module.css'
import Bill_create from '../../tasks/bill_create'

import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core'

export default function Modal_crear_directa({open=false, methods}){
    return (
        <Dialog 
            open={open}
            onClose={()=>methods.handleOpenModalCrearDirecta(false)}
        >
            <DialogTitle>Hola, soy el modal para crear una adjudicacion directamente</DialogTitle>
            <DialogContent>
                
            </DialogContent>
            <DialogActions>
                
            </DialogActions>
        </Dialog>

    )
}