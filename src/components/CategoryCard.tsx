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
    <div className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2">
          <div className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
            <Icon className="w-4 h-4 text-gray-900" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-white font-semibold text-xs mb-0.5">{title}</h3>
          <p className="text-white/90 text-xs">{count.toLocaleString()} properties</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;