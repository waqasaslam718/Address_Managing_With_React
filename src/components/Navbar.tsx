import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BasicFormControl } from './BasicFormControl';


export function MenuAppBar() {
  const [addresses, setAddresses] = React.useState(false);
  const handleCloseModal = () => {
    setAddresses(false); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,  
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ADDRESS MANAGING APP
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => setAddresses(true)}>
  Add Address
</Button>

          {addresses && <BasicFormControl handleClose={handleCloseModal}/>}
        </Toolbar>
      </AppBar>


    </Box>
  );
}
