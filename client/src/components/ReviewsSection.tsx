import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { type Review } from '@shared/schema';
import { motion } from 'framer-motion';

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Lanchonete+%26+Cia+(A%C3%A7a%C3%AD+%26+Cia)/@41.3055833,-7.7249037,17z/data=!3m1!4b1!4m6!3m5!1s0xd3b4b63a60ea017:0x5298c3e2baabd70c!8m2!3d41.3055833!4d-7.7223234!16s%2Fg%2F11krb3tg55?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D";

export default function ReviewsSection() {
  const { data: reviews, isLoading, error } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="avaliacoes" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4" data-testid="badge-reviews">
            Avaliações
          </Badge>
          <h2 className="text-4xl font-bold mb-4" data-testid="text-reviews-title">
            O Que Dizem Nossos Clientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex" data-testid="stars-average">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-2xl font-bold" data-testid="text-average-rating">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground" data-testid="text-total-reviews">
              ({reviews.length} avaliações)
            </span>
          </div>
          <p className="text-muted-foreground" data-testid="text-reviews-source">
            Avaliações reais do Google Maps
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reviews.slice(0, 6).map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full hover-elevate" data-testid={`card-review-${review.id}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback data-testid={`avatar-${review.id}`}>
                          {review.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold" data-testid={`text-reviewer-name-${review.id}`}>
                          {review.name}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`text-review-date-${review.id}`}>
                          {review.date}
                        </div>
                      </div>
                    </div>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs" data-testid={`badge-verified-${review.id}`}>
                        Verificado
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center mb-3" data-testid={`stars-review-${review.id}`}>
                    {renderStars(review.rating)}
                  </div>
                  <div className="relative">
                    <Quote className="absolute top-0 left-0 w-4 h-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground pl-6" data-testid={`text-review-content-${review.id}`}>
                      {review.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
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
          <p className="text-muted-foreground text-sm mt-4" data-testid="text-google-attribution">
            Fonte: Google Maps Reviews
          </p>
        </motion.div>
      </div>
    </section>
  );
}
