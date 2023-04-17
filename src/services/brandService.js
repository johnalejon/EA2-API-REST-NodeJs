
import {axiosInstance} from '../helpers/axios-config'
//GET http://localhost:3000/brand/
//POST http://localhost:3000/brand
//PUT http://localhost:3000/brand/ID

const getBrand = () => {
    const resp = axiosInstance.get('brand/')
    return resp;

};

const createBrand = (data) => {
    const resp = axiosInstance.post('brand', data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};

const updateBrand = (brandId, data) => {
    const resp = axiosInstance.put(`brand/${brandId}`, data,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};
const getBrandById = (brandId) => {
    const resp = axiosInstance.get(`brand/${brandId}`,{
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp

};


export {
    getBrand,
    createBrand,
    updateBrand,
    getBrandById
}