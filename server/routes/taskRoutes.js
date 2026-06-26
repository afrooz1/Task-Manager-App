import express from "express";

import {
getAllTasks,
createTask,
toggleTask,
updateTask,
deleteTask
}
from "../controllers/taskController.js";


import {
protect
}
from "../middleware/authMiddleware.js";



const router =
express.Router();



router.use(protect);




router
.route("/")
.get(getAllTasks)
.post(createTask);




router.patch(
"/:id/toggle",
toggleTask
);



router
.route("/:id")
.patch(updateTask)
.delete(deleteTask);



export default router;