import "./App.css";
import {Routes,Route} from "react-router-dom";
import Register from "./Components/Register";
import Mainpage from "./Components/Mainpage"

function App() {
  return (
    <div>
    <Routes>
    <Route path="/Register" element={<Register/>}/>
    <Route path="/" element={<Mainpage/>}/>
    </Routes>
    </div>)
}
export default App;
