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
    fecha:'',
    hora:'',
    descripcion:'',
    area:'',
    tecnico:'',
    nom_material:'',
    cantidad_material:'',   
    materiales:[],
    realizado:false,
}

const initial_errors = {
    folio:{
        error:false,
        mesagge:'',
    },
    fecha:{
        error:false,
        mesagge:'',
    },
    hora:{
        error:false,
        mesagge:'',
    },
    descripcion:{
        error:false,
        mesagge:'',
    },
    area:{
        error:false,
        mesagge:'',
    },
    tecnico:{
        error:false,
        mesagge:'',
    },
    materiales:{
        nombre_material:{
            error:false,
            mesagge:'',
        }, 
        cantidad:{
            error:false,
            mesagge:'',
        }
    },
    realizado:{
        error:false,
        mesagge:'',
    },
    tasks_loader:{
        error:false,
        message:'',
    }
}

const initialMaterial = {
    nombre_material:'',
    cantidad:0
}


export default function Task_update(){

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState(initial_errors);
    const [list, setList] = useState([]);
    const [ready,setReady] = useState(false);
    const [next, setNext] = useState(false);
    const [tasks, setTasks] = useState([]);

    /*useEffect(()=>{
        const get_tasks = async (url)=>{
            let res = await fetch(url);
            let json = await res.json();
            console.log('consrvacion json . res',json.res)
                if(json.res.ok){
                    setReady(true);
                    setTasks(json.res.tasks);
                }else{
                    setReady(true);
                    let e = {...errors};
                    e.tasks_loader.error = true;
                    e.tasks_loader.message = 'Ocurrio un error en el servidor';
                }
        }
        get_tasks('http://localhost:5050/api/conservacion/');
    },[])
*/

    const handleRefresh = async ()=>{
        /*let res = await fetch('http://localhost:5050/api/conservacion/');
            let json = await res.json();
            console.log('consrvacion json . res',json.res)
                if(json.res.ok){
                    setReady(true);
                    setTasks(json.res.tasks);
                }else{
                    setReady(true);
                    let e = {...errors};
                    e.tasks_loader.error = true;
                    e.tasks_loader.message = 'Ocurrio un error en el servidor';
                      }*/
    }

    useEffect(()=>{
        const hable_continue = ()=>{
            if(form.folio.length!=0 && form.tecnico.length != 0 && form.descripcion.length !=0){
                setNext(true);
            }else{
                setNext(false);
            }
        }
        hable_continue();
    },[form])

    const handleContinue = ()=>{
        
        console.log('form antes del envio', form);
        const send = {
            form,
            list,
        }

        setNext(false);

        let options = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(send),

        }
        const toSend = async(url,opt)=>{
            let res = await fetch(url,opt);
            let json = await res.json();
            
        }
        console.log('List Enviado al servidor desde conservacion',list)
        console.log(' form Enviado al servidor desde conservacion',form)
        console.log('esto se envia al servidor',send)
      //  toSend('http://localhost:5050/api/conservacion/',options)
        handleReset()
    }

    const handleReset = ()=>{
        setForm(initialValues);
        setList([]);
    }


    const handleAdd = ()=>{
        if(form.nom_material != '' && form.cantidad != 0){
            setList((list)=>[...list,{
                nombre_material: form.nom_material,
                cantidad: form.cantidad,
            }])
            const f = {...form};
            const e = {...errors};

            f.nom_material = '';
            f.cantidad = 0;

            e.materiales.nombre_material.error = false;
            e.materiales.nombre_material.mesagge = '';

            e.materiales.cantidad.error = false;
            e.materiales.cantidad.mesagge = '';

            setForm(f);
            setErrors(e);

            console.log('m al agregar material', f)
            console.log('list al agregar material', list)
            console.log('form al agregar material', form)

        }else{
            const e = {...errors};
            if(form.materiales.nombre_material === ''){
                e.materiales.nombre_material.error = true;
                e.materiales.nombre_material.mesagge = 'Ingrese Nombre de Material';
                setErrors(e);
            }
            if(form.materiales.cantidad === 0){
                e.materiales.cantidad.error = true;
                e.materiales.cantidad.mesagge = 'Ingrese Cantidad Correcta';
                setErrors(e);
            }
        }
    }

    const handleDelete = (nom)=>{
        const filtered = list.filter(item=>item.nombre_material!==nom);
        setList(filtered);
        console.log('list',list)
    }

    return(
        <>





            <Grid container direction='row' justifyContent='space-around'>
                <Grid item container direction='column' lg={3}>
                    <Grid item>
                        <FormControl>
                            <TextField 
                                margin="dense"
                                value={form.folio}
                                onChange={(e)=>setForm({...form,folio: e.target.value.toUpperCase()})} 
                                id="folio"
                                label="Folio"
                                type="text"
                                error={errors.folio.error}
                                helperText={errors.folio.mesagge}
                            />
                            <Tooltip title='Fecha de Encargo'>
                                <TextField 
                                    margin="dense"
                                    value={form.fecha}
                                    onChange={(e)=>setForm({...form,fecha: e.target.value})} 
                                    id="folio"
                                    type="Date"
                                    error={errors.fecha.error}
                                    helperText={errors.fecha.mesagge}
                                />
                            </Tooltip>
                            <Tooltip title='Hora de inicio del Encargo'>
                                <TextField 
                                    margin="dense"
                                    value={form.hora}
                                    onChange={(e)=>setForm({...form,hora: e.target.value})} 
                                    id="folio"
                                    type="Time"
                                    error={errors.hora.error}
                                    helperText={errors.hora.mesagge}
                                />
                            </Tooltip>
                            <TextField 
                                margin="dense"
                                value={form.descripcion}
                                onChange={(e)=>setForm({...form,descripcion: e.target.value.toUpperCase()})} 
                                id="Descripcion"
                                label="Descripcion"
                                type="text"
                                error={errors.descripcion.error}
                                helperText={errors.descripcion.mesagge}
                            />
                            <TextField 
                                margin="dense"
                                value={form.area}
                                onChange={(e)=>setForm({...form,area: e.target.value.toUpperCase()})} 
                                id="Area"
                                label="Area"
                                type="text"
                                error={errors.area.error}
                                helperText={errors.area.mesagge}
                            />
                            <Select
                                label="tecnico"
                                id="tecnico"
                                value={form.tecnico}
                                onChange={(e)=>setForm({...form,tecnico: e.target.value})}
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
                            <Grid container direction='row'>
                                <Grid item>
                                    <TextField 
                                        margin="dense"
                                        value={form.nom_material}
                                        onChange={(e)=>setForm({...form,nom_material: e.target.value.toUpperCase()})} 
                                        id="materiales"
                                        label="Material"
                                        type="text"
                                        error={errors.materiales.nombre_material.error}
                                        helperText={errors.materiales.nombre_material.mesagge}
                                        />
                                </Grid>
                                <Grid item>
                                    <TextField 
                                    margin="dense"
                                    value={form.cantidad}
                                    onChange={(e)=>setForm({...form,cantidad: e.target.value})} 
                                    id="cantidad"
                                    label="Cantidad"
                                    type="number"
                                    inputProps={{min:0,max:100}}
                                    error={errors.materiales.cantidad.error}
                                    helperText={errors.materiales.cantidad.mesagge}
                                    />
                                </Grid>
                                <Grid item>
                                    <Tooltip title='Agregar Material'>
                                    <IconButton onClick={()=>handleAdd()}><AddToPhotosSharpIcon/></IconButton>
                                    </Tooltip>
                                </Grid>
                                </Grid>
                                <FormControlLabel control={
                                    <CheckBox 
                                    onChange={(e)=>setForm({...form,atendido:e.target.checked})}
                                    checked={form.atendido}
                                    id='atendido'
                                    inputProps={{'aria-label':"atendido?"}}
                                    />} 
                                    label='Atendido'
                                />
                        </FormControl>
                                <Divider></Divider>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleReset}>Limpiar</Button>
                        <Button onClick={handleContinue} disabled={!next}>Guardar</Button>
                    </Grid>
                </Grid>
                <Grid item lg={3}>
                    <TableContainer>
                        <Table className={useStyles.table} aria-label='Tabla de materiales utilizados'>
                            <TableHead>
                                <TableRow>
                                    <TableCell  style={{width:100}} alling='center'>Material</TableCell>
                                    <TableCell  style={{width:100}} alling='center'>Cantidad</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            
                                <TableBody>
                                    {list.map((el, index)=>(
                                        <TableRow key={el.nombre_material} >
                                            <TableCell>
                                                {el.nombre_material}
                                            </TableCell>
                                            <TableCell alling='center'>{el.cantidad}</TableCell>
                                            
                                            <TableCell>
                                                <Tooltip title='Borrar'>
                                                    <IconButton onClick={()=>handleDelete(el.nombre_material)}><DeleteIcon/></IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        
                                        </TableRow>
                                    ))}
                                </TableBody>    
                        </Table>
                    </TableContainer>

                </Grid>
                <Grid item lg={5}>
                        {(!errors.tasks_loader.error)?
                            <TableContainer component={Paper}>
                                <Table className={useStyles.table} aria-label='Tabla de tasks'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  style={{width:100}} alling='center'>Folio</TableCell>
                                            <TableCell  style={{width:100}} alling='center'>Área</TableCell> 
                                            <TableCell  style={{width:100}} alling='center'>Descripción</TableCell>                                       
                                            <TableCell  style={{width:100}} alling='center'>Encargado</TableCell>
                                            <TableCell  style={{width:100}} alling='center'>Fecha</TableCell>
                                            <TableCell><IconButton onClick={()=>handleRefresh()}><RefreshIcon/></IconButton></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    
                                        <TableBody>
                                            {tasks.map((el, index)=>(
                                                <TableRow key={el.Folio} >
                                                    <TableCell>
                                                        {el.Folio}
                                                    </TableCell>
                                                    <TableCell alling='center'>{el.Area}</TableCell>
                                                    <TableCell alling='center'>{el.Descripcion}</TableCell>
                                                    <Tooltip title={JSON.stringify(el.Tecnico[0])}>
                                                    <TableCell alling='center'>{el.Tecnico[0].Nombre}</TableCell>
                                                    </Tooltip>
                                                    <TableCell alling='center'>{el.Fecha}</TableCell>
                                                    <TableCell alling='center'>{el.Realizado}</TableCell>
                                                    <TableCell>
                                                    <Tooltip title='Eliminar Orden'>
                                                        <IconButton onClick={()=>handleDelete(el.nombre_material)}><DeleteIcon/></IconButton>
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
        </>
    );
   
}
