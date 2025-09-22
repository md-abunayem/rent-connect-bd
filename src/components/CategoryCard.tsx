import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  count: number;
}

const CategoryCard = ({ title, description, icon: Icon, image, count }: CategoryCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium">
            <Icon className="w-6 h-6 text-foreground" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{count.toLocaleString()} properties</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;