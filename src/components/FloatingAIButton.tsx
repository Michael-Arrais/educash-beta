
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AIChat from "@/components/AIChat"; // Changed from named import to default import
import { MessageCircle, X } from "lucide-react";

const FloatingAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <div className="bg-primary text-white text-sm px-3 py-1 rounded-full mb-2 shadow-md">
          Fale com o FI
        </div>
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-md w-full p-0">
          <SheetHeader className="border-b p-4 flex flex-row items-center justify-between">
            <SheetTitle className="text-left">Assistente FinAI</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>
          <div className="px-0 h-[calc(100vh-5rem)]">
            <AIChat />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FloatingAIButton;
