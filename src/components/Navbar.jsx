import { useState } from 'react'

/**
 * Barra de navegacion con categorias, buscador y contador del carrito.
 *
 * Props que recibe:
 * @param {string} categoria - categoria activa
 * @param {Function} onCambiarCategoria - avisa al padre que cambio la categoria
 * @param {Function} onBuscar - avisa al padre el texto buscado
 * @param {number} totalCarrito - cantidad de unidades en el carrito
 */
function Navbar({ categoria, onCambiarCategoria, onBuscar, totalCarrito }) {

  // Estado local del campo de texto (formulario controlado)
  const [texto, setTexto] = useState('')

  // Categorias simuladas del menu
  const categorias = [
    { valor: 'todos', nombre: 'Inicio' },
    { valor: 'juegos', nombre: 'Juegos' },
    { valor: 'consolas', nombre: 'Consolas' },
    { valor: 'accesorios', nombre: 'Accesorios' }
  ]

  /**
   * Se ejecuta al enviar el formulario de busqueda.
   * preventDefault evita que la pagina se recargue.
   */
  function manejarBusqueda(evento) {
    evento.preventDefault()
    onBuscar(texto)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-morado">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">Game<span>Zone</span></a>

        {/* Boton hamburguesa para pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menu de navegacion"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto">
            {categorias.map((item) => (
              <li className="nav-item" key={item.valor}>
                {/* RENDERIZADO CONDICIONAL: la categoria activa recibe una clase extra */}
                <button
                  type="button"
                  className={categoria === item.valor ? 'nav-link activo' : 'nav-link'}
                  onClick={() => onCambiarCategoria(item.valor)}
                >
                  {item.nombre}
                </button>
              </li>
            ))}
          </ul>

          {/* Formulario de busqueda */}
          <form className="d-flex me-3" onSubmit={manejarBusqueda} role="search">
            <label htmlFor="inputBusqueda" className="visually-hidden">Buscar producto</label>
            <input
              className="form-control me-2"
              type="search"
              id="inputBusqueda"
              placeholder="Buscar producto"
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
            />
            <button className="btn btn-rosado" type="submit">Buscar</button>
          </form>

          {/* Contador de productos del carrito */}
          <span className="contador-carrito text-white">
            Carrito <span className="badge bg-cian text-dark">{totalCarrito}</span>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
