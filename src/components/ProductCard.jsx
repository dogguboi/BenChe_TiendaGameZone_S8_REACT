import { formatearPrecio } from '../utils/formato.js'

/**
 * Tarjeta individual de un producto.
 *
 * Props que recibe:
 * @param {Object} producto - datos del producto
 * @param {boolean} enCarrito - indica si el producto ya fue agregado
 * @param {Function} onAgregar - funcion para agregar al carrito
 */
function ProductCard({ producto, enCarrito, onAgregar }) {
  return (
    <div className="col">
      <div className="card h-100 tarjeta-producto esquinas-pixel">
        <img src={producto.imagen} className="card-img-top esquinas-pixel-arriba" alt={producto.nombre} />

        <div className="card-body d-flex flex-column esquinas-pixel-abajo">
          <h3 className="card-title h6">{producto.nombre}</h3>
          <p className="mb-2"><span className="plataforma">{producto.plataforma}</span></p>
          <p className="precio fw-bold mb-3 mt-1">{formatearPrecio(producto.precio)}</p>

          {/* RENDERIZADO CONDICIONAL:
              el boton cambia de texto y de color si el producto ya esta en el carrito */}
          <button
            className={enCarrito ? 'btn btn-en-carrito btn-sm mt-auto' : 'btn btn-rosado btn-sm mt-auto'}
            onClick={() => onAgregar(producto)}
          >
            {enCarrito ? 'En el carrito · Agregar otro' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
