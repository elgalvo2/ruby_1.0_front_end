import React from "react";
import styles from './Direct_adj_btn.module.css'
import AssigmentReturnIcon from '@material-ui/icons/AssignmentReturn'

export default function Direct_adj_btn({active = false}){
    const changeActive = ()=>{
        active = !active;
     }
    return(
        <button className={styles.button} onClick={changeActive}>
            <AssigmentReturnIcon fontSize="large"/>
        </button>
    )
}