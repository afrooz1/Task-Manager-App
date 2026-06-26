import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate,Link} from "react-router-dom";


function Register(){


const {signup,loading}=useAuth();

const navigate=useNavigate();


const [error,setError]=useState("");


const [form,setForm]=useState({
name:"",
email:"",
password:""
});



const submit=async(e)=>{

e.preventDefault();


try{


await signup(form);


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

Register

</h1>



{
error &&
<p className="text-red-500">
{error}
</p>
}




<input

className="w-full border p-3 rounded"

placeholder="Name"

onChange={
e=>setForm({
...form,
name:e.target.value
})
}

/>




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
bg-green-600
text-white
py-3
rounded
"

>

{
loading?
"Creating..."
:
"Create Account"
}


</button>




<p className="text-center">


Already have account?


<Link
to="/login"
className="text-blue-600 ml-2"
>

Login

</Link>


</p>



</form>


</div>

)

}


export default Register;