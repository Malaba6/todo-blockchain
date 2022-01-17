import { useState, useEffect } from 'react'
import Web3 from "web3"
import Web3Modal from "web3modal"


const useNetwork = ({ setMsg }) => {
  const [network, setNetwork] = useState('---')
  const [web3, setWeb3] = useState()
  const [account, setAccount] = useState('---')
  const [wallet, setWallet] = useState()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setWallet(window.ethereum?.isMetaMask ? 'MetaMask' : 'Other Wallet')
    } else setWallet('None')
  },[])

  const connectNetwork = async () => {
    // When injecting providers like Metamask with truffle
    // https://trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask.html
    const fallbackGanasheProviderUrl = 'http://127.0.0.1:7545'

    // When using a Ganache local network
    const provider = new Web3(Web3.givenProvider || fallbackGanasheProviderUrl)

    setIsConnected(true)

    const isLocal = !provider.isMetaMask && (window.location.hostname === '127.0.0.1')

    isLocal && setMsg([
      'info', `Please connect to local Ganache: ${fallbackGanasheProviderUrl}`
    ])

    const provider_ = isLocal ? fallbackGanasheProviderUrl : provider
    const web3_ = new Web3(provider_)

    console.log('Web3 version: ', web3_.version)
    const nodeInfo = await web3_.eth.getNodeInfo()
    console.log('Web3 node info: ', nodeInfo)
    setWallet(nodeInfo.split(' ', 1)[0])

    const chainId = await web3_.eth.getChainId()
    const networkId = await web3_.eth.net.getId()

    const networkType = await web3_.eth.net.getNetworkType()
      .catch(() => 'Unknown')
    setWeb3(web3_)
    
    setNetwork(`${chainId} ${networkId} (${networkType})`)

    setupAccount(web3_)
  }

  const setupAccount = async (web3_) => {
    try {
      const accounts = await web3_.eth.getAccounts()
      setAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw(error)
    }
  }

  const disconnectNetwork = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      web3.currentProvider.close()
      setIsConnected(false)
    }
    // web3.clearCachedProvider()

    setNetwork('---')
    setWeb3(undefined)
    setAccount('---')
    setIsConnected(false)
  }

  return [{ network, web3, account, wallet, isConnected }, connectNetwork, disconnectNetwork]
}

export default useNetwork
