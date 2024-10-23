import {
    readsEmployees,
    readEmployee,
    createEmployee,
    updateEmployeeMapByMerge,
    updateEmployee,
    deleteEmployee
} from "../services/employee.service.js"

import {Employee} from "../entities/employee.ts";

export const getEmployees = async (req, res) => {
    const employees = await readsEmployees()
    res.status(202).json(employees);
}

export const getEmployee = async (req, res) => {
    const queryParams = req.query['eid']
    const employee = await readEmployee(queryParams)
    res.status(202).json(employee);
}

export const addEmployee = async (req, res) => {
    // const {
    //     eid,
    //     firstname,
    //     lastname,
    //     position,
    //     active,
    //     salary
    // } = req.body
    const employee = new Employee()
    employee.eid = req.body.eid
    employee.firstname = req.body.firstname
    employee.lastname = req.body.lastname
    employee.position = req.body.position
    employee.active = req.body.active
    employee.salary = req.body.salary
    const result = await createEmployee(employee)
    res.status(202).json(result);
}

export const editEmployee = async (req, res) => {
    const employee = new Employee()
    employee.firstname = req.body.firstname
    employee.lastname = req.body.lastname
    employee.position = req.body.position
    employee.active = req.body.active
    employee.salary = req.body.salary
    const eid = req.query['eid']
    const result = await updateEmployeeMapByMerge(employee,eid)
    res.status(202).json(result);
}

export const removeEmployee = async (req, res) => {
    const eid = req.query['eid']
    const result = await deleteEmployee(eid)
    res.status(202).json(result);
}