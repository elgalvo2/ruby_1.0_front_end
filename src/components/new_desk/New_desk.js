import React, { useState } from 'react';
import New_nav_bar from '../new_nav_bar/New_nav_bar';
import Login_page from '../login/login_page/Login_page';
import {default as MainAdjudicaciones} from '../adjudicaciones_page/Main'
import {default as MainProviders} from '../providers_page/Main';
import Session_info from '../login/session_info/Session_info'
import styles from './new_desk.module.css'




export default function New_desk() {

    const [loging, setlogin] = useState(true)

    const handleLogin = (isActive) => {
        setlogin(isActive);
    }

    const loginMethods = {
        setlogin,
    }

    const pages = [<MainAdjudicaciones/>, <MainProviders/>, 'documentos']
    return (
        <>
      
            {(loging?<Login_page methods={handleLogin}/>:<New_nav_bar pages={pages} className={styles.nav} methods={loginMethods}/>)}
            
        </>
    )
}