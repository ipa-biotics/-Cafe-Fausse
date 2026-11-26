import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      <Newsletter />
      <Footer />

    </BrowserRouter>
  );
}

export default App;
