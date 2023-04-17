import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom';
import {getInventoryById, updateInventory} from '../../../services/inventoryService'
import{getBrand} from '../../../services/brandService'
import{getState} from '../../../services/stateService'
import{getUser} from '../../../services/usuarioServices'
import{getType} from '../../../services/typeService'
import Swal from 'sweetalert2';

export const InventoryUpdate = () => {

    const {inventoryId=''} = useParams();
    const [inventory, setInventory] = useState({}); 

    const[users, setUsers] = useState([]);
    const[brands, setBrands]= useState([]);
    const[types, setTypes]= useState([]);
    const[states, setStates]=useState([]);

    useEffect( () => {
        const getUsers = async() =>{
            try{
                const {data}= await getUser();
                setUsers(data);
                console.log(data)
    
            }catch(error){
                console.log(error)
            }
            
        }
        getUsers();
        

    },[]);
    useEffect( () => {
        const getBrands = async()=>{
            try{
                const {data}= await getBrand();
                setBrands(data);
    
            }catch(error){
                console.log(error)
            }
            
        }
        getBrands();

    },[]);
    useEffect( () => {
        const getStates= async ()=>{
            try{
                const {data}= await getState();
                setStates(data);
    
            }catch(error){
                console.log(error)
            }
        }
        getStates();
        

    },[]);
    useEffect( () => {
        const getTypes= async () =>{
            try{
                const {data}= await getType();
                setTypes(data);
    
            }catch(error){
                console.log(error)
            }
        };

        getTypes();

        

    },[]);

    const [valueForm, setValueForm] = useState({});
    const {serial='', model='', description='',image='', price='', colour='',
    user='', brand='',equipmentStatus='',equipmentType='' } = valueForm;

    const getInventory = async () => {
        try{
            const {data} = await getInventoryById(inventoryId);
            console.log(data);
            setInventory(data);

        }catch(error){
            console.log(error)
        }
    };
    useEffect(()=>{
        getInventory();
    },[inventoryId]);

    useEffect(()=>{
        
            setValueForm({
                serial: inventory.serial,
                model: inventory.model,
                description: inventory.description,
                price: inventory.price,
                colour: inventory.colour,
                user: inventory.user,
                brand: inventory.brand,
                equipmentStatus: inventory.equipmentStatus,
                equipmentType: inventory.equipmentType,
                image: inventory.image

            })
        

    },[inventory]);

    const handleOnChange = (e) => {
        setValueForm({ ...valueForm, [e.target.name]: e.target.value })
      };

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const inventory ={
            serial, model, description, image, price, colour,
            user:{
                _id: user

            },
            brand:{
                _id: brand
            },
            equipmentStatus:{
                _id: equipmentStatus
            },
            equipmentType:{
                _id: equipmentType
            }
            }
            console.log(inventory);
            try{
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Cargando...'
                });
                Swal.showLoading();
                const {data}= await updateInventory(inventoryId,inventory);
                console.log(data);
                Swal.close();
                
                

            }catch(error){
                console.log(error)
            }
    }



  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title neon3 text-center'>Informacion y Actualización del Inventario</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={inventory?.image} alt="product" style={{ width: '100%' }} />

                    </div>
                    <div className='col-md-8'>
                    <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Serial</strong></label>
                                <input required type="text" value={serial} name='serial' className="form-control" onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Modelo</strong></label>
                                <input required type="text" value={model} name='model' className="form-control" onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Descripción</strong></label>
                                <input required type="text" value={description} name='description' className="form-control" onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Foto</strong></label>
                                <input required type="text" value={image} name="image" className="form-control" onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Precio</strong></label>
                                <input required type="number" value={price} name='price' className="form-control" onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Color</strong></label>
                                <input required type="text" value={colour} name='colour' className="form-control" onChange={(e) => handleOnChange(e)}/>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label  className="form-label"><strong>Usuario</strong></label>
                                <select required value={user} name='user'  className="form-select" onChange={(e) => handleOnChange(e)}>
                                    <option>SELECCIONE</option>
                                    {
                                        users.map(user =>{
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
                                <label  className="form-label"><strong>Marca</strong></label>
                                <select required value={brand} name='brand'  className="form-select" onChange={(e) => handleOnChange(e)}>
                                    <option>SELECCIONE</option>
                                    {
                                        brands.map(brand =>{
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
                                <label  className="form-label"><strong>Estado del equipo</strong></label>
                                <select required value={equipmentStatus} name='equipmentStatus'  className="form-select" onChange={(e) => handleOnChange(e)}>
                                    <option>SELECCIONE</option>
                                    {
                                        states.map(state =>{
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
                                <label  className="form-label"><strong>Tipo de equipo</strong></label>
                                <select required value={equipmentType} name='equipmentType' className="form-select" onChange={(e) => handleOnChange(e)} >
                                    <option>SELECCIONE</option>
                                    {
                                        types.map(type =>{
                                            return <option key={type._id} value={type._id}>
                                                {type.name}
                                            </option>

                                        })
                                    }
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
