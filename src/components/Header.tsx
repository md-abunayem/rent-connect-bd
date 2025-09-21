import { Building2, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">HavenHub</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Find Rentals
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            List Property
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" className="gradient-primary">
            List Your Property
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;