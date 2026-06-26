import { useState } from 'react'

/**
 * TaskItem
 *
 * What changed from the localStorage version:
 *  - task.id → task._id  (MongoDB document identifier)
 *  - onEdit prop wired up (was already present, now actually calls the API)
 */
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)
  const [isDeleting, setIsDeleting] = useState(false)

  // ─── Edit handlers ─────────────────────────────────────────────────────────

  const handleEditStart = () => {
    setEditValue(task.title)
    setIsEditing(true)
  }

  const handleEditSave = async () => {
    const trimmed = editValue.trim()
    if (!trimmed) return           // don't save empty titles
    if (trimmed !== task.title) {
      await onEdit(task._id, trimmed)
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditValue(task.title)
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') handleEditCancel()
  }

  // ─── Delete handler ────────────────────────────────────────────────────────

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => onDelete(task._id), 200)
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={`
        flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200
        transition-all duration-200
        ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        ${task.completed && !isEditing ? 'bg-gray-50' : ''}
      `}
    >
      {/* Checkbox — hidden while editing */}
      {!isEditing && (
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer shrink-0"
        />
      )}

      {/* ── Edit mode ── */}
      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <input
            autoFocus
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className="flex-1 px-3 py-1.5 border border-blue-400 rounded-md text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleEditSave}
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600
                       hover:bg-blue-700 rounded-md transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleEditCancel}
            className="px-3 py-1.5 text-sm font-medium text-gray-600
                       hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* ── View mode ── */
        <>
          <span
            onDoubleClick={handleEditStart}
            className={`
              flex-1 text-gray-800 transition-all duration-200 cursor-default select-none
              ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}
            `}
            title="Double-click to edit"
          >
            {task.title}
          </span>

          <button
            onClick={handleEditStart}
            className="px-3 py-1.5 text-sm font-medium text-gray-500
                       hover:bg-gray-100 rounded-md transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
            aria-label={`Edit task: ${task.title}`}
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1.5 text-sm font-medium text-red-600
                       hover:bg-red-50 rounded-md transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            aria-label={`Delete task: ${task.title}`}
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}

export default TaskItem