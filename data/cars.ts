import bugatti from "@/assets/cars/bugatti-chiron.jpg";
import koenigsegg from "@/assets/cars/koenigsegg-jesko.jpg";
import pagani from "@/assets/cars/pagani-huayra.jpg";
import rimac from "@/assets/cars/rimac-nevera.jpg";
import ferrari from "@/assets/cars/ferrari-sf90.jpg";
import lambo from "@/assets/cars/lambo-revuelto.jpg";
import mclaren from "@/assets/cars/mclaren-765lt.jpg";
import porsche911 from "@/assets/cars/porsche-911.jpg";
import gtr from "@/assets/cars/nissan-gtr.jpg";
import supra from "@/assets/cars/toyota-supra.jpg";
import rx7 from "@/assets/cars/mazda-rx7.jpg";
import nsx from "@/assets/cars/honda-nsx.jpg";
import hellcat from "@/assets/cars/dodge-hellcat.jpg";
import mustang from "@/assets/cars/mustang-gt500.jpg";
import corvette from "@/assets/cars/corvette-c8.jpg";
import tesla from "@/assets/cars/tesla-plaid.jpg";
import taycan from "@/assets/cars/porsche-taycan.jpg";
import etron from "@/assets/cars/audi-etron-gt.jpg";

export type Category = "Hypercars" | "Supercars" | "JDM" | "Muscle" | "Electric";

export interface Car {
  slug: string;
  name: string;
  category: Category;
  image: string;
  specs: string[];
  origin: string;
  price: string;
  year: number;
  power: string;
  topSpeed: string;
  acceleration: string;
  engine: string;
  transmission: string;
  description: string;
}

