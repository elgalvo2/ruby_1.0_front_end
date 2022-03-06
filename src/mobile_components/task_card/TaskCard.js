import React from 'react'
import styles from './taskCard.module.css'
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'



export default function TaskCard({methods,cardData={description:'descripcion por defecto',created_date:'##/##/####',folio:"##-####-##",area_name:'area'}}, key) {
    return (
        <div className={styles.taskCard} >
            <div className={styles.fecha} onClick={()=>methods.handleMarkDone(true,cardData._id)}>
                <p>{cardData.area_name}</p>
                <p>{cardData.folio}</p>
            </div>
            <div className={styles.descripcion} onClick={()=>methods.handleMarkDone(true,cardData._id)}>
                <p>{cardData.description}</p>
            </div>
            <div className={styles.edit}>
                <IconButton onClick={()=>methods.removetask(cardData._id)}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
}