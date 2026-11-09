import { Product, CategoryItem } from '@/types/product';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'todos',
    name: 'Todo el Catálogo',
    slug: 'todos',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    itemCount: 8,
    tagline: 'Colección Completa 2026'
  },
  {
    id: 'vestidos',
    name: 'Vestidos & Gala',
    slug: 'vestidos',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    itemCount: 3,
    tagline: 'Elegancia para tus momentos inolvidables'
  },
  {
    id: 'blusas',
    name: 'Blusas & Tops',
    slug: 'blusas',
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&auto=format&fit=crop&q=80',
    itemCount: 1,
    tagline: 'Texturas de seda, satén y lino puro'
  },
  {
    id: 'blazers',
    name: 'Blazers & Sastrería',
    slug: 'blazers',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&auto=format&fit=crop&q=80',
    itemCount: 2,
    tagline: 'Cortes estructurados y siluetas de impacto'
  },
  {
    id: 'pantalones',
    name: 'Pantalones & Faldas',
    slug: 'pantalones',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&auto=format&fit=crop&q=80',
    itemCount: 1,
    tagline: 'Movimiento fluido y confort sofisticado'
  },
  {
    id: 'accesorios',
    name: 'Bolsos & Accesorios',
    slug: 'accesorios',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    itemCount: 1,
    tagline: 'Detalles que definen el lujo discreto'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'vc-01',
    barcode: '744100123001',
    name: 'Vestido Lencero de Satén Champagne',
    subtitle: 'Silueta fluida al bies con escote desbocado',
    category: 'vestidos',
    categoryLabel: 'Vestidos & Gala',
    price: 189,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Gold', hex: '#e8d8c3' },
      { name: 'Blush Rosé', hex: '#d99fa5' },
      { name: 'Negro Ébano', hex: '#1c1b1b' }
    ],
    tag: 'MÁS VENDIDO',
    inStock: true,
    description: 'Confeccionado en suntuoso satén de seda con corte al bies que acaricia suavemente la figura. Presenta tirantes finos ajustables, espalda descubierta sutil y una caída impecable.',
    details: [
      'Satén de seda de alta densidad con brillo perlado',
      'Corte al bies para caída natural y sin rigidez',
      'Largo midi elegante con abertura lateral oculta',
      'Lavar en seco o a mano con jabón neutro'
    ],
    composition: '100% Satén de Seda Premium',
    isFeatured: true
  },
  {
    id: 'vc-02',
    barcode: '744100123002',
    name: 'Blazer Cruzado Sastre Marfil Studio',
    subtitle: 'Solapas de pico en tejido crepé italiano',
    category: 'blazers',
    categoryLabel: 'Blazers & Sastrería',
    price: 245,
    rating: 5.0,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanco Marfil', hex: '#f7f4ed' },
      { name: 'Rosa Empolvado', hex: '#c27b88' },
      { name: 'Camel Warm', hex: '#b58a63' }
    ],
    tag: 'NUEVO',
    inStock: true,
    description: 'La quintaesencia del poder femenino moderno. Nuestro blazer cruzado de inspiración atelier presenta hombreras sutiles, botones forrados a tono y un forro interior en jacquard personalizado.',
    details: [
      'Botonadura cruzada con botones forrados a mano',
      'Bolsillos con solapa y bolsillo de ojal en pecho',
      'Abertura posterior doble para libertad de movimiento',
      'Forro satinado transpirable antiestático'
    ],
    composition: '72% Crepé de Lana Fina, 26% Viscosa, 2% Elastano',
    isFeatured: true
  },
  {
    id: 'vc-03',
    barcode: '744100123003',
    name: 'Vestido Midi Plisado Blush Romantic',
    subtitle: 'Plisado acordeón con cinturón lazo de terciopelo',
    category: 'vestidos',
    categoryLabel: 'Vestidos & Gala',
    price: 215,
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Rosa Pastel', hex: '#e9b5bd' },
      { name: 'Verde Sabio', hex: '#9fa899' }
    ],
    tag: 'EDICIÓN LIMITADA',
    inStock: true,
    description: 'Un diseño etéreo y romántico creado para destacar en celebraciones diurnas o cócteles exclusivos. Su falda plisada produce un movimiento hipnótico al caminar.',
    details: [
      'Microplisado permanente de alta definición',
      'Escote en V cruzado con cierre de seguridad interior',
      'Cinturón desmontable a contraste en terciopelo suave',
      'Borde de bajo cosido a mano'
    ],
    composition: '100% Gasa Georgette de Seda',
    isFeatured: true
  },
  {
    id: 'vc-04',
    barcode: '744100123004',
    name: 'Blusa Crepé de Seda con Lazadas Lavallière',
    subtitle: 'Cuello victoriano moderno y mangas abullonadas',
    category: 'blusas',
    categoryLabel: 'Blusas & Tops',
    price: 135,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Crema Perla', hex: '#fdfbf7' },
      { name: 'Rosa Nude', hex: '#d9a8b1' }
    ],
    tag: 'NUEVO',
    inStock: true,
    description: 'Sofisticación refinada para el día a día o eventos ejecutivos. Su lazada en el cuello permite múltiples estilismos: anudada en lazo victoriano o dejada caer en cascada informal.',
    details: [
      'Puños con botonadura de nácar natural',
      'Manga raglán con frunces delicados en puño',
      'Tejido con caída pesada semitransparente',
      'Corte relajado pero entallado en hombros'
    ],
    composition: '100% Seda Crepé de Chine',
    isFeatured: false
  },
  {
    id: 'vc-05',
    barcode: '744100123005',
    name: 'Pantalón Palazzo de Lino y Seda Terracota',
    subtitle: 'Tiro alto con pinzas francesas frontales',
    category: 'pantalones',
    categoryLabel: 'Pantalones & Faldas',
    price: 165,
    rating: 4.7,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Terracota Cálido', hex: '#c06b52' },
      { name: 'Arena Desierto', hex: '#d8c4b2' },
      { name: 'Negro Puro', hex: '#1e1c1b' }
    ],
    tag: 'EXCLUSIVO',
    inStock: true,
    description: 'La máxima expresión del lujo relajado. Diseñado con una silueta de pernera ancha que alarga visualmente las piernas, manteniendo una sensación de frescura inigualable.',
    details: [
      'Cintura alta reforzada con pasadores para cinturón fino',
      'Doble pinza frontal que aporta volumen medido',
      'Bolsillos laterales franceses invisibles',
      'Tejido pre-lavado para evitar encogimiento'
    ],
    composition: '65% Lino Orgánico Europeo, 35% Seda Natural',
    isFeatured: false
  },
  {
    id: 'vc-06',
    barcode: '744100123006',
    name: 'Bolso Tote Mini Atelier en Piel Graneada',
    subtitle: 'Herrajes en oro cepillado y correa bandolera',
    category: 'accesorios',
    categoryLabel: 'Bolsos & Accesorios',
    price: 275,
    rating: 5.0,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['ÚNICO'],
    colors: [
      { name: 'Caramelo Tostado', hex: '#9d633b' },
      { name: 'Rosa Cuarzo', hex: '#c27b88' },
      { name: 'Marfil Antiguo', hex: '#ede6dd' }
    ],
    tag: 'MÁS VENDIDO',
    inStock: true,
    description: 'Elaborado artesanalmente por maestros marroquineros. Cuenta con interior forrado en gamuza suave, compartimento seguro con cremallera y herrajes metálicos protegidos.',
    details: [
      'Piel vacuna italiana de curtición vegetal sostenible',
      'Cierre magnético oculto de alta fijación',
      'Bandolera regulable y desmontable',
      'Dimensiones: 22 cm x 18 cm x 9 cm'
    ],
    composition: '100% Piel Genuina de Origen Italiano',
    isFeatured: true
  },
  {
    id: 'vc-07',
    barcode: '744100123007',
    name: 'Vestido Largo Esmeralda Cut-Out Sensual',
    subtitle: 'Abertura en cintura y escote asimétrico',
    category: 'vestidos',
    categoryLabel: 'Vestidos & Gala',
    price: 260,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Verde Esmeralda', hex: '#1c5e46' },
      { name: 'Azul Noche Profundo', hex: '#1a2744' }
    ],
    tag: 'EXCLUSIVO',
    inStock: true,
    description: 'Una pieza magnética que captura miradas en cualquier velada. El detalle cut-out asimétrico define la cintura con sutileza y modernidad.',
    details: [
      'Tejido crepé stretch de alto gramaje con caída drapeada',
      'Espalda semidescubierta con tirante único cruzado',
      'Abertura pronunciada hasta el muslo para caminar con garbo',
      'Cierre con cremallera invisible lateral'
    ],
    composition: '95% Poliéster Reciclado Premium, 5% Spandex',
    isFeatured: true
  },
  {
    id: 'vc-08',
    barcode: '744100123008',
    name: 'Conjunto Sastre Chaleco & Pantalón Rosé',
    subtitle: 'Pieza de dos prendas coordinadas en lino fino',
    category: 'blazers',
    categoryLabel: 'Blazers & Sastrería',
    price: 280,
    rating: 4.9,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Rosa Boutique', hex: '#c27b88' },
      { name: 'Blanco Lino', hex: '#f0ece3' }
    ],
    tag: 'EXCLUSIVO',
    inStock: true,
    description: 'La tendencia sastre más deseada de la temporada. Chaleco entallado con espalda ajustable y pantalón de pernera recta con raya planchada impecable.',
    details: [
      'Incluye chaleco sastre forrado y pantalón recto',
      'Hebilla trasera metálica regulable en chaleco',
      'Cierre con botón de asta natural',
      'Apto para usar juntos o en combinaciones separadas'
    ],
    composition: '60% Lino Francés, 40% Algodón Peinado',
    isFeatured: true
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Valentina Mendoza',
    city: 'Managua / Estelí',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    comment: 'La calidad del vestido de satén superó todas mis expectativas. El corte al bies cae como un guante y el empaque perfumado con la bolsa de Variedades Castro me hizo sentir en una boutique de lujo. Llegó con envío local el mismo día.',
    rating: 5,
    productPurchased: 'Vestido Lencero de Satén Champagne'
  },
  {
    id: 2,
    name: 'Camila Villalobos',
    city: 'León / Granada',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    comment: 'Compré el blazer marfil cruzado para mi presentación ejecutiva. La confección, hombreras y forro son de sastrería pura de alta gama. El servicio de atención por WhatsApp en su horario fue excelente.',
    rating: 5,
    productPurchased: 'Blazer Cruzado Sastre Marfil Studio'
  },
  {
    id: 3,
    name: 'Sofía Arboleda',
    city: 'Matagalpa / Chinandega',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    comment: 'Es mi tercera compra en Variedades Castro. Las telas no se deforman y los colores son idénticos. El envío nacional a departamento llegó súper rápido e impecablemente empacado.',
    rating: 5,
    productPurchased: 'Bolso Tote Mini Atelier en Piel'
  }
];
