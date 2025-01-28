import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacioVendedor.css';
import logo from '../imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';



const NavVendedor = () => {
    //modal para usuario
    const [showNuevoModal, setShowNuevoModal] = useState(false); // Nuevo estado para el modal de nueva receta
    
    
    const handleNuevoReceta = () => {
        setShowNuevoModal(true); // Mostrar el modal para crear nueva receta
    };
    
    const miPerfil = () => {
        setShowNuevoModal(false); // Cerrar el modal de nueva receta
    };

    return (
        <div className="headerVendedor">
            <header>
                <nav className="headerInicioVendedor">
                    <ul className="ulNavegacioVendedor">
                        <NavLink >
                            <img src={logo} alt="Logo" className="imagenHeaderVendedor" />
                        </NavLink>

                    </ul>
                    <div className="salirVendedor">
                        <button className="botonIconoVendedor"onClick={handleNuevoReceta} >
                            <FontAwesomeIcon icon={faUser} className="iconosVendedor"/>
                        </button>
                        <NavLink className='linkVendedor' to="/"><FontAwesomeIcon icon={faRightFromBracket} className="iconosVendedor"/></NavLink>
                    </div>
                        
                </nav>
            </header>


        </div>
    )
}

export default NavVendedor;