export const cars: Car[] = [
  { slug: "bugatti-chiron", name: "Bugatti Chiron", category: "Hypercars", image: bugatti, origin: "França", price: "€3.000.000", year: 2024, power: "1500 cv", topSpeed: "420 km/h", acceleration: "2.4s (0-100)", engine: "W16 Quad-Turbo 8.0L", transmission: "Auto 7v DCT", specs: ["1500 cv", "Velocidade extrema", "Design luxuoso"], description: "Ícone absoluto da engenharia automóvel. O Chiron combina potência brutal com refinamento extremo, representando o auge da Bugatti." },
  { slug: "koenigsegg-jesko", name: "Koenigsegg Jesko", category: "Hypercars", image: koenigsegg, origin: "Suécia", price: "€2.800.000", year: 2024, power: "1600 cv", topSpeed: "480 km/h", acceleration: "2.5s (0-100)", engine: "V8 Twin-Turbo 5.0L", transmission: "LST 9 velocidades", specs: ["Muito raro", "Aerodinâmica avançada", "Mais de 1600 cv"], description: "Hipercarro sueco com aerodinâmica de outro mundo. Produção extremamente limitada." },
  { slug: "pagani-huayra", name: "Pagani Huayra", category: "Hypercars", image: pagani, origin: "Itália", price: "€2.500.000", year: 2024, power: "791 cv", topSpeed: "383 km/h", acceleration: "2.8s (0-100)", engine: "V12 Twin-Turbo AMG 6.0L", transmission: "Auto 7v", specs: ["Interior premium", "Motor V12", "Visual exótico"], description: "Obra de arte italiana. Detalhes artesanais em cada superfície, motor V12 AMG e exclusividade absoluta." },
  { slug: "rimac-nevera", name: "Rimac Nevera", category: "Hypercars", image: rimac, origin: "Croácia", price: "€2.200.000", year: 2024, power: "1914 cv", topSpeed: "412 km/h", acceleration: "1.85s (0-100)", engine: "4x Elétrico", transmission: "Direta", specs: ["Elétrico", "Aceleração brutal", "Tecnologia moderna"], description: "O hipercarro elétrico mais rápido do mundo. Aceleração que desafia a física." },
  { slug: "ferrari-sf90", name: "Ferrari SF90 Stradale", category: "Supercars", image: ferrari, origin: "Itália", price: "€650.000", year: 2024, power: "1000 cv", topSpeed: "340 km/h", acceleration: "2.5s (0-100)", engine: "V8 Híbrido 4.0L", transmission: "Auto 8v DCT", specs: ["Híbrido", "Muito rápido", "Visual moderno"], description: "O primeiro Ferrari de série híbrido plug-in. Tecnologia de F1 nas estradas." },
  { slug: "lambo-revuelto", name: "Lamborghini Revuelto", category: "Supercars", image: lambo, origin: "Itália", price: "€600.000", year: 2024, power: "1015 cv", topSpeed: "350 km/h", acceleration: "2.5s (0-100)", engine: "V12 Híbrido 6.5L", transmission: "Auto 8v DCT", specs: ["Motor V12 híbrido", "Design agressivo", "Alta performance"], description: "O futuro da Lamborghini. V12 atmosférico combinado com três motores elétricos." },
  { slug: "mclaren-765lt", name: "McLaren 765LT", category: "Supercars", image: mclaren, origin: "Reino Unido", price: "€400.000", year: 2023, power: "765 cv", topSpeed: "330 km/h", acceleration: "2.7s (0-100)", engine: "V8 Twin-Turbo 4.0L", transmission: "Auto 7v DCT", specs: ["Muito leve", "Excelente em pista", "Design desportivo"], description: "Longtail focado em pista. Cada grama foi otimizada para performance pura." },
  { slug: "porsche-911", name: "Porsche 911 Turbo S", category: "Supercars", image: porsche911, origin: "Alemanha", price: "€240.000", year: 2024, power: "650 cv", topSpeed: "330 km/h", acceleration: "2.7s (0-100)", engine: "Flat-6 Twin-Turbo 3.8L", transmission: "Auto 8v PDK", specs: ["Muito rápido", "Confortável diário", "Excelente estabilidade"], description: "A definição de supercarro do dia a dia. Performance brutal em qualquer condição." },
  { slug: "nissan-gtr", name: "Nissan GT-R R35", category: "JDM", image: gtr, origin: "Japão", price: "€130.000", year: 2024, power: "570 cv", topSpeed: "315 km/h", acceleration: "2.9s (0-100)", engine: "V6 Twin-Turbo 3.8L", transmission: "Auto 6v DCT", specs: ["Muito conhecido", "Excelente performance", "Popular no tuning"], description: "Godzilla. Uma lenda viva da engenharia japonesa, capaz de humilhar supercarros europeus." },
  { slug: "toyota-supra", name: "Toyota Supra MK5", category: "JDM", image: supra, origin: "Japão", price: "€75.000", year: 2024, power: "387 cv", topSpeed: "250 km/h", acceleration: "3.9s (0-100)", engine: "I6 Turbo 3.0L", transmission: "Auto 8v", specs: ["Design moderno", "Muito popular", "Bom para modificações"], description: "O regresso de um ícone. Plataforma BMW com alma Toyota." },
  { slug: "mazda-rx7", name: "Mazda RX-7", category: "JDM", image: rx7, origin: "Japão", price: "€60.000", year: 1999, power: "276 cv", topSpeed: "250 km/h", acceleration: "5.3s (0-100)", engine: "Rotativo Twin-Turbo 1.3L", transmission: "Manual 5v", specs: ["Motor rotativo", "Clássico japonês", "Lenda JDM"], description: "Lenda absoluta JDM. Motor rotativo Wankel único e equilíbrio perfeito." },
  { slug: "honda-nsx", name: "Honda NSX", category: "JDM", image: nsx, origin: "Japão", price: "€180.000", year: 2022, power: "581 cv", topSpeed: "308 km/h", acceleration: "2.9s (0-100)", engine: "V6 Twin-Turbo Híbrido 3.5L", transmission: "Auto 9v DCT", specs: ["Supercarro japonês", "Tecnologia híbrida", "Design elegante"], description: "O supercarro pensado por Ayrton Senna, reinventado para a era híbrida." },
  { slug: "dodge-hellcat", name: "Dodge Challenger SRT Hellcat", category: "Muscle", image: hellcat, origin: "EUA", price: "€95.000", year: 2023, power: "717 cv", topSpeed: "320 km/h", acceleration: "3.6s (0-100)", engine: "V8 Supercharged 6.2L", transmission: "Auto 8v", specs: ["Muito potente", "Som agressivo", "Visual musculado"], description: "Muscle car puro. Som de V8 supercharged que arrepia e potência absurda." },
  { slug: "mustang-gt500", name: "Ford Mustang Shelby GT500", category: "Muscle", image: mustang, origin: "EUA", price: "€110.000", year: 2023, power: "760 cv", topSpeed: "290 km/h", acceleration: "3.3s (0-100)", engine: "V8 Supercharged 5.2L", transmission: "Auto 7v DCT", specs: ["Ícone americano", "Excelente aceleração", "Clássico e moderno"], description: "O Mustang mais potente de sempre. Herança Shelby num pacote moderno." },
  { slug: "corvette-c8", name: "Chevrolet Corvette C8", category: "Muscle", image: corvette, origin: "EUA", price: "€90.000", year: 2024, power: "495 cv", topSpeed: "312 km/h", acceleration: "2.9s (0-100)", engine: "V8 6.2L Motor Central", transmission: "Auto 8v DCT", specs: ["Motor central", "Preço/performance", "Visual moderno"], description: "A revolução do Corvette. Motor central, preço acessível, performance de supercarro." },
  { slug: "tesla-plaid", name: "Tesla Model S Plaid", category: "Electric", image: tesla, origin: "EUA", price: "€140.000", year: 2024, power: "1020 cv", topSpeed: "322 km/h", acceleration: "2.1s (0-100)", engine: "3x Elétrico", transmission: "Direta", specs: ["Aceleração extrema", "Tecnologia avançada", "Interior minimalista"], description: "A sedan mais rápida do planeta. Aceleração que rivaliza com hipercarros." },
  { slug: "porsche-taycan", name: "Porsche Taycan Turbo S", category: "Electric", image: taycan, origin: "Alemanha", price: "€200.000", year: 2024, power: "761 cv", topSpeed: "260 km/h", acceleration: "2.8s (0-100)", engine: "2x Elétrico", transmission: "Auto 2v", specs: ["Luxuoso", "Excelente condução", "Muito moderno"], description: "O primeiro elétrico verdadeiramente Porsche. Dinâmica de condução intocável." },
  { slug: "audi-etron-gt", name: "Audi RS e-tron GT", category: "Electric", image: etron, origin: "Alemanha", price: "€160.000", year: 2024, power: "646 cv", topSpeed: "250 km/h", acceleration: "3.3s (0-100)", engine: "2x Elétrico", transmission: "Auto 2v", specs: ["Design futurista", "Confortável", "Performance elétrica"], description: "Design de outro planeta combinado com a engenharia Audi. Elétrico com alma desportiva." },
];

export const categories = ["Todos", "Hypercars", "Supercars", "JDM", "Muscle", "Electric"] as const;
