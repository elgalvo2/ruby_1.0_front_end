import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CheckBox from '@material-ui/core/checkBox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddToPhotosSharpIcon from '@material-ui/icons/AddToPhotosSharp';

import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Tooltip from '@material-ui/core/Tooltip';

import Task_create from './Task_create';
import Task_edit from './Task_edit';
import Task_update from './Task_update';
import Task_view from './Task_view';
import Front_page from './Front_page'

import App_bar from './common/App_bar'


export default function Task_main(){

  

    return(
        <>

            <App_bar Front={<Front_page/>} window1={<Task_create/>} window2={<Task_edit/>} window3={<Task_update/>} window4={<Task_view/>}></App_bar>

        </>
    );
   
}
