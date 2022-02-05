import React from "react";
import styles from './session_info.module.css'
import { IconButton, Tooltip } from '@material-ui/core'
import { Settings, Close } from '@material-ui/icons'



export default function SessionInfo({ methods }) {
    return (
        <div className={styles.layout}>
            <div className={styles.img}>
                <div className={styles.frame}></div>
            </div>
            <div className={styles.arrow}>
                <div>
                <Tooltip title='Configuracion'>
                    <IconButton>
                        <Settings />
                    </IconButton>
                </Tooltip>
                </div>
            </div>
            <div className={styles.options}>
                <div>

                <Tooltip title='Cerrar sesion'>
                    <IconButton onClick={()=>methods(true)}>
                        <Close />
                    </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}