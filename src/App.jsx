import { useState, useEffect } from 'react'

// Componentes propios
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'

/**
 * Componente principal de la aplicacion.
 * Aqui vive el estado general (productos y carrito) y desde aqui
 * se reparte hacia los componentes hijos mediante props.
 */
function App() {

  /* ---------- ESTADOS CON useState ---------- */

  // Lista completa de productos del catalogo (llega desde el JSON)
  const [productos, setProductos] = useState([])

  // Productos que el usuario agrego al carrito
  const [carrito, setCarrito] = useState([])

  // Texto escrito en el buscador
  const [busqueda, setBusqueda] = useState('')

  // Categoria seleccionada en el menu: todos, juegos, consolas o accesorios
  const [categoria, setCategoria] = useState('todos')

  // Indica si los datos todavia se estan cargando
  const [cargando, setCargando] = useState(true)

  // Guarda el mensaje de error si la carga falla
  const [error, setError] = useState(null)


  /* ---------- EFECTO CON useEffect ---------- */

  /**
   * Se ejecuta una sola vez al montar el componente (array de dependencias vacio).
   * Carga los productos desde un archivo JSON externo usando Fetch API
   * y actualiza el estado de la aplicacion con los datos obtenidos.
   */
  useEffect(() => {
    // import.meta.env.BASE_URL asegura que la ruta funcione tambien en GitHub Pages
    fetch(`${import.meta.env.BASE_URL}productos.json`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el archivo (codigo ' + respuesta.status + ')')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setProductos(datos.productos)   // Guardamos los productos en el estado
        setCargando(false)              // Ocultamos el mensaje de carga
      })
      .catch((err) => {
        setError(err.message)           // Guardamos el error para mostrarlo
        setCargando(false)
      })
  }, [])


  /* ---------- FUNCIONES DEL CARRITO ---------- */

  /**
   * Agrega un producto al carrito. Si ya existe, aumenta su cantidad.
   * @param {Object} producto - producto seleccionado
   */
  function agregarAlCarrito(producto) {
    // Buscamos si el producto ya estaba en el carrito
    const existe = carrito.find((item) => item.id === producto.id)

    if (existe) {
      // Creamos un array nuevo con la cantidad actualizada (no se modifica el original)
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      )
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  /**
   * Elimina un producto del carrito segun su id.
   * @param {number} id - identificador del producto
   */
  function eliminarDelCarrito(id) {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  /**
   * Vacia por completo el carrito.
   */
  function vaciarCarrito() {
    setCarrito([])
  }


  /* ---------- FILTRADO DEL CATALOGO ---------- */

  /**
   * Devuelve los productos que cumplen con la categoria y la busqueda activas.
   * Se calcula en cada render, por lo que siempre esta actualizado.
   */
  const productosFiltrados = productos
    .filter((producto) => categoria === 'todos' || producto.categoria === categoria)
    .filter((producto) => {
      const texto = busqueda.toLowerCase().trim()
      return (
        producto.nombre.toLowerCase().includes(texto) ||
        producto.plataforma.toLowerCase().includes(texto)
      )
    })


  /* ---------- INTERFAZ ---------- */

  return (
    <>
      <Navbar
        categoria={categoria}
        onCambiarCategoria={setCategoria}
        busqueda={busqueda}
        onBuscar={setBusqueda}
        totalCarrito={carrito.reduce((suma, item) => suma + item.cantidad, 0)}
      />

      <main className="container my-4">
        <div className="row">

          <section className="col-lg-8">
            <h2 className="h5 titulo-seccion mb-3">Catalogo de productos</h2>

            {/* RENDERIZADO CONDICIONAL:
                mostramos el spinner, el error o la lista segun el estado */}
            {cargando && (
              <div className="text-center py-5">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Cargando</span>
                </div>
                <p className="texto-suave mt-3">Cargando productos...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                <strong>No pudimos cargar los productos.</strong>
                <br />
                Revisa tu conexion o intenta nuevamente mas tarde.
                <br />
                <small>Detalle tecnico: {error}</small>
              </div>
            )}

            {!cargando && !error && (
              <ProductList
                productos={productosFiltrados}
                carrito={carrito}
                onAgregar={agregarAlCarrito}
              />
            )}
          </section>

          <aside className="col-lg-4 mt-4 mt-lg-0">
            <ShoppingCart
              carrito={carrito}
              onEliminar={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          </aside>

        </div>
      </main>

      <footer className="bg-morado text-white pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h3 className="h6 text-cian">GameZone</h3>
              <p className="mb-0">
                Tienda de videojuegos, consolas y accesorios con despacho a todo Chile.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h3 className="h6 text-cian">Contacto</h3>
              <p className="mb-0">
                Av. Principal 123, Santiago<br />
                +56 9 1234 5678<br />
                contacto@gamezone.cl
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h3 className="h6 text-cian">Siguenos</h3>
              <ul className="list-unstyled mb-0">
                <li><a className="link-cian" href="#">Facebook</a></li>
                <li><a className="link-cian" href="#">Instagram</a></li>
                <li><a className="link-cian" href="#">YouTube</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center border-top border-info py-3 mb-0 small">
            &copy; 2026 GameZone - Tienda de Videojuegos
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
