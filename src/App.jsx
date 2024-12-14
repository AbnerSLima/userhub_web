import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./publicPages/login";
import Register from "./publicPages/register";
import Home from "./authPages/home";
import Create from "./authPages/create";
import Profile from "./authPages/profile";
import Edit from "./authPages/edit";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;