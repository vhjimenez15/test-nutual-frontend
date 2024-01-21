import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { LoginPage } from "./components/loginPage";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
