import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../../estilos/usuariosAdmin.css'
import MenuLateralAdmin from '../../componentes/sidebarAdmin'
import NavAdmin from '../../componentes/navegacionAdmin'

const UsuariosAdmin = () => {



    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('')

    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dataUsuarios, setDataUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    

    useEffect(() => {
        fetch('http://localhost:5000/usuarios')
            .then(response => response.json())
            .then(data => {
                setDataUsuarios(data);
                setFilteredUsuarios(data);
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    }, []);



    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = dataUsuarios.filter(usuario => 
            usuario.nombre.toLowerCase().includes(value) ||
            usuario.apellidos.toLowerCase().includes(value) ||
            usuario.correo.toLowerCase().includes(value)
        )
        setFilteredUsuarios(filtered);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            })

            if (response.ok) {
                const updatedUsuarios = await response.json()
                setDataUsuarios(updatedUsuarios) // Actualiza la lista de usuarios con los datos del servidor
                setShowEditarModal(false) // Cierra el modal de edición
                alert('Usuario actualizado correctamente')
            } else {
                console.error("Error al actualizar el usuario")
            }
        } catch (error) {
            console.error("Error al hacer la petición:", error)
        }
    }

    const crearUsuario = async (e) => {
        e.preventDefault()
        const data = { nombre, apellido, email, password, rol }
        try {
            const response = await fetch('http://localhost:5000/registro_usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.status === 200) {
                alert('Usuario Registrado correctamente')
                navigate('/usuariosAdmin')
            } else {
                console.error('Error:', result.message || 'Error al registrarse')
            }
        } catch (error) {
            console.error('Error de red. Intenta nuevamente más tarde.', error)
        }
    }

    const handleEditar = (usuario) => {
        setSelectedUsuario(usuario)
        setShowEditarModal(true)
    }

    const handleNuevoReceta = () => {
        setShowNuevoModal(true) // Mostrar el modal para crear nueva receta
    }

    const handleCloseNuevoModal = () => {
        setShowNuevoModal(false) // Cerrar el modal de nueva receta
    }


    return (
        <div className="UsuariosAdmin">
            <NavAdmin />
            <MenuLateralAdmin />
            <h1>Usuarios</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar usuario..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="input-search"
                />
            </div>      
                  <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoReceta} // Abrir el modal de nueva receta
            >
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
                    {filteredUsuarios.map((item) => (
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
                                <NavLink className='eliminarUsuarios'>
                                    <FontAwesomeIcon icon={faTrash} style={{color: "#000000",}} />
                                </NavLink>
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
                                    <option value="2">Vendedor</option>
                                    <option value="3">Usuario</option>
                                </select>
                            </div>
                            <button type="submit" className="botonEditarUsuariosAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}

            {/* modal para usuario nuevo */}
            {showNuevoModal && (
                <div className="modal-overlay" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar Nuevo Usuario</h2>
                        <form className="formularioEditarRecetasAdmin" onSubmit={crearUsuario} >
                            <input
                                placeholder="Ingrese nombre"
                                className="inputUsuarioEditarAdmin"
                                name="nombre"
                                type="text"
                                required
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            /><br />
                            <input
                                placeholder="Ingrese apellidos"
                                className="inputUsuarioEditarAdmin"
                                name="apellido"
                                type="text"
                                required
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            /><br />
                            <input
                                placeholder="Ingrese correo"
                                className="inputUsuarioEditarAdmin"
                                name="email"
                                type="text"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /><br />
                            <input
                                name="password"
                                placeholder="Ingrese clave"
                                className="inputUsuarioEditarAdmin selectClaveUsuariosEditar"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /><br />
                            <select
                                name="rol"
                                className="selectUsuarioEditarAdmin selectClaveUsuariosEditar"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="1">Admin</option>
                                <option value="2">Usuario</option>
                                <option value="3">Vendedor</option>
                            </select>
                            <button type="submit" className="botonEditarRecetasAdmin">Registrar Usuario</button>
                        </form>
                    </div>
                </div>
                    )}
        </div>
    )
}

export default UsuariosAdmin
