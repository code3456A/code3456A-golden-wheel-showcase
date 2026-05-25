import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { ShieldCheck, TrendingUp, Wrench, Search, MapPin, Compass, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({
    meta: [
      { title: "Sobre a LuxuryCars — Arte e Alta Engenharia Automóvel" },
      { name: "description", content: "Conheça a LuxuryCars. A nossa missão de exclusividade, os nossos showrooms de prestígio em Lisboa, Porto, Portimão, Mónaco e Dubai, e os nossos serviços concierge VIP." },
    ],
  }),
});

function LogoMini() {
  return (
    <div className="flex items-center gap-3 select-none">
      <span className="text-gold tracking-[0.4em] font-light text-[10px] uppercase">◆</span>
      <span className="font-display font-bold tracking-[0.2em] text-gold-gradient text-sm md:text-base">LuxuryCars</span>
    </div>
  );
}

function Sobre() {
  const showrooms = [
    {
      city: "Lisboa",
      location: "Parque das Nações",
      desc: "Localizado junto ao estuário do Tejo, a nossa galeria principal em Portugal oferece um espaço minimalista e tecnológico para a exposição de hipercarros contemporâneos e clássicos de valorização garantida.",
    },
    {
      city: "Porto",
      location: "Foz do Douro",
      desc: "Na prestigiada zona da Foz, onde o Douro encontra o Atlântico, este showroom acolhe uma coleção focada em supercarros italianos e clássicos britânicos, num ambiente de máxima privacidade e requinte histórico.",
    },
    {
      city: "Portimão",
      location: "Marina de Portimão",
      desc: "Situado no coração do Algarve desportivo, o showroom da Marina é especializado em modelos de alta performance e elétricos de pista, ideais para os entusiastas da condução desportiva e do sol do sul.",
    },
    {
      city: "Mónaco",
      location: "Monte Carlo",
      desc: "O epicentro mundial do luxo automóvel. A nossa boutique em Monte Carlo foca-se estritamente na alta raridade e em transações confidenciais de hipercarros de produção extremamente limitada.",
    },
    {
      city: "Dubai",
      location: "Dubai Marina",
      desc: "Uma galeria de proporções majestosas que exibe as maiores jóias da engenharia automóvel moderna, com suporte personalizado para importação direta e preparação de coleções de luxo no Médio Oriente.",
    },
  ];

  const servicos = [
    {
      icon: <TrendingUp className="w-6 h-6 text-gold" />,
      title: "Consultoria de Investimento",
      desc: "Aconselhamento especializado na aquisição de ativos automóveis com forte potencial de valorização, gerindo o seu portefólio como arte valiosa.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold" />,
      title: "Logística Segura & Blindada",
      desc: "Transporte terrestre e aéreo confidencial com climatização controlada, garantindo a entrega do seu veículo em perfeito estado em qualquer parte do globo.",
    },
    {
      icon: <Wrench className="w-6 h-6 text-gold" />,
      title: "Manutenção Certificada",
      desc: "Articulação direta com as oficinas oficiais das marcas na Europa para revisões de fábrica, restauros certificados e manutenção preventiva estrita.",
    },
    {
      icon: <Search className="w-6 h-6 text-gold" />,
      title: "Due-Diligence de Histórico",
      desc: "Investigação documental rigorosa sobre a proveniência, acidentes, manutenções e originalidade das peças antes de qualquer transação de mercado.",
    },
  ];

  return (
    <main className="min-h-screen bg-noise text-foreground">
      {/* HEADER NAVEGAÇÃO */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/">
          <LogoMini />
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            to="/"
            className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors"
          >
            Coleção
          </Link>
          <span className="text-[0.65rem] tracking-[0.3em] text-gold uppercase font-semibold border-b border-gold/45 pb-0.5">
            Sobre Nós
          </span>
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
      <section className="relative h-[65vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-gold-soft/30">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="text-center max-w-4xl fade-up space-y-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-10 divider-gold" />
            <span className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">Herança e Legado</span>
            <span className="h-px w-10 divider-gold" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-gradient font-bold tracking-wide leading-tight">
            LuxuryCars
          </h1>
          <p className="font-serif italic text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            "Não negociamos apenas automóveis. Preservamos pedaços da história da engenharia e da arte mecânica sobre rodas."
          </p>
        </div>
      </section>

      {/* MANIFESTO E FILOSOFIA */}
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="fade-up space-y-6">
            <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— O Manifesto —</span>
            <h2 className="font-display text-3xl md:text-5xl text-gold-gradient font-bold tracking-wide leading-tight">
              Uma Filosofia de Exclusividade Absoluta
            </h2>
            <div className="h-px w-16 divider-gold" />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Fundada sob as premissas da discrição total e da paixão sem concessões, a LuxuryCars serve como a guardiã de eleição para os colecionadores mais exigentes do mundo. O nosso catálogo não é composto por viaturas comuns; cada veículo representa um feito histórico de design, performance e raridade.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Operamos num regime estrito de agendamento privado, garantindo que cada cliente beneficie de uma assessoria personalizada, livre de pressões, num showroom fechado ao público geral. A nossa reputação assenta na confiança e na proveniência inabalável de cada obra de arte que transacionamos.
            </p>
          </div>
          <div className="fade-up lg:pl-8 border-l border-gold-soft/30 py-4 space-y-8" style={{ animationDelay: "0.2s" }}>
            <div className="flex gap-4">
              <Compass className="w-8 h-8 text-gold flex-shrink-0" />
              <div>
                <h4 className="font-display text-lg text-gold font-semibold mb-2">Visão Global</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Ligamos os principais centros financeiros e de luxo do mundo através da nossa rede integrada de showrooms exclusivos na Europa e Médio Oriente.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldAlert className="w-8 h-8 text-gold flex-shrink-0" />
              <div>
                <h4 className="font-display text-lg text-gold font-semibold mb-2">Confidencialidade</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Protegemos a identidade de compradores e vendedores em todas as etapas, assegurando transações privadas que respeitam a discrição dos nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWROOMS */}
      <section className="px-6 md:px-12 py-20 bg-card/30 border-y border-gold-soft/40 relative">
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-16 space-y-4">
            <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Localizações de Prestígio —</span>
            <h2 className="font-display text-3xl md:text-5xl text-gold-gradient font-bold tracking-wide">
              Os Nossos Showrooms
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Dispomos de espaços arquitetónicos desenhados especificamente para realçar a beleza mecânica de cada máquina. Visitas apenas sob agendamento.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {showrooms.map((showroom, idx) => (
              <article
                key={showroom.city}
                className="group p-8 border border-gold-soft/30 hover:border-gold bg-card/60 backdrop-blur-sm transition-all duration-500 hover:shadow-gold flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[0.6rem] tracking-[0.3em] text-gold uppercase font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold" /> {showroom.location}
                    </span>
                    <span className="font-display text-3xl text-gold-gradient font-bold opacity-30 group-hover:opacity-100 transition-opacity">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-gold font-bold mb-4">{showroom.city}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light mb-6">
                    {showroom.desc}
                  </p>
                </div>
                <div className="h-px w-8 bg-gold/40 group-hover:w-full transition-all duration-700" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS VIP CONCIERGE */}
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1200px] mx-auto">
        <header className="text-center mb-16 space-y-4">
          <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Serviços de Elite —</span>
          <h2 className="font-display text-3xl md:text-5xl text-gold-gradient font-bold tracking-wide">
            Concierge Privado 24/7
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Mais do que vender carros, acompanhamos o colecionador em todo o ciclo de vida do ativo automóvel com serviços especializados.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {servicos.map((s) => (
            <div
              key={s.title}
              className="flex gap-5 p-6 border border-gold-soft/10 bg-card/25 rounded hover:bg-card/45 hover:border-gold-soft/30 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-gold-soft/30 bg-background/50 rounded flex-shrink-0">
                {s.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-lg text-gold font-semibold">{s.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECÇÃO CTA DE CONTACTO */}
      <section className="px-6 md:px-12 py-24 md:py-32 text-center border-t border-gold-soft/20 bg-background/40">
        <div className="max-w-2xl mx-auto space-y-8">
          <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Agendamento VIP —</span>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient font-bold tracking-wide">
            Solicite uma Visita
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Todas as visitas aos nossos showrooms de Lisboa, Porto, Portimão, Mónaco ou Dubai são sujeitas a aprovação de perfil. Assegure a sua privacidade agendando com antecedência.
          </p>
          <div className="pt-4">
            <a
              href="mailto:concierge@luxurycars.com?subject=Solicitação de Visita Privada"
              className="inline-block px-10 py-4 bg-gold text-primary-foreground text-xs tracking-[0.3em] uppercase font-semibold hover:bg-gold-bright transition-all hover:shadow-gold"
            >
              Agendar Visita Showroom
            </a>
          </div>
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
