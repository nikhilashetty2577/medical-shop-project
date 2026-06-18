import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Orders() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedMedicine = params.get("medicine") || "";
  const selectedAmount = params.get("amount") || "₹0";

  const cleanAmount = selectedAmount.toString().replace("₹", "");

  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    phone: "",
    location: "",
    address: "",
    medicineName: selectedMedicine,
    amount: cleanAmount,
    status: "Pending"
  });

  const getOrders = () => {
    fetch("https://medical-shop-project.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const addOrder = () => {
    if (
      newOrder.customerName === "" ||
      newOrder.phone === "" ||
      newOrder.location === "" ||
      newOrder.address === "" ||
      newOrder.medicineName === "" ||
      newOrder.amount === ""
    ) {
      alert("Please fill all order details");
      return;
    }

    const orderData = {
      ...newOrder,
      quantity: "Selected in Cart"
    };

    fetch("https://medical-shop-project.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    })
      .then((res) => res.json())
      .then(() => {
        const orderId = Date.now();
        const ownerNumber = "919985262604";

        const message =
`🏥 SAI MAHALAKSHMI MEDICALS

🧾 ORDER RECEIPT

Order ID: ${orderId}

👤 Customer Details
Name: ${newOrder.customerName}
Phone: ${newOrder.phone}

📍 Delivery Address
Location: ${newOrder.location}
Address: ${newOrder.address}

💊 Medicine Details
${newOrder.medicineName}

💰 Total Amount: ₹${newOrder.amount}

📦 Status: Pending

Thank You for Ordering
Sai Mahalakshmi Medicals`;

        window.open(
          `https://api.whatsapp.com/send?phone=${ownerNumber}&text=${encodeURIComponent(message)}`,
          "_blank"
        );

        alert("Order placed successfully");
        localStorage.removeItem("cart");
        window.location.href = "/orders";
      });
  };

  const updateStatus = (id, status) => {
    fetch(`https://medical-shop-project.onrender.com/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    })
      .then((res) => res.json())
      .then(() => getOrders());
  };

  const deleteOrder = (id) => {
    fetch(`https://medical-shop-project.onrender.com/orders/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => getOrders());
  };

  return (
    <div className="orders-page">
      <h1>Orders & Deliveries</h1>

      {selectedMedicine ? (
        <div className="order-form">
          <h2>Place Order</h2>

          <input
            type="text"
            placeholder="Customer Name"
            value={newOrder.customerName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={newOrder.phone}
            onChange={(e) =>
              setNewOrder({ ...newOrder, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Location / City"
            value={newOrder.location}
            onChange={(e) =>
              setNewOrder({ ...newOrder, location: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Full Address"
            value={newOrder.address}
            onChange={(e) =>
              setNewOrder({ ...newOrder, address: e.target.value })
            }
          />

          <textarea
            placeholder="Selected Medicines"
            value={newOrder.medicineName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, medicineName: e.target.value })
            }
            rows="4"
            readOnly
          />

          <h3 style={{ color: "green" }}>
            Total Amount: ₹{newOrder.amount}
          </h3>

          <button onClick={addOrder}>
            Place Order
          </button>
        </div>
      ) : (
        <div className="orders-table-box">
          <h2>Order List</h2>

          {orders.length === 0 ? (
            <p>No orders added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Address</th>
                  <th>Medicines</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customerName}</td>
                    <td>{order.phone}</td>
                    <td>{order.location}</td>
                    <td>{order.address}</td>
                    <td>{order.medicineName}</td>
                    <td>₹{order.amount}</td>
                    <td>{order.status}</td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Packed</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;