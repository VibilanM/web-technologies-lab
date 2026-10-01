import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
        />

        <h3>{product.title}</h3>

        <p>₹{product.price}</p>
      </Link>

      <button
        onClick={(event) => {
          event.stopPropagation();
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;