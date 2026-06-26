import {useAuth} from "../context/AuthContext";


function Navbar(){


const {
user,
logout
}=useAuth();



return (

<div className="
flex justify-between
items-center
bg-white
shadow
p-4
rounded-lg
mb-5
">


<h2 className="
font-bold text-xl
">

Task Manager

</h2>



<div className="flex gap-4 items-center">


<span>

Hi {user?.name}

</span>



<button

onClick={logout}

className="
bg-red-500
text-white
px-3 py-2
rounded
"

>

Logout

</button>


</div>



</div>

)

}


export default Navbar;