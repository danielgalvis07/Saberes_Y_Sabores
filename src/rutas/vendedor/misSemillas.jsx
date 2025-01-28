import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import NavVendedor from "../../componentes/navegacioVendedor";
import MenuLateral from "../../componentes/sidebar";
import InputSearch from "../../componentes/buscador";

import "../../estilos/misSemillas.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

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
  );
};

const MisSemillas = () => {
  const [dataProductos, setDataProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showNuevoModal, setShowNuevoModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/semillas")
      .then((response) => response.json())
      .then((data) => setDataProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  // Editar Producto
  const handleEditarMisProductos = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", selectedProducto.id);
      formData.append("nombre", selectedProducto.nombre);
      if (imagen) {
        formData.append("imagen", imagen);
      }

      const response = await fetch("http://localhost:5000/actualizar_producto", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedProductos = await response.json();
        setDataProductos(updatedProductos);
        setShowEditarModal(false);
        alert("Producto actualizado correctamente");
      } else {
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al hacer la petición:", error);
    }
  };

  const handleEditar = (producto) => {
    setSelectedProducto(producto);
    setShowEditarModal(true);
  };

  // Crear Producto
  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("imagen", imagen);

      const response = await fetch("http://localhost:5000/registro_productos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const nuevoProducto = await response.json();
        setDataProductos((prev) => [...prev, nuevoProducto]);
        setShowNuevoModal(false);
        alert("Producto registrado correctamente");
      } else {
        console.error("Error al registrar el producto");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="MisProductos">
      <NavVendedor />
      <MenuLateral />
      <h1>MIS SEMILLAS</h1>
      <InputSearch />
      <button className="nuevaRecetaAdmin" onClick={() => setShowNuevoModal(true)}>
        Registrar semilla
      </button>

      <div className="crudVendedorSemillas">
        {dataProductos.map((item) => (
          <div className="cardMisProductos" key={item.id}>
            <td className="nombreMisProductos">{item.nombre}</td>
            <td className="inventarioMisProductos">7</td>
            <td>
              <img className="imagenMisProductos" src={item.imagen} alt={item.nombre} />
            </td>
            <button className="verMasMisProductos" onClick={() => handleEditar(item)}>
              Editar
            </button>
          </div>
        ))}
      </div>

      {/* Modal para Editar */}
      <Modal
        isOpen={showEditarModal}
        onClose={() => setShowEditarModal(false)}
        title="Editar Producto"
      >
        <form onSubmit={handleEditarMisProductos} className="formularioEditarProductosAdmin">
          <input
            className="inputProductoEditarAdmin"
            type="text"
            name="nombre"
            value={selectedProducto?.nombre || ""}
            onChange={(e) =>
              setSelectedProducto({ ...selectedProducto, nombre: e.target.value })
            }
          />
          <br />
          <input
            className="inputProductoEditarAdmin"
            type="file"
            name="imagen"
            onChange={(e) => setImagen(e.target.files[0])}
          />
          <FontAwesomeIcon icon={faImages} className="iconoFotoProductosAdmin" />
          <button type="submit" className="botonEditarProductosAdmin">
            Guardar Cambios
          </button>
        </form>
      </Modal>

      {/* Modal para Nuevo Producto */}
      <Modal
        isOpen={showNuevoModal}
        onClose={() => setShowNuevoModal(false)}
        title="Registrar Nuevo Producto"
      >
        <form onSubmit={crearProducto} className="formularioEditarRecetasAdmin">
          <input
            type="text"
            placeholder="Ingresa el nombre del producto"
            name="nombre"
            value={nombre}
            className="inputProductoEditarAdmin"
            onChange={(e) => setNombre(e.target.value)}
          />
          <br />
          <input
            type="file"
            className="inputRecetaEditarAdmin"
            placeholder="Adjuntar foto"
            onChange={(e) => setImagen(e.target.files[0])}
          />
          <FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin" />
          <button type="submit" className="botonEditarRecetasAdmin">
            Registrar Producto
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MisSemillas;
