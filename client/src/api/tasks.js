const BASE =
import.meta.env.VITE_API_URL ??
"http://localhost:5000";


const TASKS =
`${BASE}/api/tasks`;




// get token

function getToken(){

return localStorage.getItem("token");

}





// common request

async function request(url, options={}){


const token =
getToken();




const config={


...options,


headers:{


"Content-Type":"application/json",



...(token && {

Authorization:
`Bearer ${token}`

}),



...options.headers


}


};





const res =
await fetch(
url,
config
);




// JWT expired / invalid

if(res.status === 401){


localStorage.removeItem("token");

localStorage.removeItem("user");



// redirect login

window.location.href="/login";


return;


}






const data =
await res.json()
.catch(()=>({}));





if(!res.ok){


throw new Error(

data.message ||

"Request failed"

);


}



return data;



}








// GET ALL TASKS

export const fetchTasks = ()=>


request(
TASKS
);









// CREATE TASK


export const createTask = (title)=>


request(

TASKS,

{

method:"POST",


body:JSON.stringify({

title

})

}

);









// TOGGLE TASK


export const toggleTask = (id)=>


request(

`${TASKS}/${id}/toggle`,

{

method:"PATCH"

}

);









// UPDATE TASK


export const updateTask = (id,title)=>


request(

`${TASKS}/${id}`,

{

method:"PATCH",


body:JSON.stringify({

title

})

}

);









// DELETE TASK


export const deleteTask = (id)=>


request(

`${TASKS}/${id}`,

{

method:"DELETE"

}

);