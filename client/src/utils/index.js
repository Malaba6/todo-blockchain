import moment from 'moment'

export const sortList = (list) => list.sort((a, b) => b.date - a.date)

const isInMenu = (menu, item) => menu.find(l => l.label === item)

export const setDaysTasks = ({
  when, tempWhen, t, tempMenuLabels, day,
  i
}) => {
  const daysTasks = tempWhen[day] ? tempWhen[day] : []
    tempWhen = {
      ...tempWhen,
      [day]: sortList([...daysTasks, t])
    }

    !isInMenu(tempMenuLabels, day) && tempMenuLabels.push({
      label: day, value: tempMenuLabels.length + 1
    })
  return tempWhen 
}

const refreshTasks = ({
  t, tempWhen, when, tempMenuLabels
}) => {
  const day = moment(new Date(parseInt(t.date))).calendar()
    const timeLapse = moment(new Date(parseInt(t.date))).fromNow()
    let temp = {}

    if (day.indexOf('Today') !== -1) {
      temp = setDaysTasks({
        when, tempWhen, t, tempMenuLabels, day: 'Today'
      })
    } else if (day.indexOf('Tomorrow') !== -1) {
      temp = setDaysTasks({
        when, tempWhen, t, tempMenuLabels, day: 'Tomorrow'
      })
    } else {
      temp = setDaysTasks({
        when, tempWhen, t, tempMenuLabels, day: timeLapse
      })
    }
  return temp
}

export const getDatesMenu = ({
  when, setWhen, tasks,
  setMenuLabels, menuLabels
}) => {
  let tempWhen = {}
  let tempMenuLabels = menuLabels


  tasks.forEach((t, i) => {
    tempWhen = refreshTasks({
      t, tempWhen, when, tempMenuLabels, i
    })
  })

  setMenuLabels(tempMenuLabels)
  setWhen(tempWhen)
}