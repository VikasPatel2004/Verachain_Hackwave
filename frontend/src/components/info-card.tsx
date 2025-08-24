import { Star, IndianRupee } from 'lucide-react';
import { Card, CardContent } from "./ui/card";
import { cn } from '../lib/utils';

interface InfoCardProps {
  name: string;
  cost: number;
  rating: number;
  reviews: number;
}

export function InfoCard({ name, cost, rating, reviews }: InfoCardProps) {

  const getRatingColor = (rating: number) => {
    if (rating < 4) return "text-red-500 fill-red-500";
    if (rating < 8) return "text-orange-500 fill-orange-500";
    return "text-green-500 fill-green-500";
  }

  return (
    <Card className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-card">
      <div className="relative w-full h-32 bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center p-4">
        <h2 className="text-xl font-bold text-center text-primary-foreground drop-shadow-md">{name}</h2>
      </div>
      <CardContent className="p-4 flex flex-col gap-4 flex-grow">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
                <IndianRupee className="h-6 w-6 text-foreground" />
                <span className="text-2xl font-bold">{cost.toLocaleString('en-IN')}</span>
            </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto pt-4 border-t">
            <div className="flex items-center gap-1.5">
                <Star className={cn("w-5 h-5", getRatingColor(rating))} />
                <span className="font-semibold text-base text-foreground">{rating.toFixed(1)}/10</span>
            </div>
            <div className="border-l h-5"></div>
            <span className="font-medium text-base">{reviews} Reviews</span>
        </div>
      </CardContent>
    </Card>
  );
}
