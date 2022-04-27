import React from 'react'
import styles from './edit_provider_modal.module.css'
import Add_provider_form from '../../side_panel/add_provider_modal/add_provider_form/Add_provider_form'

import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@material-ui/core'

export default function edit_provider_modal({open=false ,methods}){
    return(
        <>
            <Dialog
                open={open}
                onClose={()=>methods.handleEditProvider(false)}>
                <DialogTitle>Soy el modal para el formulario para editar un proveedor</DialogTitle>
                <DialogContent>
                    <Add_provider_form editMode={true}/>
                </DialogContent>
                <DialogActions>
                    <Button>Eliminar</Button>
                    <Button onClick={()=>methods.handleEditProvider(false)}>Cancelar</Button>
                    <Button>Guardar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}