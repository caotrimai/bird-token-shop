import {yupResolver} from '@hookform/resolvers/yup'
import {Button, MenuItem, TextField} from '@mui/material'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import React, {useEffect, useReducer} from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {useWeb3} from '../../../../providers'
import FormTextField from '../../../common/FormFields/FormTextField'

const BNB = 'BNB'
const BIRD = 'BIRD'

const currencies = [
  {
    value: BNB,
    label: BNB,
  },
  {
    value: BIRD,
    label: BIRD,
  },
];

const FORM_FIELD = {
  swapFromAmount: 'swapFromAmount',
  swapToAmount: 'swapToAmount',
}

const schema = yup.object({
  [FORM_FIELD.swapFromAmount]: yup.number().positive().required(),
  [FORM_FIELD.swapToAmount]: yup.number().positive().required(),
}).required()

export default function SwapForm () {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      approveAmount: 0,
      userBuyRatio: 0,
      userSellRatio: 0,
      fromCurrency: BNB,
      toCurrency: BIRD,
      approvePermission: false,
    },
    undefined,
  )
  const {
    approveAmount, 
    userBuyRatio, 
    userSellRatio, 
    fromCurrency, 
    toCurrency, 
    approvePermission
  } = state
  const {
    web3,
    birdToken,
    shopContract,
    currentAccount,
    isInitiated,
  } = useWeb3()

  const defaultValues = {
    [FORM_FIELD.swapFromAmount]: '0.0',
    [FORM_FIELD.swapToAmount]: '0.0',
  }

  const {control, handleSubmit, reset, setValue} = useForm(
    {
      defaultValues,
      resolver: yupResolver(schema),
    })

  useEffect(() => {
    if (shopContract) {
      shopContract.methods.userBuyRatio().call()
      .then((userBuyRatio) => {
        setState({userBuyRatio: Number(userBuyRatio)})
      })
      shopContract.methods.userSellRatio().call()
      .then((userSellRatio) => {
        setState({userSellRatio: Number(userSellRatio)})
      })
    }
  }, [shopContract])

  const getInputProps = (token, field) => ({
    readOnly: field === FORM_FIELD.swapToAmount,
    inputProps: {
      style: {textAlign: 'center', fontWeight: 'bold'},
    },
    startAdornment: (
      <InputAdornment position='start'>
        <Typography variant='h6' component='span'>
          {token}
        </Typography>
      </InputAdornment>
    ),
  })
  
  const handleChangFromCurrency = (event) => {
    const value = event.target.value
    if (value === BNB || value === BIRD) {
      setState({
        fromCurrency: value,
        toCurrency: value === BNB ? BIRD : BNB,
      })
      reset(defaultValues)
    }
  }
  const handleChangToCurrency = (event) => {
    const value = event.target.value
    if (value === BNB || value === BIRD) {
      setState({
        toCurrency: value,
        fromCurrency: value === BNB ? BIRD : BNB,
      })
      reset(defaultValues)
    }
  }

  const submitButton = (
    <Button
      disabled={!approvePermission}
      type='submit'
      sx={{marginTop: '20px'}}
      variant='contained'
      fullWidth
    >
      Submit
    </Button>
  )
  
  const buyBirdTokenButton = (bnbAmount) => {
    shopContract.methods.userBuyBirdToken().send({
      from: currentAccount,
      value: web3.utils.toWei(bnbAmount.toString()),
    })
    .then(() => {
      reset(defaultValues)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  const approveTokens = (e) => {
    e && e.preventDefault()
    const amount = web3.utils.toWei(approveAmount.toString())
    birdToken.methods.approve(
      shopContract.options.address,
      amount
    )
    .send({from: currentAccount})
    .then(() => {
      alert('Approve successfully')
      setState({
        approvePermission: true,
        approveAmount: 0
      })
    })
    .catch((error) => {console.log(error)})
  }
  
  const swapBirdToBNB = (birdAmount) => {
    const amount = web3.utils.toWei(birdAmount.toString())
    shopContract.methods.userSellToken(amount)
    .send({from: currentAccount})
    .then(() => {
      alert('Sell token successfully')
      reset(defaultValues)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleFormSubmit = (values) => {
    const fromAmount = values[FORM_FIELD.swapFromAmount]
    if (fromCurrency === BNB) {
      buyBirdTokenButton(fromAmount)
    } else {
      swapBirdToBNB(fromAmount)
    }
  }

  const setSwapToField = (value) => {
    if (fromCurrency === BNB) { // use BNB to buy BIRD
      setValue(FORM_FIELD.swapToAmount, Number(value) * userBuyRatio)
    } else { // sell BIRD to get BNB
      setValue(FORM_FIELD.swapToAmount, (Number(value) / userBuyRatio)*userSellRatio)
    }
  }

  const approveInput = (
    <Box sx={{width: '220px', marginBottom: '50px' }}>
      <TextField
        fullWidth
        label='Enable approve'
        size='small'
        name='approveAmount'
        value={approveAmount}
        onChange={(e) => setState({approveAmount: e.target.value})}
        InputProps={getInputProps('BIRD', FORM_FIELD.swapFromAmount)}
      />
      <Button
        fullWidth
        sx={{marginTop: '10px' }} 
        variant='contained'
        onClick={approveTokens}
      >
        Enable
      </Button>
    </Box>
  )
  
  const swapSelection = (
    <Box sx={{
      width: '220px',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    }}>
      <TextField
        id="fromCurrency"
        select
        label="Swap From"
        value={fromCurrency}
        onChange={handleChangFromCurrency}
        variant="standard"
        sx={{width: '80px'}}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="toCurrency"
        select
        label="Swap To"
        value={toCurrency}
        onChange={handleChangToCurrency}
        variant="standard"
        sx={{width: '80px'}}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
  
  return (
    <Box className='SwapForm' sx={{backgroundColor: '#FAFBFD', padding: '10px', width: 360}}>
      <Box className='from' sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {isInitiated && swapSelection}
        {isInitiated && approveInput}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormTextField
            autoComplete='off'
            control={control}
            name={FORM_FIELD.swapFromAmount}
            InputProps={getInputProps(fromCurrency, FORM_FIELD.swapFromAmount)}
            onValueChange={(e) => setSwapToField(e.target.value)}
          />
          <FormTextField
            autoComplete='off'
            control={control}
            name={FORM_FIELD.swapToAmount}
            InputProps={getInputProps(toCurrency, FORM_FIELD.swapToAmount)}
            sx={{marginTop: '20px'}}
          />
          {isInitiated && submitButton}
        </form>
      </Box>
    </Box>
  )
}