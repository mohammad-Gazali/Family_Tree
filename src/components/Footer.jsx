import { Box, colors } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box component='footer' sx={{ position: 'absolute', bottom: 0, bgcolor: colors.blue[700], py: 3, textAlign: 'center', color: 'white' }} width={1} boxShadow='0 0 10px 0px #00000090' >
        Footer
    </Box>
  )
}

export default Footer