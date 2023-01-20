import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position='static' component='nav'>
        <Toolbar>
            <Box sx={{ mr: 2 }}>
                <Link to="/">
                    <FamilyRestroomIcon sx={{ color: 'white'}} fontSize="large" />
                </Link>
            </Box>
            <Link style={{color: 'white', textDecoration: 'none', fontSize: 18}} to="/">
                <Typography component='h2' variant='h6' sx={{ display: {xs: 'none', sm: 'block'} }}>
                    Family Tree
                </Typography>
            </Link>
            <Button sx={{ ml: 'auto' }} color="inherit">
                <Link style={{color: 'white', textDecoration: 'none', fontSize: 18}} to='/add'>
                    Add
                </Link>
            </Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar