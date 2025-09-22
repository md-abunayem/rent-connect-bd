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
    <div className="bg-background rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-strong hover:-translate-y-1 animate-scale-in">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-200 shadow-medium"
        >
          <Heart className="w-4 h-4 group-hover:text-primary transition-colors" />
        </Button>
        
        {property.verified && (
          <div className="absolute top-3 left-3 animate-pulse-slow">
            <div className="verified-badge shadow-medium">
              <Shield className="w-3 h-3" />
              Verified
            </div>
          </div>
        )}

        {/* Quick view button on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button 
            size="sm" 
            className="w-full bg-background/95 backdrop-blur-sm text-foreground hover:bg-background shadow-medium"
            variant="secondary"
          >
            Quick View
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Location and Rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{property.rating}</span>
            <span className="text-xs text-muted-foreground">({property.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Type and Features */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
            {property.type}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{property.features.length} amenities</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-foreground">
                ৳{property.price.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>
            <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;