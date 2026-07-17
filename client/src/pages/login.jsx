import { useState } from "react";
import { login } from "../services/auth";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const { data, error } = await login(email, password);

    if (error) {
      alert(error.message);
    } else {
      console.log(data.user);
      alert("Login successful");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#1E1B1B",
        color: "#F7F3F0",
      }}
    >
      <div
        style={{
          background: "#2A2525",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            padding: "12px",
            borderRadius: "999px",
            border: "none",
            background: "#D98C95",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;