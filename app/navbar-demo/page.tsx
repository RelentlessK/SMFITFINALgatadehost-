"use client";

import { NavBarDemo } from "@/components/ui/navbar-demo";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function NavBarDemoPage() {
  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-accent-100/50 dark:bg-accent-900/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary-600">NavBar</span> Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Demonstrație a componentei de navigare cu efect de tubelight ce se adaptează la tema site-ului.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Efect Tubelight</h2>
            <p className="text-muted-foreground mb-8">
              Demonstrația de mai jos prezintă o componentă de navigare cu efect tubelight, care funcționează atât pe
              desktop cât și pe dispozitive mobile. Pe desktop, afișează etichete text, iar pe mobile afișează
              pictograme.
            </p>

            <div className="h-[500px] bg-gradient-to-b from-primary-100/30 to-accent-100/30 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg relative overflow-hidden">
              <NavBarDemo />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Interacționează cu bara de navigare de mai sus (desktop) sau de jos (mobil)
                </p>
              </div>
            </div>

            <div className="mt-12 bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Cum să folosești componenta</h3>
              <p className="text-muted-foreground text-sm mb-4 text-left">
                Importă componenta și definește elementele de navigare:
              </p>
              <pre className="bg-muted p-4 rounded-md text-left overflow-x-auto">
                <code>{`import { Home, User, Mail } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

// Definește elementele de navigare
const navItems = [
  { name: 'Acasă', url: '/', icon: Home },
  { name: 'Despre Mine', url: '/despre-mine', icon: User },
  { name: 'Contact', url: '/contact', icon: Mail }
]

// Folosește componenta
<NavBar items={navItems} />
`}</code>
              </pre>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}