import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


import {
  login,
  register
} from "../api/auth";



const AuthContext = createContext();



export function AuthProvider({children}){


const [user,setUser] = useState(null);


const [loading,setLoading] = useState(true);




// check existing login on refresh

useEffect(()=>{


try{


const savedUser =
localStorage.getItem("user");


const token =
localStorage.getItem("token");



if(
savedUser &&
savedUser !== "undefined" &&
token
){


setUser(
JSON.parse(savedUser)
);


}


}catch(error){


localStorage.removeItem("user");

localStorage.removeItem("token");


setUser(null);


}



setLoading(false);



},[]);








const saveUser = (data)=>{


const userData = {

_id:data._id,

name:data.name,

email:data.email

};




localStorage.setItem(
"user",
JSON.stringify(userData)
);



localStorage.setItem(
"token",
data.token
);



setUser(userData);


};









const signup = async(form)=>{


try{


setLoading(true);


const data =
await register(form);



saveUser(data);



return true;



}
finally{


setLoading(false);


}



};









const signin = async(form)=>{


try{


setLoading(true);



const data =
await login(form);



saveUser(data);



return true;



}
finally{


setLoading(false);


}



};









const logout = ()=>{


localStorage.removeItem("user");

localStorage.removeItem("token");


setUser(null);


};








return (


<AuthContext.Provider

value={{

user,

loading,

signup,

signin,

logout

}}

>


{children}


</AuthContext.Provider>


);



}






export const useAuth = ()=>


useContext(AuthContext);