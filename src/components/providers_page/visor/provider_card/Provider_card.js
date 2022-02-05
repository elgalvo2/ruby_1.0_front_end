import React from "react";
import styles from './provider_card.module.css'

import { IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons'


export default function Provider_card({ provider = {
    provider_no: 1111,
    razon_social: 'na kjahs fasdhflks fhaslkdf hasdklf hasldkf hasldkfh alsdf',
    giro: 'na flsdakjfh lkasjhdflks hflkas djhflasdk fhlasdk fhasdl'
}, methods }) {
    return (
        <>
            <div className={styles.box} >
                <div className={styles.data} onClick={() => methods.handleShowProviderInfo(true)}>

                    <div className={styles.providerNo}>
                        <p>{provider.provider_no}</p>
                    </div>
                    <div className={styles.providerName}>
                        <p>{provider.razon_social}</p>
                    </div>
                    <div className={styles.speciality}>
                        <p>{provider.giro}</p>
                    </div>
                </div>
                <div className={styles.editButton}>
                    <IconButton onClick={() => methods.handleEditProvider(true)}>
                        <Edit />
                    </IconButton>
                </div>
            </div>

        </>
    )
}