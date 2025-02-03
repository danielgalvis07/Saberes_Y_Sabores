import React, { useState } from "react";
import '../estilos/registro.css';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const rol = 1
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { nombre, apellido, email, password, rol };
        try {
            const response = await fetch('http://localhost:5000/registro_usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('Usuario Registrado correctamente');
                navigate('/');
            } else {
                console.error('Error:', result.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error de red. Intenta nuevamente más tarde.', error);
        }
    };

    return (
        <div className="contenedorRegistro">
            <div className="imagenRegistro">
                <img className="imagenR" src="https://www.earthshare.org/wp-content/uploads/EarthShare-8-Nonprofits-Fighting-for-Sustainable-Agriculture.jpg" alt="" />
                <h1 className="tituloImagenRegistro">Registrate a saberes y sabores</h1>
            </div>
            <form className="formularioRegistro" onSubmit={handleSubmit}>
                <div className="inputsRegistro">
                <h1 className="tituloRegistro">Registro</h1>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="inputRegistro w-80 "
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="inputRegistro"
                        name="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="inputRegistro2"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="inputRegistro2 "
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="hidden"
                        name="rol"
                        value={rol} 
                    />
                <div className="botonesRegistro">
                        <Link to="/" className="botonVolverinicio">
                            <button type="button" className="botonRegistro botonVolverInicioR">Volver</button>
                        </Link>
                    <button type="submit" className="botonRegistro">Crear cuenta</button>
                </div>
                <Link to="/inicioSesion" className="cuentaRegistro">¿ya tienes cuenta? Ingresa</Link>
                </div>
            </form>
        </div>
    );
};

export default Registro;
