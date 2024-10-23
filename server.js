import {logger} from "./logger/winston.log.app.js";

import express from "express";
import {addressRouter, employeeRouter} from "./routes/manage.routes.js";


const application = express()

application.use('/api',employeeRouter)
application.use('/api',addressRouter)

application.listen(3000,(error) => {
    if (error) throw error
    else logger.debug({message:'you are on port 3000',level:"info"})
})