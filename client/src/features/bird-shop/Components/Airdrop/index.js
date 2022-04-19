import {Box, Button} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import React, {useCallback, useEffect, useReducer} from 'react'
import {convertToLocalDate} from '../../../../common/utils'
import {useWeb3} from '../../../../providers'

export default function Airdrop(){
  const {
    web3,
    shopContract,
    currentAccount,
  } = useWeb3()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      message: '',
      receivedAmount: 0,
      received: false,
      lockingTime: 0,
      unlocked: false,
      loading: false,
    },
    undefined,
  )  
  const {message, receivedAmount, received, loading, lockingTime, unlocked} = state
  
  
  const getAirdropDetail = useCallback((signal = {unmount: false}) => {
    if (currentAccount) {
      shopContract.methods.getAirdropDetail(currentAccount).call()
      .then((result) => {
        if (!signal.unmount) {
          setState({
            receivedAmount: web3.utils.fromWei(result.amount, 'ether'),
            lockingTime: Number(result.lockingTime),
            received: result.received,
            unlocked: Number(result.lockingTime)*1000 < dayjs().valueOf(),
          })
        }
      })
      .catch(err => {console.log(err)})
    }
  },[currentAccount])
  
  useEffect(() => {
    const signal = {unmount: false}
    getAirdropDetail(signal)
    
    return () => {
      signal.unmount = true
    }
  },[getAirdropDetail])
  
  const handleGetToken = (e) => {
    e && e.preventDefault()
    setState({loading: true})
    shopContract.methods.getTokenAirdrop()
      .send({from: currentAccount})
      .then(() => { 
        getAirdropDetail()
      })
      .catch(err => {setState({message: err.message})})
      .finally(() => setState({loading: false}))
  }
  
  return(
    <Box className='LockToken' sx={{display: 'flex', justifyContent: 'center'}}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            AIRDROP
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Get tokens free
          </Typography>
          {currentAccount &&
            <>
              {receivedAmount > 0 &&
                <div>
                <Typography sx={{mb: 1.5}} color='text.primary'>
                  Received amount: <strong>{receivedAmount}</strong>
                </Typography>
                  <Typography sx={{mb: 1.5}} color="text.primary">
                  Lock to: <strong>{convertToLocalDate(Number(lockingTime))}</strong>
                </Typography>
                </div>
              }
              <Button
                disabled={loading || received || (lockingTime > 0 && !unlocked)}
                sx={{marginTop: '20px'}}
                variant='contained'
                fullWidth
                onClick={handleGetToken}
              >
                Get tokens
              </Button>
            </>
          }
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            {message || ''}
            <br/>
            {receivedAmount > 0 && !received &&
            `You have received BIRD tokens, wait to unlock on ${convertToLocalDate(Number(lockingTime))}`}
            {received && 'You have received BIRD tokens'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}