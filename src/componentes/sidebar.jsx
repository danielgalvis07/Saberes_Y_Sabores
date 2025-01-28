import React from "react";
import '../estilos/sidebar.css'
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faSeedling } from "@fortawesome/free-solid-svg-icons"; 
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";


const MenuLateral = () => {
    return (
        <div className="menuLateral">
            <ul className="ulMenuLateral">
           <li> <NavLink className='linkVendedorSidebar' to='/misSemillasVendedor'><FontAwesomeIcon  className="iconosSidebar" icon={faSeedling} style={{color: "#71277a",}} />Mis semillas</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to="/recetasVendedor"><FontAwesomeIcon  className="iconosSidebar" icon={faBook} style={{color: "#71277a",}} />Recetas</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to="/tiendaVendedor"><FontAwesomeIcon  className="iconosSidebar" icon={faStore} style={{color: "#71277a",}} />Tienda</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to='/'><FontAwesomeIcon className="iconosSidebar" icon={faBoxOpen} style={{color: "#71277a",}} />Inventario</NavLink></li>
            </ul>

        </div>
    );
}

export default MenuLateral