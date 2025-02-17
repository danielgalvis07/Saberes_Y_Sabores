import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacionAdmin.css';
import logo from '../imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const NavAdmin = () => {

    return (
        <div className="headerAdmin">
            <header>
                <nav className="headerInicioAdmin">
                    <ul className="ulNavegacioAdmin">
                        <NavLink >
                            <img src={logo} alt="Logo" className="imagenHeaderAdmin ml-8" />
                        </NavLink>

                    </ul>
                        <div className="salirAdmin">
                            {/* <NavLink className='linkAdmin' to="/salirAdmin"><FontAwesomeIcon icon={faUser} className="iconosAdmin"/></NavLink> */}
                            <NavLink className='linkAdmin' to="/"><FontAwesomeIcon icon={faRightFromBracket} className="iconosAdmin"/></NavLink>
                        </div>
                </nav>
            </header>
        </div>
    )
}

export default NavAdmin;