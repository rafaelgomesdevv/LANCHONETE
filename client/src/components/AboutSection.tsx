import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Award, Users, Clock } from 'lucide-react';
import interiorImage from '@assets/generated_images/Restaurant_interior_atmosphere_7dca3576.png';

const features = [
  {
    icon: Heart,
    title: 'Sabores Autênticos',
    description: 'Ingredientes brasileiros originais e receitas tradicionais'
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Açaí cremoso e ingredientes frescos selecionados'
  },
  {
    icon: Users,
    title: 'Ambiente Acolhedor',
    description: 'Espaço perfeito para happy hour com amigos'
  },
  {
    icon: Clock,
    title: 'Entregas Rápidas',
    description: 'Entregas das 15h às 23h todos os dias'
  }
];

export default function AboutSection() {
  return (
    <section id="sobre" className="py-8 md:py-16 bg-card">
      <div className="container mx-auto px-3 md:px-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-3 md:mb-4 text-xs md:text-sm" data-testid="badge-about">
              Sobre Nós
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6" data-testid="text-about-title">
              O Melhor Açaí de Vila Real
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed" data-testid="text-about-description">
              A Lanchonete & Cia traz os autênticos sabores brasileiros para o coração de Vila Real. 
              Especialistas em açaí cremoso e deliciosas coxinhas, oferecemos uma experiência gastronômica 
              única num ambiente acolhedor e moderno.
            </p>
            

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start space-x-2 md:space-x-3" data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}>
                  <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base" data-testid={`text-feature-title-${feature.title.toLowerCase().replace(' ', '-')}`}>
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed" data-testid={`text-feature-desc-${feature.title.toLowerCase().replace(' ', '-')}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 lg:mt-0">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={interiorImage} 
                  alt="Interior acolhedor da Lanchonete & Cia"
                  className="w-full h-[250px] md:h-[400px] object-cover"
                  data-testid="img-restaurant-interior"
                />
              </CardContent>
            </Card>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-primary text-primary-foreground p-3 md:p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold" data-testid="text-rating-score">4.7</div>
                <div className="text-xs md:text-sm" data-testid="text-rating-count">98 Avaliações</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}