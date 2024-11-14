import React, { useState, useEffect } from "react";
import NavVendedor from '../../componentes/navegacioVendedor'
import MenuLateral from '../../componentes/sidebar'
// import GaleriaMisProductos from '../../componentes/galeria'


    
const MisProductos = () => {
    const [dataProductos, setDataProductos] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/semillas')
            .then(response => response.json())
            .then(data => setDataProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);
    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateral />
            <h1>MIS PRODUCTOS</h1>
            <div className="crudVendedorSemillas">

                {dataProductos.map((item) => (
                    <div className="cardMisProductos" key={item.id}>
                    <td className="nombreMisProductos">{item.nombre}</td>
                    <td className="inventarioMisProductos">7</td>
                    <td>
                            <img 
                                className="imagenMisProductos"
                                src={item.imagen} 
                                alt={item.nombre} 
                                />
                        </td>
                    <button className="verMasMisProductos">Ver más</button>
                    </div>
                ))}

  </div>
        </div>

)



}

export default MisProductos
