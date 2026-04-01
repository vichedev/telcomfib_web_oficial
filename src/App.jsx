import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Plans from "./components/Plans";
import Documents from "./components/Documents";
import Support from "./components/Support";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParametrosCalidad from "./components/ParametrosCalidad";
import TarifarioPromociones from "./components/TarifarioPromociones";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route
            path="/parametros-de-calidad"
            element={<ParametrosCalidad />}
          />
          <Route
            path="/tarifario-y-promociones"
            element={<TarifarioPromociones />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
