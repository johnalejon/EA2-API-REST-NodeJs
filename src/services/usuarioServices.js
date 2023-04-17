
import {axiosInstance} from '../helpers/axios-config'
//GET http://localhost:3000/user/
//POST http://localhost:3000/user
//PUT http://localhost:3000/user/ID

const getUser = () => {
    const resp = axiosInstance.get('user/')
    return resp;

};

const createUser = (data) => {
    const resp = axiosInstance.post('user', data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};

const updateUser = (userId, data) => {
    const resp = axiosInstance.put(`user/${userId}`, data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};
const getUserById = (userId) => {
    const resp = axiosInstance.get(`user/${userId}`,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};


export {
    getUser,
    createUser,
    updateUser,
    getUserById
}