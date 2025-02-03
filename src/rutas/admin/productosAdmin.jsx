import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/ProductosAdmin.css';
import MenuLateralAdmin from '../../componentes/sidebarAdmin'
import NavAdmin from '../../componentes/navegacionAdmin';
import InputSearch from '../../componentes/buscador';


const ProductosAdmin = () => {
    const [dataProductos, setDataProductos] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('')
    const [editMode, setEditMode] = useState(false);
    const [showVerMasModal, setShowVerMasModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false); // Nuevo estado para el modal de nuevo producto
    useEffect(() => {
        fetch('http://localhost:5000/semillas')
            .then(response => response.json())
            .then(data => setDataProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
},[]);


const handleVerMas = (producto) => {
    setSelectedProducto(producto);
    setShowVerMasModal(true);
};
    
const handleEditarMisProductos = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/actualizar_producto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedProducto.id,
                nombre: selectedProducto.nombre,
                imagen: selectedProducto.imagen
            })
        });

        if (response.ok) {
            const updateSemillas = await response.json();
            setDataProductos(updateSemillas); // Actualiza la lista de prodcutos con los datos del servidor
            setShowEditarModal(false); // Cierra el modal de edición
            alert('productos actualizada correctamente');
        } else {
            console.error("Error al actualizar la prodcuto");
        }
    } catch (error) {
        console.error("Error al hacer la petición:", error);
    }
};


const crearProducto = async (e) => {
    e.preventDefault();
    const data = { nombre, imagen };
    try {
        const response = await fetch('http://localhost:5000/registro_productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 200) {
            alert('producto Registrado correctamente');
            navigate('/misProductos');
        } else {
            console.error('Error:', result.message || 'Error al registrarse');
        }
    } catch (error) {
        console.error('Error de red. Intenta nuevamente más tarde.', error);
    }
};
    const handleEditar = (Producto) => {
        setSelectedProducto(Producto);
        setEditMode(true);
        setShowEditarModal(true);
    };

    const handleUpdateProducto = (e) => {
        e.preventDefault();
        const updatedProductos = dataProductos.map((Producto) =>
            Producto.id === selectedProducto.id ? selectedProducto : Producto
        );
        setDataProductos(updatedProductos);
        setShowEditarModal(false);
    };

    const handleNuevoProducto = () => {
        setShowNuevoModal(true); // Mostrar el modal para crear nuevo producto
    };

    const handleCloseNuevoModal = () => {
        setShowNuevoModal(false); // Cerrar el modal de nuevo producto
    };

    return (
        <div className="ProductosAdmin">
            <NavAdmin />
            <MenuLateralAdmin />
            <h1>Productos</h1>
            {/* <input type="text" className="buscarProductosAdmin"/>
            <button  className="botonBuscarProductosAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button> */}
            <InputSearch/>
            <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoProducto} // Abrir el modal de nuevo producto
            >
                Registrar producto
            </button>
                        <table className="crudProductosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudProductos">Id</td>
                        <td className="tituloCrudProductos">Nombre</td>
                        <td className="tituloCrudProductos"></td>
                        <td className="tituloCrudProductos">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProductos.map((item) => (
                        <tr key={item.id} >
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>
                                <button className="verMasRecetasAdmin" onClick={() => handleVerMas(item)}>
                                    Ver más
                                </button>
                            </td>

                            
                            <td className="accionesProductosAdmin">
                                <NavLink className='actulizarProductos'>
                                    <FontAwesomeIcon icon={faPencil} onClick={() => handleEditar(item)} style={{ color: "#000000" }} />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para "Ver más" */}
            {showVerMasModal && (
                <div className="modal-overlay" onClick={() => setShowVerMasModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowVerMasModal(false)}>X</button>
                        <h2>Detalles de la Producto</h2>
                        <p><strong>Nombre:</strong> {selectedProducto?.nombre}</p>
                        <p><strong>descripcion:</strong> {selectedProducto?.ingredientes}</p>
                        <img src={selectedProducto.imagen} alt="" className="imgVerMas"/>
                    </div>
                </div>
            )}

            {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarProductosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleEditarMisProductos} className="formularioEditarProductosAdmin">
                            <input 
                                className="inputProductoEditarAdmin"
                                type="text"
                                name="nombre"
                                value={selectedProducto?.nombre || ''}
                                onChange={(e) => setSelectedProducto({ ...selectedProducto, nombre: e.target.value })}
                            /><br />
                            <input 
                                className="inputProductoEditarAdmin" 
                                type="file" 
                                name="imagen"
                                onChange={(e) => setSelectedProducto({ ...selectedProducto, imagen: e.target.value })}
                                />
                                <FontAwesomeIcon icon={faImages} className="iconoFotoProductosAdmin"/>
                                
                            <button type="submit" className="botonEditarProductosAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
                )}

                 {/* Modal para "Nuevo producto" */}
            {showNuevoModal && (
                <div className="modal-overlay" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar Nuevo producto</h2>
                        <form className="formularioEditarRecetasAdmin" onSubmit={crearProducto}>
                            <input 
                                type="text"
                                placeholder="Ingresa el nombre del producto"
                                name="nombre"
                                required
                                className="inputProductoEditarAdmin"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                /><br/>
                            <input 
                                type="file"
                                className="inputRecetaEditarAdmin" 
                                placeholder="Adjuntar foto" 
                                required
                                value={imagen}
                                name="imagen"
                                onChange={(e) => setImagen(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Registrar producto</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductosAdmin;
