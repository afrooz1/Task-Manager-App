export const notFound =
(req,res,next)=>{


const error =
new Error(
`Route not found ${req.originalUrl}`
);


res.status(404);

next(error);

};





export const errorHandler =
(error,req,res,next)=>{


let status =
res.statusCode === 200
? 500
: res.statusCode;



if(
error.name==="CastError"
){

status=400;

error.message =
"Invalid ID";

}




if(
error.name==="ValidationError"
){

status=400;

}



res.status(status)
.json({

message:
error.message,

stack:
process.env.NODE_ENV==="production"
? undefined
: error.stack

});

};