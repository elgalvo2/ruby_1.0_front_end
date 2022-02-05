import React from "react";
import styles from './config_modal.module.css'
import {Dialog ,DialogActions, DialogContent, DialogTitle} from '@material-ui/core'
import Propiedades_modal from "./Propiedades_modal/Propiedades_modal";


export default function Config_modal(){
    return(
        <Dialog 
            open={false}
            maxWidth='md'
            fullWidth
        >
            <div className={styles.layout}>
                <div className={styles.sideBar}>
                    <ul>
                        <li>Propiedades administradas</li>
                        <li>Apoyo de fundamento legal</li>
                    </ul>
                </div>
                <div className={styles.content}>
                    <Propiedades_modal/>
                </div>
            </div>
        </Dialog>
    )
}