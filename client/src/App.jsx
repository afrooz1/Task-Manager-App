import { useState } from 'react'
import { useTaskApi } from './hooks/useTaskApi'
import { useAuth } from './context/AuthContext'

import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import ProtectedRoute from "./components/ProtectedRoute"

import {
  Routes,
  Route
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"



function TaskHome(){


const {
  user,
  logout
}=useAuth()



const {
    tasks,
    loading,
    error,
    clearError,
    handleAddTask,
    handleToggleTask,
    handleEditTask,
    handleDeleteTask,

}=useTaskApi()



const [filter,setFilter]=useState("all")



const filteredTasks =
tasks.filter(task=>{

if(filter==="active")
return !task.completed


if(filter==="completed")
return task.completed


return true

})



const completedCount =
tasks.filter(t=>t.completed).length



const totalCount =
tasks.length



return (

<div className="
min-h-screen
bg-gradient-to-br
from-blue-50
to-indigo-100
py-12 px-4
">


<div className="max-w-2xl mx-auto">



<div className="
flex justify-between
items-center
mb-8
">


<div>

<h1 className="
text-4xl
font-bold
">

Task Manager

</h1>


<p className="text-gray-600">

Welcome {user?.name}

</p>


</div>



<button

onClick={logout}

className="
bg-red-500
text-white
px-4 py-2
rounded-lg
"

>

Logout

</button>


</div>





{error && (

<div className="
bg-red-100
p-3
rounded
mb-4
">


{error}


<button

onClick={clearError}

className="ml-4"

>
X
</button>


</div>

)}





<div className="
bg-white
rounded-xl
shadow-lg
p-6
">


<AddTaskForm

onAddTask={handleAddTask}

/>



{loading ? (

<p className="mt-5">
Loading...
</p>


) : (

<>


{
totalCount > 0 &&

<FilterBar

filter={filter}

onFilterChange={setFilter}

totalCount={totalCount}

activeCount={
totalCount-completedCount
}

completedCount={
completedCount
}

/>

}




<TaskList

tasks={filteredTasks}

filter={filter}

onToggle={handleToggleTask}

onEdit={handleEditTask}

onDelete={handleDeleteTask}

/>


</>

)}


</div>


</div>


</div>

)

}






function App(){


return (

<Routes>


<Route

path="/login"

element={<Login/>}

/>



<Route

path="/register"

element={<Register/>}

/>




<Route

path="/"

element={


<ProtectedRoute>


<TaskHome/>


</ProtectedRoute>


}

/>


</Routes>

)


}



export default App