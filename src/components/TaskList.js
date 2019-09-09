import React from 'react'
import Task from './Task'
import { connect } from 'react-redux'
import { archiveTask, pinTask, snoozeTask } from '../lib/redux'

export const PureTaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask
  }

  let tasksContent = null

  const tasksInOrder = [
    ...tasks.filter(task => task.state === 'TASK_PINNED'),
    ...tasks.filter(task => task.state !== 'TASK_PINNED')
  ]

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return tasksContent = [
      LoadingRow,
      LoadingRow,
      LoadingRow,
      LoadingRow,
      LoadingRow,
      LoadingRow
    ]
  }

  if (!tasks.length) {
    tasksContent = 
      <div className="wrapper-message">
        <span className="icon-check" />
        <div className="title-message">You have no tasks</div>
        <div className="subtitle-message">Sit back and relax</div>
      </div> 
  } else {
    tasksContent = tasksInOrder.map(task => <Task key={task.id} task={task} {...events} />)
  }

  return (
    <div className="list-items">
      {tasksContent}
    </div>
  )
}

// TaskList.propTypes = {
//   loading: PropTypes.bool,
//   tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
//   onArchiveTask: PropTypes.func.isRequired,
//   onPinTask: PropTypes.func.isRequired
// };

// TaskList.defaultProps = { loading: false }

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(task => task.state === 'TASK_INBOX' || task.state === 'TASK_PINNED')
  }),
  dispatch => ({
    onArchiveTask: id => dispatch(archiveTask(id)),
    onPinTask: id => dispatch(pinTask(id))
  })
)(PureTaskList)