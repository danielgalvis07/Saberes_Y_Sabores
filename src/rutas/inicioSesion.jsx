import React from "react";
import '../estilos/inicioSesion.css';
import logo from '../imagenes/logo.png';
import { Link } from 'react-router-dom';

const InicioSesion = () => {
    return (
        <div className="contenedor">
            <div className="contenedorFormulario">
                <form className="formularioInicio">
                    <h2 className="tituloInicio">INICIO DE SESION</h2>
                    <br /><br />
                    <div className="inputs">
                        <input type="text" placeholder="Correo electrónico" className="inputInicio"/>
                        <br /><br /><br /><br />
                        <input type="password" placeholder="Contraseña" className="inputInicio"/>
                        <br /><br />
                    </div>
                    <div className="contenedorBonotes">
                    <Link to="/" className="botonVolverinicio">
                        <button type="submit" className="botones botonVolverInicio">Volver</button></Link>
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
