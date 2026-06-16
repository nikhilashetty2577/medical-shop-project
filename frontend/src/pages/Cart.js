import { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const getRateNumber = (rate) => Number(rate.toString().replace("₹", ""));

  const updateItem = (index, field, value) => {
    const updatedCart = [...cartItems];

    updatedCart[index] = {
      ...updatedCart[index],
      [field]: value
    };

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const itemTotal = (item) => {
    const rate = getRateNumber(item.rate);
    const quantity = Number(item.quantity || 1);
    const unit = item.unit || "Tablets";

    if (unit === "Sheets") {
      return rate * quantity * 10;
    }

    return rate * quantity;
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + itemTotal(item),
    0
  );

  const placeOrder = () => {
    const medicineNames = cartItems
      .map((item) => `${item.name} - ${item.quantity || 1} ${item.unit || "Tablets"}`)
      .join(", ");

    window.location.href =
      `/orders?medicine=${medicineNames}&amount=₹${totalAmount}`;
  };

  return (
    <div className="cart-page">
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">No medicines added to cart.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item, index) => (
              <div className="cart-card" key={index}>
                <h2>{item.name}</h2>
                <p><b>Rate per Tablet:</b> {item.rate}</p>

                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity || ""}
                  onChange={(e) =>
                    updateItem(index, "quantity", e.target.value)
                  }
                />

                <label>Select Type</label>
                <select
                  value={item.unit || "Tablets"}
                  onChange={(e) =>
                    updateItem(index, "unit", e.target.value)
                  }
                >
                  <option value="Tablets">Tablets</option>
                  <option value="Sheets">Sheets</option>
                </select>

                <p className="cart-total">
                  Total: ₹{itemTotal(item)}
                </p>

                <button
                  className="remove-cart-btn"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total Amount: ₹{totalAmount}</h2>

            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;