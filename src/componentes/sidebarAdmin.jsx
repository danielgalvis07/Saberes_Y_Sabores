import React from "react";
import '../estilos/sidebar.css'
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; 
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";


const MenuLateralAdmin = () => {
    return (
        <div className="menuLateral">
            <ul className="ulMenuLateral">
           <li> <NavLink className='linkVendedorSidebar' to='/productosAdmin'><FontAwesomeIcon  className="iconosSidebar" icon={faSeedling} style={{color: "#71277a",}} />Semillas</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to="/recetasAdmin"><FontAwesomeIcon  className="iconosSidebar" icon={faBook} style={{color: "#71277a",}} />Recetas</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to="/recetasAdmin"><FontAwesomeIcon  className="iconosSidebar" icon={faStore} style={{color: "#71277a",}} />Tienda</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to='/usuariosAdmin'><FontAwesomeIcon icon={faUsers} style={{color: "#71277a",}} />Usuarios</NavLink></li>

            </ul>

        </div>
    );
}

export default MenuLateralAdmin