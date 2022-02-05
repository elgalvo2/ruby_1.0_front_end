import React from 'react'
import styles from './provider_info_modal.module.css'
import Add_provider_form from '../../side_panel/add_provider_modal/add_provider_form/Add_provider_form'

import {Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, Divider, FormControl} from '@material-ui/core'


export default function Provider_info_modal({open=false, methods}){
    return(
        <Dialog
            open={open}
            onClose={()=>methods.handleShowProviderInfo(false)}>
            <DialogTitle>Soy el modal para visualizar la informacion de un proveedor</DialogTitle>
            <DialogContent>
                <Provider_info/>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>methods.handleShowProviderInfo(false)}>Aceptar</Button>
            </DialogActions>

        </Dialog>
    )
}

function Provider_info({ providerProps = {
    provider_no: null,
    razon_social: '',
    rep_legal: '',
    rfc: '',
    domicilio: '',
    telefono: null,
    email: '',
    giro: '',
},editMode=false }) {
    return (
        <div className={styles.layout}>
            <FormControl>
                <div className={styles.Field}>
                    <TextField
                        margin='dense'
                        value={providerProps.provider_no}
                        id='provider_no'
                        name='provider_no'
                        label='Numero de proveedor'
                        type='number'
                        disabled={true}
                    />
                    <Divider
                        orientation='vertical' 
                        variant='middle'
                        className={styles.divider}/>
                    <TextField
                        margin='dense'
                        value={providerProps.rfc}
                        id='rfc'
                        name='rfc'

                        label='RFC'
                        type='text'
                        className={styles.field}
                        disabled={true}
                    />
                </div>
                <TextField
                    margin='dense'
                    value={providerProps.razon_social}
                    id='razon_social'
                    name='razon_social'
                    label='Razon Social'
                    type='text'
                    disabled={true}
                />
                <TextField
                    margin='dense'
                    value={providerProps.rep_legal}
                    id='rep_legal'
                    name='rep_legal'
                    label='Representante legal'
                    type='text'
                    disabled={true}
                />
                <TextField
                    margin='dense'
                    value={providerProps.domicilio}
                    id='domicilio'
                    name='domicilio'
                    label='Domicilio'
                    type='text'
                    disabled={true}
                />
                <div className={styles.Field}>

                    <TextField
                        margin='dense'
                        value={providerProps.telefono}
                        id='telefono'
                        name='telefono'
                        label='Telefono'
                        type='number'
                        disabled={true}
                    />
                    <Divider
                        orientation='vertical' 
                        variant='middle'
                        className={styles.divider}/>
                    <TextField
                        margin='dense'
                        value={providerProps.email}
                        id='email'
                        name='email'
                        label='E-mail'
                        type='text'
                        disabled={true}
                    />
                </div>
                <TextField
                    margin='dense'
                    value={providerProps.giro}
                    id='giro'
                    name='giro'
                    label='Giro de la empresa'
                    type='text'
                    disabled={true}
                />
            </FormControl>
        </div >

    )
}