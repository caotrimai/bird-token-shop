import {Container} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import BirdShop from './features/bird-shop/Components/BirdShop'
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
          <BirdShop/>
        </Container>
      </RootWrapper>
    </div>
  )
}

export default App
