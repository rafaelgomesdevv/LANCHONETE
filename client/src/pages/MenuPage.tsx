import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Sparkles } from 'lucide-react';
import { type MenuItem } from '@shared/schema';
import acaiGif from '@assets/download_1757720524650.gif';
import acaiCups from '@assets/download_1757720527629.jpg';
import restaurantInterior from '@assets/download_1757720526404.webp';
import hamburgerImage from '@assets/download_1757720529836.jpg';

// Organização das categorias com ícones
const categoryOrder = [
  { name: 'Açaí', icon: '🫐', description: 'Nossa especialidade brasileira!' },
  { name: 'Salgados', icon: '🥟', description: 'Deliciosos salgados brasileiros' },
  { name: 'Quitutes', icon: '🌮', description: 'Iguarias tradicionais do Brasil' },
  { name: 'Hambúrgueres', icon: '🍔', description: 'Hambúrgueres saborosos e generosos' },
  { name: 'Porções', icon: '🍗', description: 'Perfeitas para compartilhar' },
  { name: 'Bebidas', icon: '🥤', description: 'Refrescantes e saborosas' },
  { name: 'Águas', icon: '💧', description: 'Para se manter hidratado' },
  { name: 'Cervejas', icon: '🍺', description: 'Cervejas tradicionais' },
  { name: 'Cervejas Especiais', icon: '🍻', description: 'Seleção premium de cervejas' },
  { name: 'Extras', icon: '📦', description: 'Embalagens e extras' },
];

const getCategoryImage = (category: string) => {
  switch (category) {
    case 'Açaí':
      return acaiCups;
    case 'Hambúrgueres':
      return hamburgerImage;
    default:
      return restaurantInterior;
  }
};

export default function Menu() {
  const { data: menuItems, isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Carregando Menu...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !menuItems) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">Erro ao Carregar Menu</h1>
            <p className="text-muted-foreground">Por favor, tente novamente mais tarde.</p>
          </div>
        </div>
      </div>
    );
  }

  // Agrupar itens por categoria
  const itemsByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section com destaque para Açaí */}
      <section className="relative py-16 bg-gradient-to-r from-primary/20 to-purple-600/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4" data-testid="text-menu-title">
              Menu Completo
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Descubra todos os sabores autênticos do Brasil
            </p>
          </div>
          
          {/* Destaque Especial do Açaí */}
          {itemsByCategory['Açaí'] && (
            <div className="max-w-4xl mx-auto mb-12">
              <Card className="overflow-hidden border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-purple-600/10">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <Badge variant="default" className="text-lg px-4 py-1">
                      Nossa Especialidade
                    </Badge>
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary" data-testid="text-acai-highlight">
                    🫐 Açaí Autêntico Brasileiro
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Direto do Brasil para o seu paladar! Cremoso, natural e irresistível
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <img 
                      src={acaiGif} 
                      alt="Açaí sendo preparado"
                      className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '300px', objectFit: 'cover' }}
                      data-testid="img-acai-gif"
                    />
                  </div>
                  <div className="flex-1">
                    <img 
                      src={acaiCups} 
                      alt="Copos de açaí Açaí & Cia"
                      className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '300px', objectFit: 'cover' }}
                      data-testid="img-acai-cups"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Menu por Seções */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {categoryOrder.map((categoryInfo) => {
            const items = itemsByCategory[categoryInfo.name];
            if (!items || items.length === 0) return null;

            const isAcai = categoryInfo.name === 'Açaí';

            return (
              <div key={categoryInfo.name} className="mb-16" data-testid={`section-${categoryInfo.name.toLowerCase()}`}>
                {/* Cabeçalho da Categoria */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-4xl">{categoryInfo.icon}</span>
                    <h2 className={`text-4xl font-bold ${isAcai ? 'text-primary' : ''}`}>
                      {categoryInfo.name}
                    </h2>
                    <span className="text-4xl">{categoryInfo.icon}</span>
                  </div>
                  <p className="text-muted-foreground text-lg">{categoryInfo.description}</p>
                  <div className="w-24 h-1 bg-primary/50 mx-auto mt-4"></div>
                </div>

                {/* Grid de Itens */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`hover-elevate transition-all duration-300 ${
                        isAcai ? 'border-primary/30 hover:border-primary/60' : ''
                      } ${item.popular ? 'ring-2 ring-yellow-400/50' : ''}`}
                      data-testid={`card-menu-item-${item.id}`}
                    >
                      {/* Imagem do item (se disponível) */}
                      {item.category === 'Hambúrgueres' && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={hamburgerImage} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            data-testid={`img-${item.id}`}
                          />
                          {item.popular && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                              <Star className="w-3 h-3 mr-1" fill="currentColor" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      )}
                      {item.category === 'Açaí' && (
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={acaiCups} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            data-testid={`img-${item.id}`}
                          />
                          {item.popular && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                              <Star className="w-3 h-3 mr-1" fill="currentColor" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      )}

                      <CardHeader className={`pb-2 ${!item.image && item.category !== 'Hambúrgueres' && item.category !== 'Açaí' ? 'pt-4' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className={`text-lg ${isAcai ? 'text-primary' : ''}`} data-testid={`text-item-name-${item.id}`}>
                              {item.name}
                            </CardTitle>
                            {item.popular && item.category !== 'Hambúrgueres' && item.category !== 'Açaí' && (
                              <Badge variant="secondary" className="mt-1">
                                <Star className="w-3 h-3 mr-1" fill="currentColor" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className={`text-right ${isAcai ? 'text-primary font-bold' : ''}`}>
                            <span className="text-2xl font-bold" data-testid={`text-price-${item.id}`}>
                              {item.price}€
                            </span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <CardDescription className="text-sm mb-4" data-testid={`text-description-${item.id}`}>
                          {item.description}
                        </CardDescription>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {!item.available && (
                              <Badge variant="destructive">Esgotado</Badge>
                            )}
                            {item.available && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Disponível
                              </Badge>
                            )}
                          </div>
                          {item.available && (
                            <Button 
                              size="sm" 
                              className={isAcai ? 'bg-primary hover:bg-primary/90' : ''}
                              data-testid={`button-add-${item.id}`}
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Pedir
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer da página */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Venha Experimentar!</h3>
          <p className="text-muted-foreground mb-4">
            Todos os pratos são preparados com ingredientes frescos e amor brasileiro
          </p>
          <div className="max-w-md mx-auto">
            <img 
              src={restaurantInterior} 
              alt="Interior do restaurante"
              className="w-full rounded-lg shadow-md"
              data-testid="img-restaurant-interior"
            />
          </div>
        </div>
      </section>
    </div>
  );
}