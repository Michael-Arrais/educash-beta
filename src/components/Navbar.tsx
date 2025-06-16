
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import CashLogo from "./CashLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-2">
              <CashLogo className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">
              <span className="text-gray-800">Edu</span>
              <span className="text-blue-500">Cash</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"}>
                Início
              </Button>
            </Link>
            {user && (
              <>
                <Link to="/dashboard">
                  <Button variant={isActive("/dashboard") ? "default" : "ghost"}>
                    Dashboard
                  </Button>
                </Link>
                <Link to="/recursos">
                  <Button variant={isActive("/recursos") ? "default" : "ghost"}>
                    Recursos
                  </Button>
                </Link>
                <Link to="/educacao">
                  <Button variant={isActive("/educacao") ? "default" : "ghost"}>
                    Educação
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Auth buttons / User menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <Button variant="outline" onClick={handleSignOut}>
                Sair
              </Button>
            ) : (
              <Link to="/login">
                <Button>Entrar</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive("/") ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    Início
                  </Button>
                </Link>
                {user && (
                  <>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive("/dashboard") ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/recursos" onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive("/recursos") ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        Recursos
                      </Button>
                    </Link>
                    <Link to="/educacao" onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive("/educacao") ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        Educação
                      </Button>
                    </Link>
                  </>
                )}
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    Sair
                  </Button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                    <Button className="w-full">Entrar</Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
