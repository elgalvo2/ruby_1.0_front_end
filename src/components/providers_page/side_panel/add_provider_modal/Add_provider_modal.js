import React from 'react'
import styles from './add_provider_modal.module.css'
import Add_provider_form from './add_provider_form/Add_provider_form'

import {Dialog, DialogActions, DialogTitle, DialogContent, Button} from '@material-ui/core'



export default function Add_provider_modal({open=false, methods, form, disableSend}){
    return(
        <>
            <Dialog
                open={open}
                maxWidth={'xs'}
                fullWidth={true}
                onClose={()=>methods.handleOpenAddModal(false)}
                >
                <DialogTitle>Registrar nuevo proveedor</DialogTitle>
                <DialogContent>
                    {form}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={()=>methods.handleOpenAddModal(false)}
                    >Cancelar</Button>
                    <Button onClick={()=>methods.handleReset()}>Limpiar</Button>
                    <Button disabled={disableSend} onClick={()=>methods.setSend(true)}>Registrar</Button>  
                </DialogActions>
            </Dialog>
        </>
    )
}