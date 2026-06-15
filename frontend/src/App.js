import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail");

  const allowedEmails = [
    "nikhilashetty2577@gmail.com",
    "vuppala.pavan5@gmail.com"
  ];

  return (
    <BrowserRouter>
      {isLoggedIn && (
        <nav className="navbar">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
  <h2 className="logo">Medical Shop</h2>

  <button
    className="logout-btn"
    onClick={() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "/";
    }}
  >
    Logout
  </button>
</div>

          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/medicines">Medicines</Link></li>
            <li><Link to="/orders">Orders</Link></li>

            {allowedEmails.includes(userEmail) && (
              <li><Link to="/reports">Reports</Link></li>
            )}
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />

        <Route
          path="/medicines"
          element={isLoggedIn ? <Medicines /> : <Navigate to="/" />}
        />

        <Route
          path="/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/" />}
        />

        <Route
          path="/reports"
          element={
            isLoggedIn && allowedEmails.includes(userEmail)
              ? <Reports />
              : <Navigate to="/home" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;