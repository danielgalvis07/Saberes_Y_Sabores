import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/recetasAdmin.css';
import MenuLateral from '../../componentes/sidebar';
import NavAdmin from '../../componentes/navegacionAdmin';

const initialDataRecetas = [
    { id: 1, nombre: 'sancocho', ingredientes: 'papa, pollo y yuca', descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eligendi enim mollitia odit facere quis quibusdam distinctio quam architecto dolorum asperiores velit sed temporibus recusandae sit ex rem, ducimus expedita!', activo: true },
    { id: 2, nombre: 'arroz con pollo', ingredientes: 'arroz, pollo y vegetales', descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eligendi enim mollitia odit facere quis quibusdam distinctio quam architecto dolorum asperiores velit sed temporibus recusandae sit ex rem, ducimus expedita!', activo: true },
    { id: 3, nombre: 'empanadas', ingredientes: ' carne y queso', descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eligendi enim mollitia odit facere quis quibusdam distinctio quam architecto dolorum asperiores velit sed temporibus recusandae sit ex rem, ducimus expedita!', activo: true }
];

const ToggleSwitch = ({ isActive, onToggle }) => (
    <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="toggle-knob"></div>
    </div>
);

const RecetasAdmin = () => {
    const [dataRecetas, setDataRecetas] = useState(initialDataRecetas);
    const [selectedReceta, setSelectedReceta] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showVerMasModal, setShowVerMasModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);

    const toggleActivo = (id) => {
        setDataRecetas((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };

    const handleVerMas = (receta) => {
        setSelectedReceta(receta);
        setShowVerMasModal(true);
    };

    const handleEditar = (receta) => {
        setSelectedReceta(receta);
        setEditMode(true);
        setShowEditarModal(true);
    };

    const handleUpdateReceta = (e) => {
        e.preventDefault();
        const updatedRecetas = dataRecetas.map((receta) =>
            receta.id === selectedReceta.id ? selectedReceta : receta
        );
        setDataRecetas(updatedRecetas);
        setShowEditarModal(false);
    };

    return (
        <div className="recetasAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Recetas</h1>
            <input type="text" className="buscarRecetasAdmin"/>
            <button  className="botonBuscarRecetasAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button></button>
            <table className="crudRecetasAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudRecetas">Id</td>
                        <td className="tituloCrudRecetas">Nombre</td>
                        <td className="tituloCrudRecetas">Ingredientes</td>
                        <td className="tituloCrudRecetas"></td>
                        <td className="tituloCrudRecetas">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {dataRecetas.map((item) => (
                        <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.ingredientes}</td>
                            <td>
                                <button className="verMasRecetasAdmin" onClick={() => handleVerMas(item)}>
                                    Ver más
                                </button>
                            </td>
                            <td className="accionesRecetasAdmin">
                                <NavLink className='actulizarRecetas'>
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
                        <h2>Detalles de la Receta</h2>
                        <p><strong>Nombre:</strong> {selectedReceta?.nombre}</p>
                        <p><strong>Ingredientes:</strong> {selectedReceta?.ingredientes}</p>
                        <p><strong>descripcion:</strong> {selectedReceta?.descripcion}</p>
                    </div>
                </div>
            )}

            {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarRecetasAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Receta</h2>
                        <form onSubmit={handleUpdateReceta} className="formularioEditarRecetasAdmin">
                            <input className="inputRecetaEditarAdmin" placeholder="Nombre" type="text" /><br />
                            <input className="inputRecetaEditarAdmin" placeholder="Ingredientes" type="text" /><br />
                            <input className="inputRecetaEditarAdmin" placeholder="Descripcion" type="text" /><br />
                            <input className="inputRecetaEditarAdmin" placeholder="Adjuntar foto" type="text" /><FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecetasAdmin;
