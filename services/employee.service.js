// Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file and data are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'b:'
// ** focus .js / .ts
import {Employee} from "../entities/employee.ts";
import {AppDataSource} from "../config/connect.db.js";

/*
    // ** good way for single connection
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
*/

// ** Optional
// ** way below for multiple connect db ** have to destroy connect
// *** use a Repository
export const readsEmployees = async () => {
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
    // when use multiple connect
    // ** CannotConnectAlreadyConnectedError: Cannot create a "default" connection because connection to the database already established.
    // have to close before to another
    return employeeRepo.find().then(async employees => {
        await dataSource.destroy()
        return employees;
    })
}

export const readEmployee = async (eid) => {
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
    return employeeRepo.findOneBy({eid: eid}).then(async employee => {
        await dataSource.destroy()
        return employee
    })
}

export const createEmployee = async (employee) => {
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
    return employeeRepo.save(employee).then(async result => {
        await dataSource.destroy()
        return result
    })
    /*
    save(...) return as
    Employee {
      eid: 'E009',
      firstname: 'A',
      lastname: 'A',
      active: false,
      salary: 1.1,
      position: 'A'
    }
    */
}

export const updateEmployee = async (employeeNew, eid) => {
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
    const employeeSearch = await employeeRepo.findOneBy({eid: eid})
    if (employeeSearch != null) {
        employeeSearch.firstname = employeeNew.firstname
        employeeSearch.lastname = employeeNew.lastname
        employeeSearch.salary = employeeNew.salary
        employeeSearch.active = employeeNew.active
        employeeSearch.position = employeeNew.position
        return employeeRepo.save(employeeSearch).then(async result => {
            await dataSource.destroy()
            return result
        })
    }
    await dataSource.destroy()
    return null
}

export const updateEmployeeMapByMerge = async (employeeNew, eid) => {
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
    const employeeSearch = await employeeRepo.findOneBy({eid: eid})
    if (employeeSearch != null) {
        employeeRepo.merge(employeeSearch, employeeNew) // work as map all attributes ex. employeeSearch.firstname = employeeNew.firstname
        return employeeRepo.save(employeeSearch).then(async result => {
            await dataSource.destroy()
            return result
        })
    }
    await dataSource.destroy()
    return null
}

export const deleteEmployee = async (eid) => {
    const dataSource = await AppDataSource.initialize() // have to initial before create repo
    const employeeRepo = dataSource.getRepository(Employee)
    return employeeRepo.delete(eid).then(async result => {
        await dataSource.destroy()
        return result
    })
}



