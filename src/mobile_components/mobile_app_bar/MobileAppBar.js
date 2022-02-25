import React from 'react'
import styles from './MobileAppBar.module.css'
import { AppBar, IconButton, Menu, MenuItem, MenuList, Toolbar, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'


export default function MobileAppBar({methods}) {
    return (
        <div className={styles.appBar}>
            <AppBar position='fixed'>
                <Toolbar className={styles.toolba}>
                    <Typography
                        variant='h5'
                    >Signature
                    </Typography>
                    <IconButton
                        className={styles.IconBu}
                        onClick={()=>methods.sessionClose()}
                        size='medium'
                        edge='end'
                        color='inherit'
                        aria-label='menu'
                    >
                        <ExitToAppIcon />

                    </IconButton>


                </Toolbar>
            </AppBar>
        </div>
    )
}

