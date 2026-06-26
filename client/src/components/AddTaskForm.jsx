import { useState } from 'react'

/**
 * Form component for adding new tasks
 * Includes input validation to prevent empty tasks
 * 
 * @param {Function} onAddTask - Callback to add a new task
 */
function AddTaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Trim whitespace and validate
    const trimmedValue = inputValue.trim()
    
    if (trimmedValue === '') {
      setError('Task title cannot be empty')
      return
    }

    // Clear error and add task
    setError('')
    onAddTask(trimmedValue)
    setInputValue('')
  }

  // Clear error when user starts typing
  const handleChange = (e) => {
    setInputValue(e.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a new task..."
          className={`
            flex-1 px-4 py-3 border rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
          `}
          aria-label="Task title"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'error-message' : undefined}
        />
        <button
          type="submit"
          className="
            px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Add Task
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <p
          id="error-message"
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  )
}

export default AddTaskForm