import React, { useState, useEffect } from "react"
import NavVendedor from '../../componentes/navegacioVendedor'
import MenuLateral from '../../componentes/sidebar'
import '../../estilos/recetasVendedor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
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

  
  
    
const RecetasVendedor = () => {
    const [dataRecetas, setDataRecetas] = useState([])
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState('')
    const [selectedProducto, setSelectedProducto] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false) 

    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const abrirModal = () => {
        setShowModal(true) 
    }
    const cerrarModal = () => {
        setShowModal(false) 
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

const handleEditarMisProductos = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:5000/actualizar_receta', {
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
            setShowEditarModal(false)
            alert('productos actualizada correctamente')
        } else {
            console.error("Error al actualizar la prodcuto")
        }
    } catch (error) {
        console.error("Error al hacer la petición:", error)
    }
}


// const handleEditar = (Producto) => {
//     setSelectedProducto(Producto)
//     setEditMode(true)
//     setShowEditarModal(true)
// }
// const handleUpdateProdcuto = (e) => {
//     e.preventDefault()
//     const updateSemillas = dataProductos.map((prodcuto) =>
//         prodcuto.id === selectedProducto.id ? selectedProducto : prodcuto
//     )
//     setDataProductos(updateSemillas)
//     setShowEditarModal(false)
// }

const handleNuevoProducto = () => {
    setShowNuevoModal(true) 
}
const handleCloseNuevoModal = () => {
    setShowNuevoModal(false) 
}

const crearReceta = async (e) => {
    e.preventDefault()
    const data = { nombre, descripcion, imagen }
    try {
        const response = await fetch('http://localhost:5000/registro_recetas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()

        if (response.status === 200) {
            alert('receta Registrado correctamente')
            navigate('/recetasVendedor')
        } else {
            console.error('Error:', result.message || 'Error al registrarse')
        }
    } catch (error) {
        console.error('Error de red. Intenta nuevamente más tarde.', error)
    }
}


    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateral />
            <h1 className="tituloRecetasVendedor">Recetas vendedor</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar producto..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    className="input-search"
                />
            </div>            <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoProducto} 
            >                
                Registrar Receta
            </button>

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



{/* Modal para "Editar" */}
<Modal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Informacion"
          >
            Vendedor:
            informcion de contacto: 
</Modal>

                   {/* Modal para "Nuevo producto" */}
            {showNuevoModal && (
                <div className="modal-overlay" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar nueva receta</h2>
                        <form className="formularioEditarRecetasAdmin" onSubmit={crearReceta}>
                            <input 
                                type="text"
                                placeholder="Ingresa el nombre de la receta"
                                name="nombre"
                                value={nombre}
                                className="inputProductoEditarAdmin"
                                onChange={(e) => setNombre(e.target.value)}
                                /><br/>
                            <input 
                                type="text"
                                placeholder="Ingresa la descripcion de la receta"
                                name="descripcion"
                                value={descripcion}
                                className="inputProductoEditarAdmin"
                                onChange={(e) => setDescripcion(e.target.value)}
                                /><br/>
                            <input 
                                type="file"
                                className="inputRecetaEditarAdmin" 
                                placeholder="Adjuntar foto" 
                                value={imagen}
                                name="imagen"
                                onChange={(e) => setImagen(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Registrar receta</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    </div>

)



}

export default RecetasVendedor