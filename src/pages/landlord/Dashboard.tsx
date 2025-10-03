import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Home, Eye, MessageSquare, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalViews: number;
  totalInquiries: number;
}

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    checkUserTypeAndFetchStats();
  }, []);

  const checkUserTypeAndFetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please log in to access the dashboard');
        navigate('/auth');
        return;
      }

      // Check if user is a landlord
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();

      if (!profile || profile.user_type !== 'landlord') {
        toast.error('This area is for landlords only');
        navigate('/');
        return;
      }

      setUserType(profile.user_type);
      await fetchStats(user.id);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (userId: string) => {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('status, views_count, inquiries_count')
      .eq('landlord_id', userId);

    if (error) {
      console.error('Error fetching stats:', error);
      return;
    }

    if (properties) {
      setStats({
        totalListings: properties.length,
        activeListings: properties.filter(p => p.status === 'active').length,
        totalViews: properties.reduce((sum, p) => sum + (p.views_count || 0), 0),
        totalInquiries: properties.reduce((sum, p) => sum + (p.inquiries_count || 0), 0),
      });
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your properties and track performance</p>
          </div>
          <Button onClick={() => navigate('/landlord/create-listing')} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Listing
          </Button>
        </div>

        {/* Stats Grid */}
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
              <Home className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeListings}</div>
              <p className="text-xs text-muted-foreground">Currently visible</p>
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
              <p className="text-xs text-muted-foreground">Total inquiries</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/landlord/listings')}
              >
                <Home className="mr-2 h-4 w-4" />
                Manage Listings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/landlord/create-listing')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Listing
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Tips for landlords</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Add high-quality photos to attract more tenants</p>
              <p>• Set competitive pricing based on your location</p>
              <p>• Respond quickly to inquiries</p>
              <p>• Keep your listings up to date</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboard;
