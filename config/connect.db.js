import { DataSource } from 'typeorm';
import path from "path";
import dotenv from 'dotenv'
// if import auto just check a type of file it auto give you a *.js
// Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file and data are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'b:'
import {Employee} from "../entities/employee.ts";
import {Address} from "../entities/address.ts";

// ** config the environment file
dotenv.config({ path : path.resolve('./env/.env') ,debug : true})

// config option
const dataConfig = {
    type: 'mysql', // type of the database
    port: process.env.MYSQLL_PORT, //type of the database
    host: process.env.MYSQLL_HOST ,// port number
    database: process.env.MYSQLL_DATABASE  ,//Name of your database
    username: process.env.MYSQLL_USERNAME ,//username of the database
    password: process.env.MYSQLL_PASSWORD, //password set to the database for the username
    // ** you can set entities as object or path
    entities : [Employee,Address] , // Tables to be queried from the database.
    // entities: ['entities/*.{ts,js}'] , // Tables to be queried from the database.
}

export const AppDataSource = new DataSource(dataConfig) // way to connect to database by TypeROM (Create connection between database and typeorm. )

