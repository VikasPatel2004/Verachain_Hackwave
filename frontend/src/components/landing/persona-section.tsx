import { Button } from "../ui/button";
import Link from 'next/link';
import { Card, CardContent } from "../ui/card";
import { ArrowRight, User, Truck } from "lucide-react";

export function PersonaSection() {
    return (
        <section id="persona" className="py-20 md:py-28 bg-secondary/50">
            <div className="container mx-auto text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Choose Your Role</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Select your role to get a customized experience.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                    <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="p-8 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-primary/20 flex items-center justify-center bg-primary/10">
                                <User className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Consumer</h3>
                            <p className="text-muted-foreground mb-6">Access risk analytics and manage your shipments.</p>
                            <Button size="lg" className="w-full max-w-xs mt-auto" asChild>
                               <Link href="/consumer">Continue <ArrowRight className="ml-2"/></Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                         <CardContent className="p-8 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-primary/20 flex items-center justify-center bg-primary/10">
                                <Truck className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Supplier</h3>
                            <p className="text-muted-foreground mb-6">Manage your fleet and provide shipping updates.</p>
                            <Button size="lg" className="w-full max-w-xs mt-auto" asChild>
                                <Link href="/supplier">Continue <ArrowRight className="ml-2" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
