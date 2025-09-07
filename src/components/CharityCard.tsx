import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Charity {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  isSelected: boolean;
}

interface CharityCardProps {
  charity: Charity;
  onToggle: (id: string) => void;
  clickable?: boolean;
}

export function CharityCard({
  charity,
  onToggle,
  clickable = false,
}: CharityCardProps) {
  return (
    <Card
      className={`p-5 mb-4 bg-white/90 backdrop-blur-sm border transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.01] ${
        charity.isSelected
          ? "border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md"
          : "border-gray-200/60 hover:border-emerald-200"
      }`}
    >
      <div className="flex gap-4">
        <div className="relative">
          <ImageWithFallback
            src={charity.image}
            alt={charity.name}
            className="w-16 h-16 rounded-xl object-cover shadow-sm"
          />
          {charity.isSelected && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-gray-800 mb-1">
                {charity.name}
              </h4>
              <div className="inline-block px-2 py-1 bg-gray-100 rounded-full">
                <p className="text-xs text-gray-600">
                  {charity.category}
                </p>
              </div>
            </div>

            <Button
              variant={charity.isSelected ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking button
                onToggle(charity.id);
              }}
              className={`text-xs px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
                charity.isSelected 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" 
                  : "border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400"
              }`}
            >
              {charity.isSelected ? "✓ Selected" : "Select"}
            </Button>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {charity.description}
          </p>
        </div>
      </div>
    </Card>
  );
}