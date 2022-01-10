import { useCallback, useState } from "react";
import {
  Box, Grid, Typography
} from "@mui/material";
import { BlurCircular
 } from "@mui/icons-material";
 import moment from 'moment'
 import {ReactCSSTransitionGroup} from 'react-addons-transition-group'
import Task from "./Task";

const Main = () => {
  const [selectedItem, setSelectedItem] = useState()
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const menuLabels = [
    {
      label: "No list",
      value: 1
    }
  ]

  const handleMenuChange = e => setSelectedItem(e.target.value)

  const handleDateChange = useCallback(newDate =>setDate(newDate), [])

  const handleTaskChange = e => setTask(e.target.value)

  const handleAddTask = () => {
    setTasks([...tasks, { 
      id: tasks.length + 1, 
      task: task,
      date: date,
      isDone: false,
    }].sort((a, b) => b.date - a.date))
    setTask('')
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
        <ReactCSSTransitionGroup  
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionName="name">
          {tasks.map(({id, task, date, isDone}) => 
            <Task
              key={id}
              id={id}
              task={task}
              date={date}
              isDone={isDone}
              tasks={tasks}
              setTasks={setTasks}
              handleDateChange={handleDateChange} />
          )}
        </ReactCSSTransitionGroup>
      </Box>
    </Box>
  )
}

export default Main
