import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import {getUser, createUser} from '../../../services/usuarioServices'
import {Link} from 'react-router-dom';
export const User = () => {

  const [valueForm, setValueForm] = useState({});
  const [users, setUsers] = useState([]);
  const { name = "",email="", state = "" } = valueForm;

  const handleOnChange = (e) => {
    setValueForm({ ...valueForm, [e.target.name]: e.target.value })
  }
  const handleGetUsers = async () => {
    try {
      const resp = await getUser();
      setUsers(resp.data)
      console.log(resp.data)
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(() => {
      handleGetUsers();
    }, []);



  

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await createUser(valueForm);
      console.log(resp.data);;
      setValueForm({ name: "",email:"", state: "" });
      handleGetUsers();

    } catch (error) {
      console.log(error)
    }
  }


  return (
    
    
    <div className="container-fluid">
    <form onSubmit={(e) => handleCreateUser(e)}>

      <br></br>

      <div className="mb-3">
        <label className="form-label"><strong>Nombre</strong></label>
        <input required name='name' value={name} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />

      </div>
      <div className="mb-3">
        <label className="form-label"><strong>Email</strong></label>
        <input required name='email' value={email} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />

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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>

            <th scope="col">Fecha Creacion</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'></th>
          </tr>
        </thead>
      <tbody>
        {
          users.map(user => {
            return <tr key={user._id}>
              <th  >{user.name}</th>
              <th  >{user.email}</th>
              <td>{user.state}</td>
              <td  >{dayjs(user.creationDate).format('YYYY-MM-DD')}</td>
              <td>{dayjs(user.updateDate).format('YYYY-MM-DD')}</td>
              

              <td><Link to={`user/edit/${user._id}`}>
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
