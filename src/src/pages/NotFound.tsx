
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">
            Oops! The page at <span className="font-mono text-primary">{location.pathname}</span> was not found
          </p>
          <p className="text-gray-500 mb-6">
            Please check the URL or navigate using the menu.
          </p>
          <div className="space-x-4">
            <Link to="/" className="px-6 py-2.5 transition-colors bg-primary text-white hover:bg-primary/90">
              Return Home
            </Link>
            <Link to="/products" className="text-blue-500 hover:text-blue-700 underline">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
