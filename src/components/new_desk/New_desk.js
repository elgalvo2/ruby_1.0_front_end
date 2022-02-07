import React, { useState } from 'react';
import New_nav_bar from '../new_nav_bar/New_nav_bar';
import Login_page from '../login/login_page/Login_page';
import {default as MainAdjudicaciones} from '../adjudicaciones_page/Main'
import {default as MainProviders} from '../providers_page/Main';
import Session_info from '../login/session_info/Session_info'
import styles from './new_desk.module.css'
import Config_modal from '../config_modal/Config_modal';

import PropertyService from '../../services/properties.service'





export default function New_desk({ setError, setDone, setMessage}){

    const [loging, setlogin] = useState(true)


    const handleLogin = (isActive) => {
        setlogin(isActive);
    }

    const methods = {
        setError,
        setDone,
        setMessage,
    }

    const pages = [<MainAdjudicaciones methods={methods}/>, 
    <MainProviders methods={methods}/>, 
    'documentos']
    return (
        <>
            {/* <Config_modal/> */}
            {/* {(loging?<Login_page methods={handleLogin}/>:<New_nav_bar pages={pages} className={styles.nav} methods={loginMethods}/>)} */}
            <New_nav_bar pages={pages} className={styles.nav} methods={methods}/>
           
            
        </>
    )
}