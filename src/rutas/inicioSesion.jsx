import React, { useState } from "react";
import '../estilos/inicioSesion.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

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
                    navigate('/usuariosAdmin'); // Admin
                } else if (rol === 2) {
                    navigate('/misSemillasVendedor'); // vendedor
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
        <div className="contenedorLogin">
            <div className="contenedorImagenLogin">
                <img className="imagenLogin" src="https://media.istockphoto.com/id/1401722160/es/foto/plantaci%C3%B3n-soleada-con-cultivo-de-soja.jpg?s=612x612&w=0&k=20&c=5ZTCnfPWntup-6i6G5cAhOniow_TWNFCacAaFipnI2o=" alt="" />
                <h1 className="tituloImagenLogin">Bienvenidos a saberes y sabores</h1>
            </div>
            <div className="contenedorFormulario">
                <form className="formularioInicio" onSubmit={handleSubmit}>
                    <h1 className="tituloInicio">Inicio de sesion</h1>
                    <br /><br />
                    <div className="inputs">
                    <FontAwesomeIcon icon={faEnvelope} className="iconosLogin"/>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="inputLogin"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="inputLogin"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                    {errorMessage && <p className="error">{errorMessage}</p>}
                        <Link to="/" className="botonVolverinicio">
                            <button type="button" className="botonesSesion botonVolverInicioR">Volver</button>
                        </Link>
                        <button type="submit" className="botonesSesion botoneInicio">Iniciar Sesión</button>

                    <Link to="/registro" className="cuenta">¿No tienes cuenta? Regístrate</Link><br />
                    <Link to="/recuperacioClave" className="cuenta cuentaRecuperacion">¿Olvidaste tu contraseña?</Link>

                    </div>
                </form>
            </div>

        </div>
    );
}

export default InicioSesion;
