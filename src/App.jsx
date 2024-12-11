import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./publicPages/login";
import Register from "./publicPages/register";
import Home from "./authPages/home";
import Profile from "./authPages/profile";
import Edit from "./authPages/edit";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal que direciona para Login */}
        <Route path="/" element={<Login />} />
        {/* Rota para Register */}
        <Route path="/register" element={<Register />} />
        {/* Rota para Home */}
        <Route path="/home" element={<Home />} />
        {/* Rota para Profile */}
        <Route path="/profile" element={<Profile />} />
        {/* Rota para Edit */}
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;