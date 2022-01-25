import { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, Slide, Typography, Collapse
} from "@mui/material";
import { BlurCircular } from "@mui/icons-material";
import moment from 'moment'
import { TransitionGroup } from 'react-transition-group'
import { v4 as uuid } from 'uuid'
import Task from "./Task";
import { getDatesMenu, sortList } from "../utils";

const Main = ({
  createTask, tasks, setTasks, toggleTaskChange,
  deleteTask
}) => {
  const [selectedItem, setSelectedItem] = useState(1)
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState('')
  const [when, setWhen] = useState({})
  const [tasks_, set_Tasks] = useState([])
  
  const [menuLabels, setMenuLabels] = useState([{
    label: 'Sort All by Date',
    value: 1
  }])

  useEffect(() => {
    getDatesMenu({
      when, setWhen, tasks,
      setMenuLabels, menuLabels
    })
  }, [tasks, menuLabels])

  const handleMenuChange = e => {
    setSelectedItem(e.target.value)
    const item = menuLabels.find(l => l.value === e.target.value)
    const { label } = item
    console.log('Selected item *** ', when[label])
    const tasks_ = when[label]

    set_Tasks(tasks_ || [])
  }

  const handleDateChange = useCallback(newDate => setDate(newDate), [])

  const handleTaskChange = e => setTask(e.target.value)

  const handleAddTask = async() => {
    if (task) {
      const time = date < new Date() ? new Date() : date
      const dateInSeconds = moment(time).valueOf()

      await createTask(task, dateInSeconds)

      setTask('')
    }
  }

  const getGreetings = (hour) => {
    return hour < 12 ? 'Good morning'
      : hour < 16 ? 'Good afternoon'
      : 'Good evening'
  }

  const tasks__ = tasks_.length ? tasks_ : sortList(tasks)
  
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
          {tasks__.map(({id, content, date, isDone}) => id !== '0'
            ? (<Collapse key={id}>
                <Task
                  key={id}
                  id={id}
                  task={content}
                  date={new Date(parseInt(date))}
                  isDone={isDone}
                  tasks={tasks}
                  setTasks={setTasks}
                  deleteTask={deleteTask}
                  toggleTaskChange={toggleTaskChange}
                  handleDateChange={handleDateChange} />
                </Collapse>)
            : null
            )}
        </TransitionGroup>
      </Box>
    </Box>
  )
}

export default Main
