import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, signInWithGoogle } from "../services/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const { data, error } = await login(email, password);
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (data?.user) {
      navigate("/customize");
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setErrorMessage("Google Sign-In failed. Please try again.");
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
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#2A2525",
          padding: "40px",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <h1 style={{ fontFamily: "serif", fontSize: "28px", margin: "0" }}>
            Welcome Back
          </h1>
          <p style={{ color: "#B8A9A9", fontSize: "14px", marginTop: "6px" }}>
            Log in to craft & save your custom bouquets ✨
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              background: "rgba(217, 140, 149, 0.15)",
              border: "1px solid #D98C95",
              color: "#D98C95",
              padding: "10px 14px",
              borderRadius: "12px",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Google Authentication Action */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          style={{
            padding: "12px",
            borderRadius: "14px",
            border: "1px solid #443c3c",
            background: "#ffffff",
            color: "#1E1B1B",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            margin: "4px 0",
            color: "#6B6060",
            fontSize: "12px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#3D3535" }}></div>
          <span style={{ padding: "0 10px", textTransform: "uppercase" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#3D3535" }}></div>
        </div>

        {/* Traditional Email / Password Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "13px 16px",
              borderRadius: "12px",
              border: "1px solid #3D3535",
              background: "#1E1B1B",
              color: "#F7F3F0",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "13px 16px",
              borderRadius: "12px",
              border: "1px solid #3D3535",
              background: "#1E1B1B",
              color: "#F7F3F0",
              fontSize: "14px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "6px",
              padding: "13px",
              borderRadius: "999px",
              border: "none",
              background: "#D98C95",
              color: "#1E1B1B",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "15px",
              transition: "transform 0.15s ease",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#8E8080", marginTop: "4px" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#D98C95", textDecoration: "none", fontWeight: "600" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;