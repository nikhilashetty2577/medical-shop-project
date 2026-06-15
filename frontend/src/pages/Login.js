import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

  if(email !== "" && password !== "") {

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
window.location.href = "/home";

  } else {

    alert("Please enter email and password");

  }
};
  return (

    <div className="login-page">

      <div className="login-box">

        <h1>Medical Shop Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;