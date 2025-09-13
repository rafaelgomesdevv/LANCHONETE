import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';
import heroImage from '@assets/generated_images/Brazilian_açaí_bowl_hero_image_59690057.png';

export default function HeroSection() {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[60dvh] md:min-h-[70dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-2">
          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
          <span className="text-yellow-400 font-semibold ml-2 text-xs md:text-sm" data-testid="text-rating">4.7 (98 avaliações)</span>
        </div>
        
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4" data-testid="text-hero-title">
          Lanchonete & Cia
        </h1>
        <p className="text-base md:text-xl lg:text-2xl mb-1 md:mb-2 text-gray-200" data-testid="text-hero-subtitle">
          Açaí & Cia
        </p>
        <p className="text-sm md:text-base mb-4 md:mb-6 text-gray-300 px-2" data-testid="text-hero-description">
          Sabores autênticos do Brasil no coração de Vila Real
        </p>

        <div className="flex flex-col items-center justify-center gap-2 mb-4 md:flex-row md:gap-6 md:mb-6">
          <div className="flex items-center text-gray-200 text-xs md:text-sm">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span data-testid="text-location">Vila Real, Portugal</span>
          </div>
          <div className="flex items-center text-gray-200 text-xs md:text-sm">
            <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span data-testid="text-hours">12h-23h (Fechado Terças)</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center md:flex-row md:gap-4 md:gap-3 px-4">
          <Button 
            size="default"
            onClick={scrollToMenu}
            className="w-full bg-primary/90 backdrop-blur-sm border border-primary hover:bg-primary md:w-auto text-sm md:text-base"
            data-testid="button-view-menu"
          >
            Ver Nosso Menu
          </Button>
          <Button 
            variant="outline" 
            size="default"
            className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 md:w-auto text-sm md:text-base"
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