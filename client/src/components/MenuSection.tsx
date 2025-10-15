import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FEATURED_ITEMS } from '@/data/menuData';
import { MenuDialog } from './MenuDialog';
import { AcaiBuilderDialog } from './AcaiBuilderDialog';
import { MenuIcon, Star, Sparkles } from 'lucide-react';
import acaiPremium from '../assets/acai-premium-animated.gif';

const getFeaturedImage = (id: string) => {
  return acaiPremium;
};

export default function MenuSection() {
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [isAcaiBuilderOpen, setIsAcaiBuilderOpen] = useState(false);

  return (
    <section id="menu" className="py-6 md:py-16 bg-background">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-6 md:mb-12">
          <Badge variant="outline" className="mb-2 md:mb-3 text-xs md:text-sm" data-testid="badge-menu">
            Açaí Premium
          </Badge>
          <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4 px-2" data-testid="text-menu-title">
            O Melhor Açaí de Vila Real
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground px-4 md:px-2" data-testid="text-menu-description">
            Açaí cremoso brasileiro com toppings gratuitos ilimitados
          </p>
        </div>

        <div className="flex justify-center mb-6 md:mb-12">
          {FEATURED_ITEMS.map((item) => {
            const itemImage = getFeaturedImage(item.id);
            return (
              <Card key={item.id} className="hover-elevate overflow-hidden group w-full max-w-2xl" data-testid={`card-featured-${item.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={itemImage} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    data-testid={`img-featured-${item.id}`}
                  />
                </div>
                <CardHeader className="p-3 md:p-6 md:pb-4">
                  <div className="flex items-start justify-between mb-1 md:mb-2">
                    <CardTitle className="text-xl md:text-3xl leading-tight" data-testid={`text-featured-name-${item.id}`}>
                      {item.name}
                    </CardTitle>
                    {item.popular && (
                      <Badge variant="destructive" className="ml-1 md:ml-2 flex-shrink-0 text-xs md:text-sm" data-testid={`badge-featured-popular-${item.id}`}>
                        <Star className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="hidden sm:inline">Popular</span>
                        <span className="sm:hidden">★</span>
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs w-fit" data-testid={`badge-featured-category-${item.id}`}>
                    {item.category}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0 px-3 md:px-6 pb-3 md:pb-6">
                  <CardDescription className="text-sm md:text-base leading-relaxed mb-4" data-testid={`text-featured-description-${item.id}`}>
                    {item.description}
                  </CardDescription>
                  {item.sizes && (
                    <div className="space-y-2 md:space-y-3" data-testid="container-acai-sizes">
                      {item.sizes.map((size, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between py-2 px-3 md:px-4 rounded-md bg-muted/50"
                          data-testid={`item-size-${size.volume}`}
                        >
                          <span className="text-sm md:text-lg font-medium" data-testid={`text-size-${size.volume}`}>
                            {size.volume}
                          </span>
                          <span className="text-lg md:text-2xl font-bold text-primary" data-testid={`text-price-${size.volume}`}>
                            €{size.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center px-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-3">
            <Button 
              size="lg"
              className="text-sm md:text-lg shadow-lg w-full sm:w-auto" 
              onClick={() => setIsAcaiBuilderOpen(true)}
              data-testid="button-build-acai"
            >
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Simule Seu Açaí
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-sm md:text-lg w-full sm:w-auto" 
              onClick={() => setIsMenuDialogOpen(true)}
              data-testid="button-view-full-menu"
            >
              <MenuIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Ver Menu Completo
            </Button>
          </div>
          <p className="text-xs md:text-base text-muted-foreground px-2" data-testid="text-price-range">
            A partir de €6,00<br className="md:hidden" /><span className="hidden md:inline"> • </span>Toppings ilimitados grátis
          </p>
        </div>
      </div>
      
      <MenuDialog 
        open={isMenuDialogOpen} 
        onOpenChange={setIsMenuDialogOpen} 
      />
      
      <AcaiBuilderDialog 
        open={isAcaiBuilderOpen} 
        onOpenChange={setIsAcaiBuilderOpen} 
      />
    </section>
  );
}