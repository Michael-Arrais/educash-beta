
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">Fi</span>
          </div>
          <span className="font-bold text-xl text-gray-800">Fin<span className="text-primary">AI</span></span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-700 hover:text-primary transition-colors">Início</a>
          <a href="/features" className="text-gray-700 hover:text-primary transition-colors">Recursos</a>
          <a href="/education" className="text-gray-700 hover:text-primary transition-colors">Educação</a>
          <a href="/dashboard" className="border border-primary text-primary hover:bg-primary-100 px-4 py-2 rounded">
            Dashboard
          </a>
          <a href="/login" className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded">
            Entrar
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-4 py-3 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <a href="/" className="text-gray-700 hover:text-primary py-2 transition-colors">Início</a>
            <a href="/features" className="text-gray-700 hover:text-primary py-2 transition-colors">Recursos</a>
            <a href="/education" className="text-gray-700 hover:text-primary py-2 transition-colors">Educação</a>
            <a href="/dashboard" className="text-gray-700 hover:text-primary py-2 transition-colors">Dashboard</a>
            <a href="/login" className="bg-primary hover:bg-primary-600 text-white py-2 px-4 rounded text-center">
              Entrar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
