import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faImages, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/ProductosAdmin.css';
import MenuLateralAdmin from '../../componentes/sidebarAdmin';
import NavAdmin from '../../componentes/navegacionAdmin';

const ProductosAdmin = () => {
    const [dataProductos, setDataProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [showNuevoModal, setShowNuevoModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/semillas')
            .then(response => response.json())
            .then(data => {
                setDataProductos(data);
                setFilteredProductos(data);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        const filtered = dataProductos.filter(producto => producto.nombre.toLowerCase().includes(value))
        setFilteredProductos(filtered)
    };

    return (
        <div className="ProductosAdmin">
            <NavAdmin />
            <MenuLateralAdmin />
            <h1>Semillas</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar producto..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="input-search"
                />
            </div>
            <button className="nuevaRecetaAdmin" onClick={() => setShowNuevoModal(true)}>Registrar semilla</button>
            <table className="crudProductosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudProductos">Id</td>
                        <td className="tituloCrudProductos">Nombre</td>
                        <td className="tituloCrudProductos">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredProductos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td className="accionesProductosAdmin">
                                <NavLink className='actulizarProductos'>
                                    <FontAwesomeIcon icon={faPencil} style={{ color: "#000000" }} />
                                </NavLink>
                                <NavLink className='eliminarProductos'>
                                    <FontAwesomeIcon icon={faTrash} style={{color: "#000000"}} />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosAdmin;
