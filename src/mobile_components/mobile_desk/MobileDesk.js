import React from 'react'
import styles from './mobileDesk.module.css'
import {TextField,Button} from '@material-ui/core'


export default  function MobileDesk(){
    return(
        <div className={styles.desk}>
            <div><p>Iniciar Sesion</p></div>
            <div className={styles.form}>
                <div className={styles.matricula}>
                    <TextField
                    margin='dense'
                    value=''
                    size='lg'
                    // onChange={(e)=>setForm({...form,matricula: e.target.value})}
                    // id='matricula'
                    // error= {matriculaError}
                    // helperText={matriculaError}
                    label='Matricula'
                    type='text'/>
                </div>
                <div className={styles.contrasena}>
                    <TextField
                    margin='dense'
                    // value={form.matricula}
                    // onChange={(e)=>setForm({...form,matricula: e.target.value})}
                    // id='matricula'
                    // error= {matriculaError}
                    // helperText={matriculaError}
                    label='Contrasena'
                    type='text'/>
                </div>
                <div className={styles.butones}>
                    <Button/>
                </div>

            </div>
        </div>
    )
}