import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Utensils, Star, Phone, Truck } from 'lucide-react';
import { useState, useMemo } from 'react';
import { COMPLETE_MENU_DATA, type MenuItemData } from '@/data/menuData';

interface MenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuDialog({ open, onOpenChange }: MenuDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    let filtered = COMPLETE_MENU_DATA;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(category => category.id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        )
      })).filter(category => category.items.length > 0);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const totalCategories = COMPLETE_MENU_DATA.length;
  const totalItems = COMPLETE_MENU_DATA.reduce((sum, category) => sum + category.items.length, 0);

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col" data-testid="dialog-menu">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center" data-testid="text-menu-dialog-title">
            <Utensils className="w-6 h-6 mr-3" />
            Menu Completo - Lanchonete & Cia
          </DialogTitle>
          <DialogDescription data-testid="text-menu-dialog-description">
            {totalCategories} categorias • {totalItems} itens disponíveis
          </DialogDescription>
        </DialogHeader>

        {/* Search and Filters */}
        <div className="py-4 border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar pratos, ingredientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-6 text-lg"
              data-testid="input-menu-search"
            />
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                data-testid="button-clear-search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className="h-auto py-2 px-3"
              onClick={() => setSelectedCategory(null)}
              data-testid="category-filter-all"
            >
              Todas as Categorias
            </Button>
            {COMPLETE_MENU_DATA.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="h-auto py-2 px-3"
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`category-filter-${category.id}`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-12" data-testid="no-results">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhum item encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar sua pesquisa ou filtros</p>
            </div>
          ) : (
            <div className="space-y-8 py-4">
              {filteredData.map((category) => (
                <div key={category.id} className="space-y-4" data-testid={`menu-category-${category.id}`}>
                  <div className="flex items-center space-x-3 border-b pb-3">
                    <h3 className="text-xl font-bold text-primary" data-testid={`category-title-${category.id}`}>
                      {category.name}
                    </h3>
                    <Badge variant="secondary" data-testid={`category-count-${category.id}`}>
                      {category.items.length} itens
                    </Badge>
                  </div>

                  <div className="grid gap-3">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start p-4 rounded-lg border hover-elevate transition-all duration-200"
                        data-testid={`menu-item-${item.id}`}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg leading-tight" data-testid={`item-name-${item.id}`}>
                              {item.name}
                              {item.popular && (
                                <Badge variant="destructive" className="ml-2 text-xs" data-testid={`item-popular-${item.id}`}>
                                  <Star className="w-3 h-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </h4>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-2" data-testid={`item-description-${item.id}`}>
                            {item.description}
                          </p>
                          <Badge variant="outline" className="text-xs" data-testid={`item-category-${item.id}`}>
                            {item.category}
                          </Badge>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-primary mb-1" data-testid={`item-price-${item.id}`}>
                            €{item.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t pt-4">
          <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Utensils className="w-4 h-4" />
              Ingredientes frescos
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Entregas disponíveis
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +351 926 227 490
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}