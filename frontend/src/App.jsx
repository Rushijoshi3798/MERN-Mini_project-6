import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import GetUser from "./components/GetUser";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AddUser />}></Route>
        <Route path="/users" element={<GetUser />}></Route>
      </Routes>
    </div>
  );
}

export default App;
