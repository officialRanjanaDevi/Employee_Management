import { addEmployee, deleteEmployee, editEmployee } from "../controllers/employee.js";
import {upload}  from "../middlewares/multer.js"
import { Router } from "express"
import { validateEmployee } from "../middlewares/employeeValidation.js";

const router=Router();

router.route("/addEmployee").post(validateEmployee,upload.single(image),addEmployee)
router.route("/editEmployee/:id").patch(upload.single(image),editEmployee)
router.route("/deleteEmployee/:id").delete(deleteEmployee)

export default router