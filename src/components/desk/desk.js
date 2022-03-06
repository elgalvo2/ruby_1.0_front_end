import {React, useEffect, useState} from 'react';
import Task_main from '../tasks/Task_main'
import Main_page from '../main_page/Main_page'
import Technicians_main_page from '../technicians_page/Technicians_main';
import Admin_main_page from '../admin_pages/Admin_main';
import {default as Adjudicaciones_main} from '../new_desk/New_desk'

import AuthService from '../../services/auth.service'

import Desk2 from './desk2';
import SideBar from './side-bar';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import {viewers} from '../../session/context/manager'
import {Typography,Grid, Box, Paper} from '@material-ui/core'
import Inmueble_form from '../bill_create/form/Inmueble_form';
import Provider_form from '../bill_create/form/Provider_form';
import Ejemplo_sofi from '../bill_create/form/ejemplo_sofi';



export default function Desk(){

    const [side_bar_open, setSide_bar_open] = useState(false);
    const [anchor, setAnchor] = useState({xs:'none', lg:'none',md:'none',display:'none'});
    const [session_user, setSessionUser] = useState({});
    const [logedin, setLogedin] =useState(false);
    const [logOutWindow, setLogOutWindow] = useState(false);
    const [logWindow, setLogwindow] = useState(false);
    const [session_exp, setSession_exp] = useState(false);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);
    const [message, setMessage]= useState('');

    const adjudicaciones_methods={
        setError,
        setDone,
        setMessage,
    }

    const tasks_main_page = <Task_main setError={setError} setDone={setDone} setMessage={setMessage}/>
    const main = <Main_page setError={setError} setDone={setDone} setMessage={setMessage}/>
    const tech_main = <Technicians_main_page setError={setError} setDone={setDone} setMessage={setMessage}/>
    const admin_main = <Admin_main_page setError={setError} setDone={setDone} setMessage={setMessage}/>
    const adjudicaciones_main = <Adjudicaciones_main setError={setError} setDone={setDone} setMessage={setMessage}/>







    const [directory, setDirectory] = useState(main);
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const session_expired =()=>{
            const session_alive = viewers('getSessionState');
            if (session_alive){
                console.log('session viva')

            }else{
                const logout = AuthService.logout();
                if(logout){
                  
                    setLogedin(false);
                    setSessionUser({});
                }
            }
        }
        session_expired();
    },[])


    

    useEffect(()=>{
        const changePage = ()=>{
            if(index===0){setDirectory(main)};
            if(index===1){setDirectory(adjudicaciones_main)};
            if(index===2){setDirectory(tasks_main_page)};
            if(index===3){setDirectory(tech_main)};
            if(index===4){setDirectory(admin_main)};
        }
        changePage();
    },[index])




    useEffect(()=>{
        const check_user_in = ()=>{
            let user = viewers('getUser');
            viewers('getTechnicians');
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
        setIndex,
        setDone,
        setError,


    }

    const props = {
        side_bar_open, 
        logedin,
        session_user,
        message,
        done,
        error,
    }

    const side_bar_methods ={
        setIndex,
    }



    return(
        <>
         <Grid container direction='row' justifyContent='flex-start'>
            <Grid item lg={12-anchor.lg} md={12} xs={12-anchor.xs}>
                <Box style={{overflox:'scroll'}}>
                <Desk2 methods={methods} props={props} directory = {directory} ></Desk2>
                </Box>
            </Grid>
        </Grid>
        {(logWindow)&&<Login open={logWindow} methods ={methods}></Login>}
        {(logOutWindow)&&<Logout open={logOutWindow} methods={methods}/>}
         
         {/* <Inmueble_form/> */}
         {/* <Provider_form/> */}
        
    
        
        </>
    )
}