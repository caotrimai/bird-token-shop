import {Button} from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import React, {useState} from 'react'
import {shorthandAddress} from '../../../../common/utils'
import {useWeb3} from '../../../../providers'
import Airdrop from '../Airdrop'
import MarketSwap from '../MarketSwap'

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function TabPanel ({children, value, index, ...other}) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function BirdShop () {
  const {
    loadProvider,
    currentAccount,
    isInitiated,
  } = useWeb3()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const connectButton = (
    <Button
      onClick={loadProvider}
      sx={{marginTop: '20px'}}
      variant='contained'
    >
      Connect Wallet
    </Button>
  )

  return (
    <Box sx={{width: '100%'}}>
      <Typography variant='h6' align='center'>
        {isInitiated ? shorthandAddress(currentAccount) : connectButton}
      </Typography>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange}
              centered aria-label='bird-shop-tabs'>
          <Tab label='Swap' {...a11yProps(0)} />
          <Tab label='Airdrop' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MarketSwap/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Airdrop/>
      </TabPanel>
    </Box>
  )
}