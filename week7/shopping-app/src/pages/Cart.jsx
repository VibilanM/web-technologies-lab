import { Link } from "react-router-dom";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity
}) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <main>
      <Link to="/">
        <button>Back to Home</button>
      </Link>

      <h1>Shopping Cart</h1>

      <h2>Total Items: {totalItems}</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.title}
              />

              <div>
                <h3>{item.title}</h3>

                <p>
                  Price: ₹{item.price}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h2>
            Total Price: ₹{totalPrice.toFixed(2)}
          </h2>
        </>
      )}
    </main>
  );
}

export default Cart;