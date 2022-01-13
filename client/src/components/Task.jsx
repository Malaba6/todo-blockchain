import { useEffect } from "react";
import {
  Box, Checkbox, Container, Divider, FormControl,
  IconButton, InputBase, InputLabel, ListItem,
  MenuItem,
  Select, Typography, Zoom
} from "@mui/material";
// import { AddTask, CheckBoxOutlineBlankRounded } from "@mui/icons-material";
import { DateTimePicker } from "@mui/lab";
import moment from 'moment';

const Task = ({
  isNewTask, selectedItem, task, isDone, setTasks,
  date, handleTaskChange, handleMenuChange, tasks,
  handleDateChange, menuLabels, handleAddTask, id
}) => {
  const hanleTaskDone = () =>
    setTasks(tasks.map(t => t.id === id 
      ? { ...t, isDone: !isDone } 
      : t).sort((a, b) => b.id - a.id));

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
        <Checkbox
          disabled={isNewTask}
          sx={{
            '&.Mui-checked': {
              color: 'info.main',
            },
          }}
          onChange={hanleTaskDone}
          fontSize="small" />
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
              backgroundColor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              p: 1,
              pt: 0,
              pb: 0,
              borderRadius: '0.7em',

            }}>
              <Typography>
                {moment(date).format('D MMM, hh A')}
              </Typography>
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
