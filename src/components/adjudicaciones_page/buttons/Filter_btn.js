import React, { PureComponent } from 'react';
import styles from './Filter_btn.module.css'
import FilterListIcon from '@material-ui/icons/FilterList'

export default function Filter_btn({active=false}) {
    const changeActive = ()=>{
        active = !active;
     }
    return (
        <button className={styles.button} onClick={changeActive}>
            <FilterListIcon></FilterListIcon> Filtrar
        </button>
    )
}