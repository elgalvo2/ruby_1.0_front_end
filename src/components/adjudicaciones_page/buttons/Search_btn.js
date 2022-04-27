import React, { PureComponent } from 'react';
import styles from './Search_btn.module.css'

import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'




export default function Search_btn() {

    return (
        <TextField
            id="input-with-icon-textfield"
            label="Buscar"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
            variant='filled'
            className={styles.search}
        />
    )
}