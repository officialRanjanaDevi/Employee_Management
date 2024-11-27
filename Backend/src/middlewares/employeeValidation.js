import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validateEmployee = [
  body("name").notEmpty().withMessage("Employee name is required"),
  body("email").notEmpty().isEmail().withMessage("valid Email is required"),
  body("contact").notEmpty().isLength({ min: 10 }).withMessage("valid Contact number is required"),
  body("designation").notEmpty().withMessage("Desiganation is required"),
  body("gender").notEmpty().withMessage("Specify gender"),
  body("course").notEmpty().withMessage("Enter employee course"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation failed",
          errors.array().map((error) => error.msg)
        )
      );
    }
    
     next();
  },
];

export { validateEmployee };
