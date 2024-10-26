import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Principio from './rutas/inicioPagina'
import InicioSesion from './rutas/inicioSesion'
import Registro from './rutas/registro'
import TiendaPrincipio from './rutas/tiendaPrincipio'
import RecetasAdmin from './rutas/recetasAdmin'

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Principio />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/tiendaPrincipio" element={<TiendaPrincipio />} />
        <Route path="/recetasAdmin" element={<RecetasAdmin />} />

      </Routes>
    </Router>
      )
  }

export default App
