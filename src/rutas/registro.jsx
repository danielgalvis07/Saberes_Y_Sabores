import React from "react";
import '../estilos/registro.css';
import { Link } from 'react-router-dom';

const Registro = () => {
    return (
        <div className="contenedorRegistro">
            <form className="formularioRegistro">
            <h2 className="tituloRegistro">REGISTRO</h2>
                <div className="inputsRegistro">
                    <input type="text" placeholder="Nombre" className="inputRegistro" />
                    <input type="text" placeholder="Apellido" className="inputRegistro" />
                    <input type="email" placeholder="Correo electrónico" className="inputRegistro" />
                    <input type="password" placeholder="Contraseña" className="inputRegistro" />
                </div>
                <div className="botonesRegistro">
                    <Link to="/" className="volverRegistro">Volver</Link>
                    <button className="botonResgistro">Crear cuenta</button>
                </div>
                <Link to="/inicioSesion" className="cuentaRegistro">¿ya tienes cuenta? Ingresa</Link>
            </form>
        </div>
    );
}

export default Registro;
