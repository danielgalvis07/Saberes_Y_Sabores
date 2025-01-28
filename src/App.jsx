import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Principio from './rutas/inicioPagina'
import InicioSesion from './rutas/inicioSesion'
import Registro from './rutas/registro'
import RecetasAdmin from './rutas/admin/recetasAdmin'
import UsuariosAdmin from './rutas/admin/usuariosAdmin'
import ProductosAdmin from './rutas/admin/productosAdmin'
import  MisSemillas from './rutas/vendedor/misSemillas'
import  RecetasVendedor from './rutas/vendedor/recetasVendedor'
import  TiendaVendedor from './rutas/vendedor/tiendaVendedor'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Principio />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />

        {/* Administrador */}

        <Route path="/recetasAdmin" element={<RecetasAdmin />} />
        <Route path="/usuariosAdmin" element={<UsuariosAdmin />} />
        <Route path="/productosAdmin" element={<ProductosAdmin />} />

        {/* Vendedor */}

        <Route path="/misSemillasVendedor" element={<MisSemillas />} />
        <Route path="/recetasVendedor" element={<RecetasVendedor />} />
        <Route path="/tiendaVendedor" element={<TiendaVendedor />} />

        {/* Cliente */}

      </Routes>
    </Router>
      )
  }

export default App
