import { Card } from "./ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "info";
}

export function StatsCard({ title, value, subtitle, icon, variant = "default" }: StatsCardProps) {
  const getBorderColor = () => {
    switch (variant) {
      case "success": return "border-green-200";
      case "info": return "border-blue-200";
      default: return "border-border/50";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "success": return "text-emerald-600";
      case "info": return "text-blue-600";
      default: return "text-foreground";
    }
  };

  return (
    <Card className={`p-4 bg-card border ${getBorderColor()} cursor-pointer hover:shadow-lg hover:bg-muted/20 transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{title}</p>
          <h3 className={`text-xl font-semibold ${getTextColor()}`}>{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            variant === "success" ? "bg-green-100" : 
            variant === "info" ? "bg-blue-100" : 
            "bg-primary/10"
          }`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}