import React from "react";
import { useState } from "react";
import '../estilos/sidebar.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBars, faBook} from "@fortawesome/free-solid-svg-icons";



const MenuLateralCliente = () => {
        const [sidebarOpen, setSidebarOpen] = useState(false);
    
        const toggleSidebar = () => {
            setSidebarOpen(!sidebarOpen);
        };


        
    return (
        <>
        <button className="menuToggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        <div className={`menuLateral ${sidebarOpen ? "open" : "closed"}`}>
            <ul className="ulMenuLateral">
            <li><NavLink className='linkVendedorSidebar' to="/recetasCliente"><FontAwesomeIcon  className="iconosSidebar" icon={faBook} style={{color: "#71277a",}} />Recetas</NavLink></li>
            <li><NavLink className='linkVendedorSidebar' to="/tiendaCliente"><FontAwesomeIcon  className="iconosSidebar" icon={faStore} style={{color: "#71277a",}} />Tienda</NavLink></li>

            </ul>

        </div>
        </>
    );
}

export default MenuLateralCliente