
import {axiosInstance} from '../helpers/axios-config'
//GET http://localhost:3000/equipmenttype/
//POST http://localhost:3000/equipmenttype
//PUT http://localhost:3000/equipmenttype/ID

const getType = () => {
    const resp = axiosInstance.get('equipmenttype/')
    return resp;

};

const createType = (data) => {
    const resp = axiosInstance.post('equipmenttype', data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};

const updateType = (typeId, data) => {
    const resp = axiosInstance.put(`equipmenttype/${typeId}`, data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};
const getTypebyId = (typeId) => {
    const resp = axiosInstance.get(`equipmenttype/${typeId}`,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};


export {
    getType,
    createType,
    updateType,
    getTypebyId
}