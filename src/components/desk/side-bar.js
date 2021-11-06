import * as React from 'react';
import {Box,List,Divider,Button,ListItemIcon,ListItemText,ListItem,Paper, Typography, Grid} from '@material-ui/core';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

export default function SideBar({methods}) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [credentials, setCredentials] = React.useState(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    methods.setIndex(index);
  };

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component={Grid} direction='row' alignItems='strech'>
      <Box>
        <Typography sx={{height:'100vh', maxHeight:200}} component={Paper} variant='h4'>Signature</Typography>
        <Typography sx={{height:'100vh', maxHeight:200}} component={Paper} variant='h2'>RUBY</Typography>

      </Box>
      <Divider></Divider>
    
      <List component={Paper} aria-label="main mailbox folders">
      <ListItem>
        <Button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          disabled={false}
        >
          <ListItemText primary="Home" />
        </Button>
      </ListItem>
      <ListItem>

        <Button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          
        >
         
         
          <ListItemText primary="Auo"/>
        </Button> 
      </ListItem>
      <ListItem>

        <Button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Tecnicos"/>
        </Button>
        </ListItem>
        <ListItem>

        <Button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Administrador"/>
        </Button>
        </ListItem>
      </List>
    </Box>
  );
}
