import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Award, Users } from 'lucide-react';
import interiorImage from '@assets/generated_images/Restaurant_interior_atmosphere_7dca3576.png';

const features = [
  {
    icon: Heart,
    title: 'Sabores Autênticos',
    description: 'Ingredientes brasileiros originais'
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Açaí cremoso e ingredientes frescos'
  },
  {
    icon: Users,
    title: 'Ambiente Acolhedor',
    description: 'Perfeito para happy hour'
  }
];

export default function AboutSection() {
  return (
    <section id="sobre" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4" data-testid="badge-about">
              Sobre Nós
            </Badge>
            <h2 className="text-4xl font-bold mb-6" data-testid="text-about-title">
              O Melhor Açaí de Vila Real
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="text-about-description">
              Trazemos os autênticos sabores brasileiros para Vila Real. 
              Especialistas em açaí cremoso e deliciosas coxinhas.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="text-center" data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}>
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1" data-testid={`text-feature-title-${feature.title.toLowerCase().replace(' ', '-')}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-feature-desc-${feature.title.toLowerCase().replace(' ', '-')}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src={interiorImage} 
                  alt="Interior da Lanchonete & Cia"
                  className="w-full h-[400px] object-cover"
                  data-testid="img-restaurant-interior"
                />
              </CardContent>
            </Card>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-5 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold" data-testid="text-rating-score">4.7</div>
                <div className="text-sm" data-testid="text-rating-count">100 Avaliações</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
