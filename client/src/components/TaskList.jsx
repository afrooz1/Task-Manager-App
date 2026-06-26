import TaskItem from './TaskItem'

function TaskList({ tasks, filter, onToggle, onDelete, onEdit }) {

  if (tasks.length === 0) {

    const emptyMessages = {
      all: {
        heading: 'No tasks yet',
        sub: 'Add your first task above to get started.'
      },

      active: {
        heading: 'Nothing left to do',
        sub: 'All your tasks are completed — nice work!'
      },

      completed: {
        heading: 'No completed tasks',
        sub: 'Finish a task and it will show up here.'
      },
    }

    const { heading, sub } =
      emptyMessages[filter] ?? emptyMessages.all


    return (
      <div className="text-center py-12 px-4">

        <h3 className="mt-4 text-sm font-medium text-gray-900">
          {heading}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {sub}
        </p>

      </div>
    )
  }


  return (

    <div className="space-y-3">

      {tasks.map(task => (

        <TaskItem

          key={task._id}

          task={task}

          onToggle={onToggle}

          onDelete={onDelete}

          onEdit={onEdit}

        />

      ))}

    </div>

  )
}


export default TaskList