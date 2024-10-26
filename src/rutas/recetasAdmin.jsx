import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../estilos/recetasAdmin.css';
import MenuLateral from '../componentes/sidebar';
import Nav from '../componentes/navegacion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const initialDataRecetas = [
    { id: 1, nombre: 'sancocho', descripcion: 'caldo de papa, pollo y yuca', activo: true },
    { id: 2, nombre: 'arroz con pollo', descripcion: 'arroz con pollo y vegetales', activo: true },
    { id: 3, nombre: 'empanadas', descripcion: 'empanadas de carne y queso', activo: true }
];

// Componente ToggleSwitch
const ToggleSwitch = ({ isActive, onToggle }) => (
    <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="toggle-knob"></div>
    </div>
);

const RecetasAdmin = () => {
    const [dataRecetas, setDataRecetas] = useState(initialDataRecetas);

    const toggleActivo = (id) => {
        setDataRecetas((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };

    return (
        <div className="recetasAdmin">
            <Nav />
            <MenuLateral />
            <h1>Recetas</h1>
            <table className="crudRecetasAdmin">
                <thead>
                   <tr>
                        <td className="tituloCrudRecetas">Id</td>
                        <td className="tituloCrudRecetas">Nombre</td>
                        <td className="tituloCrudRecetas">Descripción</td>
                        <td className="tituloCrudRecetas"></td>
                        <td className="tituloCrudRecetas">Acciones</td>
                    </tr> 
                </thead>
                <tbody>
                    {dataRecetas.map((item) => (
                        <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td><button className="verMasRecetasAdmin">Ver más</button></td>
                            <td className="accionesRecetasAdmin">
                                <NavLink className='actulizarRecetas'>
                                    <FontAwesomeIcon icon={faPencil} style={{color: "#000000", }} /> 
                                </NavLink>
                                <ToggleSwitch 
                                    isActive={item.activo} 
                                    onToggle={() => toggleActivo(item.id)} 
                                />
                            </td>
                        </tr>   
                    ))}
                </tbody>
            </table> 
        </div>
    );
};

export default RecetasAdmin;
