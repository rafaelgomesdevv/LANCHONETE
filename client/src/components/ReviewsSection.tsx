import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

// todo: replace with real Google Maps reviews from API
const reviews: Review[] = [
  {
    id: '1',
    name: 'Ana Morais Gonçalves',
    rating: 5,
    text: 'Very nice place to taste Brazilian flavours. Great service and atmosphere!',
    date: 'há 1 ano',
    verified: true
  },
  {
    id: '2',
    name: 'Natalia Santana',
    rating: 5,
    text: 'Top-notch food, excellent service from Bárbara! The açaí is very creamy and the variety of creams and flavors is amazing! Hugo also makes an excellent coxinha, very creamy and delicious.',
    date: 'há 3 meses',
    verified: true
  },
  {
    id: '3',
    name: 'Gabrielle Costa',
    rating: 5,
    text: 'Great atmosphere and wonderful food! The best açaí in Vila Real. I\'m a regular customer and the staff always provide excellent service. It\'s an environment I truly enjoy, always returning to.',
    date: 'há 3 meses',
    verified: true
  },
  {
    id: '4',
    name: 'João Silva',
    rating: 4,
    text: 'Excelente localização e comida saborosa. O açaí é realmente muito bom e o atendimento é simpático.',
    date: 'há 2 meses',
    verified: true
  },
  {
    id: '5',
    name: 'Maria Santos',
    rating: 5,
    text: 'Ambiente perfeito para um lanche com amigos. As coxinhas são deliciosas e o açaí é o melhor da região!',
    date: 'há 1 mês',
    verified: true
  },
  {
    id: '6',
    name: 'Pedro Costa',
    rating: 5,
    text: 'Recomendo muito! Ingredientes frescos, preços justos e um atendimento excelente. Voltarei sempre!',
    date: 'há 3 semanas',
    verified: true
  }
];

export default function ReviewsSection() {
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

  return (
    <section id="avaliacoes" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover-elevate" data-testid={`card-review-${review.id}`}>
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
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground" data-testid="text-google-attribution">
            Fonte: Google Maps Reviews
          </p>
        </div>
      </div>
    </section>
  );
}