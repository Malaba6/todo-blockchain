import { useEffect } from "react";
import {
  Box, Checkbox, Container, Divider, FormControl,
  IconButton, InputBase, InputLabel, ListItem,
  MenuItem,
  Select, Tooltip, Typography, Zoom
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import moment from 'moment'
import { DeleteOutline } from "@mui/icons-material";

const Task = ({
  isNewTask, selectedItem, task, isDone, setTasks,
  date, handleTaskChange, handleMenuChange, tasks,
  handleDateChange, menuLabels, handleAddTask, id,
  newTasks: _tasks, toggleTaskChange, deleteTask
}) => {
  const hanleTaskStatusChange = async () => await toggleTaskChange(id)
  const handleDeleteTask = async () => await deleteTask(id)

  useEffect(() => {
    if (_tasks) {
      _tasks.forEach(t => {
        if (t.id !== '0') {
        // Turn timestamp into date
        const newDate = new Date(parseInt(t.date))
      }})
    }
  }, [_tasks])

  useEffect(() => {
    handleDateChange(new Date())
  }, [handleDateChange])

  return (
    <Zoom style={{ transitionDelay: '100ms'}} in>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        width: { xs: '95%', md: '60%' },
        height: 'fit-content',
        p: 1.5,
        borderRadius: '0.7em',
        mb: isNewTask ? 3.5 : 1.5,
      }}>
        <Tooltip title={isDone ? 'Mark as not done' : 'Mark as done'} placement="top" arrow>
          <Checkbox
            disabled={isNewTask}
            sx={{
              '&.Mui-checked': {
                color: 'info.main',
              },
            }}
            onChange={hanleTaskStatusChange}
            checked={isDone}
            fontSize="small" />
        </Tooltip>
        <InputBase sx={{ ml: 1, flex: 1 }}
          onChange={handleTaskChange}
          value={task}
          readOnly={!isNewTask}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="What's your plan today?"
          sx={{
            textDecoration: isDone ? 'line-through' : 'none',
            color: isDone ? 'info.main' : 'text.primary',
            flex: 1,
          }}
          inputProps={{ 'aria-label': "what's your plan today?"}} />
        {isNewTask
          ? <DateTimePicker
              label="Pick date and time"
              value={date}
              inputFormat="MMM Do YY, hh:mm A"
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center', m: 1 }}>
                  <InputBase ref={inputRef}
                    {...inputProps}
                    disabled sx={{
                    p: 0,
                  }} />
                  {InputProps?.endAdornment}
                </Box>
              )}
              onChange={handleDateChange} />
          : <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <Typography
                sx={{
                  backgroundColor: 'primary.light',
                  p: 1,
                  pt: 1,
                  pb: 1,
                  mr: 1,
                  borderRadius: '0.7em',
                }}>
                {moment(date).format('D MMM, hh A')}
              </Typography>
              <Tooltip title="Delete" arrow placement="top">
                <IconButton
                  color="info"
                  onClick={handleDeleteTask}>
                    <DeleteOutline  />
                </IconButton>
              </Tooltip>
          </Box>
        }
        {isNewTask && (
          <>
            <Divider orientation='vertical'
              sx={{
                m: 1,
                mr: 2,
                height: 30,
                display: {xs: 'none', md: 'block'}
              }} />
            <FormControl
              sx={{
                display: {xs: 'none', md: 'block'}
              }}>
              <InputLabel id="my-todo-list">Todos</InputLabel>
              <Select
                labelId="my-todo-list"
                id="my-todo-menu"
                defaultValue={1}
                value={selectedItem}
                label="todo"
                onChange={handleMenuChange}
                sx={{
                  p: 0,
                  height: 40,
                }}>
                {menuLabels.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        
      </Container>
    </Zoom>
  )
}

export default Task
