
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import AIChat from "./AIChat";
import SabiaLogo from "./SabiaLogo";

const FloatingAIButtonCustom = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 overflow-hidden">
          <div className="bg-primary p-3 flex justify-between items-center text-white">
            <div className="flex items-center">
              <SabiaLogo className="h-5 w-5 mr-2" />
              <h3 className="font-semibold">Assistente $aBIA</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-white hover:text-white hover:bg-primary-600">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="h-[400px]">
            <AIChat />
          </div>
        </div>
      ) : (
        <Button 
          onClick={toggleChat} 
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center relative"
        >
          <SabiaLogo className="h-6 w-6" />
          <span className="sr-only">Fale com a BIA</span>
          <span className="absolute -top-1 -right-1 text-xs bg-white text-primary px-2 py-0.5 rounded-full font-medium">Fale com o $aBIA</span>
        </Button>
      )}
    </div>
  );
};

export default FloatingAIButtonCustom;
