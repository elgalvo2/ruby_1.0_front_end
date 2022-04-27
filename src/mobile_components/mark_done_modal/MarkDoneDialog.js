import React from "react";
import {Dialog, DialogTitle, DialogActions, Button, Typography} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Cancel'
import styles from './markDoneDialog.module.css'


export default function MarkDoneDialog({open=false,folio='##-####-##',methods}){
    return(
        <Dialog open={open} fullWidth onClose={()=>methods.handleMarkDone(false,'','')}>
            <DialogTitle>
                Desea marcar la orden {folio} como terminada? 
            </DialogTitle>
            <DialogActions style={{"marginTop":"15px"}}>
                <Button
                    className={styles.cancelB}
                    onClick={()=>methods.handleMarkDone(false,'','')}
                >
                    Cancelar <CancelIcon/>
                </Button>
                <Button
                    className={styles.aceptarB}
                    onClick={()=>methods.markAsDone()}
                >
                    Aceptar <CheckIcon/>
                </Button>
            </DialogActions>
        </Dialog>
        
    )
}