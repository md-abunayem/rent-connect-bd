import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Plus, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import { toast } from 'sonner';

export default function LandlordDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
  });
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    checkUserTypeAndFetchStats();
  }, []);

  const checkUserTypeAndFetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      // Check if user is landlord
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast.error('Failed to load profile');
        navigate('/');
        return;
      }

      if (profile.user_type !== 'landlord') {
        toast.error('Access denied. Landlord account required.');
        navigate('/');
        return;
      }

      setUserType(profile.user_type);

      // Fetch properties stats
      const { data: properties, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .eq('landlord_id', user.id);

      if (propertiesError) {
        console.error('Error fetching properties:', propertiesError);
        toast.error('Failed to load statistics');
      } else if (properties) {
        const totalViews = properties.reduce((sum, prop) => sum + (prop.views_count || 0), 0);
        const totalInquiries = properties.reduce((sum, prop) => sum + (prop.inquiries_count || 0), 0);
        
        setStats({
          totalListings: properties.length,
          activeListings: properties.filter(p => p.status === 'active').length,
          totalViews,
          totalInquiries,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Landlord Dashboard</h1>
          <Button onClick={() => navigate('/landlord/create-listing')} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Listing
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalListings}</div>
              <p className="text-xs text-muted-foreground">All your properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeListings}</div>
              <p className="text-xs text-muted-foreground">Currently available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">Property views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground">Messages received</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={() => navigate('/landlord/listings')} className="h-auto py-6">
              <div className="flex flex-col items-center gap-2">
                <Home className="h-6 w-6" />
                <span>Manage Listings</span>
              </div>
            </Button>
            <Button variant="outline" onClick={() => navigate('/landlord/create-listing')} className="h-auto py-6">
              <div className="flex flex-col items-center gap-2">
                <Plus className="h-6 w-6" />
                <span>Add New Property</span>
              </div>
            </Button>
            <Button variant="outline" onClick={() => navigate('/landlord/applications')} className="h-auto py-6">
              <div className="flex flex-col items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                <span>View Applications</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}