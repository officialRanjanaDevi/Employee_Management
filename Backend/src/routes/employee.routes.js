import { addEmployee, deleteEmployee, editEmployee ,viewEmployee} from "../controllers/employee.js";
import {upload}  from "../middlewares/multer.js"
import { Router } from "express"
import { validateEmployee } from "../middlewares/employeeValidation.js";

const router=Router();


router.route("/addEmployee").post(upload.single('image'),validateEmployee,addEmployee)
router.route("/viewEmployee/:filter").get(viewEmployee)
router.route("/editEmployee/:id").patch(upload.single('image'),editEmployee)
router.route("/deleteEmployee/:id").delete(deleteEmployee)

export default router