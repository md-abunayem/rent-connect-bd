import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, List, Map, Filter, SlidersHorizontal, MapPin, Star, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import PropertyCard from '@/components/PropertyCard';

// Mock properties data
const mockProperties = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Apartment in Gulshan',
    location: 'Gulshan 2, Dhaka',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80'],
    rating: 4.8,
    reviews: 24,
    type: 'Apartment',
    verified: true,
    features: ['3 Bedrooms', '2 Bathrooms', 'Balcony', 'Parking', 'WiFi', 'Gym Access'],
    amenities: ['wifi', 'parking', 'gym', 'balcony'],
    area: 1200,
    posted: '2024-01-15'
  },
  {
    id: '2',
    title: 'Cozy 2-Bedroom in Dhanmondi',
    location: 'Dhanmondi 15, Dhaka',
    price: 35000,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80'],
    rating: 4.6,
    reviews: 18,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', '1 Bathroom', 'Balcony'],
    amenities: ['wifi', 'balcony'],
    area: 900,
    posted: '2024-01-10'
  },
  {
    id: '3',
    title: 'Luxury Studio in Banani',
    location: 'Banani DOHS, Dhaka',
    price: 28000,
    images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&q=80'],
    rating: 4.7,
    reviews: 31,
    type: 'Studio',
    verified: true,
    features: ['Studio', '1 Bathroom', 'Furnished'],
    amenities: ['wifi', 'furnished', 'security'],
    area: 500,
    posted: '2024-01-20'
  },
  {
    id: '4',
    title: 'Spacious 4-Bedroom House in Uttara',
    location: 'Uttara Sector 7, Dhaka',
    price: 60000,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80'],
    rating: 4.9,
    reviews: 12,
    type: 'House',
    verified: false,
    features: ['4 Bedrooms', '3 Bathrooms', 'Garden', 'Parking', 'Rooftop'],
    amenities: ['parking', 'garden', 'rooftop'],
    area: 2000,
    posted: '2024-01-08'
  },
  {
    id: '5',
    title: 'Affordable Room in Mirpur',
    location: 'Mirpur 10, Dhaka',
    price: 15000,
    images: ['https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80'],
    rating: 4.3,
    reviews: 8,
    type: 'Room',
    verified: true,
    features: ['1 Room', 'Shared Bathroom', 'WiFi'],
    amenities: ['wifi', 'shared_kitchen'],
    area: 200,
    posted: '2024-01-12'
  },
  {
    id: '6',
    title: 'Executive Apartment in Motijheel',
    location: 'Motijheel Commercial Area, Dhaka',
    price: 42000,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80'],
    rating: 4.5,
    reviews: 22,
    type: 'Apartment',
    verified: true,
    features: ['2 Bedrooms', '2 Bathrooms', 'City View', 'Elevator'],
    amenities: ['wifi', 'elevator', 'city_view'],
    area: 1000,
    posted: '2024-01-18'
  }
];

const PropertySearchResults = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filter states
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      // Text search
      if (query && !property.title.toLowerCase().includes(query.toLowerCase()) && 
          !property.location.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      
      // Location filter
      if (location && !property.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
      
      // Price range
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }
      
      // Property type
      if (selectedTypes.length > 0 && !selectedTypes.includes(property.type)) {
        return false;
      }
      
      // Amenities
      if (selectedAmenities.length > 0 && 
          !selectedAmenities.every(amenity => property.amenities.includes(amenity))) {
        return false;
      }
      
      // Verified only
      if (verifiedOnly && !property.verified) {
        return false;
      }
      
      return true;
    });

    // Sort properties
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [query, location, priceRange, selectedTypes, selectedAmenities, verifiedOnly, sortBy]);

  const propertyTypes = ['Apartment', 'House', 'Studio', 'Room'];
  const amenityOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'parking', label: 'Parking' },
    { value: 'gym', label: 'Gym' },
    { value: 'balcony', label: 'Balcony' },
    { value: 'furnished', label: 'Furnished' },
    { value: 'security', label: 'Security' },
    { value: 'elevator', label: 'Elevator' },
    { value: 'garden', label: 'Garden' },
    { value: 'rooftop', label: 'Rooftop' },
    { value: 'city_view', label: 'City View' },
    { value: 'shared_kitchen', label: 'Shared Kitchen' }
  ];

  const togglePropertyType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([10000, 100000]);
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setVerifiedOnly(false);
  };

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="font-medium">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            min={5000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Property Type */}
      <div className="space-y-3">
        <Label className="font-medium">Property Type</Label>
        <div className="space-y-2">
          {propertyTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => togglePropertyType(type)}
              />
              <Label htmlFor={type} className="text-sm cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="font-medium">Amenities</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {amenityOptions.map(amenity => (
            <div key={amenity.value} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.value}
                checked={selectedAmenities.includes(amenity.value)}
                onCheckedChange={() => toggleAmenity(amenity.value)}
              />
              <Label htmlFor={amenity.value} className="text-sm cursor-pointer">
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Verified Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={verifiedOnly}
          onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
        />
        <Label htmlFor="verified" className="text-sm cursor-pointer">
          Verified properties only
        </Label>
      </div>
    </div>
  );

  const PropertyListItem = ({ property }: { property: typeof mockProperties[0] }) => (
    <Card className="hover:shadow-medium transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-48 h-32 object-cover rounded-lg"
            />
            {property.verified && (
              <div className="absolute top-2 left-2">
                <div className="verified-badge">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {property.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                    <span className="text-xs text-muted-foreground">({property.reviews})</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  ৳{property.price.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 4).map((feature, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">
                {property.area} sq ft
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link to={`/property/${property.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Search Results Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">
                {filteredProperties.length} Properties Found
              </h1>
              {(query || location) && (
                <p className="text-muted-foreground">
                  {query && `Results for "${query}"`}
                  {query && location && ' in '}
                  {location && `${location}`}
                </p>
              )}
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none rounded-r-none border-x"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={showMap ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                  className="rounded-l-none"
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <FilterSidebar />
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="mb-4">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results Content */}
          <div className="flex-1">
            {showMap && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Map className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive map view coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredProperties.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProperties.map((property) => (
                  viewMode === 'grid' ? (
                    <PropertyCard key={property.id} property={property} />
                  ) : (
                    <PropertyListItem key={property.id} property={property} />
                  )
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <Filter className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                    <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pagination placeholder */}
            {filteredProperties.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline">Load More Properties</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchResults;
