import React from 'react'
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import styles from './modal_form.module.css'


export default function Modal_form({ units = [{
    inmueble: "Nombre unidad 1",
}, {
    inmueble: "Nombre unidad 2"
}] }) {
    return (
        <div className={styles.form}>
            <div className={styles.tipo}>
                <p>Tipo de Adjudicacion:</p>
                <FormControlLabel disabled control={<Checkbox />} label='Adjudicacion amparada por contrato'></FormControlLabel>
                <FormControlLabel control={<Checkbox defaultChecked />} label='Servicio'></FormControlLabel>
                <FormControlLabel control={<Checkbox />} label='Bienes Muebles'></FormControlLabel>
            </div>

            <TextField
                fullWidth
                multiline
                rows={3}
                maxRows={3}
                margin="normal"
                name='use'
                id="use"
                label="Uso"
                type="text"
                variant="outlined"
            />
            <div className={styles.units}>
                <p>Selecciona la unidad adjudicadora:</p>
                {units.map((unit) => (
                    <FormControlLabel control={<Checkbox />} label={unit.inmueble}></FormControlLabel>
                ))}
            </div>
            <div className={styles.date}>
                <p>Especifica la fecha de creacion de la Adjudicacion:</p>
                <TextField
                    margin='normal'
                    name='creation_date'
                    id='creation_date'
                    type='date'
                    variant='standard'
                />
            </div>
            <div className={styles.fundamentacion}>
                <p>Fundamentacion de la adjudicacion:</p>
                <TextField
                    margin='normal'
                    name='legal_fundation'
                    id='legal_fundation'
                    type='text'
                    label="Fundamentacion legal"
                    fullWidth
                    multiline
                    rows={4}
                    maxRows={4}
                    variant='outlined'

                />
                <TextField 
                    margin='normal'
                    name='background'
                    id='background'
                    type='text'
                    label="Antecedente de ka adjudicacion"
                    fullWidth
                    multiline
                    rows={4}
                    maxRows={4}
                    variant='outlined'
                />
            </div>

        </div>
    )
}