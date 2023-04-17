import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { updateType, getTypebyId } from '../../../services/typeService'



import Swal from 'sweetalert2';

export const TypeUpdate = () => {

    const { typeId = '' } = useParams();
    const [types, setType] = useState({});

    const [valueForm, setValueForm] = useState({});
    const { name = '', state = '' } = valueForm;

    const getType = async () => {
        try {
            const { data } = await getTypebyId(typeId);
            setType(data);

        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getType();
    }, [typeId]);

    useEffect(() => {

        setValueForm({
            name: types.name,
            state: types.state


        })

    }, [types]);

    const handleOnChange = (e) => {
        setValueForm({ ...valueForm, [e.target.name]: e.target.value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const typee = {
            name, state

        }
        
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await updateType(typeId, typee);
            console.log(data)
            Swal.close();



        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title neon3 text-center'>Editar Tipo de Equipo</h5>
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