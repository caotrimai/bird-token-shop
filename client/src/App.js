import React from 'react'
import {Container} from '@mui/material'
import {makeStyles} from '@mui/styles'

import MarketSwap from './features/bird-shop/Components/MarketSwap'
import RootWrapper from './RootWrapper'

const useStyles = makeStyles({
  App: {
    backgroundColor: '#e7ebf0',
    margin: 0,
    padding: '20px',
  },
  body: {
    minHeight: '100%',
  },
})

function App () {
  const classes = useStyles()

  return (
    <div className={classes.App}>
      <RootWrapper>
        <Container className={classes.body}>
          <MarketSwap/>
        </Container>
      </RootWrapper>
    </div>
  )
}

export default App
