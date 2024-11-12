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
            <table className="vendedorCrudSemillas">
                <thead>
                    <tr>
                        <td>
                            id
                        </td>
                        <td>
                            Nombre
                        </td>
                        <td>
                            Imagen
                        </td>   
                    </tr>
                </thead>
                <tbody>
                {dataProductos.map((item) => (
                    <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.imagen}</td>

                    </tr>
                ))}

                </tbody>
            </table>
        </div>

)



}

export default MisProductos
