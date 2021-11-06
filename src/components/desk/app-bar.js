import * as React from 'react';
import {AppBar,Box, Toolbar, Typography, Button, IconButton,Grid} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';



export default function App_Bar({methods, props}) {
  return (
      <AppBar position="static">
        <Toolbar>
            <Grid container justifyContent='space-between' alignItems='center' direction='row'>
                <Grid container item alignItems='center' justifyContent='flex-start' lg={10} md={10} xs={10} spacing={4}>
                    <Grid item>
                        
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={methods.handleSideBar}
                        >
                        
                        {(!props.side_bar_open)?<MenuIcon />:<ClearIcon/>}</IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Signature Ruby
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item lg={2} md={2} xs={2}>
                   {(props.logedin)?<Grid container direction='row' justifyContent="center" alignItems='center'  spacing={.5}> <Grid item lg={5}>Hola, {props.session_user.firstName}.</Grid> <Grid item lg={1} ><Button onClick={methods.handleLogout}>Cerrar Sesion</Button></Grid></Grid>:<Button color="inherit" onClick={methods.handleLogin} >Login</Button>}
                </Grid>

            </Grid>
          
          
        </Toolbar>
      </AppBar>
  );
}