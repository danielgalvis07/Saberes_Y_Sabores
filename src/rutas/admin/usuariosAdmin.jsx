import React, { useState, } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/usuariosAdmin.css';
import MenuLateral from '../../componentes/sidebar';
import NavAdmin from '../../componentes/navegacionAdmin';

const ToggleSwitch = ({ isActive, onToggle }) => (
    <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="toggle-knob"></div>
    </div>
);

const UsuariosAdmin = () => {
    const [dataUsuarios, setDataUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showVerMasModal, setShowVerMasModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false); 
    const [newUsuario, setNewUsuario] = useState({
        id: dataUsuarios.length + 1,
        nombre: "",
        apellidos: "",
        telefono: "",
        correo: "",
        clave: "",
        rol: "1",
        activo: true,
    });

    const toggleActivo = (id) => {
        setDataUsuarios((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };

    const handleVerMas = (Usuario) => {
        setSelectedUsuario(Usuario);
        setShowVerMasModal(true);
    };

    const handleEditar = (Usuario) => {
        setSelectedUsuario(Usuario);
        setEditMode(true);
        setShowEditarModal(true);
    };

    const handleUpdateUsuario = (e) => {
        e.preventDefault();
        const updatedUsuarios = dataUsuarios.map((Usuario) =>
            Usuario.id === selectedUsuario.id ? selectedUsuario : Usuario
        );
        setDataUsuarios(updatedUsuarios);
        setShowEditarModal(false);
    };

    return (
        <div className="UsuariosAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Usuarios</h1>
            <input type="text" className="buscarUsuariosAdmin"/>
            <button className="botonBuscarUsuariosAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button></button>
            <table className="crudUsuariosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudUsuarios">Id</td>
                        <td className="tituloCrudUsuarios">Nombre</td>
                        <td className="tituloCrudUsuarios">Apellidos</td>
                        <td className="tituloCrudUsuarios">Telefono</td>
                        <td className="tituloCrudUsuarios">Correo</td>
                        <td className="tituloCrudUsuarios">Clave</td>
                        <td className="tituloCrudUsuarios">Rol</td>
                        <td className="tituloCrudUsuarios">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {dataUsuarios.map((item) => (
                        <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.apellidos}</td>
                            <td>{item.correo}</td>
                            <td>{item.clave}</td>
                            <td>{item.rol}</td>
                            <td className="accionesUsuariosAdmin">
                                <NavLink className='actulizarUsuarios'>
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

            {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarUsuariosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Usuario</h2>
                        <form onSubmit={handleUpdateUsuario} className="formularioEditarUsuariosAdmin">
                            <input className="inputUsuarioEditarAdmin" name="nombre" value={selectedUsuario.nombre} placeholder="Nombre" type="text" onChange={handleChangeEditUsuario} /><br />
                            <input className="inputUsuarioEditarAdmin" name="apellidos" value={selectedUsuario.apellidos} placeholder="Apellidos" type="text" onChange={handleChangeEditUsuario} /><br />
                            <input className="inputUsuarioEditarAdmin" name="telefono" value={selectedUsuario.telefono} placeholder="Telefono" type="text" onChange={handleChangeEditUsuario} /><br />
                            <input className="inputUsuarioEditarAdmin" name="correo" value={selectedUsuario.correo} placeholder="Correo" type="text" onChange={handleChangeEditUsuario} /><br />
                            <div className="inputsUsuariosSelectEditar">
                                <input className="inputUsuarioEditarAdmin selectClaveUsuariosEditar" placeholder="Clave" type="text" value={selectedUsuario?.clave} onChange={(e) => setSelectedUsuario({ ...selectedUsuario, clave: e.target.value })} /><br />
                                <select name="Rol" className="selectUsuarioEditarAdmin selectClaveUsuariosEditar" value={selectedUsuario?.rol} onChange={(e) => setSelectedUsuario({ ...selectedUsuario, rol: e.target.value })}>
                                    <option value="1">Admin</option>
                                    <option value="2">Usuarios</option>
                                    <option value="3">Vendedor</option>
                                </select>
                            </div>
                            <button type="submit" className="botonEditarUsuariosAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}

            {showNuevoModal && (
                <div className="modalEditarUsuariosAdmin" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar Nuevo Usuario</h2>
                        <form onSubmit={handleCreateUsuario} className="formularioEditarUsuariosAdmin">
                            <input className="inputUsuarioEditarAdmin" name="nombre" placeholder="Nombre" type="text" onChange={handleChangeNewUsuario} required /><br />
                            <input className="inputUsuarioEditarAdmin" name="apellidos" placeholder="Apellidos" type="text" onChange={handleChangeNewUsuario} required /><br />
                            <input className="inputUsuarioEditarAdmin" name="telefono" placeholder="Teléfono" type="text" onChange={handleChangeNewUsuario} required /><br />
                            <input className="inputUsuarioEditarAdmin" name="correo" placeholder="Correo" type="email" onChange={handleChangeNewUsuario} required /><br />
                            <div className="inputsUsuariosSelectEditar">
                            <input className="inputUsuarioEditarAdmin selectClaveUsuariosEditar" name="clave" placeholder="Clave" type="text" onChange={handleChangeNewUsuario} required />
                            <select name="rol" onChange={handleChangeNewUsuario} className="selectClaveUsuariosEditar selectUsuarioEditarAdmin" required>
                                <option value="1">Admin</option>
                                <option value="2">Usuario</option>
                                <option value="3">Vendedor</option>
                            </select>
                            </div>
                            <button type="submit" className="botonEditarUsuariosAdmin">Registrar usuario</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsuariosAdmin;
