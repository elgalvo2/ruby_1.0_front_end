import React from 'react'
import styles from './add_provider_form.module.css'

import { TextField, FormControl, Divider } from '@material-ui/core'

export default function Add_provider_form({ providerProps = {
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
                        disabled={editMode}
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
                    />
                </div>
                <TextField
                    margin='dense'
                    value={providerProps.razon_social}
                    id='razon_social'
                    name='razon_social'
                    label='Razon Social'
                    type='text'
                />
                <TextField
                    margin='dense'
                    value={providerProps.rep_legal}
                    id='rep_legal'
                    name='rep_legal'
                    label='Representante legal'
                    type='text'
                />
                <TextField
                    margin='dense'
                    value={providerProps.domicilio}
                    id='domicilio'
                    name='domicilio'
                    label='Domicilio'
                    type='text'
                />
                <div className={styles.Field}>

                    <TextField
                        margin='dense'
                        value={providerProps.telefono}
                        id='telefono'
                        name='telefono'
                        label='Telefono'
                        type='number'
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
                    />
                </div>
                <TextField
                    margin='dense'
                    value={providerProps.giro}
                    id='giro'
                    name='giro'
                    label='Giro de la empresa'
                    type='text'
                />
            </FormControl>
        </div >

    )
}