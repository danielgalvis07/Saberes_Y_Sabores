import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacioVendedor.css';
import logo from '../imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const NavVendedor = () => {

    return (
        <div className="headerVendedor">
            <header>
                <nav className="headerInicioVendedor">
                    <ul className="ulNavegacioVendedor">
                        <NavLink to="/principioVendedor">
                            <img src={logo} alt="Logo" className="imagenHeaderVendedor" />
                        </NavLink>
                        <NavLink className='linkVendedor' to='/misProductosVendedor'>Mis productos</NavLink>
                        <NavLink className='linkVendedor' to='/ordenesVendedor'>Ordenes</NavLink>
                        <NavLink className='linkVendedor' to="/pilotosVendedor">Pilotos</NavLink>
                        <NavLink className='linkVendedor' to="/tiendaVendedor">Tienda</NavLink>
                    </ul>
                        <div className="salirVendedor">
                            <NavLink className='linkVendedor' to="/salirVendedor"><FontAwesomeIcon icon={faUser} className="iconosVendedor"/></NavLink>
                            <NavLink className='linkVendedor' to="/"><FontAwesomeIcon icon={faRightFromBracket} className="iconosVendedor"/></NavLink>
                        </div>
                </nav>
            </header>
        </div>
    )
}

export default NavVendedor;