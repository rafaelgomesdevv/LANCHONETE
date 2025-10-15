import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Size {
  id: string;
  volume: string;
  price: number;
}

interface Flavor {
  id: string;
  name: string;
}

interface Topping {
  id: string;
  name: string;
  price: number;
}

const SIZES: Size[] = [
  { id: '350ml', volume: '350 ML', price: 6 },
  { id: '500ml', volume: '500 ML', price: 8 },
  { id: '700ml', volume: '700 ML', price: 11.5 }
];

const FLAVORS: Flavor[] = [
  { id: 'tradicional', name: 'Açaí Tradicional' },
  { id: 'zero', name: 'Açaí Zero' },
  { id: 'maracuja', name: 'Maracujá' },
  { id: 'manga', name: 'Manga' },
  { id: 'pitaya', name: 'Pitaya' },
  { id: 'cupuacu', name: 'Cupuaçu' }
];

const FREE_TOPPINGS: Topping[] = [
  { id: 'leite-condensado', name: 'Leite Condensado', price: 0 },
  { id: 'granola', name: 'Granola', price: 0 },
  { id: 'leite-po', name: 'Leite em Pó', price: 0 },
  { id: 'creme-nido', name: 'Creme de Leite Nido', price: 0 },
  { id: 'ananas', name: 'Ananás', price: 0 },
  { id: 'banana', name: 'Banana', price: 0 },
  { id: 'kiwi', name: 'Kiwi', price: 0 },
  { id: 'morango', name: 'Morango', price: 0 },
  { id: 'uva', name: 'Uva', price: 0 }
];

const EXTRA_TOPPINGS: Topping[] = [
  { id: 'pacoca', name: 'Paçoca', price: 1 },
  { id: 'nutella', name: 'Nutella', price: 1.5 },
  { id: 'doce-leite', name: 'Doce de Leite', price: 1 },
  { id: 'kinder', name: 'Kinder Bueno', price: 1.5 },
  { id: 'kitkat', name: 'Kitkat', price: 1 },
  { id: 'pintarolas', name: 'Pintarolas', price: 1 },
  { id: 'oreo', name: 'Oreo', price: 1 }
];

