import Task from "../models/Task.js";



// GET ALL USER TASKS

export const getAllTasks = async(req,res,next)=>{

try{


const tasks =
await Task.find({
    user:req.user._id
})
.sort({
    createdAt:-1
});


res.json(tasks);


}catch(error){

next(error);

}

};





// CREATE TASK

export const createTask = async(
req,
res,
next
)=>{


try{


const {
 title
}=req.body;



if(!title || title.trim()===""){

res.status(400);

throw new Error(
"Task title is required"
);

}



const task =
await Task.create({

title:title.trim(),

completed:false,

user:req.user._id

});



res.status(201)
.json(task);



}catch(error){

next(error);

}

};







// TOGGLE TASK


export const toggleTask =
async(req,res,next)=>{


try{


const task =
await Task.findOne({

_id:req.params.id,

user:req.user._id

});



if(!task){

res.status(404);

throw new Error(
"Task not found"
);

}



task.completed =
!task.completed;



const updated =
await task.save();



res.json(updated);



}catch(error){

next(error);

}


};










// UPDATE TASK TITLE


export const updateTask =
async(req,res,next)=>{


try{


const {
title
}=req.body;



if(!title || title.trim()===""){

res.status(400);

throw new Error(
"Title cannot be empty"
);

}




const task =
await Task.findOneAndUpdate(

{

_id:req.params.id,

user:req.user._id

},

{

title:title.trim()

},

{

new:true,

runValidators:true

}

);



if(!task){

res.status(404);

throw new Error(
"Task not found"
);

}



res.json(task);



}catch(error){

next(error);

}

};









// DELETE TASK


export const deleteTask =
async(req,res,next)=>{


try{


const task =
await Task.findOneAndDelete({

_id:req.params.id,

user:req.user._id

});



if(!task){

res.status(404);

throw new Error(
"Task not found"
);

}



res.json({

message:"Task deleted",

id:req.params.id

});



}catch(error){

next(error);

}


};