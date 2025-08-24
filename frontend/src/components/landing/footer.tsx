import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-secondary/50 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                          <Image src="/logo.png" alt="VeraChain Logo" width={160} height={40} className="h-10 w-auto" />
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            De-risking your logistics with data-driven insights.
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></Link>
                            </Button>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link>
                            <Link href="/#persona" className="text-muted-foreground hover:text-primary">For Consumers</Link>
                            <Link href="/#persona" className="text-muted-foreground hover:text-primary">For Suppliers</Link>
                            <Link href="/#faq" className="text-muted-foreground hover:text-primary">FAQ</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link href="/#about" className="text-muted-foreground hover:text-primary">About Us</Link>
                            <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link>
                        </nav>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Stay Updated</h4>
                        <p className="text-muted-foreground text-sm mb-2">Subscribe to our newsletter for the latest updates.</p>
                        <form className="flex gap-2">
                            <Input type="email" placeholder="Enter your email" className="flex-1" />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} VeraChain. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
