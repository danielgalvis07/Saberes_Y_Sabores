import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import '../estilos/navegacioVendedor.css'
import logo from '../imagenes/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'



const NavVendedor = () => {
    const [showNuevoModal, setShowNuevoModal] = useState(false) 
    
    const handleNuevoReceta = () => {
        setShowNuevoModal(true) 
    }
    
    const miPerfil = () => {
        setShowNuevoModal(false) 
    }

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
                            {/* <FontAwesomeIcon icon={faUser} className="iconosVendedor"/> */}
                        </button>
                        <NavLink className='linkVendedor' to="/"><FontAwesomeIcon icon={faRightFromBracket} className="iconosVendedor"/></NavLink>
                    </div>
                        
                </nav>
            </header>


        </div>
    )
}

export default NavVendedor