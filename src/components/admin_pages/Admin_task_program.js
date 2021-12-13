import React, {useState, useEffect} from 'react'
import {TextField, Button, Grid, FormControl, Box, Select, Paper, TableCell, Table, Divider, MenuItem, Dialog, TableContainer, TableHead, TableBody, TableRow, Tooltip} from '@material-ui/core'


const initialValues = {
    month:"",
    program:[],
    technician:"",
}
 
export default function Admin_task_program(){

    const [form, setForm] = useState(initialValues);



    return (
        <>
            <h1>Hola, Aqui se crea un nuevo programa</h1>
        
        </>
    )



}