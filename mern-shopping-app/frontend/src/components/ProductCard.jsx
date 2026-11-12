function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-header">
        <span className="product-id">ID: {product.productId}</span>
        <span className="product-category">{product.category}</span>
      </div>

      <h3 className="product-name">{product.productName}</h3>

      <p className="product-description">{product.description}</p>

      <div className="product-footer">
        <div className="product-price">₹{product.productPrice.toLocaleString()}</div>
        <div className="product-quantity">
          Qty: <strong>{product.quantity}</strong>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

