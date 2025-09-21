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
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Find Your Perfect{' '}
                <span className="relative inline-block">
                  <span className="gradient-hero bg-clip-text text-transparent font-extrabold">
                    Haven
                  </span>
                </span>{' '}
                in Bangladesh
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover verified rental properties with trusted landlords. From cozy rooms to spacious apartments, find your next home with confidence.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 py-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Verified Properties</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Trusted Landlords</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">50,000+ Happy Tenants</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground font-medium px-8 shadow-medium hover:shadow-strong transition-all">
                Find a Rental
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="font-medium px-8 hover:bg-primary/5 transition-all">
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked verified properties from trusted landlords across Bangladesh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="font-medium px-8 hover:bg-primary/5 transition-all" asChild>
              <a href="/search">
                View All Properties
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
