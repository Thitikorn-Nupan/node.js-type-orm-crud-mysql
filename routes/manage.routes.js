import express from "express"
import bodyParser from "body-parser";
import {addEmployee, editEmployee, getEmployee, getEmployees, removeEmployee} from "../controllers/employee.control.js";
import {getAddress, getAddresses} from "../controllers/address.control.js";

const employeeRouter = express.Router();
const addressRouter = express.Router();

// set middleware
employeeRouter.use(bodyParser.json());
employeeRouter.use(bodyParser.urlencoded({extended: true}))
addressRouter.use(bodyParser.json());
addressRouter.use(bodyParser.urlencoded({extended: true}))

employeeRouter.get("/employees", getEmployees);
employeeRouter.get("/employee", getEmployee);
employeeRouter.post("/employee", addEmployee);
employeeRouter.put("/employee", editEmployee);
employeeRouter.delete("/employee", removeEmployee);


addressRouter.get("/addresses", getAddresses);
addressRouter.get("/address", getAddress);


export {
    addressRouter,
    employeeRouter
};
