import {Box} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React from 'react'
import SwapForm from '../SwapForm'

export default function MarketSwap(){
  
return (
  <Box className='MarketSwap' sx={{display: 'flex', justifyContent: 'center'}}>
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          SWAP
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Swap your tokens for other tokens
        </Typography>
        <SwapForm/>
      </CardContent>
    </Card>
  </Box>
)  
}