import React from 'react'
import {Dialog,DialogTitle, DialogActions, Typography, Button} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Cancel'
import styles from './sessionCloseDialog.module.css'

export default function SessionCloseDialog({methods, open=false}){
    return(
        <Dialog open={open}>
           <DialogTitle>
                Desea cerrar sesion?
            </DialogTitle>
            <DialogActions style={{"marginTop":"15px"}}>
                <Button
                    className={styles.cancelB}
                    onClick={()=>methods.setOpenCloseSesionDialog(false)}
                >
                    Cancelar <CancelIcon/>
                </Button>
                <Button
                    className={styles.aceptarB}
                    onClick={()=>methods.sessionClose()}
                >
                    Aceptar <CheckIcon/>
                </Button>
            </DialogActions>
        </Dialog>
    )
}