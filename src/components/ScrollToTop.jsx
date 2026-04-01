import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mueve el scroll al inicio cada vez que la ruta cambia
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
