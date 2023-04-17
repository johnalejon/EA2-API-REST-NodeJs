
import {axiosInstance} from '../helpers/axios-config'
//GET http://localhost:3000/inventory/
//POST http://localhost:3000/inventory
//PUT http://localhost:3000/inventory/ID

const getInventory = () => {
    const resp = axiosInstance.get('inventory/')
    return resp;

};

const createInventory = (data) => {
    const resp = axiosInstance.post('inventory/', data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};
const getInventoryById =(inventoryId) =>{
    const resp = axiosInstance.get(`inventory/${inventoryId}`,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const updateInventory = (inventoryId, data) => {
    const resp = axiosInstance.put(`inventory/${inventoryId}`, data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};


export {
    getInventory,
    createInventory,
    updateInventory,
    getInventoryById
}