import { Header } from '../../components/landing/header';
import { Footer } from '../../components/landing/footer';
import { ContactForm } from '../../components/contact/contact-form';
import { Card, CardContent } from '../../components/ui/card';
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shine">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                We’d love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <ContactForm />
            </Card>
            <div className="space-y-8">
                <Card>
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                        <h3 className="text-xl font-semibold">Contact Information</h3>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Mail className="w-6 h-6 text-primary" />
                            <span>support@verachain.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Phone className="w-6 h-6 text-primary" />
                            <span>+91 (555) 123-4567</span>
                        </div>
                         <div className="flex items-center gap-4 text-muted-foreground">
                            <MapPin className="w-6 h-6 text-primary" />
                            <span>123 Innovation Drive, Tech Park, Bangalore, India</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex flex-col items-start gap-4">
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
