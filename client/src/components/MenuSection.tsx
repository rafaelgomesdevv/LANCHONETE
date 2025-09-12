import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { type MenuItem } from '@shared/schema';
import acaiImage from '@assets/generated_images/Brazilian_açaí_bowl_hero_image_59690057.png';
import coxinhaImage from '@assets/generated_images/Golden_coxinha_food_photo_c8d6e9e2.png';

const getDefaultImage = (category: string, name: string) => {
  if (name.toLowerCase().includes('açaí')) return acaiImage;
  if (name.toLowerCase().includes('coxinha')) return coxinhaImage;
  return undefined;
};

export default function MenuSection() {
  const { data: menuItems, isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  if (isLoading) {
    return (
      <section id="menu" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nosso Menu</h2>
            <p className="text-xl text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !menuItems) {
    return (
      <section id="menu" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nosso Menu</h2>
            <p className="text-xl text-muted-foreground">Erro ao carregar o menu</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-menu-title">
            Nosso Menu
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-menu-description">
            Descubra os autênticos sabores brasileiros
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const itemImage = item.image || getDefaultImage(item.category, item.name);
            return (
              <Card key={item.id} className="hover-elevate overflow-hidden" data-testid={`card-menu-${item.id}`}>
                {itemImage && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={itemImage} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      data-testid={`img-menu-${item.id}`}
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-6" data-testid={`text-menu-name-${item.id}`}>
                      {item.name}
                    </CardTitle>
                    {item.popular && (
                      <Badge variant="destructive" className="ml-2 text-xs" data-testid={`badge-popular-${item.id}`}>
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" data-testid={`badge-category-${item.id}`}>
                      {item.category}
                    </Badge>
                    <span className="text-2xl font-bold text-primary" data-testid={`text-price-${item.id}`}>
                      €{parseFloat(item.price).toFixed(2)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription data-testid={`text-description-${item.id}`}>
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground" data-testid="text-price-range">
            Preços entre €5-10 por pessoa
          </p>
        </div>
      </div>
    </section>
  );
}