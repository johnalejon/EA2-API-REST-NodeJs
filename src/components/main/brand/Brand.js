import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { createBrand, getBrand } from '../../../services/brandService';
import {Link} from 'react-router-dom';

export const Brand = () => {

  const [valueForm, setValueForm] = useState({});
  const [brands, setBrands] = useState([]);
  const { name = "", state = "" } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value })
  }
  const handleGetBrands = async () => {
    try {
      const resp = await getBrand();
      setBrands(resp.data)
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(() => {
      handleGetBrands();
    }, []);



  

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    try {
      const resp = await createBrand(valueForm);
      console.log(resp.data);;
      setValueForm({ name: "", state: "" });
      handleGetBrands();

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className=" container-fluid">
      <div className='mt-2 mb-2'>
        <form onSubmit={(e) => handleCreateBrand(e)}>
          <br></br>
          <div className="mb-3">
            <label className="form-label"><strong>Nombre</strong></label>
            <input required name='name' value={name} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />

          </div>
        <div className="mb-3">
          <label className="form-label"><strong>Estado</strong></label>
          <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)}>
            <option defaultValue={""}>Seleccione</option>
            <option value="Active">Activo</option>
            <option value="Inactive">Inactivo</option>

            </select>
          </div>
          <br></br>
          <button className="btn btn-primary">Guardar</button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Creacion</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
            brands.map(brand => {
              return <tr key={brand._id}>
                <th  >{brand.name}</th>
                <td>{brand.state}</td>
                <td>{dayjs(brand.creationDate).format('YYYY-MM-DD')}</td>
                <td>{dayjs(brand.updateDate).format('YYYY-MM-DD')}</td>
                

                <td> <Link to={`brand/edit/${brand._id}`}>
                        <strong>Editar</strong>
                      </Link></td>
                </tr>
        
      })
    }


              </tbody>
</table>


    </div>
    </div>
  )
}
