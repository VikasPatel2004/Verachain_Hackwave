import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ShieldCheck, TrendingUp, Clock } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Supplier Vetting",
        description: "Analyze supplier reviews and ratings using AI to determine reliability and ensure you work with the best."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-primary" />,
        title: "Consolidated Risk Score",
        description: "We combine supplier, weather, and news data into a single, weighted percentage for clear, actionable insights."
    },
    {
        icon: <Clock className="w-8 h-8 text-primary" />,
        title: "Real-Time Monitoring",
        description: "Gather live data from weather and news APIs to assess route-specific risks like storms, accidents, or strikes."
    }
];

export function WhyUsSection() {
    return (
        <section id="features" className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Us?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Our platform provides unparalleled insights to de-risk your logistics operations.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-left p-6 flex flex-col items-start shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card">
                           <div className="mb-4 bg-primary/10 p-3 rounded-full">
                                {feature.icon}
                           </div>
                           <CardHeader className="p-0">
                                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                           </CardHeader>
                            <CardDescription className="mt-2 text-base text-muted-foreground">
                                {feature.description}
                            </CardDescription>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
