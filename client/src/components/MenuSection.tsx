import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FEATURED_ITEMS } from '@/data/menuData';
import { MenuDialog } from './MenuDialog';
import { MenuIcon, Star } from 'lucide-react';
import acaiPremium from '../assets/acai-premium.jpg';
import burgerPremium from '../assets/burger-premium.jpg';
import beveragePremium from '../assets/beverage-premium.jpg';

const getFeaturedImage = (id: string) => {
  switch (id) {
    case 'acai-bowl': return acaiPremium;
    case 'burger-menu': return burgerPremium;
    case 'beverage-special': return beveragePremium;
    default: return undefined;
  }
};

export default function MenuSection() {
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="badge-menu">
            Menu Premium
          </Badge>
          <h2 className="text-4xl font-bold mb-4" data-testid="text-menu-title">
            Sabores Autênticos do Brasil
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-menu-description">
            Descubra nossa seleção premium de pratos brasileiros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {FEATURED_ITEMS.map((item) => {
            const itemImage = getFeaturedImage(item.id);
            return (
              <Card key={item.id} className="hover-elevate overflow-hidden group" data-testid={`card-featured-${item.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={itemImage} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-testid={`img-featured-${item.id}`}
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl leading-tight" data-testid={`text-featured-name-${item.id}`}>
                      {item.name}
                    </CardTitle>
                    {item.popular && (
                      <Badge variant="destructive" className="ml-2 flex-shrink-0" data-testid={`badge-featured-popular-${item.id}`}>
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-sm" data-testid={`badge-featured-category-${item.id}`}>
                      {item.category}
                    </Badge>
                    <span className="text-2xl font-bold text-primary" data-testid={`text-featured-price-${item.id}`}>
                      €{item.price}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed" data-testid={`text-featured-description-${item.id}`}>
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-lg" 
            onClick={() => setIsMenuDialogOpen(true)}
            data-testid="button-view-full-menu"
          >
            <MenuIcon className="w-5 h-5 mr-2" />
            Ver Menu Completo
          </Button>
          <p className="text-muted-foreground mt-4" data-testid="text-price-range">
            Preços a partir de €1,50 • Entregas disponíveis
          </p>
        </div>
      </div>
      
      <MenuDialog 
        open={isMenuDialogOpen} 
        onOpenChange={setIsMenuDialogOpen} 
      />
    </section>
  );
}