import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { type Review } from '@shared/schema';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Lanchonete+%26+Cia+(A%C3%A7a%C3%AD+%26+Cia)/@41.3055833,-7.7249037,17z/data=!3m1!4b1!4m6!3m5!1s0xd3b4b63a60ea017:0x5298c3e2baabd70c!8m2!3d41.3055833!4d-7.7223234!16s%2Fg%2F11krb3tg55?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D";

const avatarColors = [
  'bg-gradient-to-br from-purple-500 to-pink-500',
  'bg-gradient-to-br from-blue-500 to-cyan-500',
  'bg-gradient-to-br from-green-500 to-emerald-500',
  'bg-gradient-to-br from-orange-500 to-red-500',
  'bg-gradient-to-br from-indigo-500 to-purple-500',
  'bg-gradient-to-br from-pink-500 to-rose-500',
  'bg-gradient-to-br from-yellow-500 to-orange-500',
  'bg-gradient-to-br from-teal-500 to-cyan-500',
];

export default function ReviewsSection() {
  const { data: reviews, isLoading, error } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      skipSnaps: false,
      dragFree: false
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) {
    return (
      <section id="avaliacoes" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">O Que Dizem Nossos Clientes</h2>
            <p className="text-muted-foreground">Carregando avaliações...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !reviews || reviews.length === 0) {
    return (
      <section id="avaliacoes" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">O Que Dizem Nossos Clientes</h2>
            <p className="text-muted-foreground">Erro ao carregar avaliações</p>
          </div>
        </div>
      </section>
    );
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAvatarColor = (index: number) => {
    return avatarColors[index % avatarColors.length];
  };

  const formatReviewDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <section id="avaliacoes" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4" data-testid="badge-reviews">
            Avaliações
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-reviews-title">
            O Que Dizem Nossos Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
            <div className="flex" data-testid="stars-average">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-xl md:text-2xl font-bold" data-testid="text-average-rating">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm md:text-base text-muted-foreground" data-testid="text-total-reviews">
              ({reviews.length} avaliações)
            </span>
          </div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="flex-[0_0_90%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full hover-elevate" data-testid={`card-review-${review.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <Avatar className={`w-12 h-12 ${getAvatarColor(index)}`}>
                          <AvatarFallback className="text-white font-semibold bg-transparent" data-testid={`avatar-${review.id}`}>
                            {review.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold" data-testid={`text-reviewer-name-${review.id}`}>
                            {review.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex" data-testid={`stars-review-${review.id}`}>
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs text-muted-foreground" data-testid={`text-review-date-${review.id}`}>
                              {formatReviewDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-review-content-${review.id}`}>
                        {review.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex z-10"
            onClick={scrollPrev}
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex z-10"
            onClick={scrollNext}
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <motion.div 
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="group"
            onClick={() => window.open(GOOGLE_MAPS_URL, '_blank')}
            data-testid="button-view-more-reviews"
          >
            Ver Mais Avaliações
            <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
