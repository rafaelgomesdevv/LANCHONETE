import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import heroImage from '@assets/generated_images/Brazilian_açaí_bowl_hero_image_59690057.png';

export default function HeroSection() {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[70dvh] md:min-h-[80dvh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
          <span className="text-sm md:text-base text-yellow-400 font-semibold" data-testid="text-rating">4.7 ★ (100 avaliações)</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-3" data-testid="text-hero-title">
          Lanchonete & Cia
        </h1>
        <p className="text-lg sm:text-xl md:text-3xl mb-4 md:mb-6 text-gray-200 font-light" data-testid="text-hero-subtitle">
          Açaí & Cia
        </p>

        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8 text-sm md:text-base text-gray-200">
          <MapPin className="w-4 h-4" />
          <span data-testid="text-location">Vila Real, Portugal</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            size="lg"
            onClick={scrollToMenu}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-view-menu"
          >
            Ver Menu
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            onClick={() => window.open('tel:+351926227490')}
            data-testid="button-call-now"
          >
            Ligar Agora
          </Button>
        </div>
      </div>
    </section>
  );
}
