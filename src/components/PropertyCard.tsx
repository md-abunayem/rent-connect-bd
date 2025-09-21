import { Heart, MapPin, Star, Shield, CheckCircle } from 'lucide-react';
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
    <div className="bg-card rounded-xl border shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm p-0"
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
      <div className="p-4 space-y-3">
        {/* Title and Type */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {property.type}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{property.rating}</span>
              <span className="text-xs text-muted-foreground">({property.reviews})</span>
            </div>
          </div>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {property.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
              +{property.features.length - 3} more
            </span>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-lg font-bold text-foreground">
              ৳{property.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to={`/property/${property.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;