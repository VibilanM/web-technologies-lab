import { Link } from "react-router-dom";

function Navbar({ cart }) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav>
      <Link to="/">Online Shopping</Link>

      <Link to="/cart">
        Items Added to Cart ({totalItems})
      </Link>
    </nav>
  );
}

export default Navbar;