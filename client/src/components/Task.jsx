import { useEffect } from "react";
import {
  Box, Checkbox, Container, Divider, FormControl,
  IconButton, InputBase, InputLabel, ListItem,
  MenuItem,
  Select, Tooltip, Typography, Zoom
} from "@mui/material";
import { DateTimePicker, MobileDatePicker } from "@mui/lab"
import { useTheme } from "@mui/material/styles"
import moment from 'moment'
import { DeleteOutline } from "@mui/icons-material"

const Task = ({
  isNewTask, selectedItem, task, isDone, setTasks,
  date, handleTaskChange, handleMenuChange, tasks,
  handleDateChange, menuLabels, handleAddTask, id,
  newTasks: _tasks, toggleTaskChange, deleteTask,
  isMenu
}) => {
  const theme = useTheme();
  console.log('Theme: ', theme.breakpoints);
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
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
        width: { xs: '95%', md: '60%' },
        height: 'fit-content',
        p: 1.5,
        borderRadius: '0.7em',
        // flexDirection: 'row-reverse',
        flexDirection: { xs: isNewTask && 'column-reverse', md: 'row' },

        mb: isNewTask ? 3.5 : 1.5,
      }}>
        <Box sx={{
          // display: 'flex',
          border: 'solid thin red',
          width: '100%'
        }}>
        <Tooltip  
          title={isDone ? 'Mark as not done' : 'Mark as done'}
          placement="top" arrow>
          <Checkbox
            disabled={isNewTask}
            sx={{
              // display: { xs: isMenu && 'none', md: 'flex' },
              '&.Mui-checked': {
                color: 'info.main',
              },
            }}
            onChange={hanleTaskStatusChange}
            checked={isDone}
            fontSize="small" />
        </Tooltip>
        <InputBase
          sx={{
            // flex: 1,
          }}
          // flex={1}
          onChange={handleTaskChange}
          value={task}
          readOnly={!isNewTask}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="What's your plan today?"
          sx={{
            // ml: 1,
            textDecoration: isDone ? 'line-through' : 'none',
            color: isDone ? 'info.main' : 'text.primary',
            flexGrow: 1,
            width: '100%',
            // display: { xs: isMenu && 'none', md: 'flex' },
            // background: 'primary.main'
          }}
          inputProps={{ 'aria-label': "what's your plan today?"}} />
        </Box>
        
        <Box sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'flex-end',
          border: 'solid thin red'
        }}>
        {isNewTask
          ? <DateTimePicker
              label="Pick date and time"
              value={date}
              inputFormat="MMM Do YY, hh:mm A"
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box
                  sx={{
                    display: 'flex', alignItems: 'center', m: 1,
                    // width: { xs: '20%', sm: '100%' },
                  }}
                  >
                  <InputBase ref={inputRef}
                    {...inputProps}
                    disabled
                    sx={{
                      p: 0,
                      pl: 1,
                      pr: 1,
                      borderRadius: '0.5em',
                      background: '#121212',
                      // fontSize: { xs: '0.7rem', sm: '1rem' },
                      // width: '20%',
                      // width: { xs: '20%', sm: '100%' },
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
                // display: {xs: 'none', md: 'block'}
              }} />
            <FormControl
              sx={{
                // display: {xs: 'none', md: 'block'}
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
                  // fontSize: { xs: '0.7rem'},
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
        </Box>
        
        
        
      </Container>
    </Zoom>
  )
}

export default Task
