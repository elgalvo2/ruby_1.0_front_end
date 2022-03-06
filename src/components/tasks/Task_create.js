import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Check, Edit} from '@material-ui/icons';


import Dialog from '@material-ui/core/Dialog';
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

import Done from './common/Done';

import moduleStyles from './Form.module.css';

import {viewers} from '../../session/context/manager'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      higth:450,
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    table:{
        minWidth: 450,
        maxWidth: 550,
    },
  }));



const initialValues = {
    folio:'',
    description:'',
    area:'',
    technician:'',
    technician_mat:'',
}

const initial_errors = {
    folio:{
        error:false,
        message:'',
    },
    description:{
        error:false,
        message:'',
    },
    area:{
        error:false,
        message:'',
    },
    technician:{
        error:false,
        message:'',
    },
    tasks_loader:{
        error:false,
        message:'',
    }
}


export default function Task_create({today_tasks, setTo_create, done, refresh, to_delete, setTo_update}){

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState(initial_errors);
    const [next, setNext] = useState(false);
    const [able_reset, setAble_reset] = useState(false); 
    const [techIndex, setTechIndex] = useState(0);
    const [technician_aviables, setTechnicians_aviables] = useState([])

    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{
        const update_completations= ()=>{
            const tec = viewers('getTechnicians');
            console.log(tec)
            // tec.push({firstName:"Selecciona un tecnico",matricula:null});
            tec.reverse();
            setTechnicians_aviables(tec);
        }
        update_completations();
    },[])

    const handleRefresh = ()=>{
        refresh();
    }

    const handleEdit = (el)=>{
        setEditMode(true);
        let formEdit ={
            folio:el.folio,
            description:el.description,
            area:el.area,
            technician:el.technician,
        }
        setForm(formEdit);
    }

    useEffect(()=>{
        const hable_continue = ()=>{
            console.log(form);

            if(form===initialValues){
                setAble_reset(false)
            }else{
                setAble_reset(true);
            }
            
            if(form.folio.length!=0 && form.technician.length != 0 && form.area.length != 0 && form.description.length !=0){
                setNext(true);
            }else{
                setNext(false);
            }
        }
        hable_continue();
    },[form])

    const handleSendtoEdit = ()=>{
        setTo_update(form);
        handleReset();
        handleCancel();
    }



    const handleContinue = ()=>{
        console.log(form);
        setTo_create(form);
        handleReset();
    }

    const handleReset = ()=>{
        setForm(initialValues);
        setTechIndex(0);
    
    }

    const handleCancel = ()=>{
        setEditMode(false);
        handleReset();

    }

    const handleDelete = (folio)=>{
        console.log('deleting order: ',folio)
        handleReset();
        to_delete(folio);
    }
    const handleSelect= (e)=>{
       const num = e.target.value;
        if(num!=0){
            setTechIndex(num);
            setForm({...form,technician:technician_aviables[num].firstName,technician_mat:technician_aviables[num].matricula});
        }else{
            setTechIndex(num);
            setForm({...form,technician:"",technician_mat:null});
        }


        
        
    }

    return(
        <>
            
            <Grid container direction='row' justifyContent='space-evenly' alingItems='stretch' component={Paper} elevation={6}>
                <Grid item container direction='column' xl={3} md={3} spacing={3} component={Paper} elevation={12}>
                    <Grid item >
                        <FormControl>
                            <TextField 
                                margin="dense"
                                value={form.folio}
                                onChange={(e)=>setForm({...form,folio: e.target.value.toUpperCase()})} 
                                id="folio"
                                label="Folio"
                                type="text"
                                error={errors.folio.error}
                                helperText={errors.folio.message}
                                disabled={editMode}
                            />
                            
                            <TextField 
                                margin="dense"
                                value={form.description}
                                onChange={(e)=>setForm({...form,description: e.target.value.toUpperCase()})} 
                                id="Descripcion"
                                label="Descripcion"
                                type="text"
                                error={errors.description.error}
                                helperText={errors.description.message}
                            />
                            <TextField 
                                margin="dense"
                                value={form.area}
                                onChange={(e)=>setForm({...form,area: e.target.value.toUpperCase()})} 
                                id="Area"
                                label="Area"
                                type="text"
                                error={errors.area.error}
                                helperText={errors.area.message}
                            />
                            
                            <Box>
                            
                                <TextField 
                                margin="dense"
                                value={form.technician}
                                 
                                id="tecnico"
                                label="Tecnico a cargo"
                                type="text"
                                
                            />
                            
                            
                            
                            <Select
                                style={{paddingTop:'21px'}}
                                label="tecnico"
                                id="tecnico"
                                value={form.technician}
                                onChange={(e)=>handleSelect(e)}
                            
                            >
                                {technician_aviables.map((el,index)=>{
                                    return(
                                        <MenuItem value={index}>{el.firstName}</MenuItem>
                                    )
                                })}
                               
                            </Select>
                           </Box> 
                        </FormControl>
                                
                    </Grid>
                    <Grid item><Divider></Divider></Grid>
                    <Grid item>
                    {(editMode)?<Button onClick={handleCancel} disabled={!next}>Cancelar</Button>:<Button onClick={handleReset} disabled={!able_reset}>Limpiar</Button>}
                        {(editMode)?<Button onClick={handleSendtoEdit} disabled={!next}>Guardar Cambios</Button>:<Button onClick={handleContinue} disabled={!next}>Guardar</Button>}
                        
                    </Grid>
                    <Box>
                        {(done)&&<><Done done={done} component={Dialog} open={done}/></>}
                    </Box>
                </Grid>
                
                <Grid item xl={8} md={8}>
                    <Box style={{ minHeight:'60vh', maxHeight:'60vh', overflow:'auto', overflowX:'hidden'}}>
                        {(!errors.tasks_loader.error)?
                            <TableContainer >
                                <Table stickyHeader className={useStyles.table} aria-label='Tareas Del Día'>
                                    <TableHead component={Paper} variant='outlined'>
                                        <TableRow>
                                            <TableCell  style={{width:160}} aling='center'>Folio</TableCell>
                                            <TableCell  style={{width:160}} aling='center'>Área</TableCell> 
                                            <TableCell  style={{width:160}} aling='center'>Descripción</TableCell>                                       
                                            <TableCell  style={{width:160}} aling='center'>Encargado</TableCell>
                                            <TableCell  style={{width:60}} aling='center'>Realizado</TableCell>                                            
                                            <TableCell><IconButton onClick={handleRefresh}><RefreshIcon/></IconButton></TableCell>
                                            <TableCell  style={{width:100}} aling='center'>         </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    
                                        <TableBody>
                                            {today_tasks.map((el, index)=>(
                                                <TableRow key={el.folio} >
                                                    <TableCell style={{width:100}}>
                                                        {el.folio}
                                                    </TableCell>
                                                    <TableCell aling='center' style={{width:100}}>{el.area}</TableCell>
                                                    <TableCell aling='center'>{el.description}</TableCell>
                                                    <Tooltip title={JSON.stringify(el.technician)}>
                                                    <TableCell aling='center'>{el.technician}</TableCell>
                                                    </Tooltip>
                                                    
                                                    <TableCell aling='center'>{(el.done)&&<Check/>}</TableCell>
                                                    <TableCell>
                                                    <Tooltip title='Eliminar Orden'>
                                                        <IconButton onClick={()=>handleDelete(el.folio)}><DeleteIcon/></IconButton>
                                                    </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                    <Tooltip title='Editar Orden'>
                                                        <IconButton onClick={()=>handleEdit(el)}><Edit/></IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                
                                                </TableRow>
                                            ))}
                                        </TableBody>    
                                </Table>
                            </TableContainer>:<h3>{errors.tasks_loader.message}</h3>
                        }
                    </Box>
                </Grid>
                
            </Grid>
        </>
    );
   
}
