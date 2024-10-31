import React from "react";
import "../estilos/misProductos.css"; // Archivo CSS para los estilos

const productos = [
  { url: "https://link-to-image/remolacha.png", titulo: "REMOLACHA", inventario: 5 },
  { url: "https://link-to-image/cebolla.png", titulo: "CEBOLLA", inventario: 7 },
  { url: "https://link-to-image/alcachofa.png", titulo: "ALCACHOFA", inventario: 10 },
];

const MisProductos = () => {
  return (
    <div className="galeriaProductos">
      {productos.map((producto, index) => (
        <div key={index} className="productoCard">
          <div className="productoInfo">
            <span className="productoTitulo">{producto.titulo}</span>
            <span className="productoInventario">{producto.inventario}</span>
          </div>
          <img src={producto.url} alt={producto.titulo} className="productoImagen" />
          <button className="productoActualizarBtn">ACTUALIZAR</button>
        </div>
      ))}
    </div>
  );
};

export default MisProductos;
