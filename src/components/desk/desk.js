import {React, useEffect, useState} from 'react';
import Task_main from '../tasks/Task_main'
import Main_page from '../main_page/Main_page'
import Technicians_main_page from '../technicians_page/Technicians_main';
import Admin_main_page from '../admin_pages/Admin_main';

import App_Bar from './app-bar';
import SideBar from './side-bar';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import {viewers} from '../../session/context/manager'
import {Typography,Grid, Box, Paper} from '@material-ui/core'



export default function Desk(){


    const tasks_main_page = <Task_main/>
    const main = <Main_page/>
    const tech_main = <Technicians_main_page/>
    const admin_main = <Admin_main_page/>

    const [side_bar_open, setSide_bar_open] = useState(false);
    const [anchor, setAnchor] = useState({xs:'none', lg:'none',display:'none'});
    const [session_user, setSessionUser] = useState({});
    const [logedin, setLogedin] =useState(false);
    const [logOutWindow, setLogOutWindow] = useState(false);
    const [logWindow, setLogwindow] = useState(false);

    const [directory, setDirectory] = useState(main);
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const changePage = ()=>{
            if(index===0){setDirectory(main)};
            if(index===1){setDirectory(tasks_main_page)};
            if(index===2){setDirectory(tech_main)};
            if(index===3){setDirectory(admin_main)};
        }
        changePage();
    },[index])




    useEffect(()=>{
        const check_user_in = ()=>{
            let user = viewers('getUser');
            if(JSON.stringify(user)=='{}'){
                return {};
            }else{
                console.log(user)
                setSessionUser(user)
                setLogedin(true);
            }
        }
        check_user_in()
    },[logWindow])


    const handleSideBar = ()=>{
        if(side_bar_open){
            setSide_bar_open(false);
            setAnchor({xs:'none', lg:'none', md:'none',display:'none'})

        }else{
            setSide_bar_open(true)
            setAnchor({xs:2, lg:2, md:2,display:'block'})
        }
        console.log(side_bar_open)
    }

    const handleLogin = ()=>{
        setLogwindow(true);
    }


    const handleLogout = ()=>{
        console.log('logout')
        setLogOutWindow(true);
    }

    const methods ={
        handleSideBar,
        handleLogin,
        setLogwindow,
        handleLogout,
        setLogOutWindow,
        setLogedin,
        
    }

    const props = {
        side_bar_open, 
        logedin,
        session_user,
    }

    const side_bar_methods ={
        setIndex,
    }



    return(
        <>
        <Grid container direction='row' justifyContent='flex-start'>
            <Grid item lg={anchor.lg} md={anchor.md} xs={anchor.xs} component={Box} display={anchor.display}>
            <SideBar methods={side_bar_methods}></SideBar>
            </Grid>
            <Grid item lg={12-anchor.lg} md={12} xs={12}>
                <App_Bar methods={methods} props={props}></App_Bar>
                {directory}</Grid>
        </Grid>
        {(logWindow)&&<Login open={logWindow} methods ={methods}></Login>}
        {(logOutWindow)&&<Logout open={logOutWindow} methods={methods}/>}
        
        
        </>
    )
}