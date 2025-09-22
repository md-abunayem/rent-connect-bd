import { Building2, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-medium hover:shadow-strong transition-all">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            HavenHub
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-primary transition-all font-medium px-4 py-2 rounded-full hover:bg-primary/5">
            Places to stay
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full hover:bg-muted/50">
            Experiences
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-all px-4 py-2 rounded-full hover:bg-muted/50">
            Online Experiences
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="font-medium px-4 py-2 rounded-full hover:bg-muted/50 transition-all">
            Become a Host
          </Button>
          <div className="w-px h-6 bg-border mx-2"></div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-12 h-12 border-2 border-muted hover:border-primary hover:shadow-medium transition-all duration-200"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-primary/10 transition-all">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;