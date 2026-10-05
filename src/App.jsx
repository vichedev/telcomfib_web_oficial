import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Plans from "./components/Plans";
import Catalogo from "./components/Catalogo";
import Documents from "./components/Documents";
import Support from "./components/Support";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParametrosCalidad from "./components/Parametroscalidad";
import ConsumoInternacional from "./components/ConsumoInternacional";
import TarifarioPromociones from "./components/Tarifariopromociones";
import ScrollToTop from "./components/ScrollToTop";
import PoliticaCookies from "./components/PoliticaCookies";
import CookieConsent from "./components/CookieConsent";

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
                <Catalogo />
                <Support />
                <Contact />
              </>
            }
          />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/documentos" element={<Documents />} />
          <Route path="/contacto" element={<Contact />} />
          <Route
            path="/parametros-de-calidad"
            element={<ParametrosCalidad />}
          />
          <Route
            path="/consumo-internacional"
            element={<ConsumoInternacional />}
          />
          <Route
            path="/tarifario-y-promociones"
            element={<TarifarioPromociones />}
          />
          <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
