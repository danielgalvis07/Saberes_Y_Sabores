import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import '../estilos/ProductosAdmin.css';
import MenuLateral from '../../componentes/sidebar';
import NavAdmin from '../../componentes/navegacionAdmin';

const initialDataProductos = [
    { id: 1, nombre: 'sancocho', ingredientes: 'papa, pollo y yuca', descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eligendi enim mollitia odit facere quis quibusdam distinctio quam architecto dolorum asperiores velit sed temporibus recusandae sit ex rem, ducimus expedita!', activo: true },
    { id: 2, nombre: 'arroz con pollo', ingredientes: 'arroz, pollo y vegetales', descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eligendi enim mollitia odit facere quis quibusdam distinctio quam architecto dolorum asperiores velit sed temporibus recusandae sit ex rem, ducimus expedita!', activo: true },
    { id: 3, nombre: 'empanadas', ingredientes: ' carne y queso', descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eligendi enim mollitia odit facere quis quibusdam distinctio quam architecto dolorum asperiores velit sed temporibus recusandae sit ex rem, ducimus expedita!', activo: true }
];

const ToggleSwitch = ({ isActive, onToggle }) => (
    <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="toggle-knob"></div>
    </div>
);

const ProductosAdmin = () => {
    const [dataProductos, setDataProductos] = useState(initialDataProductos);
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showVerMasModal, setShowVerMasModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);

    const toggleActivo = (id) => {
        setDataProductos((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };

    const handleVerMas = (Producto) => {
        setSelectedProducto(Producto);
        setShowVerMasModal(true);
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

    return (
        <div className="ProductosAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Productos</h1>
            <input type="text" className="buscarProductosAdmin"/>
            <button  className="botonBuscarProductosAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button></button>
            <table className="crudProductosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudProductos">Id</td>
                        <td className="tituloCrudProductos">Nombre</td>
                        <td className="tituloCrudProductos">Ingredientes</td>
                        <td className="tituloCrudProductos"></td>
                        <td className="tituloCrudProductos">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProductos.map((item) => (
                        <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.ingredientes}</td>
                            <td>
                                <button className="verMasProductosAdmin" onClick={() => handleVerMas(item)}>
                                    Ver más
                                </button>
                            </td>
                            <td className="accionesProductosAdmin">
                                <NavLink className='actulizarProductos'>
                                    <FontAwesomeIcon icon={faPencil} onClick={() => handleEditar(item)} style={{ color: "#000000" }} />
                                </NavLink>
                                <ToggleSwitch
                                    isActive={item.activo}
                                    onToggle={() => toggleActivo(item.id)}
                                />
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
                        <p><strong>Ingredientes:</strong> {selectedProducto?.ingredientes}</p>
                        <p><strong>descripcion:</strong> {selectedProducto?.descripcion}</p>
                    </div>
                </div>
            )}

            {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarProductosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleUpdateProducto} className="formularioEditarProductosAdmin">
                            <input className="inputProductoEditarAdmin" placeholder="Nombre" type="text" /><br />
                            <input className="inputProductoEditarAdmin" placeholder="Ingredientes" type="text" /><br />
                            <input className="inputProductoEditarAdmin" placeholder="Descripcion" type="text" /><br />
                            <input className="inputProductoEditarAdmin" placeholder="Adjuntar foto" type="text" /><FontAwesomeIcon icon={faImages} className="iconoFotoProductosAdmin"/>
                            <button type="submit" className="botonEditarProductosAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductosAdmin;
