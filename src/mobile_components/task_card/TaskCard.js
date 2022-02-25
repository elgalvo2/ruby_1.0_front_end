import React from 'react'
import styles from './taskCard.module.css'
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'



export default function TaskCard({cardData={description:'ksdjfklsfdlkjasd askldjsadj asldkjas ldananana',date:'##/##/####',folio:"##-####-##"}}) {
    return (
        <div className={styles.taskCard}>
            <div className={styles.fecha}>
                <p>{cardData.folio}</p>
                <p>{cardData.date}</p>
            </div>
            <div className={styles.descripcion}>
                <p>{cardData.description}</p>
            </div>
            <div className={styles.edit}>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
}