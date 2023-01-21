import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box component='footer' sx={{ position: 'absolute', bottom: 0, bgcolor: 'primary.main', py: 3, textAlign: 'center', color: 'white' }} width={1} boxShadow='0 0 10px 0px #00000090' >
        جميع الحقوق محفوظة ©. غزالي 2023
    </Box>
  )
}

export default Footer