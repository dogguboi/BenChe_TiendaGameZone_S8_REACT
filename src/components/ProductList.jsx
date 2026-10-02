import ProductCard from './ProductCard.jsx'

/**
 * Muestra la grilla de productos del catalogo.
 *
 * Props que recibe:
 * @param {Array} productos - productos a mostrar (ya filtrados)
 * @param {Array} carrito - productos que estan en el carrito
 * @param {Function} onAgregar - funcion para agregar un producto al carrito
 */
function ProductList({ productos, carrito, onAgregar }) {

  // RENDERIZADO CONDICIONAL: si la busqueda no encuentra nada mostramos un aviso
  if (productos.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        No se encontraron productos con esos criterios de busqueda.
      </div>
    )
  }

  return (
    <>
      <p className="texto-suave mb-3">{productos.length} productos disponibles</p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
        {/* Recorremos el array y creamos una tarjeta por producto.
            La prop key ayuda a React a identificar cada elemento de la lista. */}
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            // Revisamos si este producto ya esta en el carrito
            enCarrito={carrito.some((item) => item.id === producto.id)}
            onAgregar={onAgregar}
          />
        ))}
      </div>
    </>
  )
}

export default ProductList
