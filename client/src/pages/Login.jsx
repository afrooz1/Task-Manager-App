import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate,Link} from "react-router-dom";


function Login(){


const {signin,loading}=useAuth();

const navigate=useNavigate();


const [form,setForm]=useState({
email:"",
password:""
});


const [error,setError]=useState("");



const submit=async(e)=>{

e.preventDefault();


try{

await signin(form);

navigate("/");


}catch(err){

setError(err.message);

}

};




return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-blue-50
to-indigo-100
">


<form

onSubmit={submit}

className="
bg-white
p-8
rounded-xl
shadow-lg
w-96
space-y-4
"


>


<h1 className="
text-3xl
font-bold
text-center
">

Login

</h1>



{
error &&
<p className="text-red-500">
{error}
</p>
}




<input

className="w-full border p-3 rounded"

placeholder="Email"

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>




<input

className="w-full border p-3 rounded"

type="password"

placeholder="Password"

onChange={
e=>setForm({
...form,
password:e.target.value
})
}

/>




<button

className="
w-full
bg-blue-600
text-white
py-3
rounded
"

>

{
loading?
"Logging..."
:
"Login"
}


</button>



<p className="text-center">


Don't have account?

<Link
className="text-blue-600 ml-2"
to="/register"
>
Register
</Link>


</p>



</form>


</div>


)

}


export default Login;