import React, { useState, useEffect } from 'react'
import { getBrand } from '../../../services/brandService'
import { getState } from '../../../services/stateService'
import { getUser } from '../../../services/usuarioServices'
import { getType } from '../../../services/typeService'
import { createInventory } from '../../../services/inventoryService'
import Swal from 'sweetalert2';
export const InventoryNew = ({ handleOpenModal, handleGetInventories }) => {

    const [users, setUsers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [states, setStates] = useState([]);

    const [valueForm, setValueForm] = useState({});
    const { serial = '', model = '', description = '', image = '', price = '', colour = '',
        user = '', brand = '', equipmentStatus = '', equipmentType = '' } = valueForm;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await getUser();
                setUsers(data);
                console.log(data)

            } catch (error) {
                console.log(error)
            }

        }
        getUsers();


    }, []);
    useEffect(() => {
        const getBrands = async () => {
            try {
                const { data } = await getBrand();
                setBrands(data);

            } catch (error) {
                console.log(error)
            }

        }
        getBrands();

    }, []);
    useEffect(() => {
        const getStates = async () => {
            try {
                const { data } = await getState();
                setStates(data);

            } catch (error) {
                console.log(error)
            }
        }
        getStates();


    }, []);
    useEffect(() => {
        const getTypes = async () => {
            try {
                const { data } = await getType();
                setTypes(data);

            } catch (error) {
                console.log(error)
            }
        };

        getTypes();



    }, []);

    const handleOnChange = (e) => {
        setValueForm({ ...valueForm, [e.target.name]: e.target.value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventory = {
            serial, model, description, image, price, colour,
            user: {
                _id: user
            },
            brand: {
                _id: brand
            },
            equipmentStatus: {
                _id: equipmentStatus
            },
            equipmentType: {
                _id: equipmentType
            }
        }
        console.log(inventory);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await createInventory(inventory);
            console.log(data);
            Swal.close();
            handleOpenModal();
            handleGetInventories();

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='sidebar'>
            <div className='container-fluid '>
                <div className='="row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3 class="neon2">Nuevo Inventario</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>

                        </div>

                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Serial</strong></label>
                                <input required type="text" value={serial} name='serial' className="form-control" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Modelo</strong></label>
                                <input required type="text" value={model} name='model' className="form-control" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Descripción</strong></label>
                                <input required type="text" value={description} name='description' className="form-control" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Foto</strong></label>
                                <input required type="text" value={image} name="image" className="form-control" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Precio</strong></label>
                                <input required type="number" value={price} name='price' className="form-control" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Color</strong></label>
                                <input required type="text" value={colour} name='colour' className="form-control" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Usuario</strong></label>
                                <select required value={user} name='user' className="form-select" onChange={(e) => handleOnChange(e)}>
                                    <option>SELECCIONE</option>
                                    {
                                        users.map(user => {
                                            return <option key={user._id} value={user._id}>
                                                {user.name}
                                            </option>

                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Marca</strong></label>
                                <select required value={brand} name='brand' className="form-select" onChange={(e) => handleOnChange(e)}>
                                    <option>SELECCIONE</option>
                                    {
                                        brands.map(brand => {
                                            return <option key={brand._id} value={brand._id}>
                                                {brand.name}
                                            </option>

                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Estado del equipo</strong></label>
                                <select required value={equipmentStatus} name='equipmentStatus' className="form-select" onChange={(e) => handleOnChange(e)}>
                                    <option>SELECCIONE</option>
                                    {
                                        states.map(state => {
                                            return <option key={state._id} value={state._id}>
                                                {state.name}
                                            </option>

                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label"><strong>Tipo de equipo</strong></label>
                                <select required value={equipmentType} name='equipmentType' className="form-select" onChange={(e) => handleOnChange(e)} >
                                    <option>SELECCIONE</option>
                                    {
                                        types.map(type => {
                                            return <option key={type._id} value={type._id}>
                                                {type.name}
                                            </option>

                                        })
                                    }
                                </select>
                            </div>
                        </div>


                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col'>
                            <button className='btn btn-primary'> Guardar</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}
