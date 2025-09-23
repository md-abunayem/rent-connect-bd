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
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      <div className="w-full bg-background shadow-strong rounded-full border border-border/50 p-2 search-focus hover-lift">
        <div className="flex items-center divide-x divide-border">
          {/* Location */}
          <div className="flex-1 px-6 py-4 group">
            <label className="block text-xs font-semibold text-foreground mb-1 transition-colors group-focus-within:text-primary">Where</label>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
            />
          </div>

          {/* Move-in Date */}
          <div className="flex-1 px-6 py-4 group">
            <label className="block text-xs font-semibold text-foreground mb-1 transition-colors group-focus-within:text-primary">Check in</label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground focus:outline-none transition-all"
            />
          </div>

          {/* Property Type */}
          <div className="flex-1 px-6 py-4 group">
            <label className="block text-xs font-semibold text-foreground mb-1 transition-colors group-focus-within:text-primary">Property type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground focus:outline-none transition-all"
            >
              <option value="">Any type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="room">Room</option>
              <option value="shared">Shared Space</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="pl-2">
            <Button 
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 w-14 p-0 shadow-medium hover:shadow-strong transition-all hover:scale-105"
              size="icon"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;