import { ArrowRight, Shield, Users, MapPin, Star, CheckCircle, Home, Building, Hotel, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import CategoryCard from '@/components/CategoryCard';
import FloatingActionButton from '@/components/FloatingActionButton';

// Mock data for categories
const categories = [
  {
    title: 'Apartments',
    description: 'Modern apartments in prime locations',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
    count: 1200
  },
  {
    title: 'Houses',
    description: 'Spacious houses for families',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
    count: 800
  },
  {
    title: 'Student Housing',
    description: 'Affordable options near universities',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop',
    count: 600
  },
  {
    title: 'Luxury Stays',
    description: 'Premium properties with top amenities',
    icon: Hotel,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
    count: 300
  }
];

// Mock data for properties
const mockProperties = [
  {
    id: '1',
    title: 'Modern 2BHK Apartment in Gulshan',
    location: 'Gulshan 2, Dhaka',
    price: 35000,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'],
    rating: 4.8,
    reviews: 24,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', 'Furnished', 'AC', 'Parking']
  },
  {
    id: '2',
    title: 'Cozy Studio Near NSU Campus',
    location: 'Bashundhara, Dhaka',
    price: 18000,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviews: 18,
    type: 'Studio',
    verified: true,
    features: ['1 Room', 'Furnished', 'WiFi', 'Security']
  },
  {
    id: '3',
    title: 'Spacious Family House in Dhanmondi',
    location: 'Dhanmondi 15, Dhaka',
    price: 55000,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
    rating: 4.9,
    reviews: 32,
    type: 'House',
    verified: true,
    features: ['3 Bedrooms', 'Garden', 'Parking', 'Rooftop']
  },
  {
    id: '4',
    title: 'Shared Room for Students',
    location: 'Uttara Sector 4, Dhaka',
    price: 8000,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviews: 15,
    type: 'Shared',
    verified: false,
    features: ['Shared Kitchen', 'WiFi', 'Study Area', 'AC']
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Find Your Perfect{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-black">
                    Haven
                  </span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover unique places to stay with trusted hosts around Bangladesh
              </p>
            </div>

            {/* Trust Stats */}
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Verified Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100K+</div>
                <div className="text-sm text-muted-foreground">Happy Guests</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect type of accommodation for your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <div key={category.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured stays
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked properties with exceptional ratings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProperties.slice(0, 8).map((property, index) => (
              <div key={property.id} className="cursor-pointer animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="font-medium px-8 hover:bg-muted hover:scale-105 transition-all shadow-medium" asChild>
              <a href="/search">
                Show all stays
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How HavenHub Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent rental process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-6 group animate-scale-in">
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-strong group-hover:shadow-medium transition-all duration-300 animate-float">
                <MapPin className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Search & Filter</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find properties that match your preferences with our advanced search and filtering options powered by smart algorithms.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 group animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-strong group-hover:shadow-medium transition-all duration-300 animate-float" style={{ animationDelay: '2s' }}>
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Verify & Connect</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with verified landlords and view authentic property details with confidence through our secure platform.
                </p>
              </div>
            </div>

            <div className="text-center space-y-6 group animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-strong group-hover:shadow-medium transition-all duration-300 animate-float" style={{ animationDelay: '4s' }}>
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Move In</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete secure digital agreements and move into your new home with complete peace of mind and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="gradient-card rounded-3xl p-12 shadow-medium">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-lg text-muted-foreground">
                Join the growing HavenHub community
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">10,000+</div>
                <div className="text-muted-foreground">Properties Listed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">50,000+</div>
                <div className="text-muted-foreground">Happy Tenants</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">5,000+</div>
                <div className="text-muted-foreground">Verified Landlords</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">20+</div>
                <div className="text-muted-foreground">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gradient-to-t from-muted/40 to-background border-t">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-strong">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                HavenHub
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Your trusted rental marketplace for Bangladesh and beyond
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Careers</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Press</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Blog</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Forum</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Events</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Safety</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Terms</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Cookies</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">
              © 2024 HavenHub. All rights reserved. Made with ❤️ in Bangladesh
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default Index;
