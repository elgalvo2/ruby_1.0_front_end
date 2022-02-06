import React, {useEffect, useState}from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';




import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
//import EngineeringIcon from '@material-ui/icons/Engineering';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import BuildIcon from '@material-ui/icons/Build';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIcon from '@material-ui/icons/Assignment'; // citas
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned'; // recibir
import BookmarksIcon from '@material-ui/icons/Bookmarks'; // Relacionar 
import DynamicFeedICon from '@material-ui/icons/DynamicFeed'; // generar 
import EmojiObjetsIcon from '@material-ui/icons/EmojiObjects'; // mas 
import SettingsIcon from '@material-ui/icons/Settings'; // opciones


import Task_main from '../tasks/Task_main'
import Main_page from '../main_page/Main_page'
import Technicians_main_page from '../technicians_page/Technicians_main';
import Admin_main_page from '../admin_pages/Admin_main';

import App_Bar from './app-bar';
import SideBar from './side-bar';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import Notification from './Notification';

import Grid from '@material-ui/core/Grid';
import moduleStyles from './Estilos.module.css'

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor:'#011936',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    backgroundColor:'#FDFFF7',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  close_session_button:{
    color:'#FDFFF7',
    border:'solid',
    borderColor:"#C1292E"
  }
  

}));

export default function Desk2({props, methods, directory}) {


  const classes = useStyles();
  const [page, setPage] = useState(directory)
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [visor, setVisor] = useState(null);


  const handleVisor = (e,a)=>{
 
    methods.setIndex(e);
    setVisor(a)  
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <>
        <div className={classes.root}>
        <CssBaseline />
        <AppBar 
            
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar >
                

            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                [classes.hide]: open,
                })}
            >
                <MenuIcon />
            </IconButton>

            <Typography variant="h6" >
                Signature
            </Typography>
            



                
                

            <Grid 
                container
                direction= 'row'
                justifyContent='flex-end'
                alignItems='center'
            >
                
                <Grid item>
                {(props.logedin)?<Grid container direction='row'
                 justifyContent="center" alignItems='center'  spacing={.5}> <Grid item lg={5}>Hola, {props.session_user.firstName}.</Grid> <Grid item lg={1} ><Button onClick={methods.handleLogout} size='small' className={clsx(classes.close_session_button)}>Cerrar Sesion</Button></Grid></Grid>:<Button color="inherit" onClick={methods.handleLogin} >Login</Button>} 
                </Grid> 

            </Grid>

            </Toolbar>

        </AppBar>
            
        <div>
            <Drawer
            
            hover
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                }),
            }}
            >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List hover>
                {['Home','Adjudicaciones','Auo', "Tecnicos", "Administrador"].map((text,index)=>(
                    <ListItem button  key={text} onClick={()=>(handleVisor(index,text))}>
                        <ListItemIcon>
                            {(text=='Home')&&<HomeIcon/>}
                            {(text=='Adjudicaciones')&&<BookmarksIcon/>}
                            {(text=='Auo')&&<AssignmentIcon/>}
                            {(text=='Administrador')&&<SupervisorAccountIcon/>}
                            {(text=='Tecnicos')&&<BuildIcon/>}
                            {(open)?<ListItemText primary={text}/>:<><ListItemText primary={" "}/></>}
                        </ListItemIcon>
                    </ListItem>
                ))}   
            </List>
            </Drawer>
        </div>
        
        
        </div>
       
        <Box style={{position:'relative',paddingTop:'70px', paddingBottom:'0px',paddingLeft:'80px',paddingRight:'8px',backgroundColor:'#FDFFF7', minWidth:'100%', minHeight:'100%', height:'661px',maxWidth:'650px', overflowX:'hidden', overflowY:'hidden'}}>
          
            {directory}
            <Notification setDone={methods.setDone} setError={methods.setError} setMessage={methods.setMessage} done={props.done} message={props.message} error={props.error}/>
        </Box>
        
        
    </>
   
  );
}


/*Stycky square:

<Box style={{position:'absolute', backgroundColor:'red', bottom:'20px',
right:'20px', maxHeight:'200px', maxWidth:'450px',height:'200px', width:'400px'}}
><Notification done={props.done} message={props.message} error={props.error}/></Box>

**/ 
