import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/usuarios')
            .then(response => response.json())
            .then(data => setDataUsuarios(data))
            .catch(error => console.error('Error al obtener usuarios:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/actualizar_usuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedUsuario.id,
                    nombre: selectedUsuario.nombre,
                    apellidos: selectedUsuario.apellidos,
                    correo: selectedUsuario.correo,
                    clave: selectedUsuario.clave,
                    rol: selectedUsuario.rol
                })
            });

            if (response.ok) {
                const updatedUsuarios = await response.json();
                setDataUsuarios(updatedUsuarios); // Actualiza la lista de usuarios con los datos del servidor
                setShowEditarModal(false); // Cierra el modal de edición
                alert('Usuario actualizado correctamente');
            } else {
                console.error("Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };

    const handleChangeNewUsuario = (e) => {
        const { name, value } = e.target;
        setSelectedUsuario((prevUsuario) => ({ ...prevUsuario, [name]: value }));
    };

    const handleEditar = (usuario) => {
        setSelectedUsuario(usuario);
        setShowEditarModal(true);
    };

    const toggleActivo = (id) => {
        setDataUsuarios((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };

    return (
        <div className="UsuariosAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Usuarios</h1>
            <input type="text" className="buscarUsuariosAdmin" />
            <button className="botonBuscarUsuariosAdmin">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
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
                                <NavLink className='actulizarUsuarios' onClick={() => handleEditar(item)}>
                                    <FontAwesomeIcon icon={faPencil} style={{ color: "#000000" }} />
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
                        <form onSubmit={handleSubmit} className="formularioEditarUsuariosAdmin">
                            <input
                                className="inputUsuarioEditarAdmin"
                                name="nombre"
                                value={selectedUsuario?.nombre || ''}
                                type="text"
                                onChange={(e) => setSelectedUsuario({ ...selectedUsuario, nombre: e.target.value })}
                            /><br />
                            <input
                                className="inputUsuarioEditarAdmin"
                                name="apellidos"
                                value={selectedUsuario?.apellidos || ''}
                                type="text"
                                onChange={(e) => setSelectedUsuario({ ...selectedUsuario, apellidos: e.target.value })}
                            /><br />
                            <input
                                className="inputUsuarioEditarAdmin"
                                name="correo"
                                value={selectedUsuario?.correo || ''}
                                type="text"
                                onChange={(e) => setSelectedUsuario({ ...selectedUsuario, correo: e.target.value })}
                            /><br />
                            <div className="inputsUsuariosSelectEditar">
                                <input
                                    className="inputUsuarioEditarAdmin selectClaveUsuariosEditar"
                                    type="text"
                                    value={selectedUsuario?.clave || ''}
                                    onChange={(e) => setSelectedUsuario({ ...selectedUsuario, clave: e.target.value })}
                                /><br />
                                <select
                                    name="rol"
                                    className="selectUsuarioEditarAdmin selectClaveUsuariosEditar"
                                    value={selectedUsuario?.rol || ''}
                                    onChange={(e) => setSelectedUsuario({ ...selectedUsuario, rol: e.target.value })}
                                >
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
        </div>
    );
};

export default UsuariosAdmin;
