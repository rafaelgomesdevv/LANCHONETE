import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import acaiImage from '@assets/generated_images/Brazilian_açaí_bowl_hero_image_59690057.png';
import coxinhaImage from '@assets/generated_images/Golden_coxinha_food_photo_c8d6e9e2.png';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  popular?: boolean;
  image?: string;
}

// todo: replace with real menu data from API
const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Açaí com Ninho, Morango e Leite Condensado',
    description: 'Açaí cremoso com Ninho, morangos frescos e leite condensado',
    price: '€6.50',
    category: 'Açaí',
    popular: true,
    image: acaiImage
  },
  {
    id: '2',
    name: 'Açaí Tradicional',
    description: 'Açaí puro com banana, granola e mel',
    price: '€5.00',
    category: 'Açaí'
  },
  {
    id: '3',
    name: 'Coxinha de Frango',
    description: 'Coxinha cremosa e deliciosa, perfeita para o lanche',
    price: '€3.50',
    category: 'Salgados',
    popular: true,
    image: coxinhaImage
  },
  {
    id: '4',
    name: 'Hambúrguer Especial',
    description: 'Hambúrguer suculento com ingredientes frescos',
    price: '€8.00',
    category: 'Hambúrgueres'
  },
  {
    id: '5',
    name: 'Hambúrguer de Frango',
    description: 'Peito de frango grelhado com salada e molhos',
    price: '€7.50',
    category: 'Hambúrgueres'
  },
  {
    id: '6',
    name: 'Porção de Petiscos',
    description: 'Seleção de petiscos brasileiros para compartilhar',
    price: '€12.00',
    category: 'Porções'
  }
];

const categories = ['Todos', 'Açaí', 'Hambúrgueres', 'Salgados', 'Porções'];

export default function MenuSection() {
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
          {menuItems.map((item) => (
            <Card key={item.id} className="hover-elevate overflow-hidden" data-testid={`card-menu-${item.id}`}>
              {item.image && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
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
                    {item.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription data-testid={`text-description-${item.id}`}>
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
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