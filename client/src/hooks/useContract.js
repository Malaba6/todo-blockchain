import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import TodoListJSON from '../contracts/TodoList.json'

const useContract = ({ web3, account, setMsg }) => {
  const [contract, setContract] = useState()
  const [tasks, setTasks] = useState([])
 

  useEffect(() => {
    const init = async () => {
      if (web3 === undefined) {
        setContract(undefined)
        setTasks([])
        return
      }
      const networkId = await web3.eth.net.getId()
      const network = TodoListJSON.networks[networkId]

      if (network === undefined) {
        setMsg(['Error', 'Contract ID not found in network' ])
        setContract(undefined)
        setTasks([])
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

  const getTasks = useCallback(async () => {
    if (contract === undefined) {
      setTasks([])
      return
    }
    try {
      const tasks_ = await contract.methods.getTasks().call()
      if (tasks_ === null) {
        throw new Error('Failed to get tasks. Please check your account!')
      }
      console.log('tasks_: called ', tasks_)
      setTasks(tasks_)
    } catch (err) {
      setMsg(['error', `Error getting tasks ${err.message}`])
    }
  }, [contract, setMsg])

  useEffect(() => {
    getTasks()
  }, [getTasks])


  const createTask = async (task, date) => {
    if (contract === undefined) {
      return
    }
    contract.methods.createTask(task, date).send({ from: account, gas: 1000000 })
      .then(() => {
        setMsg(['success', `Task Created: ${task}`])
        getTasks()
      })
      .catch(err =>
        setMsg(['error', `Error creating task ${err.message}`]))
  }

  const toggleTaskChange = (taskId) => {
    if (contract === undefined) {
      return
    }
    contract.methods.toggleTaskDone(taskId).send({ from: account, gas: 1000000 })
      .then(() => {
        setMsg(['success', `Task Changed: ${taskId}`])
        getTasks()
      })
      .catch(err =>
        setMsg(['error', `Error changing task ${err.message}`]))
  }

  const deleteTask = (taskId) => {
    if (contract === undefined) {
      return
    }
    contract.methods.deleteTask(taskId).send({ from: account, gas: 1000000 })
      .then(() => {
        setMsg(['success', `Task Deleted: ${taskId}`])
        getTasks()
      })
      .catch(err =>
        setMsg(['error', `Error deleting task ${err.message}`]))
  }

  const tasks_ = tasks.filter(t => t.id !== '0')

  return [{
    createTask, setTasks, toggleTaskChange,
    deleteTask
  }, tasks_]
}

export default useContract
