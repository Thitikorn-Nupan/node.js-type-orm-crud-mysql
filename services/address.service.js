import {Address} from "../entities/address.ts";
import {AppDataSource} from "../config/connect.db.js";
import {logger} from "../logger/winston.log.app.js";

// ** use a QueryBuilder
export const readAddress = async (aid) => {
    // to initialize the initial connection with the database, register all entities and "synchronize" database schema, call "initialize()" method of a newly created database
    return AppDataSource.initialize().then(async (dataSource) => {
        return dataSource
            // .getRepository(Address)
            // .createQueryBuilder("addresses")
            // .where("addresses.aid = :aid", { aid: aid })
            // .getOne()
            // ** Or
            .manager
            .createQueryBuilder()
            .select("addresses")
            .from(Address, "addresses")
            .where("addresses.aid = :aid", {aid: aid})
            .getOne()
            .then(async address => {
                await dataSource.destroy()
                return address;
            })
    })
    /*  It builds
        SELECT
        user.id as userId,
        user.firstName as userFirstName,
        user.lastName as userLastName
        FROM addresses as addresses
        WHERE addresses.aid = 'A002'
    */
}

export const readsAddresses = async () => {
    return AppDataSource.initialize().then(async (dataSource) => {
        return dataSource
            .manager
            .createQueryBuilder()
            .select("addresses")
            .from(Address, "addresses")
            .getMany()
            .then(async addresses => {
                await dataSource.destroy()
                return addresses;
            })
    })
}

export const createAddress = async (address) => {
    return AppDataSource.initialize().then(async (dataSource) => {
        return dataSource
            .manager
            .createQueryBuilder()
            .insert()
            .into(Address)
            .values([address])
            .execute().then(async result => {
                await dataSource.destroy()
                return result
            })
    })
    /*
    { "identifiers":[{"aid":"A099"}],
      "generatedMaps":[{}],
      "raw":{"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0}}
    */
}

export const updateAddress = async (address, aid) => {
    return AppDataSource.initialize().then(async (dataSource) => {
        return dataSource
            .manager
            .createQueryBuilder()
            .update(Address)
            .set({county: address.county, city: address.city, details: address.details})
            .where("aid = :aid", {aid: aid})
            .execute().then(async result => {
                await dataSource.destroy()
                return result
            })
    })
    /* {"generatedMaps":[],"raw":[],"affected":1} */
}


export const deleteAddress = async (aid) => {
    return AppDataSource.initialize().then(async (dataSource) => {
        return dataSource
            .manager
            .createQueryBuilder()
            .delete()
            .from(Address)
            .where("aid = :aid", {aid: aid})
            .execute().then(async result => {
                await dataSource.destroy()
                return result
            })
    })
    /* {"raw":[],"affected":1} */
}

