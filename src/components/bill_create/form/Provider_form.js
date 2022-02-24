import React from 'react'
import styles from './provider_form.module.css'

import {TextField} from '@material-ui/core'


export default function Provider_form({
    provider={
        no_proveedor:0,
        razon_social:'',
        rfc:'',
        represente_legal:'',
        domicilio:'',
        telefono:''
    }
}) {
    return (
        <div className={styles.proveedor}>

            <TextField

                margin="dense"
                value={provider.no_proveedor}
                
                name='no_proveedor'
                label='No. de proveedor'
                type="text"
            />
            <TextField
                margin="dense"
                value={provider.razon_social}
                
                name='razon_social'
                label='Razon social'
                type="text"
            />



            <TextField

                margin="dense"
                value={provider.rfc}
                
                name='rfc'
                label='Rfc'
                type="text"
            />

            <TextField

                margin="dense"
                value={provider.rep_legal}
                
                name='represente_legal'
                label='Representante legal'
                type="text"
            />

            <TextField
                className={styles.campo_prov_dom}
                margin="dense"
                value={provider.domicilio_prov}
                
                name='domicilio'
                label='Domicilio'
                type="text"
            />

            <TextField
                margin="dense"
                value={provider.telefono_prov}
                
                name='telefono'
                label='Telefono'
                type="text"
            />

        </div>

    )
}