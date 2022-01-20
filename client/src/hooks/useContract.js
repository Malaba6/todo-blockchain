import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import TodoListJSON from '../contracts/TodoList.json'

const useContract = ({ web3, account, setMsg }) => {
  const [contract, setContract] = useState()
  // const [taskIds, setTaskIds] = useState([])
  const [tasks, setTasks] = useState([])
  // const [when, setWhen] = useState({})
  // console.log('tasks ids: ', taskIds, tasks)

  // useEffect(() => {
    // const day = moment(time).calendar()
    // const timeLapse = moment(time).fromNow()

    // if (day.indexOf('Today') !== -1) {
    //   setWhen({
    //     ...when,
    //     Today: when?.Today ? sortList([...when.Today, newTask]) : [newTask]
    //   })

    //   !isInMenu('Today') && setMenuLabels([...menuLabels, {
    //     label: 'Today', value: menuLabels.length + 1
    //   }])
    // } else if (day.indexOf('Tomorrow') !== -1) {
    //   setWhen({
    //     ...when,
    //     Tomorrow: when?.Tomorrow ? sortList([...when.Tomorrow, newTask]) : [newTask]
    //   })

    //   !isInMenu("Tomorrow") && setMenuLabels([...menuLabels, {
    //     label: 'Tomorrow', value: menuLabels.length + 1
    //   }])
    // } else {
    //   setWhen({
    //     ...when,
    //     [timeLapse]: when[timeLapse]
    //       ? sortList([...when[timeLapse], newTask]) 
    //       : [newTask]
    //   })

    //   !isInMenu(timeLapse) && setMenuLabels([...menuLabels, {
    //     label: timeLapse, value: menuLabels.length + 1
    //   }])

    // }

    // setTasks(sortList([...tasks, newTask]))
  // }, [tasks])

  useEffect(() => {
    const init = async () => {
      if (web3 === undefined) {
        setContract(undefined)
        setTasks([])
        // setTaskIds([])
        return
      }
      const networkId = await web3.eth.net.getId()
      const network = TodoListJSON.networks[networkId]

      if (network === undefined) {
        setMsg(['Error', 'Contract ID not found in network' ])
        setContract(undefined)
        setTasks([])
        // setTaskIds([])
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

  // const getTaskIds = useCallback(async () => {
  //   if (contract === undefined) {
  //     setTaskIds([])
  //     return
  //   }
  //   try {
  //     const taskIds_ = await contract.methods.getTaskIds().call()
  //     // const tasks_ = await contract.methods.getTasks().call()
  //     if (taskIds_ === null) {
  //       throw new Error('Failed to get tasks. Please check your account!')
  //     }
  //     setTaskIds(taskIds_)
  //   } catch (err) {
  //     setMsg(['error', `Error getting task ids ${err.message}`])
  //   }
    
  // }, [contract, setMsg])

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
    // getTaskIds()
    getTasks()
  }, [getTasks])


  const createTask = async (task, date, when) => {
    if (contract === undefined) {
      return
    }
    contract.methods.createTask(task, date, when).send({ from: account, gas: 1000000 })
      .then(() => {
        setMsg(['success', `Task Created: ${task}`])
        getTasks()
      })
      .catch(err =>
        setMsg(['error', `Error creating task ${err.message}`]))
  }

  return [{ createTask, setTasks }, tasks]
}

export default useContract
