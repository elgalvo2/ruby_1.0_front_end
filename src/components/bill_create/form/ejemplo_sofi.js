import React from 'react'
import styles from './ejemplo_sofi.module.css'


export default function Ejemplo_sofi() {
    return (
        <div className={styles.layout}>
            <div>
                <p>Texto uno</p>
            </div>
            <div>
                <p>Texto dos</p>
            </div>
            <div>
                <p>Texto tres</p>
            </div>
            <div>
                <p>Texto cuatro</p>
            </div>
        </div>
    )
}