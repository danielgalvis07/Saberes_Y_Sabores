import React, { useState, useEffect } from "react"
import NavVendedor from '../../componentes/navegacioVendedor'
import MenuLateralCliente from '../../componentes/sidebarCliente'
import '../../estilos/recetasVendedor.css'
import InputSearch from '../../componentes/buscador'

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-modal" onClick={onClose}>
            X
          </button>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    )
  }
  
    
const RecetasCliente = () => {
    const [dataRecetas, setDataRecetas] = useState([])

    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [showNuevoModal, setShowNuevoModal] = useState(false) 

    const abrirModal = () => {
        setShowNuevoModal(true) 
    }
    const cerrarModal = () => {
        setShowNuevoModal(false) 
    }

    useEffect(() => {
        fetch('http://localhost:5000/recetas')
            .then(response => response.json())
            .then(data => setDataRecetas(data))
            .catch(error => console.error('Error al obtener recetas:', error))
    },[])

    const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);
      const filtered = dataProductos.filter(producto => producto.nombre.toLowerCase().includes(value));
      setFilteredProductos(filtered);
  };

    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateralCliente />
            <h1 className="tituloRecetasVendedor">Recetas cliente</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar producto..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="input-search"
                />
            </div>
            <div className="crudVendedorSemillas">

            {dataRecetas.map((item) => (
                <div className="cardRecetasVendedor">

                        <tr key={item.id} className="">
                            <td>{item.Nombre}</td><br />
                            <td>{item.Descripcion}</td><br />
                            <button onClick={abrirModal} className="verMasVendedor">Ver más</button>
                        </tr>
                </div>
                    ))}



          <Modal 
          isOpen={showNuevoModal}
          onClose={() => setShowNuevoModal(false)}
          title="Informacion"
          >
            Vendedor:
            informcion de contacto: 
          </Modal>

        </div>
</div>

)


    
}

export default RecetasCliente