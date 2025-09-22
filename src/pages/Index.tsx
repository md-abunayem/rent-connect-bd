import { ArrowRight, Shield, Users, MapPin, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';

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

      {/* Featured Properties */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay anywhere
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore different types of stays for your next trip
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProperties.slice(0, 8).map((property) => (
              <div key={property.id} className="cursor-pointer">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="font-medium px-8 hover:bg-muted transition-all" asChild>
              <a href="/search">
                Show all stays
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How HavenHub Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent rental process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Search & Filter</h3>
              <p className="text-muted-foreground">
                Find properties that match your preferences with our advanced search and filtering options.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Verify & Connect</h3>
              <p className="text-muted-foreground">
                Connect with verified landlords and view authentic property details with confidence.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Move In</h3>
              <p className="text-muted-foreground">
                Complete secure digital agreements and move into your new home with peace of mind.
              </p>
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
      <footer className="py-12 px-4 bg-muted/30 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HavenHub</span>
          </div>
          <p className="text-muted-foreground mb-8">
            Your trusted rental marketplace for Bangladesh and beyond
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About Us</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
            © 2024 HavenHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
