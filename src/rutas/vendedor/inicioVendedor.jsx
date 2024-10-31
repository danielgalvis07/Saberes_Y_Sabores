import React from "react";
import '../../estilos/inicioVendedor.css';
import NavVendedor from '../../componentes/navegacioVendedor'

const PrincipioVendedor = () => {
  return (
    

    <div className="principioVendedor">
      <NavVendedor/>
      <div className="imagenInicioVendedor">
        <img
          src="https://thefoodtech.com/wp-content/uploads/2024/01/produccion-de-alimentos-.jpg"
          alt="Mi imagen" className="imagenSuperiorVendedor"
        />
        </div>
        <h1 className="tituloPrincipalInicioVendedor">SABERES</h1>
        <h1 className="tituloPrincipalInicioVendedor">Y SABORES</h1>
        <div className="primerTexto">



        </div>
    </div>

  );
};

export default PrincipioVendedor;