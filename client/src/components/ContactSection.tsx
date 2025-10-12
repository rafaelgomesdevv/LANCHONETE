import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';

const businessHours = [
  { day: 'Seg', hours: '12h - 23h' },
  { day: 'Ter', hours: 'Fechado', closed: true },
  { day: 'Qua', hours: '12h - 23h' },
  { day: 'Qui', hours: '12h - 23h' },
  { day: 'Sex', hours: '12h - 23h' },
  { day: 'Sáb', hours: '15h - 23h' },
  { day: 'Dom', hours: '15h - 23h' }
];

export default function ContactSection() {
  return (
    <section id="contato" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="badge-contact">
            Contato
          </Badge>
          <h2 className="text-4xl font-bold mb-4" data-testid="text-contact-title">
            Visite-nos
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-contact-info-title">
                  <Phone className="w-5 h-5" />
                  Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Telefone</p>
                  <button
                    className="font-semibold hover:text-primary transition-colors"
                    onClick={() => window.open('tel:+351926227490')}
                    data-testid="button-telefone"
                  >
                    +351 926 227 490
                  </button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Instagram</p>
                  <button
                    className="font-semibold hover:text-primary transition-colors flex items-center gap-1"
                    onClick={() => window.open('https://instagram.com/lanchonetept.vr', '_blank')}
                    data-testid="button-instagram"
                  >
                    <Instagram className="w-4 h-4" />
                    @lanchonetept.vr
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" data-testid="text-hours-title">
                  <Clock className="w-5 h-5" />
                  Horário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between gap-2 flex-wrap">
                  {businessHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex flex-col items-center"
                      data-testid={`schedule-${schedule.day.toLowerCase()}`}
                    >
                      <span className="font-medium text-sm mb-1">{schedule.day}</span>
                      <span className={`text-xs ${schedule.closed ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Morada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Praça Dona Maria Santos Belé, Lote 3<br/>
                  5000-065 Vila Real
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="h-[500px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.4555555555557!2d-7.7249037!3d41.3055833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3b4b63a60ea017%3A0x5298c3e2baabd70c!2sLanchonete%20%26%20Cia%20(A%C3%A7a%C3%AD%20%26%20Cia)!5e0!3m2!1sen!2spt!4v1625097600000!5m2!1sen!2spt"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lanchonete & Cia Location"
                    data-testid="map-location"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.open('tel:+351926227490')}
              data-testid="button-call"
            >
              <Phone className="w-5 h-5 mr-2" />
              Ligar Agora
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://instagram.com/lanchonetept.vr', '_blank')}
              data-testid="button-instagram-cta"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Seguir Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
