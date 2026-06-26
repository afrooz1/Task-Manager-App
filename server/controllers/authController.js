import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Generate JWT

const generateToken = (id)=>{

    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

};




// REGISTER

export const registerUser =
async(req,res,next)=>{


try{


const {
    name,
    email,
    password
}=req.body;



if(!name || !email || !password){

    res.status(400);

    throw new Error(
        "Please fill all fields"
    );

}




const exists =
await User.findOne({email});


if(exists){

    res.status(400);

    throw new Error(
        "User already exists"
    );

}




const hashedPassword =
await bcrypt.hash(
    password,
    10
);




const user =
await User.create({

    name,

    email,

    password:hashedPassword

});




res.status(201)
.json({

    _id:user._id,

    name:user.name,

    email:user.email,

    token:
    generateToken(user._id)

});



}
catch(error){

next(error);

}

};





// LOGIN

export const loginUser =
async(req,res,next)=>{


try{


const {
email,
password
}=req.body;



const user =
await User.findOne({email});



if(
    user &&
    await bcrypt.compare(
        password,
        user.password
    )
){


return res.json({

    _id:user._id,

    name:user.name,

    email:user.email,

    token:
    generateToken(user._id)

});


}



res.status(401);

throw new Error(
"Invalid email or password"
);



}
catch(error){

next(error);

}

};