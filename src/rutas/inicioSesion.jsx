import React, { useState } from "react";
import '../estilos/inicioSesion.css';
import logo from '../imagenes/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const InicioSesion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };
        
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.status === 200) {
                // Aquí obtenemos el rol desde la respuesta
                const { rol } = result;
                const { token } = result;
                
    
                // Redirigimos dependiendo del rol
                if (rol === 1) {
                    navigate('/principioAdmin'); // Admin
                } else if (rol === 2) {
                    navigate('/principioVendedor'); // vendedor
                } else if (rol === 3) {
                    navigate('/'); // usuario
                } else {
                    setErrorMessage('Rol desconocido');
                }
            } else {
                setErrorMessage(result.message || 'Error al iniciar sesión');
                alert("Usuario o Contraseña incorrectos");
            }
        } catch (error) {
            setErrorMessage('Error de red. Intenta nuevamente más tarde.');
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="contenedor">
            <div className="contenedorFormulario">
                <form className="formularioInicio" onSubmit={handleSubmit}>
                    <h2 className="tituloInicio">INICIO DE SESION</h2>
                    <br /><br />
                    <div className="inputs">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="inputRegistro"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="inputRegistro"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div className="contenedorBonotesInicioSesion">
                        <Link to="/" className="botonVolverinicio">
                            <button type="button" className="botones botonVolverInicio">Volver</button>
                        </Link>
                        <button type="submit" className="botones botoneInicio">Iniciar Sesión</button>
                        <br />
                    </div>
                </form>
                <div className="imagen">
                    <img src={logo} alt="Logo de mi aplicación" />
                    <br />
                    <Link to="/registro" className="cuenta">¿No tienes cuenta? Regístrate</Link>
                    <Link to="/recuperacioClave" className="cuenta cuentaRecuperacion">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;
