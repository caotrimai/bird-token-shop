import React from 'react'
import {Web3Provider} from './providers'

export default function RootWrapper({children}) {
  return (
    <div className='RootWrapper'>
      <Web3Provider>
        {children}
      </Web3Provider>
    </div>
  )
}