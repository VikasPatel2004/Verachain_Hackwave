import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About Us</h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Our mission at VeraChain is simple: to transform logistics decision-making. We provide a single, actionable risk score so managers can confidently navigate land transportation and prevent potential disruptions before they happen.
            </p>
        </div>
        <div className="flex items-center justify-center">
            <Image src="/logo.png" alt="VeraChain Logo" width={450} height={112} className="rounded-lg w-auto h-auto" />
        </div>
      </div>
    </section>
  );
}
