import "./App.css";
import Notestate from './context/Notestate'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Notestate>
      <Router>
        <Navbar />
        <div className="container">


        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>

        </div>
      </Router>
      </Notestate>
    </>
  );
}

export default App;
