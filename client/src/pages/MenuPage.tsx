import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MenuItem } from "@shared/schema";
import { Star, Clock } from "lucide-react";

// Import images with @assets alias
import acaiGif from "@assets/_model_veo3_202509080035_1757701832921.gif";
import interiorImage from "@assets/unnamed (2)_1757701852520.webp";
import acaiBeverageImage from "@assets/r8cc-Lanchonete-and-Cia-Acai-and-Cia-beverage_1757701894312.jpg";
import burgerImage from "@assets/rfd9-burger-Lanchonete-and-Cia-Acai-and-Cia-2025-07_1757701900055.jpg";

// Define category order with Açaí featured first
const CATEGORY_ORDER = [
  "Açaí",
  "Hambúrgueres", 
  "Salgados",
  "Quitutes",
  "Porções",
  "Bebidas",
  "Cervejas",
  "Cervejas Especiais",
  "Águas",
  "Extras"
];

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "Açaí": "Açaí & Especialidades",
  "Hambúrgueres": "Hambúrgueres",
  "Salgados": "Salgados",
  "Quitutes": "Quitutes Brasileiros",
  "Porções": "Porções & Petiscos",
  "Bebidas": "Bebidas Diversas",
  "Cervejas": "Cervejas",
  "Cervejas Especiais": "Cervejas Especiais",
  "Águas": "Águas",
  "Extras": "Extras"
};

const getCategoryHeroImage = (category: string) => {
  switch (category) {
    case "Açaí":
      return acaiBeverageImage;
    case "Hambúrgueres":
      return burgerImage;
    default:
      return null;
  }
};

const getCategoryAnchor = (category: string) => {
  return category.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export default function MenuPage() {
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando menu...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Group items by category
  const groupedItems = menuItems?.reduce((acc, item) => {
    const category = item.category || "Extras";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>) || {};

  // Sort categories by predefined order
  const sortedCategories = CATEGORY_ORDER.filter(category => 
    groupedItems[category] && groupedItems[category].length > 0
  );

  const scrollToSection = (category: string) => {
    const element = document.getElementById(getCategoryAnchor(category));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
      {/* Hero Section - Açaí Highlight */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black hover:bg-yellow-400" data-testid="badge-destaque">
                ⭐ Destaque Especial
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
                Açaí Autêntico Brasileiro
              </h1>
              <p className="text-xl mb-8 text-purple-100" data-testid="text-hero-description">
                Descubra o sabor genuíno do açaí brasileiro, preparado fresquinho com os melhores ingredientes e acompanhamentos deliciosos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                  onClick={() => scrollToSection("Açaí")}
                  data-testid="button-ver-acai"
                >
                  Ver Açaí
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-800"
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-contato"
                >
                  Contato
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={acaiGif}
                  alt="Açaí sendo preparado"
                  className="rounded-lg shadow-2xl max-w-full h-auto max-h-96 object-contain"
                  loading="eager"
                  fetchPriority="high"
                  data-testid="img-acai-hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {sortedCategories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(category)}
                className="hover:bg-purple-100 dark:hover:bg-purple-900"
                data-testid={`button-nav-${getCategoryAnchor(category)}`}
              >
                {CATEGORY_DISPLAY_NAMES[category] || category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-8">
        {sortedCategories.map((category, categoryIndex) => {
          const items = groupedItems[category];
          const heroImage = getCategoryHeroImage(category);
          const isAcai = category === "Açaí";
          
          return (
            <section 
              key={category} 
              id={getCategoryAnchor(category)}
              className="mb-16"
              data-testid={`section-${getCategoryAnchor(category)}`}
            >
              {categoryIndex > 0 && <Separator className="mb-8" />}
              
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid={`text-category-${getCategoryAnchor(category)}`}>
                    {CATEGORY_DISPLAY_NAMES[category] || category}
                  </h2>
                  {isAcai && (
                    <Badge variant="secondary" className="bg-yellow-500 text-black" data-testid="badge-destaque-categoria">
                      ⭐ Destaque
                    </Badge>
                  )}
                </div>
                
                {heroImage && (
                  <div className="mb-6">
                    <img
                      src={heroImage}
                      alt={`${category} do restaurante`}
                      className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
                      loading="lazy"
                      decoding="async"
                      data-testid={`img-category-${getCategoryAnchor(category)}`}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card 
                    key={item.id} 
                    className={`h-full transition-all duration-200 hover-elevate ${isAcai ? 'border-yellow-300 shadow-md' : ''}`}
                    data-testid={`card-item-${item.id}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg leading-tight" data-testid={`text-item-name-${item.id}`}>
                          {item.name}
                        </CardTitle>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xl font-bold text-purple-600 whitespace-nowrap" data-testid={`text-item-price-${item.id}`}>
                            €{item.price}
                          </span>
                          {item.popular && (
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800" data-testid={`badge-popular-${item.id}`}>
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {item.description && (
                        <CardDescription className="text-sm leading-relaxed mb-3" data-testid={`text-item-description-${item.id}`}>
                          {item.description}
                        </CardDescription>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant={item.available ? "default" : "secondary"}
                          className={item.available ? "bg-green-100 text-green-800" : ""}
                          data-testid={`badge-availability-${item.id}`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {item.available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
}