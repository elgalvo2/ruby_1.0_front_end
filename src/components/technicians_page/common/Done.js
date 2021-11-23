import React from 'react';
import {Slide, Paper, Dialog, DialogContent,DialogTitle } from '@material-ui/core';

export default function Done({done}){

    return(
        <>
            <Slide direction='up' in={done} mountOnEnter unmountOnExit><Paper elevation={7}>palomita</Paper></Slide>

        </>
    )
}