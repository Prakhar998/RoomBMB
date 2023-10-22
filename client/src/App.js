import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "./pages/Homescreen";
import Bookingsscreen from "./pages/Bookingsscreen";
import Registerscreen from "./pages/Registerscreen";
import Loginscreen from "./pages/Loginscreen";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route
            path="/book/:roomid/:fromDate/:toDate"
            element={<Bookingsscreen />}
          />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
