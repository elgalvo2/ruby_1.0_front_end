import React, {useState, useEffect} from 'react';
import {Snackbar, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

import CloseIcon from '@material-ui/icons/Close'

export default function Notification({setDone, setError, done, error, message}){

    
    const handleClose = ( )=>{
        console.log(message)
        setDone(null);
        setError(null);
    }

  

    const action = (
        <>
            <IconButton 
            color='secondary' 
            siza="small" 
            onClick={handleClose}

            size='small'
            aria-label='close'

            >
                <CloseIcon fonSize='small'/>
            </IconButton>
        </>
    )

    
    return(
        <>
            <Snackbar 
            open={(done)}
            autoHideDuration ={5000}
            onClose={handleClose}
            >
              {(error)?
              <>
                  <Alert severity='error' onClose={handleClose}>
                    {message}
                </Alert>
              </>:<>
              <Alert severity='success' onClose={handleClose}>
                    {message}
                </Alert>
              </>}
              

            </Snackbar>

        </>
    )
}