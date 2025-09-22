import { Plus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Secondary buttons */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-background border-2 border-primary text-foreground shadow-strong hover:shadow-medium transition-all"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-strong hover:shadow-medium transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default FloatingActionButton;