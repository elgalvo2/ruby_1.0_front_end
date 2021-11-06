import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, TextField, Dialog, DialogContent,DialogActions,FormControl, DialogTitle, Typography, Grid} from '@material-ui/core';
import * as authActions from '../../actions/auth';
import * as message from '../../actions/message';
import AuthService from '../../services/auth.service';
import Linear from '../LinearProgress';
import {isValidEmail} from '../../helpers'


export default function Logout({open, methods}){

    const [openW , setOpenw] = useState(open);


    const handleLogout = ()=>{
       
        const logout = AuthService.logout();
        if(logout){
            handleClose();
            methods.setLogedin(false);
        }
    }

    const handleClose = ()=>{
        methods.setLogOutWindow(false);
    }



    return(
        <>
            <Dialog open={openW} onClose={handleClose} maxWidth='xs' fullWidth={true}>
                <DialogTitle>
                    
                    </DialogTitle>
                <DialogContent>
                    <>
                        <Typography>Desea Cerrar Sesión?</Typography>
                    </>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogout}>Cerrar Sesión</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                    

                </DialogActions>
            </Dialog>
        </>
    );
}
