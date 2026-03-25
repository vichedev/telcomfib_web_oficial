import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Plans from './components/Plans';     // <--- Nuevo
import About from './components/About';
import Support from './components/Support'; // <--- Nuevo
import Documents from './components/Documents';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans antialiased transition-colors duration-500">
      <Navbar />
      <main>
        <Hero />
        <Plans />
        <About />
        <Support />
        <Documents />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;