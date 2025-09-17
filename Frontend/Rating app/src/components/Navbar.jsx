import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link to="/stores">Stores</Link>{" | "}
      {!token && <Link to="/signup">Signup</Link>}{" "}
      {!token && <Link to="/login">Login</Link>}{" "}
      {token && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
