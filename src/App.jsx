import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Plans from "./components/Plans";
import Documents from "./components/Documents";
import Support from "./components/Support";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Plans />
                <Support />
                <Contact />
              </>
            }
          />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/documentos" element={<Documents />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
