import { Heart, MapPin, Phone, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl text-primary mb-4" data-testid="text-footer-title">
              Lanchonete & Cia
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="text-footer-description">
              Trazendo os autênticos sabores brasileiros para o coração de Vila Real. 
              Açaí cremoso, coxinhas deliciosas e muito mais!
            </p>
            <div className="flex items-center text-muted-foreground">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              <span data-testid="text-footer-tagline">Feito com amor desde 2020</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-quick-links">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-inicio"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-menu"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-sobre"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-contato"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-contact">Contato</h4>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm" data-testid="text-footer-address">
                  Vila Real, Portugal
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                <button
                  onClick={() => window.open('tel:+351926227490')}
                  className="text-sm hover:text-primary transition-colors"
                  data-testid="link-footer-phone"
                >
                  +351 926 227 490
                </button>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Instagram className="w-4 h-4 mr-2" />
                <button
                  onClick={() => window.open('https://instagram.com/lanchonetept.vr', '_blank')}
                  className="text-sm hover:text-primary transition-colors"
                  data-testid="link-footer-instagram"
                >
                  @lanchonetept.vr
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-muted-foreground text-xs md:text-sm" data-testid="text-footer-copyright">
            © 2024 Lanchonete & Cia. Todos os direitos reservados.<br className="md:hidden" />
            <span className="hidden md:inline"> | </span>
            Desenvolvido com ❤️ para compartilhar os sabores do Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}