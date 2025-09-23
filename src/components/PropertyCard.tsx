import { Heart, MapPin, Star, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02]">
        {/* Image Container with 4:3 Aspect Ratio */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
          {/* Main Image */}
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          
          {/* Heart/Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110"
          >
            <Heart 
              className={cn(
                "w-6 h-6 stroke-2",
                isLiked 
                  ? "fill-red-500 text-red-500" 
                  : "fill-white/80 text-white stroke-white hover:scale-105"
              )}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 shadow-sm">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-black text-black" />
              <span className="text-xs font-semibold text-black">{property.rating}</span>
            </div>
          </div>

          {/* Navigation Arrows (only show if multiple images and on hover) */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-110 mr-12"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-3 space-y-1">
          {/* Location and Rating Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-700">
              <span className="font-semibold text-sm truncate">{property.location}</span>
            </div>
            {property.verified && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Shield className="w-3 h-3 text-green-600" />
                <span>Verified</span>
              </div>
            )}
          </div>

          {/* Property Title */}
          <h3 className="text-gray-600 text-sm truncate font-normal">
            {property.title}
          </h3>

          {/* Features */}
          <div className="text-gray-600 text-sm">
            {property.features.slice(0, 2).join(' • ')}
          </div>

          {/* Price */}
          <div className="pt-1">
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-gray-900">
                ৳{Math.floor(property.price / 30).toLocaleString()}
              </span>
              <span className="text-gray-600 text-sm font-normal">night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;