import React from 'react'
import styles from './visor.module.css'
import Provider_card from './provider_card/Provider_card'


export default function Visor({providers=[{
    provider_no: 1112,
    razon_social: 'na fdlsk jfklsdfja djf;la kf dkasjhd lka jkfasdjkl fahklsd',
    giro: 'na lfkjasd fkljasdlf kjasdfl jk fjksdhf klsdjhfkla f'
}],methods}){
    return(
        <div className={styles.layout}>
            <div className={styles.tableHeader}>
                <p>Numero de proveedor</p>
                <p>Razon Social</p>
                <p>Giro</p>
            </div>
            <div className={styles.cardContainer}>
                {providers.map((provider)=>(
                    <Provider_card provider={provider} methods={methods}/>
                ))}
            </div>
        </div>
    )
}