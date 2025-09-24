import { ArrowRight, Shield, Users, MapPin, Star, CheckCircle, Home, Building, Hotel, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import CategoryCard from '@/components/CategoryCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import heroImage from '@/assets/hero-bg.jpg';

// Mock data for categories focused on Students and Industry
const categories = [
  {
    title: 'Student Dorms',
    description: 'Affordable shared dorms near universities',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop',
    count: 1200
  },
  {
    title: 'Industry Housing',
    description: 'Furnished apartments near industrial areas',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
    count: 800
  },
  {
    title: 'Shared Rooms',
    description: 'Budget-friendly shared accommodations',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
    count: 600
  },
  {
    title: 'Studio Apartments',
    description: 'Compact studios for students & professionals',
    icon: Hotel,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
    count: 300
  }
];

// Mock data for properties by sections
const popularInDhaka = [
  {
    id: '1',
    title: 'Place to stay in Gulshan',
    location: 'Gulshan 2, Dhaka',
    price: 35000,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'],
    rating: 4.94,
    reviews: 24,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', 'Furnished'],
    guestFavourite: true
  },
  {
    id: '2',
    title: 'Apartment in Dhanmondi',
    location: 'Dhanmondi 15, Dhaka',
    price: 57000,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
    rating: 4.87,
    reviews: 18,
    type: 'Apartment',
    verified: true,
    features: ['3 Bedrooms', 'Garden'],
    guestFavourite: true
  },
  {
    id: '3',
    title: 'Condo in Uttara',
    location: 'Uttara Sector 4, Dhaka',
    price: 65000,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
    rating: 4.83,
    reviews: 32,
    type: 'House',
    verified: true,
    features: ['4 Bedrooms', 'Parking'],
    guestFavourite: false
  },
  {
    id: '4',
    title: 'Apartment in Banani',
    location: 'Banani, Dhaka',
    price: 79000,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
    rating: 4.87,
    reviews: 15,
    type: 'Apartment',
    verified: false,
    features: ['2 Bedrooms', 'Modern'],
    guestFavourite: true
  },
  {
    id: '5',
    title: 'Place to stay in Bashundhara',
    location: 'Bashundhara R/A, Dhaka',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
    rating: 4.95,
    reviews: 28,
    type: 'Apartment',
    verified: true,
    features: ['3 Bedrooms', 'Pool'],
    guestFavourite: false
  },
  {
    id: '6',
    title: 'Room in Mirpur',
    location: 'Mirpur DOHS, Dhaka',
    price: 44000,
    images: ['https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=400&h=300&fit=crop'],
    rating: 4.88,
    reviews: 41,
    type: 'Room',
    verified: true,
    features: ['1 Room', 'AC'],
    guestFavourite: false
  },
  {
    id: '7',
    title: 'Condo in Wari',
    location: 'Wari, Dhaka',
    price: 76000,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'],
    rating: 4.93,
    reviews: 19,
    type: 'Condo',
    verified: true,
    features: ['2 Bedrooms', 'Modern'],
    guestFavourite: false
  }
];

const availableInChittagong = [
  {
    id: '8',
    title: 'Apartment in Chittagong',
    location: 'GEC Circle, Chittagong',
    price: 54000,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
    rating: 4.87,
    reviews: 22,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', 'Sea View'],
    guestFavourite: true
  },
  {
    id: '9',
    title: 'Apartment in Agrabad',
    location: 'Agrabad, Chittagong',
    price: 78000,
    images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop'],
    rating: 4.94,
    reviews: 31,
    type: 'Apartment',
    verified: true,
    features: ['3 Bedrooms', 'Luxury'],
    guestFavourite: true
  },
  {
    id: '10',
    title: 'Room in Panchlaish',
    location: 'Panchlaish, Chittagong',
    price: 59000,
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop'],
    rating: 4.94,
    reviews: 16,
    type: 'Room',
    verified: true,
    features: ['Private Bath', 'Garden'],
    guestFavourite: false
  },
  {
    id: '11',
    title: 'Apartment in Khulshi',
    location: 'Khulshi, Chittagong',
    price: 48000,
    images: ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop'],
    rating: 4.91,
    reviews: 27,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', 'Hill View'],
    guestFavourite: true
  },
  {
    id: '12',
    title: 'Townhouse in Halishahar',
    location: 'Halishahar, Chittagong',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'],
    rating: 5.0,
    reviews: 8,
    type: 'Townhouse',
    verified: true,
    features: ['4 Bedrooms', 'Garden'],
    guestFavourite: false
  },
  {
    id: '13',
    title: 'Room in Nasirabad',
    location: 'Nasirabad, Chittagong',
    price: 51000,
    images: ['https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop'],
    rating: 4.81,
    reviews: 35,
    type: 'Room',
    verified: true,
    features: ['Modern', 'WiFi'],
    guestFavourite: false
  },
  {
    id: '14',
    title: 'Room in CDA R/A',
    location: 'CDA R/A, Chittagong',
    price: 24000,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
    rating: 4.94,
    reviews: 12,
    type: 'Room',
    verified: true,
    features: ['Student Friendly', 'AC'],
    guestFavourite: false
  }
];

const stayInSylhet = [
  {
    id: '15',
    title: 'Room in Sylhet',
    location: 'Zindabazar, Sylhet',
    price: 103000,
    images: ['https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=400&h=300&fit=crop'],
    rating: 4.96,
    reviews: 45,
    type: 'Room',
    verified: true,
    features: ['Tea Garden View', 'Premium'],
    guestFavourite: true
  },
  {
    id: '16',
    title: 'Room in Amborkhana',
    location: 'Amborkhana, Sylhet',
    price: 119000,
    images: ['https://images.unsplash.com/photo-1571508601382-5bb0e2ae0ff3?w=400&h=300&fit=crop'],
    rating: 4.99,
    reviews: 23,
    type: 'Room',
    verified: true,
    features: ['Hill View', 'Luxury'],
    guestFavourite: true
  },
  {
    id: '17',
    title: 'Room in Tilagor',
    location: 'Tilagor, Sylhet',
    price: 153000,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop'],
    rating: 4.95,
    reviews: 18,
    type: 'Room',
    verified: true,
    features: ['Nature View', 'Peaceful'],
    guestFavourite: false
  },
  {
    id: '18',
    title: 'Room in Bondor Bazar',
    location: 'Bondor Bazar, Sylhet',
    price: 158000,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
    rating: 4.99,
    reviews: 31,
    type: 'Room',
    verified: true,
    features: ['City Center', 'Modern'],
    guestFavourite: false
  },
  {
    id: '19',
    title: 'Room in Lamabazar',
    location: 'Lamabazar, Sylhet',
    price: 172000,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
    rating: 4.94,
    reviews: 28,
    type: 'Room',
    verified: true,
    features: ['Heritage Area', 'Unique'],
    guestFavourite: false
  },
  {
    id: '20',
    title: 'Room in Shah Poran',
    location: 'Shah Poran, Sylhet',
    price: 152000,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'],
    rating: 4.98,
    reviews: 17,
    type: 'Room',
    verified: true,
    features: ['Spiritual Area', 'Quiet'],
    guestFavourite: false
  },
  {
    id: '21',
    title: 'Room in Mazar Gate',
    location: 'Mazar Gate, Sylhet',
    price: 125000,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
    rating: 4.97,
    reviews: 22,
    type: 'Room',
    verified: true,
    features: ['Traditional', 'Cultural'],
    guestFavourite: false
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Beautiful rental property interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Student & Industry{' '}
                <span className="text-primary">Housing Hub</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Affordable housing solutions for students and industry workers across Bangladesh
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <SearchBar />
              </div>
            </div>

            {/* Trust Stats */}
            <div className="flex justify-center gap-6 md:gap-12 text-center pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                <div className="text-xl md:text-2xl font-bold text-white">50K+</div>
                <div className="text-xs md:text-sm text-white/80">Verified Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                <div className="text-xl md:text-2xl font-bold text-white">100K+</div>
                <div className="text-xs md:text-sm text-white/80">Happy Guests</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                <div className="text-xl md:text-2xl font-bold text-white">4.8★</div>
                <div className="text-xs md:text-sm text-white/80">Average Rating</div>
              </div>
            </div>
          </div>
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

      {/* Student housing in Dhaka */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Student housing near universities in Dhaka</h2>
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {popularInDhaka.map((property) => (
                <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]">
                  <PropertyCard property={property} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Industry worker housing in Chittagong */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Industry worker housing in Chittagong</h2>
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {availableInChittagong.map((property) => (
                <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]">
                  <PropertyCard property={property} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Affordable options in Sylhet */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Budget-friendly options in Sylhet</h2>
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {stayInSylhet.map((property) => (
                <CarouselItem key={property.id} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]">
                  <PropertyCard property={property} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          <div className="text-center mt-12">
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
