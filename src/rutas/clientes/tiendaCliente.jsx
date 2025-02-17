import React, { useState, useEffect } from "react"

import NavVendedor from '../../componentes/navegacioVendedor'
import MenuLateralCliente from '../../componentes/sidebarCliente'
import InputSearch from '../../componentes/buscador'

import '../../estilos/misSemillas.css'
    
const TiendaCliente = () => {
    const [dataProductos, setDataProductos] = useState([])
    const [nombre, setNombre] = useState('')
    const [imagen, setImagen] = useState('')
    const [selectedProducto, setSelectedProducto] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [showEditarModal, setShowEditarModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false) 

    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/semillas')
            .then(response => response.json())
            .then(data => setDataProductos(data))
            .catch(error => console.error('Error al obtener productos:', error))
    }, [])

const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = dataProductos.filter(producto => producto.nombre.toLowerCase().includes(value));
    setFilteredProductos(filtered);
};

const handleEditarMisProductos = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:5000/actualizar_producto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedProducto.id,
                nombre: selectedProducto.nombre,
                imagen: selectedProducto.imagen
            })
        })

        if (response.ok) {
            const updateSemillas = await response.json()
            setDataProductos(updateSemillas)
            setShowEditarModal(false) // 
            alert('productos actualizada correctamente')
        } else {
            console.error("Error al actualizar la prodcuto")
        }
    } catch (error) {
        console.error("Error al hacer la petición:", error)
    }
}


const handleEditar = (Producto) => {
    setSelectedProducto(Producto)
    setEditMode(true)
    setShowEditarModal(true)
}
const handleUpdateProdcuto = (e) => {
    e.preventDefault()
    const updateSemillas = dataProductos.map((prodcuto) =>
        prodcuto.id === selectedProducto.id ? selectedProducto : prodcuto
    )
    setDataProductos(updateSemillas)
    setShowEditarModal(false)
}

const handleNuevoProducto = () => {
    setShowNuevoModal(true) 
}
const handleCloseNuevoModal = () => {
    setShowNuevoModal(false) 
}



    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateralCliente />
            <h1>Tienda</h1>

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

                {dataProductos.map((item) => (
                    <div className="cardMisProductos" key={item.id}>
                    <td className="nombreMisProductos">{item.nombre}</td>

                    <td>
                            <img 
                                className="imagenMisProductos"
                                src={item.imagen} 
                                alt={item.nombre} 
                                />
                        </td>
                    <button className="verMasMisProductos" onClick={() => handleEditar(item)}>Ver más</button>
                    </div>
              ))}



              {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarProductosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Informacion</h2>
                        
                    </div>
                </div>
                )}

  </div>
        </div>

)



}

export default TiendaCliente