import React, { PureComponent } from 'react';
import styles from './Add_btn.module.css'
import PropTypes from 'prop-types'


export default function Add_btn({active = false}){
    
    return(
        <button className={styles.button}>+</button>
    )
}

