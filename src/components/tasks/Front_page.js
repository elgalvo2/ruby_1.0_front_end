import React, {useState} from 'react';

import {Typography,Divider, Button} from '@material-ui/core'
import {viewers} from '../../session/context/manager'
import Linear from '../LinearProgress';
import styles from './front_page.module.css'

export default function Front_page({all_tasks, today_tasks, loading, modalFacturas, send_topdf, generar_pdf, readyPdf,download_pdf}){






    return(
        <>
            {(loading)&&<Linear/>}
            <Typography variant='h2'>Hola!</Typography>
            <Typography variant = 'h3'>Este es el panel principal del AUO</Typography>
            <Divider></Divider>
            <Typography>Desplázate por las ventanas</Typography>
            {(!loading)&&<>
                <Typography>Total De Ordenes: {all_tasks}</Typography>
                <Typography>Total De Ordenes del dia de hoy: {today_tasks}</Typography>
            </>}
            <Button className={styles.bill_button} onClick={()=>modalFacturas(true)}>Tramitar Orden de compra</Button>

            
        </>
    );
}
