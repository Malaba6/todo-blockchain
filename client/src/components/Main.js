import { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, Slide, Typography, Collapse
} from "@mui/material";
import { BlurCircular } from "@mui/icons-material";
import moment from 'moment'
import { TransitionGroup } from 'react-transition-group'
import { v4 as uuid } from 'uuid'
import Task from "./Task";

const Main = () => {
  const [selectedItem, setSelectedItem] = useState()
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [when, setWhen] = useState({})
  const [menuLabels, setMenuLabels] = useState([{
    label: 'Sort by Date',
    value: 1
  }])

  const handleMenuChange = e => {
    setSelectedItem(e.target.value)
    const item = menuLabels.find(l => l.value === e.target.value)
    const { label } = item

    setTasks(when[label])
  }

  const handleDateChange = useCallback(newDate => setDate(newDate), [])

  const handleTaskChange = e => setTask(e.target.value)

  // Sort tasks by date
  const sortList = (list) => list.sort((a, b) => b.date - b.date)

  // Check whether task is already in list
  const isInMenu = (item) => menuLabels.find(l => l.value === item)

  const handleAddTask = () => {
    if (task) {
      const time = date < new Date() ? new Date() : date
      const day = moment(time).calendar()
      const timeLapse = moment(time).fromNow()
  
      const newTask = {
        id: uuid(),
        task,
        date: time,
        isDone: false,
      }

      if (day.indexOf('Today') !== -1) {
        setWhen({
          ...when,
          Today: when?.Today ? sortList([...when.Today, newTask]) : [newTask]
        })

        !isInMenu('Today') && setMenuLabels([...menuLabels, {
          label: 'Today', value: menuLabels.length + 1
        }])
      } else if (day.indexOf('Tomorrow') !== -1) {
        setWhen({
          ...when,
          Tomorrow: when?.Tomorrow ? sortList([...when.Tomorrow, newTask]) : [newTask]
        })

        !isInMenu("Tomorrow") && setMenuLabels([...menuLabels, {
          label: 'Tomorrow', value: menuLabels.length + 1
        }])
      } else {
        setWhen({
          ...when,
          [timeLapse]: when[timeLapse]
            ? sortList([...when[timeLapse], newTask]) 
            : [newTask]
        })

        !isInMenu(timeLapse) && setMenuLabels([...menuLabels, {
          label: timeLapse, value: menuLabels.length + 1
        }])

      }

      setTasks(sortList([...tasks, newTask]))
      setTask('')
    }
  }

  const getGreetings = (hour) => {
    return hour < 12 ? 'Good morning'
      : hour < 16 ? 'Good afternoon'
      : 'Good evening'
  }
  
  return (
    <Box sx={{
      height: 'calc(100vh - 64px)',
      mt: 4,
      mb: 4,
    }}>
      <Grid container sx={{
        width: {xs: '98%', md: '72%'},
        m: '0 auto',
        mb: 8,
      }}>
        <Grid container item xs={1}
          justifyContent='center'>
          <BlurCircular fontSize="large" sx={{
            color: 'secondary.main',
          }} />
        </Grid>
        <Grid container direction='column' item
          alignItems="flex-start"
          xs={11}>
            <Typography variant="h4">
              {`${getGreetings(moment().hour())}, Champion`}</Typography>
            <Typography
              sx={{
                fontSize: '1.5em',
                color: 'text.secondary',
              }}>It's {moment(new Date()).format('dddd, MMM DD')}</Typography>
        </Grid>
      </Grid>
      <Box container item justifyContent='center' direction='column' alignItems='center' sx={{
        height: '100%'
      }}>
        <Task
          isNewTask
          selectedItem={selectedItem}
          task={task}
          date={date}
          handleTaskChange={handleTaskChange}
          handleMenuChange={handleMenuChange}
          handleDateChange={handleDateChange}
          handleAddTask={handleAddTask}
          menuLabels={menuLabels} />
        <TransitionGroup>
          {tasks.map(({id, task, date, isDone}) => 
            <Collapse key={id}>
              <Task
                key={id}
                id={id}
                task={task}
                date={date}
                isDone={isDone}
                tasks={tasks}
                setTasks={setTasks}
                handleDateChange={handleDateChange} />
              </Collapse>
            )}
        </TransitionGroup>
      </Box>
    </Box>
  )
}

export default Main
