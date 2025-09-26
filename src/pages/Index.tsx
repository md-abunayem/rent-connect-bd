import { ArrowRight, Shield, Users, MapPin, Star, CheckCircle, Home, Building, Hotel, UserCheck, ChevronLeft, ChevronRight, GraduationCap, HardHat, Bed, Wifi, Zap, Globe, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import CategoryCard from '@/components/CategoryCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import LanguageTranslator from '@/components/LanguageTranslator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import heroImage from '@/assets/hero-bg.jpg';

// Mock data for categories focused on Students and Industry
const categories = [
  {
    title: 'Student Dorms',
    description: 'Shared rooms near universities with study facilities',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop',
    count: 1500
  },
  {
    title: 'Industry Hostels',
    description: 'Worker accommodation near factories & industrial zones',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop',
    count: 1200
  },
  {
    title: 'Shared Dorms',
    description: 'Budget-friendly multi-bed dormitories',
    icon: Bed,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
    count: 800
  },
  {
    title: 'Private Rooms',
    description: 'Individual rooms with shared common areas',
    icon: Wifi,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
    count: 600
  }
];

// Mock data for student dorms near universities
const studentDormsNearUniversities = [
  {
    id: '1',
    title: 'Student Dorm near BUET',
    location: 'Palashi, Dhaka University Area',
    price: 8000,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
    rating: 4.8,
    reviews: 45,
    type: 'Student Dorm',
    verified: true,
    features: ['4-bed room', 'Study area', 'WiFi'],
    guestFavourite: true
  },
  {
    id: '2',
    title: 'University Hostel - DU',
    location: 'Nilkhet, Dhaka University',
    price: 6500,
    images: ['https://images.unsplash.com/photo-1555854877-bab0e817e1ef?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviews: 32,
    type: 'Hostel',
    verified: true,
    features: ['6-bed dorm', 'Mess facility', 'Library'],
    guestFavourite: false
  },
  {
    id: '3',
    title: 'Girls Hostel - NSU Area',
    location: 'Bashundhara, NSU Campus',
    price: 12000,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop'],
    rating: 4.9,
    reviews: 28,
    type: 'Girls Hostel',
    verified: true,
    features: ['2-bed room', 'AC', 'Security'],
    guestFavourite: true
  },
  {
    id: '4',
    title: 'Medical Student Dorm',
    location: 'Shahbag, Medical College Area',
    price: 7500,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
    rating: 4.7,
    reviews: 19,
    type: 'Student Dorm',
    verified: true,
    features: ['3-bed room', '24/7 study', 'Canteen'],
    guestFavourite: false
  },
  {
    id: '5',
    title: 'Engineering Hostel',
    location: 'Tejgaon, BUET Area',
    price: 9500,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
    rating: 4.8,
    reviews: 41,
    type: 'Student Hostel',
    verified: true,
    features: ['Single room', 'Lab access', 'WiFi'],
    guestFavourite: true
  },
  {
    id: '6',
    title: 'BBA Student Housing',
    location: 'Dhanmondi, IBA Area',
    price: 11000,
    images: ['https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=400&h=300&fit=crop'],
    rating: 4.5,
    reviews: 22,
    type: 'Student Room',
    verified: true,
    features: ['Shared room', 'Common area', 'Meals'],
    guestFavourite: false
  },
  {
    id: '7',
    title: 'IT Student Dorm',
    location: 'Uttara, AIUB Area',
    price: 10500,
    images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'],
    rating: 4.9,
    reviews: 35,
    type: 'Tech Dorm',
    verified: true,
    features: ['High-speed net', '2-bed', 'Gaming area'],
    guestFavourite: true
  }
];

// Mock data for industry worker housing
const industryWorkerHousing = [
  {
    id: '8',
    title: 'Factory Worker Hostel',
    location: 'EPZ, Chittagong',
    price: 4500,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviews: 67,
    type: 'Worker Hostel',
    verified: true,
    features: ['8-bed dorm', 'Mess', 'Transport'],
    guestFavourite: false
  },
  {
    id: '9',
    title: 'Garments Worker Dorm',
    location: 'Savar, Garments Area',
    price: 3800,
    images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop'],
    rating: 4.1,
    reviews: 89,
    type: 'Worker Dorm',
    verified: true,
    features: ['6-bed room', 'Laundry', 'Medical'],
    guestFavourite: false
  },
  {
    id: '10',
    title: 'Textile Worker Lodge',
    location: 'Gazipur, Industrial Area',
    price: 5200,
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop'],
    rating: 4.4,
    reviews: 52,
    type: 'Worker Lodge',
    verified: true,
    features: ['4-bed room', '3 meals', 'AC'],
    guestFavourite: true
  },
  {
    id: '11',
    title: 'Shipyard Worker Housing',
    location: 'Sitakunda, Chittagong',
    price: 6000,
    images: ['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop'],
    rating: 4.2,
    reviews: 43,
    type: 'Worker Housing',
    verified: true,
    features: ['2-bed room', 'Sea view', 'Canteen'],
    guestFavourite: false
  },
  {
    id: '12',
    title: 'Steel Mill Workers',
    location: 'Kalurghat, Chittagong',
    price: 5500,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'],
    rating: 4.0,
    reviews: 38,
    type: 'Mill Housing',
    verified: true,
    features: ['4-bed dorm', 'Recreation', 'Bus service'],
    guestFavourite: false
  },
  {
    id: '13',
    title: 'Port Worker Quarters',
    location: 'Chittagong Port Area',
    price: 7200,
    images: ['https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop'],
    rating: 4.5,
    reviews: 29,
    type: 'Port Housing',
    verified: true,
    features: ['Private room', 'Port access', 'Meals'],
    guestFavourite: true
  },
  {
    id: '14',
    title: 'Manufacturing Hostel',
    location: 'Karnaphuli, Chittagong',
    price: 4800,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviews: 61,
    type: 'Manufacturing Hostel',
    verified: true,
    features: ['6-bed dorm', 'Shift friendly', 'WiFi'],
    guestFavourite: false
  }
];

// Mock data for budget accommodations
const budgetAccommodations = [
  {
    id: '15',
    title: 'Shared Student Room',
    location: 'Agrabad, CUET Area',
    price: 3500,
    images: ['https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=400&h=300&fit=crop'],
    rating: 4.2,
    reviews: 34,
    type: 'Shared Room',
    verified: true,
    features: ['3-bed room', 'Study table', 'Budget'],
    guestFavourite: false
  },
  {
    id: '16',
    title: 'Apprentice Hostel',
    location: 'Kalurghat, Technical Area',
    price: 2800,
    images: ['https://images.unsplash.com/photo-1571508601382-5bb0e2ae0ff3?w=400&h=300&fit=crop'],
    rating: 4.0,
    reviews: 28,
    type: 'Apprentice Hostel',
    verified: true,
    features: ['8-bed dorm', 'Training center', 'Meals'],
    guestFavourite: false
  },
  {
    id: '17',
    title: 'Night Shift Housing',
    location: 'EPZ, Chittagong',
    price: 4200,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop'],
    rating: 4.1,
    reviews: 45,
    type: 'Shift Housing',
    verified: true,
    features: ['Flexible hours', 'Quiet area', 'Security'],
    guestFavourite: false
  },
  {
    id: '18',
    title: 'Trainee Accommodation',
    location: 'BSTI Area, Chittagong',
    price: 3200,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'],
    rating: 4.3,
    reviews: 19,
    type: 'Trainee Housing',
    verified: true,
    features: ['New workers', 'Orientation', 'Support'],
    guestFavourite: false
  },
  {
    id: '19',
    title: 'Diploma Student Dorm',
    location: 'Polytechnic Area, Chittagong',
    price: 4500,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
    rating: 4.4,
    reviews: 31,
    type: 'Student Dorm',
    verified: true,
    features: ['Technical students', 'Workshop access', 'Library'],
    guestFavourite: true
  },
  {
    id: '20',
    title: 'Contract Worker Lodge',
    location: 'Hathazari, Industrial Zone',
    price: 3800,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'],
    rating: 4.0,
    reviews: 22,
    type: 'Contract Lodge',
    verified: true,
    features: ['Flexible terms', 'Basic amenities', 'Transport'],
    guestFavourite: false
  },
  {
    id: '21',
    title: 'Intern Housing',
    location: 'Medical College Area, Chittagong',
    price: 5500,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
    rating: 4.6,
    reviews: 17,
    type: 'Intern Housing',
    verified: true,
    features: ['Medical interns', 'Hospital nearby', 'Study area'],
    guestFavourite: true
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
          <div className="absolute inset-0">
            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
          <div className="space-y-12">
            {/* Tech Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white animate-scale-in">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Next-Gen Housing Platform</span>
                <Zap className="w-4 h-4 text-accent" />
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
                Smart Housing for{' '}
                <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
                  Students & Workers
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                AI-powered platform connecting students and industry workers with verified, affordable accommodation across Bangladesh
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-full max-w-3xl">
                <SearchBar />
              </div>
            </div>

            {/* Tech Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center pt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  25K+
                </div>
                <div className="text-sm md:text-base text-white/80">Smart Student Beds</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-accent" />
                  15K+
                </div>
                <div className="text-sm md:text-base text-white/80">AI-Verified Housing</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary-light" />
                  99.8%
                </div>
                <div className="text-sm md:text-base text-white/80">Safety Score</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-slide-up" style={{ animationDelay: '0.9s' }}>
              <Button size="lg" className="gradient-primary text-lg px-8 py-4 h-auto rounded-full shadow-glow hover:scale-105 transition-all">
                <Smartphone className="w-5 h-5 mr-2" />
                Find Housing Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                <Building className="w-5 h-5 mr-2" />
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Language Translator Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto">
          <LanguageTranslator />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Smart Categories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4">
              Choose Your Tech-Enabled Housing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered matching for students and workers with verified, tech-integrated accommodation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {categories.map((category, index) => (
              <div key={category.title} className="animate-scale-in hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
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
            <h2 className="text-2xl font-semibold text-foreground">Student dorms near universities</h2>
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {studentDormsNearUniversities.map((property) => (
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
              {industryWorkerHousing.map((property) => (
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
              {budgetAccommodations.map((property) => (
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

      {/* How It Works - Tech Version */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent mb-4">
              How Our Smart Platform Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced AI matching system connects students and workers with perfect accommodation in seconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-6 group animate-scale-in">
              <div className="w-24 h-24 gradient-tech rounded-3xl flex items-center justify-center mx-auto shadow-glow group-hover:scale-110 transition-all duration-300 animate-float">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">AI-Powered Search</h3>
                <p className="text-muted-foreground">Smart algorithms match you with perfect accommodation based on your preferences, budget, and location</p>
              </div>
            </div>

            <div className="text-center space-y-6 group animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-24 h-24 gradient-tech rounded-3xl flex items-center justify-center mx-auto shadow-glow group-hover:scale-110 transition-all duration-300 animate-float" style={{ animationDelay: '2s' }}>
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Blockchain Verification</h3>
                <p className="text-muted-foreground">Every property and landlord verified through our advanced security system with digital identity proof</p>
              </div>
            </div>

            <div className="text-center space-y-6 group animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 gradient-tech rounded-3xl flex items-center justify-center mx-auto shadow-glow group-hover:scale-110 transition-all duration-300 animate-float" style={{ animationDelay: '4s' }}>
                <Zap className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">Instant Booking</h3>
                <p className="text-muted-foreground">Smart contracts enable instant booking with secure payments and 24/7 AI-powered support</p>
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
                Trusted by Students & Workers
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands using HavenHub for affordable accommodation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">5,000+</div>
                <div className="text-muted-foreground">Student Dorms</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">25,000+</div>
                <div className="text-muted-foreground">Students Housed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">3,000+</div>
                <div className="text-muted-foreground">Industry Workers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
                <div className="text-muted-foreground">University Areas</div>
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
              Affordable housing solutions for students and industry workers across Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">For Students</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">University Dorms</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Study Groups</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Student Guide</a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">For Workers</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Factory Housing</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Shift Schedules</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Worker Rights</a>
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
