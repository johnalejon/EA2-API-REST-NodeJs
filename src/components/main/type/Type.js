import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { createType, getType } from '../../../services/typeService';
import {Link} from 'react-router-dom';

export const Type = () => {

  const [valueForm, setValueForm] = useState({});
  const [types, setTypes] = useState([]);
  const { name = "", state = "" } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value })
  }
  const handleGetType = async () => {
    try {
      const resp = await getType();
      setTypes(resp.data)
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(() => {
      handleGetType();
    }, []);



  

  const handleCreateType = async (e) => {
    e.preventDefault();
    try {
      const resp = await createType(valueForm);
      console.log(resp.data);;
      setValueForm({ name: "", state: "" });
      handleGetType();

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCreateType(e)}>
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
            types.map(type => {
              return <tr key={type._id}>
                <th  >{type.name}</th>
                <td>{type.state}</td>
                <td>{dayjs(type.creationDate).format('YYYY-MM-DD')}</td>
                <td>{dayjs(type.updateDate).format('YYYY-MM-DD')}</td>
                

                <td><Link to={`type/edit/${type._id}`}>
                        <strong>Editar</strong>
                      </Link></td>
                </tr>
        
      })
    }


              </tbody>
</table>


    </div>
  )
}

