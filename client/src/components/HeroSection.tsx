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
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Star className="w-6 h-6 text-yellow-400 fill-current" />
          <span className="text-yellow-400 font-semibold ml-2" data-testid="text-rating">4.7 (98 avaliações)</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="text-hero-title">
          Lanchonete & Cia
        </h1>
        <p className="text-xl md:text-2xl mb-2 text-gray-200" data-testid="text-hero-subtitle">
          Açaí & Cia
        </p>
        <p className="text-lg mb-8 text-gray-300" data-testid="text-hero-description">
          Sabores autênticos do Brasil no coração de Vila Real
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <div className="flex items-center text-gray-200">
            <MapPin className="w-5 h-5 mr-2" />
            <span data-testid="text-location">Vila Real, Portugal</span>
          </div>
          <div className="flex items-center text-gray-200">
            <Clock className="w-5 h-5 mr-2" />
            <span data-testid="text-hours">12h-23h (Fechado Terças)</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={scrollToMenu}
            className="bg-primary/90 backdrop-blur-sm border border-primary hover:bg-primary"
            data-testid="button-view-menu"
          >
            Ver Nosso Menu
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
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