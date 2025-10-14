import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Utensils, Phone, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { COMPLETE_MENU_DATA } from '@/data/menuData';
import { motion } from 'framer-motion';

interface MenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuDialog({ open, onOpenChange }: MenuDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('acai');

  const acaiCategories = COMPLETE_MENU_DATA.slice(0, 3); // Açaí, Toppings Gratuitos, Extras
  const selectedCategoryData = acaiCategories.find(cat => cat.id === selectedCategory) || acaiCategories[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0" data-testid="dialog-menu">
        <DialogHeader className="border-b pb-3 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
          <DialogTitle className="text-lg md:text-2xl font-bold flex items-center" data-testid="text-menu-dialog-title">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-2 text-primary" />
            Menu de Açaí
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm" data-testid="text-menu-dialog-description">
            Toppings gratuitos ilimitados • Extras disponíveis
          </DialogDescription>
        </DialogHeader>

        {/* Category Tabs */}
        <div className="flex gap-2 px-4 md:px-6 py-3 border-b overflow-x-auto">
          {acaiCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className="text-xs md:text-sm whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
              data-testid={`category-tab-${category.id}`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {selectedCategoryData.items.map((item) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="p-3 md:p-4 rounded-lg border hover-elevate bg-card h-full flex flex-col"
                    data-testid={`menu-item-${item.id}`}
                  >
                    {item.popular && (
                      <Badge 
                        variant="destructive" 
                        className="absolute top-2 right-2 text-xs px-1.5 py-0.5"
                        data-testid={`item-popular-${item.id}`}
                      >
                        ★
                      </Badge>
                    )}
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm md:text-base mb-1 leading-tight" data-testid={`item-name-${item.id}`}>
                        {item.name}
                      </h4>
                      <p className="text-muted-foreground text-xs leading-snug line-clamp-2" data-testid={`item-description-${item.id}`}>
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-lg md:text-xl font-bold text-primary" data-testid={`item-price-${item.id}`}>
                        €{item.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t py-3 md:py-4 px-4 md:px-6 bg-muted/30">
          <div className="text-center text-xs md:text-sm text-muted-foreground flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Utensils className="w-3 h-3 md:w-4 md:h-4" />
              Ingredientes Frescos
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 md:w-4 md:h-4" />
              +351 926 227 490
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}