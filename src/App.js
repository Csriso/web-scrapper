import "./App.css";
import { Routes, Route } from "react-router";

// pages
import Home from './pages/Home';

import Error from './pages/Error';
import NotFound from './pages/NotFound';

// components
import Navbar from "./components/Navbar"
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Scrap from "./pages/Scrap";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/scrap" element={<Scrap />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
