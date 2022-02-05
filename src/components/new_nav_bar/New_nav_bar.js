import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/styles';
import styles from './new_nav_bar.module.css'
import SessionInfo from '../login/session_info/Session_info';

import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core/'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className={styles.panel}
      
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



export default function New_nav_bar({pages=['Adjudicaciones', 'Proveedores', 'Documentos'], methods}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static" className={styles.app_bar}>
        <div className={styles.logo}>
            <p>Signature</p>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          className={styles.tabs}
        >
          <Tab label='Adjudicaciones' {...a11yProps(0)} className={styles.tab}/>
          <Tab label="Proveedores" {...a11yProps(1)} className={styles.tab}/>
          <Tab label="Documentos" {...a11yProps(1)} className={styles.tab}/>
            
        </Tabs>
        <div className={styles.sesion}>
            <SessionInfo methods={methods.setlogin}/>
        </div>
        <div className={styles.clearFix}></div>
      </AppBar>
      <SwipeableViews
        axis={'x-reverse'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={styles.box}
      >
        
        <TabPanel value={value} index={0} dir={'ltr'}>
          {pages[0]}
        </TabPanel>
        <TabPanel value={value} index={1} dir={'ltr'}>
          {pages[1]}
        </TabPanel>
        <TabPanel value={value} index={2} dir={'ltr'}>
          {pages[2]}
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

New_nav_bar.propTypes = {
    pages:PropTypes.array
}