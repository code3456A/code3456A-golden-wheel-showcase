import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass, Sparkles, Navigation, Car } from "lucide-react";

export const Route = createFileRoute("/localizacao")({
  component: Localizacao,
  head: () => ({
    meta: [
      { title: "Showrooms Privados e Localizações — LuxuryCars" },
      { name: "description", content: "Explore as nossas localizações confidenciais em Lisboa, Porto, Portimão, Mónaco e Dubai. Showrooms exclusivos sob marcação prévia." },
    ],
  }),
});

interface ShowroomData {
  id: string;
  city: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coords: string;
  mapX: string; // Percentagem horizontal no SVG de mapa simulado
  mapY: string; // Percentagem vertical no SVG de mapa simulado
}

function LogoMini() {
  return (
    <div className="flex items-center gap-3 select-none">
      <span className="text-gold tracking-[0.4em] font-light text-[10px] uppercase">◆</span>
      <span className="font-display font-bold tracking-[0.2em] text-gold-gradient text-sm md:text-base">LuxuryCars</span>
    </div>
  );
}

function Localizacao() {
  const showrooms: ShowroomData[] = [
    {
      id: "lisboa",
      city: "Lisboa",
      location: "Parque das Nações",
      address: "Avenida D. João II, Lote 1.16, 1990-083 Lisboa, Portugal",
      phone: "+351 210 990 000 (Concierge Geral)",
      email: "lisbon@luxurycars.com",
      hours: "Segunda a Sexta: 09:30h - 19:30h | Sábado: Por marcação",
      coords: "38.7702° N, 9.0967° W",
      mapX: "24%",
      mapY: "74%",
    },
    {
      id: "porto",
      city: "Porto",
      location: "Foz do Douro",
      address: "Avenida de Montevideu, 450, 4150-516 Porto, Portugal",
      phone: "+351 220 880 000 (Concierge Norte)",
      email: "porto@luxurycars.com",
      hours: "Segunda a Sexta: 10:00h - 19:00h | Sábado: Apenas VIP",
      coords: "41.1621° N, 8.6802° W",
      mapX: "23%",
      mapY: "68%",
    },
    {
      id: "portimao",
      city: "Portimão",
      location: "Marina de Portimão",
      address: "Edifício da Marina, Pontão 4, 8500-802 Portimão, Portugal",
      phone: "+351 282 770 000 (Concierge Sul)",
      email: "portimao@luxurycars.com",
      hours: "Terça a Sábado: 11:00h - 20:00h | Domingo/Segunda: Fechado",
      coords: "37.1198° N, 8.5284° W",
      mapX: "24.5%",
      mapY: "78%",
    },
    {
      id: "monaco",
      city: "Dubai",
      location: "Dubai Marina",
      address: "Marina Plaza, Suite 3201, Dubai Marina, EAU",
      phone: "+971 4 454 0000 (Concierge Gulf)",
      email: "dubai@luxurycars.com",
      hours: "Domingo a Quinta: 11:00h - 21:00h | Sexta/Sábado: Fechado",
      coords: "25.0805° N, 55.1403° E",
      mapX: "88%",
      mapY: "82%",
    },
    {
      id: "sao-paulo",
      city: "São Paulo",
      location: "Jardins",
      address: "Avenida Europa, 123 – Jardins, São Paulo – SP, Brasil",
      phone: "+55 11 5555-1234 (Concierge São Paulo)",
      email: "sao.paulo@luxurycars.com",
      hours: "Segunda a Sexta: 09:30h - 19:30h | Sábado: Por marcação",
      coords: "23.5587° S, 46.6253° W",
      mapX: "70%",
      mapY: "40%",
    },
  ];

  const [selectedId, setSelectedId] = useState<string>("lisboa");
  const activeShowroom = showrooms.find((s) => s.id === selectedId) || showrooms[0];

  return (
    <main className="min-h-screen bg-noise text-foreground">
      {/* HEADER NAVEGAÇÃO */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/">
          <LogoMini />
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <Link
            to="/"
            className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors"
          >
            Coleção
          </Link>
          <Link
            to="/sobre"
            className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors"
          >
            Sobre Nós
          </Link>
          <Link
  to="/localizacao"
  className="text-[0.65rem] tracking-[0.3em] text-gold uppercase font-semibold border-b border-gold/45 pb-0.5"
>
  Localização
</Link>
          <Link
            to="/"
            hash="contacto"
            className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors"
          >
            Contacto
          </Link>
        </div>
      </nav>

      {/* HERO INSTITUCIONAL */}
      <section className="relative h-[45vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-gold-soft/30">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="text-center max-w-4xl fade-up space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-10 divider-gold" />
            <span className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">Galerias de Prestígio</span>
            <span className="h-px w-10 divider-gold" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-gold-gradient font-bold tracking-wide">
            Os Nossos Showrooms
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Visite-nos em ambientes preparados exclusivamente para a apreciação técnica e estética da nossa coleção de elite.
          </p>
        </div>
      </section>

      {/* SECÇÃO INTERATIVA COM MAPA E DETALHES */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Lado Esquerdo: Seletor de Cidades e Ficha Técnica do Showroom (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <span className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">— Selecionar Cidade —</span>
              
              {/* Botões do Seletor */}
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-1 gap-2 pt-2">
                {showrooms.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`px-4 py-3 text-left border text-xs tracking-wider transition-all duration-300 flex items-center justify-between group ${
                      selectedId === s.id
                        ? "border-gold bg-gold/10 text-gold-bright shadow-inner"
                        : "border-gold-soft/30 hover:border-gold-soft text-muted-foreground hover:text-gold"
                    }`}
                  >
                    <span className="font-display font-medium uppercase">{s.city}</span>
                    <span className="text-[9px] text-muted-foreground group-hover:text-gold transition-colors font-mono hidden lg:block">
                      {s.location}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Informações Detalhadas do Showroom Ativo */}
            <article className="border border-gold-soft bg-card/40 backdrop-blur-sm p-6 space-y-6 transition-all duration-500 hover:shadow-gold rounded">
              <div className="flex justify-between items-start border-b border-gold-soft/20 pb-4">
                <div>
                  <h3 className="font-display text-2xl text-gold-gradient font-bold">{activeShowroom.city}</h3>
                  <span className="text-[10px] tracking-[0.3em] text-gold uppercase font-light">
                    {activeShowroom.location}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-secondary/80 border border-gold-soft/20 text-[9px] text-muted-foreground font-mono">
                  <Compass className="w-3 h-3 text-gold animate-spin" style={{ animationDuration: "12s" }} />
                  {activeShowroom.coords}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-xs md:text-sm">
                  <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gold mb-1">Endereço Privado</h4>
                    <p className="text-muted-foreground leading-relaxed font-light">{activeShowroom.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs md:text-sm">
                  <Phone className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gold mb-1">Contacto Telefónico</h4>
                    <p className="text-muted-foreground leading-relaxed font-light">{activeShowroom.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs md:text-sm">
                  <Mail className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gold mb-1">Correio Eletrónico</h4>
                    <a href={`mailto:${activeShowroom.email}`} className="text-muted-foreground hover:text-gold transition-colors font-light">
                      {activeShowroom.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs md:text-sm">
                  <Clock className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gold mb-1">Horário de Admissão</h4>
                    <p className="text-muted-foreground leading-relaxed font-light text-[11px] md:text-xs">
                      {activeShowroom.hours}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Ações Rápidas */}
          <div className="pt-4 flex flex-col gap-2">
            <a
              href={`mailto:${activeShowroom.email}?subject=Solicitação de Agendamento - Showroom ${activeShowroom.city}`}
              className="text-center px-6 py-4 bg-gold text-primary-foreground text-xs tracking-[0.3em] uppercase font-semibold hover:bg-gold-bright transition-all hover:shadow-gold flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5" /> Agendar Visita a esta Galeria
            </a>
            <a
              href="/test-drive"
              className="text-center px-6 py-4 bg-secondary text-primary-foreground text-xs tracking-[0.3em] uppercase font-semibold hover:bg-secondary/80 transition-all hover:shadow-gold flex items-center justify-center gap-2"
            >
              <Car className="w-3.5 h-3.5" /> Test Drive
            </a>
            <p className="text-[10px] text-muted-foreground text-center italic">
              * O acesso aos showrooms é restrito a titulares de convite ou agendamento prévio aprovado.
            </p>
          </div>
        </div>

        {/* Lado Direito: Simulador de Radar / Mapa de Luxo (Cols 6-12) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center">
          <div className="w-full relative aspect-square max-w-[650px] border border-gold-soft bg-card/30 backdrop-blur-sm p-4 overflow-hidden rounded">
            
            {/* Linhas de grelha de radar estilizadas */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-10">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-gold-soft" />
              ))}
            </div>
            
            {/* Círculos de Radar Concêntricos */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[90%] h-[90%] border border-gold-soft/5 rounded-full" />
              <div className="w-[60%] h-[60%] border border-gold-soft/10 rounded-full" />
              <div className="w-[30%] h-[30%] border border-gold-soft/15 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gold/10 border border-gold/40 rounded-full animate-ping" />
              </div>
            </div>

            {/* Simulação do Mapa Vetorial Escuro em SVG (Esboço minimalista da Europa / Médio Oriente) */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full opacity-35 absolute inset-0 pointer-events-none p-6"
            >
              {/* Europa fictícia */}
              <path
                d="M50,120 Q80,90 100,100 T150,80 T220,90 T280,130 T320,160 T350,220"
                fill="none"
                stroke="oklch(0.78 0.13 80 / 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              <path
                d="M45,210 Q80,180 120,200 T180,170 T240,210 T300,240 T380,260"
                fill="none"
                stroke="oklch(0.78 0.13 80 / 0.1)"
                strokeWidth="1"
              />
            </svg>

            {/* Cabeçalho do Monitor de Radar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Luxury System Active</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Zoom Level:</span>
                <span className="text-gold">1.5x</span>
              </div>
            </div>

            {/* Pins do Showroom no Mapa de Radar */}
            {showrooms.map((s) => {
              const active = s.id === selectedId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className="absolute group transition-transform hover:scale-125 focus:outline-none"
                  style={{ left: s.mapX, top: s.mapY, transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Anéis de Pulsação de Sinal para o Showroom Ativo */}
                    {active && (
                      <span className="absolute inline-flex h-8 w-8 rounded-full bg-gold/30 animate-ping" />
                    )}
                    
                    {/* Pin Central Dourado */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        active 
                          ? "bg-gold border-white scale-110 shadow-gold" 
                          : "bg-secondary border-gold hover:bg-gold/45"
                      }`}
                    >
                      <Sparkles className={`w-1.5 h-1.5 ${active ? "text-primary-foreground" : "text-gold"}`} />
                    </div>

                    {/* Label Flutuante da Cidade */}
                    <span
                      className={`absolute top-5 px-1.5 py-0.5 border text-[8px] font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                        active
                          ? "bg-background border-gold text-gold font-bold scale-105"
                          : "bg-background/80 border-gold-soft/20 text-muted-foreground group-hover:text-gold"
                      }`}
                    >
                      {s.city.toUpperCase()}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Coordenadas do Eixo do Radar no Canto Inferior */}
            <div className="absolute bottom-4 left-4 text-[9px] font-mono text-muted-foreground uppercase pointer-events-none">
              <div>HDG: 232° · SPD: 0 KT</div>
              <div>LOC: Global Network</div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-muted-foreground uppercase pointer-events-none flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Secure Connection
            </div>
          </div>
        </div>

      </section>

      {/* SERVIÇOS DO SHOWROOM */}
      <section className="px-6 md:px-12 py-16 bg-card/20 border-t border-gold-soft/30">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Atendimento Exclusivo",
              desc: "Os showrooms permanecem trancados durante a sua visita. O seu tempo é totalmente dedicado a apreciar e avaliar cada veículo com discrição.",
            },
            {
              title: "Segurança de Alta Fidelidade",
              desc: "Instalações vigiadas 24/7 com proteção de topo de gama para as viaturas dos nossos clientes e discrição de acesso físico e rodoviário.",
            },
            {
              title: "Parqueamento Climatizado",
              desc: "Todas as viaturas expostas são mantidas em condições constantes de temperatura e humidade, preservando acabamentos estéticos e mecânicos.",
            },
          ].map((s) => (
            <div key={s.title} className="space-y-3 p-4 border border-gold-soft/10 bg-card/30 rounded">
              <h3 className="font-display text-base text-gold font-bold uppercase tracking-wider">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold-soft px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <Link to="/" className="font-display text-xl text-gold-gradient tracking-widest hover:text-gold transition-colors">
            LuxuryCars
          </Link>
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
            © MMXXVI · Todos os direitos reservados
          </span>
        </div>
      </footer>
    </main>
  );
}
