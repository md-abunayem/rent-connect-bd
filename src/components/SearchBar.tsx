import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<GuestCounts>({ adults: 1, children: 0, infants: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const locations = [
    'Gulshan, Dhaka',
    'Dhanmondi, Dhaka', 
    'Bashundhara, Dhaka',
    'Uttara, Dhaka',
    'Wari, Dhaka',
    'Chittagong',
    'Sylhet',
    'Cox\'s Bazar'
  ];

  const filteredLocations = locations.filter(loc => 
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const updateGuestCount = (type: keyof GuestCounts, increment: boolean) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }));
  };

  const getTotalGuests = () => guests.adults + guests.children;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (checkIn) params.set('checkIn', checkIn.toISOString());
    if (checkOut) params.set('checkOut', checkOut.toISOString());
    if (getTotalGuests() > 0) params.set('guests', getTotalGuests().toString());
    
    navigate(`/search?${params.toString()}`);
    setIsExpanded(false);
  };

  const CompactSearchBar = () => (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      <div 
        className="bg-white shadow-xl rounded-full border border-gray-200 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center p-2">
          {/* Location */}
          <div className="flex-1 px-6 py-3">
            <div className="text-sm font-semibold text-gray-900">Where</div>
            <div className="text-sm text-gray-500 truncate">
              {location || 'Search destinations'}
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>
          
          {/* Dates */}
          <div className="flex-1 px-6 py-3">
            <div className="text-sm font-semibold text-gray-900">When</div>
            <div className="text-sm text-gray-500 truncate">
              {checkIn && checkOut 
                ? `${format(checkIn, 'MMM dd')} - ${format(checkOut, 'MMM dd')}`
                : 'Add dates'
              }
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>
          
          {/* Guests */}
          <div className="flex-1 px-6 py-3">
            <div className="text-sm font-semibold text-gray-900">Who</div>
            <div className="text-sm text-gray-500 truncate">
              {getTotalGuests() > 0 
                ? `${getTotalGuests()} guest${getTotalGuests() !== 1 ? 's' : ''}`
                : 'Add guests'
              }
            </div>
          </div>
          
          {/* Search Button */}
          <div className="pl-2">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 w-12 p-0 shadow-lg hover:shadow-xl transition-all"
              size="icon"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExpandedSearchBar = () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-900 mb-2">Where</label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-14 pl-4 pr-10 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="max-h-60 overflow-y-auto">
                {filteredLocations.map((loc) => (
                  <div
                    key={loc}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => {
                      setLocation(loc);
                    }}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-900">{loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Check In */}
        <div>
          <label className="block text-xs font-semibold text-gray-900 mb-2">Check in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 justify-start text-left font-normal border-gray-300 rounded-xl hover:border-primary",
                  !checkIn && "text-gray-500"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : "Add date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                className="p-3 pointer-events-auto"
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-xs font-semibold text-gray-900 mb-2">Check out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 justify-start text-left font-normal border-gray-300 rounded-xl hover:border-primary",
                  !checkOut && "text-gray-500"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : "Add date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                className="p-3 pointer-events-auto"
                disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs font-semibold text-gray-900 mb-2">Who</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-14 justify-start text-left font-normal border-gray-300 rounded-xl hover:border-primary"
              >
                <Users className="mr-2 h-4 w-4" />
                {getTotalGuests() > 0 
                  ? `${getTotalGuests()} guest${getTotalGuests() !== 1 ? 's' : ''}`
                  : 'Add guests'
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="start">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Adults</div>
                    <div className="text-sm text-gray-500">Ages 13 or above</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuestCount('adults', false)}
                      disabled={guests.adults <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{guests.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuestCount('adults', true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Children</div>
                    <div className="text-sm text-gray-500">Ages 2-12</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuestCount('children', false)}
                      disabled={guests.children <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{guests.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuestCount('children', true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Infants</div>
                    <div className="text-sm text-gray-500">Under 2</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuestCount('infants', false)}
                      disabled={guests.infants <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{guests.infants}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateGuestCount('infants', true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end mt-6">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(false)}
            className="px-6 py-3 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {!isExpanded && <CompactSearchBar />}
      
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
          <ExpandedSearchBar />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;