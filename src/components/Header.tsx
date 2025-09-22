import { Building2, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">HavenHub</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
            Places to stay
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Experiences
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Online Experiences
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="font-medium">
            Become a Host
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <User className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden rounded-full">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;