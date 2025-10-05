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
    <div className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-105">
      <div className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50 hover:border-primary/30 transition-all">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <div className="w-10 h-10 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-foreground font-semibold text-xs mb-1 leading-tight">{title}</h3>
          <p className="text-muted-foreground text-[10px]">{count.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;