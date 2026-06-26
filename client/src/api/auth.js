const BASE =
import.meta.env.VITE_API_URL ??
"http://localhost:5000";



async function request(url, options={}){


const res =
await fetch(url,{
    headers:{
        "Content-Type":"application/json",
        ...options.headers
    },
    ...options
});


const data =
await res.json();


if(!res.ok){

throw new Error(
data.message || "Something went wrong"
);

}


return data;

}




export const register =
(data)=>
request(
`${BASE}/api/auth/register`,
{
method:"POST",
body:JSON.stringify(data)
}
);



export const login =
(data)=>
request(
`${BASE}/api/auth/login`,
{
method:"POST",
body:JSON.stringify(data)
}
);