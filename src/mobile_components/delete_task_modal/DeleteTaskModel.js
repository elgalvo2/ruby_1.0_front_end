import React from "react";
import {Dialog, DialogTitle, DialogActions, Button, Typography} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CancelIcon from '@material-ui/icons/Cancel'
import styles from '../mark_done_modal/markDoneDialog.module.css'

export default function DeleteTaskModal({open=false,folio='##-####-##',methods}){
    return(
        <Dialog open={open} fullWidth onClose={()=>methods.handleDeleteTask(false,'','')}>
            <DialogTitle>
                Desea eliminar la orden {folio}? 
            </DialogTitle>
            <DialogActions style={{"marginTop":"15px"}}>
                <Button
                    className={styles.cancelB}
                    onClick={()=>methods.handleDeleteTask(false,'','')}
                >
                    Cancelar <CancelIcon/>
                </Button>
                <Button
                    className={styles.aceptarB}
                    onClick={()=>methods.removetask()}
                >
                    Aceptar <CheckIcon/>
                </Button>
            </DialogActions>
        </Dialog>
        
    )
}