
import {axiosInstance} from '../helpers/axios-config'
//GET http://localhost:3000/equipmentStatus/
//POST http://localhost:3000/equipmentStatus
//PUT http://localhost:3000/equipmentStatus/ID

const getState = () => {
    const resp = axiosInstance.get('equipmentStatus/')
    return resp;

};

const createState = (data) => {
    const resp = axiosInstance.post('equipmentStatus', data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};

const updateState = (stateId, data) => {
    const resp = axiosInstance.put(`equipmentStatus/${stateId}`, data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};
const getStateById = (stateId) => {
    const resp = axiosInstance.get(`equipmentStatus/${stateId}`,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};


export {
    getState,
    createState,
    updateState,
    getStateById
}