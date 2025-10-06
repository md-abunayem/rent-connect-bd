import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { VerificationBadge } from './VerificationBadge';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-medium hover:shadow-strong transition-all">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            HavenHub
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user && profile?.user_type === 'landlord' && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium px-4 py-2 rounded-full hover:bg-muted/50 transition-all"
                onClick={() => navigate('/landlord/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium px-4 py-2 rounded-full hover:bg-muted/50 transition-all"
                onClick={() => navigate('/landlord/applications')}
              >
                Applications
              </Button>
              <div className="w-px h-6 bg-border mx-2"></div>
            </>
          )}
          {user && profile?.user_type === 'tenant' && (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="font-medium px-4 py-2 rounded-full hover:bg-muted/50 transition-all"
                onClick={() => navigate('/tenant/dashboard')}
              >
                My Dashboard
              </Button>
              <div className="w-px h-6 bg-border mx-2"></div>
            </>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="font-medium px-4 py-2 rounded-full hover:bg-muted/50 transition-all"
            onClick={() => navigate(user ? '/profile' : '/auth')}
          >
            {user ? 'My Account' : 'Become a Host'}
          </Button>
          <div className="w-px h-6 bg-border mx-2"></div>
          {user && profile && (
            <div className="mr-2">
              <VerificationBadge status={profile.verification_status} />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full w-12 h-12 border-2 border-muted hover:border-primary hover:shadow-medium transition-all duration-200"
            onClick={() => navigate(user ? '/profile' : '/auth')}
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
