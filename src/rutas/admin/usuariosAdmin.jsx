import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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

    const handleEditar = (usuario) => {
        setSelectedUsuario({ ...usuario });
        setShowEditarModal(true);
    };

    const handleChangeEditUsuario = (e) => {
        const { name, value } = e.target;
        setSelectedUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateUsuario = (e) => {
        e.preventDefault();
        setDataUsuarios((prevData) =>
            prevData.map((usuario) =>
                usuario.id === selectedUsuario.id ? selectedUsuario : usuario
            )
        );
        setShowEditarModal(false);
    };

    const handleNuevoUsuario = () => {
        setShowNuevoModal(true); 
    };

    const handleCloseNuevoModal = () => {
        setShowNuevoModal(false); 
    };

    const handleChangeNewUsuario = (e) => {
        const { name, value } = e.target;
        setNewUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateUsuario = (e) => {
        e.preventDefault();
        setDataUsuarios([...dataUsuarios, { ...newUsuario, id: dataUsuarios.length + 1 }]);
        setShowNuevoModal(false);
        setNewUsuario({
            id: dataUsuarios.length + 2,
            nombre: "",
            apellidos: "",
            telefono: "",
            correo: "",
            clave: "",
            rol: "1",
            activo: true,
        });
    };

    return (
        <div className="UsuariosAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Usuarios</h1>
            <input type="text" className="buscarUsuariosAdmin"/>
            <button className="botonBuscarUsuariosAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button className="nuevaRecetaAdmin" onClick={handleNuevoUsuario}>
                Registrar usuario
            </button>
            <table className="crudUsuariosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudUsuarios">Id</td>
                        <td className="tituloCrudUsuarios">Nombre</td>
                        <td className="tituloCrudUsuarios">Apellidos</td>
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

            {showEditarModal && selectedUsuario && (
                <div className="modalEditarUsuariosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Usuario</h2>
                        <form onSubmit={handleUpdateUsuario} className="formularioEditarUsuariosAdmin">
                            <input className="inputUsuarioEditarAdmin" name="nombre" value={selectedUsuario.nombre} placeholder="Nombre" type="text" onChange={handleChangeEditUsuario} /><br />
                            <input className="inputUsuarioEditarAdmin" name="apellidos" value={selectedUsuario.apellidos} placeholder="Apellidos" type="text" onChange={handleChangeEditUsuario} /><br />
                            <input className="inputUsuarioEditarAdmin" name="correo" value={selectedUsuario.correo} placeholder="Correo" type="text" onChange={handleChangeEditUsuario} /><br />
                            <div className="inputsUsuariosSelectEditar">
                                <input className="selectClaveUsuariosEditar inputUsuarioEditarAdmin" name="clave" value={selectedUsuario.clave} placeholder="Clave" type="text" onChange={handleChangeEditUsuario} /><br />
                                <select className="selectClaveUsuariosEditar selectUsuarioEditarAdmin" name="rol" value={selectedUsuario.rol} onChange={handleChangeEditUsuario}>
                                    <option value="1">Admin</option>
                                    <option value="2">Usuario</option>
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
