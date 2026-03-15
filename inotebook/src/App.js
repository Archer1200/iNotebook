import "./App.css";
import Notestate from './context/Notestate'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {

  const [alert, setalert] = useState(null)

  const showAlert = (message, type) => {
    setalert({ msg: message, type: type })

    setTimeout(() => {
      setalert(null)
    }, 1500)
  }

  return (
    <>
      <Notestate>
        <Router>

          <Navbar  showAlert={showAlert} />
          <Alert alert={alert} />
          <div style={{height: "60px"}}></div>
          <div className="container">

            <Routes>
              <Route path="/Home" element={<Home showAlert={showAlert} />} />
              <Route path="/About" element={<About />} />
              <Route path="/Login" element={<Login showAlert={showAlert} />} />
              <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
            </Routes>

          </div>

        </Router>
      </Notestate>
    </>
  );
}

export default App;