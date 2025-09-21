import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (moveInDate) params.set('moveIn', moveInDate);
    if (propertyType) params.set('type', propertyType);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card shadow-medium rounded-2xl p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Dhaka, Chittagong, Sylhet..." 
                className="pl-10 h-12 border-input focus:border-primary"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Move-in Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Move-in Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input 
                type="date" 
                className="pl-10 h-12 border-input focus:border-primary"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Property Type</label>
            <select 
              className="w-full h-12 px-3 py-2 border border-input rounded-md bg-background focus:border-primary focus:outline-none"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Any Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="room">Room</option>
              <option value="shared">Shared Space</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <Button 
              className="w-full h-12 gradient-primary text-primary-foreground font-medium"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;