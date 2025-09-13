import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Instagram, ExternalLink } from 'lucide-react';

const businessHours = [
  { day: 'Segunda-feira', hours: '12:00 - 23:00' },
  { day: 'Terça-feira', hours: 'Fechado' },
  { day: 'Quarta-feira', hours: '12:00 - 23:00' },
  { day: 'Quinta-feira', hours: '12:00 - 23:00' },
  { day: 'Sexta-feira', hours: '12:00 - 23:00' },
  { day: 'Sábado', hours: '15:00 - 23:00' },
  { day: 'Domingo', hours: '15:00 - 23:00' }
];

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefone',
    value: '+351 926 227 490',
    action: 'tel:+351926227490'
  },
  {
    icon: MapPin,
    label: 'Morada',
    value: 'Praça Dona Maria Santos Belé, Lote 3, Ent. E, Loja A, 5000-065 Vila Real, Portugal',
    action: null
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@lanchonetept.vr',
    action: 'https://instagram.com/lanchonetept.vr'
  }
];

export default function ContactSection() {
  const currentDay = new Date().getDay();
  const dayMapping = [6, 0, 1, 2, 3, 4, 5]; // Sunday = 6, Monday = 0, etc.
  const todayIndex = dayMapping[currentDay];

  return (
    <section id="contato" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="badge-contact">
            Contato
          </Badge>
          <h2 className="text-4xl font-bold mb-4" data-testid="text-contact-title">
            Visite-nos ou Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-contact-description">
            Estamos aqui para lhe servir os melhores sabores brasileiros
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-contact-info-title">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start space-x-3" data-testid={`contact-${info.label.toLowerCase()}`}>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1" data-testid={`text-${info.label.toLowerCase()}-label`}>
                        {info.label}
                      </p>
                      {info.action ? (
                        <button
                          className="p-0 h-auto text-left text-muted-foreground hover:text-primary underline"
                          onClick={() => window.open(info.action, '_blank')}
                          data-testid={`button-${info.label.toLowerCase()}`}
                        >
                          {info.value}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </button>
                      ) : (
                        <p className="text-muted-foreground" data-testid={`text-${info.label.toLowerCase()}-value`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center" data-testid="text-hours-title">
                  <Clock className="w-5 h-5 mr-2" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center py-2 px-3 rounded-md bg-[transparent]"
                      data-testid={`schedule-${schedule.day.toLowerCase().replace('-', '')}`}
                    >
                      <span className="font-normal">
                        {schedule.day}
                      </span>
                      <span className="font-normal text-[red]">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <div className="lg:col-span-2">
            <Card className="h-full mt-[0px] mb-[0px] pt-[0px] pb-[0px] ml-[0px] mr-[0px] pl-[10px] pr-[10px]">
              <CardHeader>
                <CardTitle data-testid="text-location-title">Nossa Localização</CardTitle>
              </CardHeader>
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

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-cta-description">
              Pronto para experimentar os autênticos sabores brasileiros?
            </p>
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
                data-testid="button-instagram"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Seguir no Instagram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}