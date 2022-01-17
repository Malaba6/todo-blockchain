import { useEffect, useState } from "react"
import TodoListJSON from '../contracts/TodoList.json'

const useContract = ({ web3, account, setMsg }) => {
  const [contract, setContract] = useState()

  useEffect(() => {
    const init = async () => {
      if (web3 === undefined) {
        setContract(undefined)
        return
      }
      const networkId = await web3.eth.net.getId()
      const network = TodoListJSON.networks[networkId]

      if (network === undefined) {
        setMsg(['Error', 'Contract ID not found in network' ])
        setContract(undefined)
        return
      }

      const abi = TodoListJSON.abi
      const address = network.address

      const contract_ = new web3.eth.Contract(abi, address)
    
      setContract(contract_)
    }
    init().catch(err => {
      console.log(err)
      setMsg(['error', `Error initializing contract ${err.message}`])
    })


  }, [web3, setMsg])

  const createTask = async (task) => {
    if (contract === undefined) {
      return
    }
    contract.methods.createTask(task).send({ from: account, gas: 1000000 })
      .then(() =>
        setMsg(['success', `Task Created: ${task}`]))
      .catch(err =>
        setMsg(['error', `Error creating task ${err.message}`]))
  }

  return [{ createTask }]
}

export default useContract
