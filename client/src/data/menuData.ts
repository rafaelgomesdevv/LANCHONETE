// Complete menu data organized by categories
export interface MenuItemData {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  popular?: boolean;
  size?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItemData[];
}

export const COMPLETE_MENU_DATA: MenuCategory[] = [
  {
    id: 'acai',
    name: 'Açaí',
    icon: '🫐',
    items: [
      {
        id: 'acai-350',
        name: 'Açaí 350ml',
        price: '6,00',
        description: 'Açaí cremoso brasileiro com toppings à sua escolha',
        category: 'Açaí',
        size: '350ml',
        popular: true
      },
      {
        id: 'acai-500',
        name: 'Açaí 500ml',
        price: '8,00',
        description: 'Açaí cremoso brasileiro com toppings à sua escolha',
        category: 'Açaí',
        size: '500ml',
        popular: true
      },
      {
        id: 'acai-700',
        name: 'Açaí 700ml',
        price: '11,50',
        description: 'Açaí cremoso brasileiro com toppings à sua escolha',
        category: 'Açaí',
        size: '700ml'
      }
    ]
  },
  {
    id: 'toppings-gratuitos',
    name: 'Toppings Gratuitos',
    icon: '🍓',
    items: [
      {
        id: 'leite-condensado',
        name: 'Leite Condensado',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'granola',
        name: 'Granola',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'leite-po',
        name: 'Leite em Pó',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'creme-nido',
        name: 'Creme de Leite Nido',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'ananas',
        name: 'Ananás',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'banana',
        name: 'Banana',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'kiwi',
        name: 'Kiwi',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'morango',
        name: 'Morango',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      },
      {
        id: 'uva',
        name: 'Uva',
        price: '0,00',
        description: 'Topping gratuito e ilimitado',
        category: 'Toppings'
      }
    ]
  },
  {
    id: 'extras',
    name: 'Extras',
    icon: '✨',
    items: [
      {
        id: 'pacoca',
        name: 'Paçoca',
        price: '1,00',
        description: 'Extra especial',
        category: 'Extras'
      },
      {
        id: 'nutella',
        name: 'Nutella',
        price: '1,50',
        description: 'Extra especial',
        category: 'Extras',
        popular: true
      },
      {
        id: 'doce-leite',
        name: 'Doce de Leite',
        price: '1,00',
        description: 'Extra especial',
        category: 'Extras'
      },
      {
        id: 'kinder',
        name: 'Kinder Bueno',
        price: '1,50',
        description: 'Extra especial',
        category: 'Extras',
        popular: true
      },
      {
        id: 'kitkat',
        name: 'Kitkat',
        price: '1,00',
        description: 'Extra especial',
        category: 'Extras'
      },
      {
        id: 'pintarolas',
        name: 'Pintarolas',
        price: '1,00',
        description: 'Extra especial',
        category: 'Extras'
      },
      {
        id: 'oreo',
        name: 'Oreo',
        price: '1,00',
        description: 'Extra especial',
        category: 'Extras'
      }
    ]
  },
  {
    id: 'salgados',
    name: 'Salgados',
    icon: '🥟',
    items: [
      {
        id: 'empadinha-frango',
        name: 'Empadinha De Frango',
        price: '1,90',
        description: '1 Unidade',
        category: 'Salgados'
      },
      {
        id: 'mini-salgados',
        name: 'Mini Salgados 12 Unidades',
        price: '5,00',
        description: 'Uma combinação dos nossos minis salgados mais populares, perfeita para quem quer provar um pouco de tudo: 3 coxinhas, 3 travesseirinhos, 3 quibes e 3 bolinhas de queijo',
        category: 'Salgados',
        popular: true
      },
      {
        id: 'coxinha',
        name: 'Coxinha',
        price: '1,90',
        description: '1 Unidade',
        category: 'Salgados',
        popular: true
      },
      {
        id: 'kibe',
        name: 'Kibe',
        price: '1,90',
        description: '1 Unidade',
        category: 'Salgados'
      },
      {
        id: 'paes-queijo',
        name: 'Mini Pães De Queijo',
        price: '2,80',
        description: '6 Unidades',
        category: 'Salgados'
      },
      {
        id: 'travesseiro',
        name: 'Travesseiro',
        price: '1,90',
        description: '1 Unidade',
        category: 'Salgados'
      }
    ]
  },
  {
    id: 'quitutes',
    name: 'Quitutes',
    icon: '🫓',
    items: [
      {
        id: 'tapioca-queijo',
        name: 'Tapioca De Queijo',
        price: '4,00',
        description: 'Aprecie a tapioca recheada, uma verdadeira iguaria brasileira que conquista paladares com sua textura leve e versatilidade nos sabores. Originária da mandioca, esta fina massa é delicadamente preparada',
        category: 'Quitutes'
      },
      {
        id: 'tapioca-invertida',
        name: 'Tapioca Invertida De Ovo E Queijo',
        price: '4,00',
        description: 'Aprecie a tapioca recheada, uma verdadeira iguaria brasileira que conquista paladares com sua textura leve e versatilidade nos sabores. Originária da mandioca, esta fina massa é delicadamente preparada',
        category: 'Quitutes'
      },
      {
        id: 'tapioca-mista',
        name: 'Tapioca Mista De Queijo E Fiambre',
        price: '4,50',
        description: 'Aprecie a tapioca recheada, uma verdadeira iguaria brasileira que conquista paladares com sua textura leve e versatilidade nos sabores. Originária da mandioca, esta fina massa é delicadamente preparada',
        category: 'Quitutes'
      },
      {
        id: 'tapioca-frango',
        name: 'Tapioca De Frango E Queijo',
        price: '5,00',
        description: 'Aprecie a tapioca recheada, uma verdadeira iguaria brasileira que conquista paladares com sua textura leve e versatilidade nos sabores. Originária da mandioca, esta fina massa é delicadamente preparada',
        category: 'Quitutes'
      },
      {
        id: 'cuscuz-milho',
        name: 'Cuscuz De Milho Com Queijo E Calabresa',
        price: '6,50',
        description: 'A delicadeza da farinha de milho, o toque sutil de temperos e o aroma inconfundível do vapor com uma textura macia e sabor marcante',
        category: 'Quitutes'
      }
    ]
  },
  {
    id: 'hambúrgueres',
    name: 'Hambúrgueres',
    icon: '🍔',
    items: [
      {
        id: 'burger-x-salada',
        name: 'Burger X-Salada',
        price: '6,30',
        description: 'Com pão, hambúrguer, fiambre, queijo, alface e tomate',
        category: 'Hambúrgueres'
      },
      {
        id: 'menu-burger-x-egg',
        name: 'Menu Burger X-Egg',
        price: '9,80',
        description: 'Com pão, hambúrguer, ovo, fiambre, queijo, alface e tomate, Servido com batata',
        category: 'Hambúrgueres',
        popular: true
      },
      {
        id: 'burger-x-bacon',
        name: 'Burger X-Bacon',
        price: '7,70',
        description: 'Com pão, hambúrguer, bacon, fiambre, queijo, alface e tomate',
        category: 'Hambúrgueres'
      },
      {
        id: 'menu-x-burger',
        name: 'Menu X-Burger',
        price: '7,00',
        description: 'Com pão, hambúrguer, fiambre e queijo, Servido com batata',
        category: 'Hambúrgueres'
      },
      {
        id: 'burger-x-egg-bacon',
        name: 'Burger X-Egg E Bacon',
        price: '8,40',
        description: 'Com pão, hambúrguer, ovo, bacon, fiambre, queijo, alface e tomate',
        category: 'Hambúrgueres'
      },
      {
        id: 'menu-burger-x-bacon',
        name: 'Menu Burger X-Bacon',
        price: '9,80',
        description: 'Com pão, hambúrguer, bacon, fiambre, queijo, alface e tomate, Servido com batata',
        category: 'Hambúrgueres'
      },
      {
        id: 'menu-burger-x-tudo',
        name: 'Menu Burger X-Tudo',
        price: '14,00',
        description: 'Com pão, hambúrguer, ovo, bacon, calabresa, fiambre, salsicha, queijo, milho, alface e tomate, Servido com batata',
        category: 'Hambúrgueres',
        popular: true
      },
      {
        id: 'burger-x-egg',
        name: 'Burger X-Egg',
        price: '7,70',
        description: 'Com pão, hambúrguer, ovo, fiambre, queijo, alface e tomate',
        category: 'Hambúrgueres'
      },
      {
        id: 'menu-burger-x-salada',
        name: 'Menu Burger X-Salada',
        price: '8,40',
        description: 'Com pão, hambúrguer, fiambre, queijo, alface e tomate, Servido com batata',
        category: 'Hambúrgueres'
      },
      {
        id: 'x-burger',
        name: 'X-Burger',
        price: '5,00',
        description: 'Com pão, hambúrguer, fiambre e queijo',
        category: 'Hambúrgueres'
      },
      {
        id: 'menu-burger-x-calabresa',
        name: 'Menu Burger X-Calabresa',
        price: '9,80',
        description: 'Com pão, hambúrguer, calabresa, fiambre, queijo, alface e tomate, Servido com batata',
        category: 'Hambúrgueres'
      },
      {
        id: 'burger-x-calabresa',
        name: 'Burger X-Calabresa',
        price: '7,70',
        description: 'Com pão, hambúrguer, calabresa, fiambre, queijo, alface e tomate',
        category: 'Hambúrgueres'
      }
    ]
  },
  {
    id: 'cervejas',
    name: 'Cervejas',
    icon: '🍺',
    items: [
      {
        id: 'heineken-330',
        name: 'Cerveja Heineken 330ML',
        price: '2,30',
        description: 'Embalagem de 330ML de Cerveja Heineken',
        category: 'Cervejas'
      },
      {
        id: 'heineken-silver-330',
        name: 'Cerveja Heineken Silver 330ML',
        price: '2,30',
        description: 'Embalagem de 330ML de Cerveja Heineken Silver',
        category: 'Cervejas'
      },
      {
        id: 'bohemia-bock-330',
        name: 'Cerveja Bohemia Bock 330ML',
        price: '2,50',
        description: 'Embalagem de 330ML de Cerveja Bohemia',
        category: 'Cervejas'
      },
      {
        id: 'bohemia-330',
        name: 'Cerveja Bohemia 330ML',
        price: '2,30',
        description: 'Embalagem de 330ML de Cerveja Bohemia',
        category: 'Cervejas'
      }
    ]
  },
  {
    id: 'aguas',
    name: 'Águas',
    icon: '💧',
    items: [
      {
        id: 'luso-frutos-vermelhos',
        name: 'Água Luso De Frutos Vermelhos 330ML',
        price: '2,50',
        description: 'Embalagem de 330ML de Água Luso de Frutos Vermelhos',
        category: 'Águas'
      },
      {
        id: 'luso-limao',
        name: 'Água Luso De Limão 330ML',
        price: '2,50',
        description: 'Embalagem de 330ML de Água Luso de Limão',
        category: 'Águas'
      },
      {
        id: 'luso-natural',
        name: 'Água Luso Natural 330ML',
        price: '1,50',
        description: 'Embalagem de 330ML de Água Natural',
        category: 'Águas'
      }
    ]
  },
  {
    id: 'bebidas',
    name: 'Bebidas Diversas',
    icon: '🥤',
    items: [
      {
        id: 'seven-up',
        name: '7UP Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de 7UP',
        category: 'Bebidas'
      },
      {
        id: 'pepsi',
        name: 'Pepsi Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Pepsi',
        category: 'Bebidas'
      },
      {
        id: 'sumol-laranja',
        name: 'Sumol Laranja Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Sumol Laranja',
        category: 'Bebidas'
      },
      {
        id: 'guarana',
        name: 'Guaraná Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Guaraná',
        category: 'Bebidas',
        popular: true
      },
      {
        id: 'frize-limao',
        name: 'Água Frize De Limão 250ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Água Frize de Limão',
        category: 'Bebidas'
      },
      {
        id: 'why-not-limao-erva',
        name: 'Why Not De Limão E Erva Doce 330ML',
        price: '4,00',
        description: 'Embalagem de 330ML de Why Not de Limão e Erva Doce',
        category: 'Bebidas'
      },
      {
        id: 'pepsi-zero',
        name: 'Pepsi Zero Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Pepsi Zero',
        category: 'Bebidas'
      },
      {
        id: 'why-not-framboesa',
        name: 'Why Not De Framboesa E Tomilho 330ML',
        price: '4,00',
        description: 'Embalagem de 330ML de Why Not de Framboesa e Tomilho',
        category: 'Bebidas'
      },
      {
        id: 'why-not-pessego',
        name: 'Why Not De Pêssego E Gengibre 330ML',
        price: '4,00',
        description: 'Embalagem de 330ML de Why Not de Pêssego e Gengibre',
        category: 'Bebidas'
      },
      {
        id: 'ice-tea-pessego',
        name: 'Ice Tea Pêssego Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Ice Tea Pêssego',
        category: 'Bebidas'
      },
      {
        id: 'why-not-cola',
        name: 'Why Not Cola Natural 330ML',
        price: '4,00',
        description: 'Embalagem de 330ML de Why Not de Cola Natural',
        category: 'Bebidas'
      },
      {
        id: 'why-not-roma',
        name: 'Why Not De Romã E Pepino 330ML',
        price: '4,00',
        description: 'Embalagem de 330ML de Why Not de Romã e Pepino',
        category: 'Bebidas'
      },
      {
        id: 'frize-gas',
        name: 'Água Com Gás Frize 250ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Água com Gás Frize',
        category: 'Bebidas'
      },
      {
        id: 'pepsi-lima-zero',
        name: 'Pepsi De Lima Zero Lata 330ML',
        price: '2,00',
        description: 'Embalagem de 330ML de Lima Zero',
        category: 'Bebidas'
      }
    ]
  },
  {
    id: 'porcoes',
    name: 'Porções E Petiscos',
    icon: '🍗',
    items: [
      {
        id: 'calabresa-acebolada',
        name: 'Calabresa Acebolada',
        price: '5,20',
        description: 'Fatias finas de linguiça calabresa embutido defumado e levemente apimentado refogadas com cebolas macias. Uma combinação irresistível de sabores que agrada ao paladar',
        category: 'Porções'
      },
      {
        id: 'frango-passarinho',
        name: 'Frango À Passarinho',
        price: '5,00',
        description: 'Pedacinhos suculentos de frango temperados e fritos, crocantes por fora, irresistivelmente macios e suculentos por dentro',
        category: 'Porções'
      }
    ]
  },
  {
    id: 'cervejas-especiais',
    name: 'Cervejas Especiais',
    icon: '🍻',
    items: [
      {
        id: 'franziskaner',
        name: 'Cerveja Franziskaner 500ML',
        price: '7,00',
        description: 'Embalagem de 500ML de Cerveja Franziskaner',
        category: 'Cervejas Especiais'
      },
      {
        id: 'stella-artois',
        name: 'Cerveja Stella Artois 330ML',
        price: '3,80',
        description: 'Embalagem de 330ML de Cerveja Stella Artois',
        category: 'Cervejas Especiais'
      },
      {
        id: 'leffe',
        name: 'Cerveja Leffe 330ML',
        price: '4,50',
        description: 'Embalagem de 330ML de Cerveja Leffe',
        category: 'Cervejas Especiais'
      },
      {
        id: 'corona',
        name: 'Cerveja Corona 330ML',
        price: '4,20',
        description: 'Embalagem de 330ML de Cerveja Corona',
        category: 'Cervejas Especiais'
      }
    ]
  }
];

// Featured items for the premium showcase
export const FEATURED_ITEMS = [
  {
    id: 'acai-premium',
    name: 'Açaí',
    description: 'Açaí cremoso brasileiro com toppings gratuitos ilimitados',
    category: 'Açaí',
    image: '/src/assets/acai-premium.jpg',
    popular: true,
    sizes: [
      { volume: '350ml', price: '6,00' },
      { volume: '500ml', price: '8,00' },
      { volume: '700ml', price: '11,50' }
    ]
  }
];