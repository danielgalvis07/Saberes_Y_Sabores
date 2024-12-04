import React from "react";
import '../../estilos/inicioAdmin.css';
import NavAdmin from '../../componentes/navegacionAdmin'


const PrincipioAdmin = () => {
  return (

    <div className="principioAdmin">
      <NavAdmin/>
      <div className="imagenInicioAdmin">
        <img
          src="https://www.compracampesino.com/images/noticias-2024/agosto/cultivos-resistentes-en-colombia.webp"
          alt="Mi imagen" className="imagenSuperiorAdmin"
        />
        </div>
        <h1 className="tituloPrincipalInicioAdmin">SABERES</h1>
        <h1 className="tituloPrincipalInicioAdmin">Y SABORES</h1>
        <div className="primerTexto">



        </div>
    </div>

  );
};

export default PrincipioAdmin;