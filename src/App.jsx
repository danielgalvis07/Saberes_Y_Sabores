import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Principio from './rutas/inicioPagina'
import InicioSesion from './rutas/inicioSesion'
import Registro from './rutas/registro'
import TiendaPrincipio from './rutas/tiendaPrincipio'
import RecetasAdmin from './rutas/admin/recetasAdmin'
import UsuariosAdmin from './rutas/admin/usuariosAdmin'
import PrincipioAdmin from './rutas/admin/inicioAdmin'
import ProductosAdmin from './rutas/admin/productosAdmin'
import  PrincipioVendedor from './rutas/vendedor/inicioVendedor'
import  MisSemillas from './rutas/vendedor/misSemillas'
import  RecetasVendedor from './rutas/vendedor/recetasVendedor'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Principio />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/tiendaPrincipio" element={<TiendaPrincipio />} />
        <Route path="/recetasAdmin" element={<RecetasAdmin />} />
        <Route path="/usuariosAdmin" element={<UsuariosAdmin />} />
        <Route path="/productosAdmin" element={<ProductosAdmin />} />
        <Route path="/principioAdmin" element={<PrincipioAdmin />} />
        <Route path="/principioVendedor" element={<PrincipioVendedor />} />
        <Route path="/misSemillasVendedor" element={<MisSemillas />} />
        <Route path="/recetasVendedor" element={<RecetasVendedor />} />

      </Routes>
    </Router>
      )
  }

export default App
