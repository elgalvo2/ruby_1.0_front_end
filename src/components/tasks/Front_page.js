import React from 'react';

import {Typography,Divider} from '@material-ui/core'
import {viewers} from '../../session/context/manager'
import Linear from '../LinearProgress';

export default function Front_page({all_tasks, today_tasks, loading}){
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
            
        </>
    );
}
