import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Stores from "./pages/Stores.jsx";
import RateStore from "./pages/RateStore.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Stores />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/rate/:id" element={<RateStore />} />
      </Routes>
    </BrowserRouter>
  );
}
