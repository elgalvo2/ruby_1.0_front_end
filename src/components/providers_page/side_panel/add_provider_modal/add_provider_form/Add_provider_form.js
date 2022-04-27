import React from 'react'
import styles from './add_provider_form.module.css'

import { TextField, FormControl, Divider } from '@material-ui/core'

export default function Add_provider_form({ props = {
    provider_no: 0,
    razon_social: '',
    rep_legal: '',
    rfc: '',
    domicilio: '',
    telefono: 0,
    email: '',
    giro: '',
},editMode=false , methods}) {
    return (
        <div className={styles.layout}>
            <FormControl>
                <div className={styles.Field}>
                    <TextField
                        margin='dense'
                        value={props.provider_no}
                        id='provider_no'
                        name='provider_no'
                        label='Numero de proveedor'
                        type='number'
                        disabled={editMode}
                        onChange={(e)=>methods.handleChangeForm(e)}
                    />
                    <Divider
                        orientation='vertical' 
                        variant='middle'
                        className={styles.divider}/>
                    <TextField
                        margin='dense'
                        value={props.rfc}
                        id='rfc'
                        name='rfc'
                        onChange={(e)=>methods.handleChangeForm(e)}
                        label='RFC'
                        type='text'
                        className={styles.field}
                    />
                </div>
                <TextField
                    margin='dense'
                    value={props.razon_social}
                    id='razon_social'
                    name='razon_social'
                    label='Razon Social'
                    type='text'
                    onChange={(e)=>methods.handleChangeForm(e)}
                />
                <TextField
                    margin='dense'
                    value={props.rep_legal}
                    id='rep_legal'
                    name='rep_legal'
                    label='Representante legal'
                    type='text'
                    onChange={(e)=>methods.handleChangeForm(e)}
                />
                <TextField
                    margin='dense'
                    value={props.domicilio}
                    id='domicilio'
                    name='domicilio'
                    label='Domicilio'
                    type='text'
                    onChange={(e)=>methods.handleChangeForm(e)}
                />
                <div className={styles.Field}>

                    <TextField
                        margin='dense'
                        value={props.telefono}
                        id='telefono'
                        name='telefono'
                        label='Telefono'
                        type='number'
                        onChange={(e)=>methods.handleChangeForm(e)}
                    />
                    <Divider
                        orientation='vertical' 
                        variant='middle'
                        className={styles.divider}/>
                    <TextField
                        margin='dense'
                        value={props.email}
                        id='email'
                        name='email'
                        label='E-mail'
                        type='text'
                        onChange={(e)=>methods.handleChangeForm(e)}
                    />
                </div>
                <TextField
                    margin='dense'
                    value={props.giro}
                    id='giro'
                    name='giro'
                    label='Giro de la empresa'
                    type='text'
                    onChange={(e)=>methods.handleChangeForm(e)}
                />
            </FormControl>
        </div >

    )
}