import { useState, useEffect, useCallback } from 'react'
import * as api from '../api/tasks'

/**
 * useTaskApi
 *
 * Drop-in replacement for useLocalStorage. Exposes the exact same
 * handlers App.jsx already uses — only the data source changes.
 *
 * Returns:
 *   tasks        — array of task objects from MongoDB
 *   loading      — true while the initial fetch is in flight
 *   error        — string | null — last error message
 *   clearError   — call to dismiss the error banner
 *   handleAddTask(title)
 *   handleToggleTask(id)
 *   handleEditTask(id, title)
 *   handleDeleteTask(id)
 */
export function useTaskApi() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const clearError = () => setError(null)

  /**
   * Wrap every API call:
   *  - sets loading true while in flight
   *  - catches errors and surfaces them as a string
   *  - returns the result (or null on failure)
   */
  const run = useCallback(async (apiFn) => {
    try {
      setError(null)
      return await apiFn()
    } catch (err) {
      setError(err.message ?? 'Something went wrong')
      return null
    }
  }, [])

  // ─── Load tasks on mount ───────────────────────────────────────────────────

useEffect(()=>{


const token =
localStorage.getItem("token");


if(!token){

setLoading(false);
return;

}



const load = async()=>{


setLoading(true);


const data =
await run(api.fetchTasks);



if(data)
setTasks(data);



setLoading(false);


};


load();


},[run]);

  // ─── Handlers (same names as the old localStorage version) ────────────────

  const handleAddTask = useCallback(async (title) => {
    const newTask = await run(() => api.createTask(title))
    if (newTask) setTasks((prev) => [newTask, ...prev])
  }, [run])

  const handleToggleTask = useCallback(async (id) => {
    // Optimistic update — flip locally first, revert on error
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    )
    const updated = await run(() => api.toggleTask(id))
    if (!updated) {
      // Revert if the server call failed
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
      )
    }
  }, [run])

  const handleEditTask = useCallback(async (id, title) => {
    const updated = await run(() => api.updateTask(id, title))
    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, title: updated.title } : t))
      )
    }
  }, [run])

  const handleDeleteTask = useCallback(async (id) => {
    // Optimistic update — remove immediately
    setTasks((prev) => prev.filter((t) => t._id !== id))
    const result = await run(() => api.deleteTask(id))
    if (!result) {
      // Revert: re-fetch to restore the task that failed to delete
      const data = await run(api.fetchTasks)
      if (data) setTasks(data)
    }
  }, [run])

  return {
    tasks,
    loading,
    error,
    clearError,
    handleAddTask,
    handleToggleTask,
    handleEditTask,
    handleDeleteTask,
  }
}