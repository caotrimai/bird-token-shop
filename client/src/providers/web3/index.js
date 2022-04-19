import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import BirdShop from '../../contracts/BirdShop'
import BirdToken from '../../contracts/BirdToken'

const Web3Context = createContext({})

export default function Web3Provider ({children}) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      provider: null,
      web3: null,
      accounts: [],
      currentAccount: '',
      birdToken: null,
      shopContract: null,
      isInitiated: false,
      errorMsg: '',
    },
    undefined,
  )
  const {provider} = state

  const loadProvider = useCallback(async () => {
    const provider = await detectEthereumProvider()
    if (provider) {
      const web3 = new Web3(provider)
      const birdToken = new web3.eth.Contract(
        BirdToken.ABI,
        BirdToken.ADDRESS
      )
      const shopContract = new web3.eth.Contract(
        BirdShop.ABI,
        BirdShop.ADDRESS
      )
      const accounts = await web3.eth.requestAccounts()
      const currentAccount = accounts[0]
      setState({
        provider,
        web3,
        accounts,
        currentAccount,
        birdToken,
        shopContract,
        isInitiated: true,
      })
    } else {
      setState({isInitiated: true})
      alert('Please install metamask')
    }
  }, [])

  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', (accounts) => {
        setState({
          accounts,
          currentAccount: accounts[0],
        })
      })
      provider.on('chainChanged', (chainId) => {
        window.location.reload()
      })
    }
  }, [provider])

  return (
    <Web3Context.Provider value={{...state, loadProvider}}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3 () {
  return useContext(Web3Context)
}