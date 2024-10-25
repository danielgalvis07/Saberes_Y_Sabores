import React, { useState } from 'react';
import '../estilos/galeria.css'


const Galeria = ({ imagenes }) => {
  // Estado para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(null);

  // Función para abrir el modal con la imagen seleccionada
  const abrirModal = (imagen) => {
    setImagenActiva(imagen);
    setModalVisible(true);
  }; 

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
    setImagenActiva(null);
  };

  return (
    <div className="galeria">
      {imagenes.map((imagen, indice) => (
        <div key={indice} className="imagenGaleria">
          <p className='tituloImagenesGaleria'>{imagen.titulo}</p>
          <img src={imagen.url} alt={imagen.titulo} />
          <div className="descripcion">
            <button className="verMas" onClick={() => abrirModal(imagen)}>
              VER MÁS
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>
              &times;
            </span>
            <h2>{imagenActiva.titulo}</h2>
            <p>{imagenActiva.descripcion}</p>
            p
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
