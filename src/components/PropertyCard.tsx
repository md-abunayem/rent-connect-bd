import { Heart, MapPin, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    rating: number;
    reviews: number;
    type: string;
    verified: boolean;
    features: string[];
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-background rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-medium">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background/100 transition-all"
        >
          <Heart className="w-4 h-4" />
        </Button>
        
        {property.verified && (
          <div className="absolute top-3 left-3">
            <div className="verified-badge">
              <Shield className="w-3 h-3" />
              Verified
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Location and Rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-foreground" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
          {property.title}
        </h3>

        {/* Type Badge */}
        <Badge variant="secondary" className="text-xs w-fit">
          {property.type}
        </Badge>

        {/* Price */}
        <div className="pt-2">
          <span className="text-lg font-semibold text-foreground">
            ৳{property.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground"> / month</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;