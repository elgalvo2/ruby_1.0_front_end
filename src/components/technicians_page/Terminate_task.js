import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box,Table,IconButton,Tooltip,TableContainer, TableHead, TableBody, TableCell, TableRow, TablePagination, TableSortLabel} from '@material-ui/core'
import {Check} from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';


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




export default function Terminate_task({technician_tasks, setTo_terminate}){

    
    const [filter, setFilter] = useState('all');
    const [filtered, setFiltered] = useState(null);
    const [sortDate, setSortdate] = useState(false);
    const [sortCreated_date, setSort_created] = useState(false);

   
    const hendleTerminate = (task)=>{
        console.log('handle terminate working')
        setTo_terminate(task);
    }

    

    const applyFilter = (field, condition)=>{
        if(field = "all"){
            var toFilt = technician_tasks;
            setFilter(toFilt);
        }
        if(field = "depto"){
            var toFilt = technician_tasks.filter(task=>task.area == condition);
            setFilter(toFilt);
        }
        
        if(field = "descripcion"){
            var toFilt = technician_tasks.filter(task=>task.description == condition);
            setFilter(toFilt);
        }

        
        if(field = "fecha"){
            var toFilt = technician_tasks.filter(task=>task.date == condition);
            setFilter(toFilt);
        }

        
        if(field = "fecha_realizacion"){
            var toFilt = technician_tasks.filter(task=>task.done_date == condition);
            setFilter(toFilt);
        }
        if(field = "realizado"){
            var toFilt = technician_tasks.filter(task=>task.done == condition);
            setFilter(toFilt);
        }
    }

    const sort_by_createdDate = ()=>{
        setSort_created(!sortCreated_date)
        setSortdate(false);
        if(sortCreated_date){
            const sorted_tasks = technician_tasks.sort(function(a,b){
                let datea = a.created_date.split("/",2).reverse();
                let dateb = b.created_date.split("/",2).reverse();
                
                if(dateb==datea){
                    return 0
                }
                if(a<b){
                    return -1
                }  
                return 1
            })
            setFiltered(sorted_tasks);
        }else{
            setFiltered(null);
        }
        
    }

    const sort_by_Date = ()=>{
        setSort_created(false)
        setSortdate(!sortDate);
        if(sortCreated_date){
            const sorted_tasks = technician_tasks.sort(function(a,b){
                let datea = a.created_date.split("/",2).reverse();
                let dateb = b.created_date.split("/",2).reverse();
                
                if(dateb==datea){
                    return 0
                }
                if(a<b){
                    return -1
                }  
                return 1
            })
            setFiltered(sorted_tasks);
        }else{
            setFiltered(null);
        }
        
    }

   




  /*  const aplySort = (field, value)=>{
        if(field == "all" || field ==""){
            var toSort = tasks;
            setDort(toSort);
        }
        if(field == "depto"){
            var toSort = tasks.filter(task=>task.area == condition);
            setDort(toSort);
        }
        
        if(field == "descripcion"){
            var toSort = tasks.filter(task=>task.description == condition);
            setDort(toSort);
        }

        
        if(field == "fecha"){
            var toSort = tasks.filter(task=>task.date == condition);
            setDort(toSort);
        }

        
        if(field == "fecha_realizacion"){
            var toSort = tasks.filter(task=>task.done_date == condition);
            setDort(toSort);
        }
        if(field == "realizado"){
            var toSort = tasks.filter(task=>task.done == condition);
            setDort(toSort);
        }
    }

*/
 

    return(
        <>
            <Box style={{ minHeight:'60vh', maxHeight:'60vh', overflow:'auto', overflowX:'hidden'}}>
            <TableContainer>
                <Table  stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head' style={{width:100}} aling='center'>Realizado</TableCell> 
                            <TableCell variant='head' style={{width:100}} aling='center'>Realización<TableSortLabel active={sortDate} onClick={()=>sort_by_Date()}/></TableCell>
                            <TableCell variant='head' style={{width:100}} aling='center'>Fecha<TableSortLabel active={sortCreated_date} onClick={()=>sort_by_createdDate()}/></TableCell>
                            <TableCell variant='head' style={{width:100}} aling='center'>Descripción</TableCell>
                            <TableCell variant='head' style={{width:100}} aling='center'>Dpto.</TableCell>
                            <TableCell variant='head' style={{width:100}} aling='center'>Folio</TableCell>
                            <TableCell variant='head' style={{width:50}} aling='center'>   </TableCell>
                            
                             
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {technician_tasks.map((task)=><TableRow>
                                <TableCell variant='body' >{(task.done)?<Check/>:<ClearIcon/>}</TableCell>
                                <TableCell variant='body' align='left'>{task.done_date}</TableCell>
                                <TableCell variant='body' aling='center'>{task.created_date}</TableCell>
                                <TableCell variant='body' aling='center'>{task.description}</TableCell>
                                <TableCell variant='body' aling='center'>{task.area}</TableCell>
                                <TableCell variant='body' aling='center'>{task.folio}</TableCell>
                                <Tooltip title='Terminar'>
                                <TableCell variant='body' aling='center'><IconButton onClick={()=>hendleTerminate(task)}><AssignmentTurnedIn/></IconButton></TableCell>
                                </Tooltip>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination/>
            </Box>                                    
            

        </>
    );
   
}