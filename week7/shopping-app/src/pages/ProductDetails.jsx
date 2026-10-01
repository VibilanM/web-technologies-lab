import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <main className="details">
      <Link to="/">
        <button>Back to Home</button>
      </Link>

      <img
        src={product.image}
        alt={product.title}
      />

      <h1>{product.title}</h1>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>{product.description}</p>

      {product.rating && (
        <p>
          <strong>Rating:</strong>{" "}
          {product.rating.rate} / 5
        </p>
      )}
    </main>
  );
}

export default ProductDetails;