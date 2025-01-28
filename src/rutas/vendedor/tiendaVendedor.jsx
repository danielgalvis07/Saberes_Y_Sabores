import React, { useState, useEffect } from "react";
import NavVendedor from '../../componentes/navegacioVendedor'
import MenuLateral from '../../componentes/sidebar'
import '../../estilos/recetasVendedor.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImages } from '@fortawesome/free-solid-svg-icons';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputSearch from '../../componentes/buscador';


const TiendaVendedor = () => {
    return (
        <div className="TiendaVendedor">
            <NavVendedor />
            <MenuLateral />
            <div className="contenedorTienda">
                <h1>TIENDA</h1>
            <InputSearch/>
            </div>

        </div>
    )
}

export default TiendaVendedor