import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, List, Map, Filter, SlidersHorizontal, MapPin, Star, Shield, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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

const PropertySearchResults = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let queryBuilder = supabase
        .from('properties')
        .select('*')
        .eq('status', 'active');

      // Apply search query
      if (query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      // Apply location filter
      if (location) {
        queryBuilder = queryBuilder.or(`location_city.ilike.%${location}%,location_address.ilike.%${location}%`);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match component interface
      const transformedData = (data || []).map((prop: any) => ({
        id: prop.id,
        title: prop.title,
        location: `${prop.location_address}, ${prop.location_city}`,
        price: prop.price_monthly,
        images: prop.images || [],
        rating: 4.5,
        reviews: 0,
        type: prop.property_type,
        verified: prop.is_verified,
        features: [
          prop.bedrooms && `${prop.bedrooms} Bedrooms`,
          prop.bathrooms && `${prop.bathrooms} Bathrooms`,
          ...(prop.amenities || []).slice(0, 2)
        ].filter(Boolean),
        amenities: prop.amenities || [],
        area: prop.area_sqft,
        posted: prop.created_at,
      }));

      setProperties(transformedData);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(property => {
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
  }, [properties, query, location, priceRange, selectedTypes, selectedAmenities, verifiedOnly, sortBy]);

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

  const PropertyListItem = ({ property }: { property: any }) => (
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
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : showMap ? (
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
            ) : null}

            {!loading && filteredProperties.length > 0 ? (
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
            ) : !loading ? (
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
            ) : null}

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
