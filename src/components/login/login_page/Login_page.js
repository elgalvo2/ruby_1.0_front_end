import React from 'react'
import styles from './login_page.module.css'

export default function Login_page({methods}){
    return(
        <div className={styles.back}>
            <div className={styles.layout}>
                <div className={styles.img}>
                    <img className={styles.image}/>
                </div>
                <div className={styles.user}>
                    <label className={styles.userLabel}>Usuario:</label>
                    <input
                        type="text"
                        placeholder='Ejemplo: 123456789'
                    />
                </div>
                <div className={styles.password}>
                <label className={styles.passwordLabel}>Contrasena:</label>
                    <input
                        type="password"
            
                    />
                </div>
                <div className={styles.button}>
                    <button onClick={()=>methods(false)}>Entrar</button>
                </div>
            </div>
        </div>
    )
}
