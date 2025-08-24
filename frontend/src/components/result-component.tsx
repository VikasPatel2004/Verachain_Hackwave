import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ResultComponentProps {
  result: number;
  description: string;
}

export function ResultComponent({ result, description }: ResultComponentProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-card border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Consolidated Risk Score</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-1 hover:bg-primary/10">
                <Info className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-6xl font-bold text-primary">{result}%</div>
        <p className="text-sm text-muted-foreground mt-1">
          Based on supplier, weather, and news data.
        </p>
      </CardContent>
    </Card>
  )
}
