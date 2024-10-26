import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacion.css';
import logo from '../imagenes/logo.png';

const user = {
    role: 'nulo' 
};

const Nav = () => {
    const location = useLocation();

    return (
        <div className="header">
            <header>
                <nav className="headerInicio">
                    <ul className="ulNavegacion">
                        <NavLink to="/">
                            <img src={logo} alt="Logo" className="imagenHeader" />
                        </NavLink>
                        <NavLink className='link' to='/inicioSesion'>Inicio</NavLink>
                        <NavLink className='link' to='/registro'>Registro</NavLink>
                        <NavLink className='link' to="/tiendaPrincipio">Tienda</NavLink>
                        <NavLink className='link' to="/nosotros">Nosotros</NavLink>

                        {/* Conditionally render links based on user role */}
                        {user.role === 'admin' && (
                            <>
                                <NavLink className='link' to="/admin/">Recetas</NavLink>
                                <NavLink className='link' to="/admin/">Productoss</NavLink>
                                <NavLink className='link' to="/admin/">Usuarios</NavLink>
                            </>
                        )}
                        {user.role === 'cliente' && (
                            <>
                                <NavLink className='link' to="/cliente/">Repositorios</NavLink>
                                <NavLink className='link' to="/cliente/">Recetas</NavLink>
                                <NavLink className='link' to="/cliente/">Tienda</NavLink>
                            </>
                        )}
                        {user.role === 'vendedor' && (
                            <>
                                <NavLink className='link' to="/vendedor/">Mis productos</NavLink>
                                <NavLink className='link' to="/vendedor/">Ordenes</NavLink>
                                <NavLink className='link' to="/vendedor/">Pilotos</NavLink>
                                <NavLink className='link' to="/vendedor/">Tienda</NavLink>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Nav;