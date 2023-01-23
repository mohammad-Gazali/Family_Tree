import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Add, FamilyRestroom } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position='static' component='nav'>
        <Toolbar>
            <Box sx={{ mr: 2 }}>
                <Link to="/">
                    <FamilyRestroom sx={{ color: 'white'}} fontSize="large" />
                </Link>
            </Box>
            <Link style={{color: 'white', textDecoration: 'none', fontSize: 18}} to="/">
                <Typography component='h2' variant='h6' sx={{ display: {xs: 'none', sm: 'block', fontFamily: '"Cairo", sans-serif'} }}>
                    شجرة العائلة
                </Typography>
            </Link>
            <Button sx={{ ml: 'auto' }} color="inherit">
                <Link style={{color: 'white', textDecoration: 'none', fontSize: 18, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2}} to='/add'>
                    إضافة <Add sx={{ fontSize: "20px" }} />
                </Link>
            </Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar