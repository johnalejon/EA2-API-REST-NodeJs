import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { updateUser, getUserById } from '../../../services/usuarioServices'



import Swal from 'sweetalert2';

export const UserUpdate = () => {

    const { userId = '' } = useParams();
    const [users, setUser] = useState({});

    const [valueForm, setValueForm] = useState({});
    const { name = '',email='', state = '' } = valueForm;

    const getUser = async () => {
        try {
            const { data } = await getUserById(userId);
            setUser(data);

        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getUser();
    }, [userId]);

    useEffect(() => {

        setValueForm({
            name: users.name,
            email: users.email,
            state: users.state


        })

    }, [users]);

    const handleOnChange = (e) => {
        setValueForm({ ...valueForm, [e.target.name]: e.target.value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usere = {
            name,email ,state

        }
        
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await updateUser(userId, usere);
            console.log(data)
            Swal.close();



        } catch (error) {
            console.log(valueForm)
            console.log(error)
        }
    }



    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title neon3 text-center'>Editar Usuario</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>

                        <div className='col-md-12'>
                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label"><strong>Nombre</strong></label>
                                            <input required type="text" value={name} name='name' className="form-control" onChange={(e) => handleOnChange(e)} />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label"><strong>Email</strong></label>
                                            <input required type="text" value={email} name='email' className="form-control" onChange={(e) => handleOnChange(e)} />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label"><strong>Estado</strong></label>
                                            <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)}>
                                                <option defaultValue={""}>Sleccione</option>
                                                <option value="Active">Activo</option>
                                                <option value="Inactive">Inactivo</option>

                                            </select>
                                        </div>
                                    </div>


                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button className='btn btn-primary'> Guardar</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}