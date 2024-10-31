import React from "react";
import '../estilos/inicioPagina.css';
import Nav from '../componentes/navegacion'

const PrincipioAdmin = () => {
  return (



    <div className="principioAdmin">
      <Nav/>
      <div className="imagenInicio">
        <img
          src="https://estaticos.elcolombiano.com/documents/10157/0/652x366/14c0/580d365/none/11101/GPFF/image_content_33913827_20190725183631.jpg"
          alt="Mi imagen" className="imagenSuperior"
        />
        </div>
        <h1 className="tituloPrincipalInicio">SABERES</h1>
        <h1 className="tituloPrincipalInicio">Y SABORES</h1>
        <div className="primerTexto">



        </div>
    </div>

  );
};

export default PrincipioAdmin;