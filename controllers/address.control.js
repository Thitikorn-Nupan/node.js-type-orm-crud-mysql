import {
    readsAddresses,
    readAddress
} from "../services/address.service.js"


export const getAddresses = async (req, res) => {
    const addresses = await readsAddresses()
    res.status(202).json(addresses);
}

export const getAddress = async (req, res) => {
    const queryParams = req.query['aid']
    const address = await readAddress(queryParams)
    res.status(202).json(address);
}