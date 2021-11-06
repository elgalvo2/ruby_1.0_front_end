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

export default function Task_create({today_tasks, setTo_create, done, refresh, to_delete}){

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState(initial_errors);
    const [ready,setReady] = useState(false);
    const [next, setNext] = useState(false);

    const handleRefresh = ()=>{
        console.log('refreshingg...')
        refresh();
    }

    useEffect(()=>{
        const hable_continue = ()=>{
            if(form.folio.length!=0 && form.technician.length != 0 && form.area.length != 0 && form.description.length !=0){
                setNext(true);
            }else{
                setNext(false);
            }
        }
        hable_continue();
    },[form])

    const handleContinue = ()=>{
        setTo_create(form);
        handleReset();
    }

    const handleReset = ()=>{
        setForm(initialValues);
    
    }


    const handleDelete = (folio)=>{
        console.log('deleting order: ',folio)
        to_delete(folio);
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
                            <Select
                                label="tecnico"
                                id="tecnico"
                                value={form.technician}
                                onChange={(e)=>setForm({...form,technician: e.target.value})}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    Selecciona tecnico a cargo
                                </MenuItem>
                                <MenuItem value={'Rochin'}>Rochin</MenuItem>
                                <MenuItem value={'Andres'}>Andres</MenuItem>
                                <MenuItem value={'Rogelio'}>Rogelio</MenuItem>
                                <MenuItem value={'Sergio'}>Sergio</MenuItem>
                                <MenuItem value={'Ing. Casillas'}>Ing. Casillas</MenuItem>
                            </Select>
                           
                        </FormControl>
                                
                    </Grid>
                    <Grid item><Divider></Divider></Grid>
                    <Grid item>
                        <Button onClick={handleReset}>Limpiar</Button>
                        <Button onClick={handleContinue} disabled={!next}>Guardar</Button>
                    </Grid>
                </Grid>
                <Grid item xl={7} md={7}>
                        {(!errors.tasks_loader.error)?
                            <TableContainer >
                                <Table className={useStyles.table} aria-label='Tareas Del Día'>
                                    <TableHead component={Paper} variant='outlined'>
                                        <TableRow>
                                            <TableCell  style={{width:100}} alling='center'>Folio</TableCell>
                                            <TableCell  style={{width:100}} alling='center'>Área</TableCell> 
                                            <TableCell  style={{width:100}} alling='center'>Descripción</TableCell>                                       
                                            <TableCell  style={{width:100}} alling='center'>Encargado</TableCell>
                                            <TableCell  style={{width:100}} alling='center'>Realizado</TableCell>
                                            <TableCell><IconButton onClick={handleRefresh}><RefreshIcon/></IconButton></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    
                                        <TableBody>
                                            {today_tasks.map((el, index)=>(
                                                <TableRow key={el.folio} >
                                                    <TableCell>
                                                        {el.folio}
                                                    </TableCell>
                                                    <TableCell alling='center'>{el.area}</TableCell>
                                                    <TableCell alling='center'>{el.description}</TableCell>
                                                    <Tooltip title={JSON.stringify(el.technician)}>
                                                    <TableCell alling='center'>{el.technician}</TableCell>
                                                    </Tooltip>
                                                    
                                                    <TableCell alling='center'>{(el.done)?<>Si</>:<>No</>}</TableCell>
                                                    <TableCell>
                                                    <Tooltip title='Eliminar Orden'>
                                                        <IconButton onClick={()=>handleDelete(el.folio)}><DeleteIcon/></IconButton>
                                                    </Tooltip>
                                                    </TableCell>
                                                
                                                </TableRow>
                                            ))}
                                        </TableBody>    
                                </Table>
                            </TableContainer>:<h3>{errors.tasks_loader.message}</h3>
                        }
                </Grid>
            </Grid>
            {(done)&&<><Done done={done} component={Dialog} open={done}/></>}
        </>
    );
   
}