export default function AcaiBuilder() {
  const [step, setStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedFreeToppings, setSelectedFreeToppings] = useState<string[]>([]);
  const [selectedExtraToppings, setSelectedExtraToppings] = useState<string[]>([]);

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavorId)
        ? prev.filter(id => id !== flavorId)
        : [...prev, flavorId]
    );
  };

  const toggleFreeTopping = (toppingId: string) => {
    setSelectedFreeToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const toggleExtraTopping = (toppingId: string) => {
    setSelectedExtraToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const calculateTotal = () => {
    const basePrice = selectedSize?.price || 0;
    const extrasPrice = selectedExtraToppings.reduce((sum, toppingId) => {
      const topping = EXTRA_TOPPINGS.find(t => t.id === toppingId);
      return sum + (topping?.price || 0);
    }, 0);
    return basePrice + extrasPrice;
  };

  const canProceedToStep2 = selectedSize !== null;
  const canProceedToStep3 = selectedFlavors.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className="flex items-center flex-1">
            <div className="flex flex-col items-center w-full">
              <motion.div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-colors ${
                  step >= stepNum
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                animate={{ scale: step === stepNum ? 1.1 : 1 }}
                data-testid={`step-indicator-${stepNum}`}
              >
                {step > stepNum ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : stepNum}
              </motion.div>
              <span className="text-xs md:text-sm mt-1 text-center hidden sm:block">
                {stepNum === 1 && 'Tamanho'}
                {stepNum === 2 && 'Sabor'}
                {stepNum === 3 && 'Toppings'}
                {stepNum === 4 && 'Extras'}
              </span>
            </div>
            {stepNum < 4 && (
              <div
                className={`h-1 flex-1 mx-1 md:mx-2 transition-colors ${
                  step > stepNum ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Size Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            data-testid="step-size"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Escolha o Tamanho
            </h2>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-6">
              Selecione o tamanho do seu açaí
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
              {SIZES.map((size) => (
                <Card
                  key={size.id}
                  className={`cursor-pointer transition-all hover-elevate ${
                    selectedSize?.id === size.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                  data-testid={`size-option-${size.id}`}
                >
                  <CardContent className="p-4 md:p-6 text-center">
                    {selectedSize?.id === size.id && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {size.volume}
                    </div>
                    <div className="text-xl md:text-2xl font-semibold">
                      €{size.price.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!canProceedToStep2}
              data-testid="button-next-step-1"
            >
              Continuar
            </Button>
          </motion.div>
        )}

        {/* Step 2: Flavor Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            data-testid="step-flavor"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Escolha o Sabor
            </h2>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-2">
              Selecione os sabores do seu açaí
            </p>
            <Badge variant="secondary" className="mx-auto block w-fit mb-6">
              {selectedFlavors.length} selecionados
            </Badge>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
              {FLAVORS.map((flavor) => (
                <Card
                  key={flavor.id}
                  className={`cursor-pointer transition-all hover-elevate ${
                    selectedFlavors.includes(flavor.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : ''
                  }`}
                  onClick={() => toggleFlavor(flavor.id)}
                  data-testid={`flavor-option-${flavor.id}`}
                >
                  <CardContent className="p-4 text-center relative">
                    {selectedFlavors.includes(flavor.id) && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      </div>
                    )}
                    <div className="text-sm md:text-base font-semibold">
                      {flavor.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setStep(1)}
                data-testid="button-back-step-2"
              >
                Voltar
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => setStep(3)}
                disabled={!canProceedToStep3}
                data-testid="button-next-step-2"
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Free Toppings */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            data-testid="step-toppings"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Escolha os Toppings
            </h2>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-2">
              Toppings ilimitados e gratuitos
            </p>
            <Badge variant="secondary" className="mx-auto block w-fit mb-6">
              {selectedFreeToppings.length} selecionados
            </Badge>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-6">
              {FREE_TOPPINGS.map((topping) => (
                <Card
                  key={topping.id}
                  className={`cursor-pointer transition-all hover-elevate ${
                    selectedFreeToppings.includes(topping.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : ''
                  }`}
                  onClick={() => toggleFreeTopping(topping.id)}
                  data-testid={`free-topping-${topping.id}`}
                >
                  <CardContent className="p-3 text-center relative">
                    {selectedFreeToppings.includes(topping.id) && (
                      <div className="absolute top-1 right-1">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                    <div className="text-xs md:text-sm font-medium">
                      {topping.name}
                    </div>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Grátis
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setStep(2)}
                data-testid="button-back-step-3"
              >
                Voltar
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => setStep(4)}
                data-testid="button-next-step-3"
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Extra Toppings & Summary */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            data-testid="step-extras"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Extras Especiais
            </h2>
            <p className="text-sm md:text-base text-muted-foreground text-center mb-6">
              Adicione toppings extras ao seu açaí (opcional)
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mb-6">
              {EXTRA_TOPPINGS.map((topping) => (
                <Card
                  key={topping.id}
                  className={`cursor-pointer transition-all hover-elevate ${
                    selectedExtraToppings.includes(topping.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : ''
                  }`}
                  onClick={() => toggleExtraTopping(topping.id)}
                  data-testid={`extra-topping-${topping.id}`}
                >
                  <CardContent className="p-3 text-center relative">
                    {selectedExtraToppings.includes(topping.id) ? (
                      <div className="absolute top-1 right-1">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-1 right-1">
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="text-xs md:text-sm font-medium mb-1">
                      {topping.name}
                    </div>
                    <div className="text-sm font-bold text-primary">
                      +€{topping.price.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="mb-6 bg-muted/50">
              <CardContent className="p-4 md:p-6">
                <h3 className="font-bold text-lg mb-4">Resumo do Pedido</h3>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tamanho:</span>
                    <span className="font-semibold">{selectedSize?.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sabor:</span>
                    <span className="font-semibold">
                      {selectedFlavors.map(id => FLAVORS.find(f => f.id === id)?.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Toppings Grátis:</span>
                    <span className="font-semibold">{selectedFreeToppings.length}</span>
                  </div>
                  {selectedExtraToppings.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extras:</span>
                      <span className="font-semibold">{selectedExtraToppings.length}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl md:text-3xl font-bold text-primary" data-testid="total-price">
                      €{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => setStep(3)}
                data-testid="button-back-step-4"
              >
                Voltar
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => window.open('https://www.ubereats.com/pt/store/lanchonete-%26-cia/enCC5eHcXBantUgIKxZ3SA?mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25227a7082e5-e1dc-5c16-a7b5-48082b167748%2522%252C%2522sectionUuid%2522%253A%2522adf2312b-05f3-4564-8a71-6a288fd35bc9%2522%252C%2522subsectionUuid%2522%253A%25225f48ef37-92f4-4663-bef0-1388f3fde872%2522%252C%2522itemUuid%2522%253A%25221c13ea88-ad8a-43e9-854e-f9426471e0ef%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1', '_blank')}
                data-testid="button-finalize-order"
              >
                Encomendar por Uber Eats
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
