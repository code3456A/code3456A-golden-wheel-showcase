import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { cars, categories, type Category } from "@/data/cars";
import type { Car } from "@/data/cars";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "LuxuryCars — Coleção de Carros Desportivos de Elite" },
      { name: "description", content: "LuxuryCars: hipercarros, supercarros, JDM, muscle e elétricos desportivos da mais alta gama. Bugatti, Koenigsegg, Ferrari, Lamborghini e mais." },
    ],
  }),
});

function Logo() {
  return (
    <div className="flex flex-col items-center text-center select-none">
      <div className="flex items-center gap-4 mb-2">
        <span className="h-px w-12 sm:w-20 divider-gold" />
        <span className="text-[0.65rem] sm:text-xs tracking-[0.4em] text-gold uppercase font-light">Est. MMXXVI</span>
        <span className="h-px w-12 sm:w-20 divider-gold" />
      </div>
      <h1
        className="font-display font-black tracking-[0.05em] text-gold-gradient shimmer leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
        style={{ textShadow: "0 4px 30px oklch(0.78 0.13 80 / 0.25)" }}
      >
        LuxuryCars
      </h1>
      <div className="flex items-center gap-4 mt-3">
        <span className="h-px w-16 sm:w-24 divider-gold" />
        <span className="text-[0.6rem] sm:text-[0.7rem] tracking-[0.5em] text-muted-foreground uppercase">Coleção Privada</span>
        <span className="h-px w-16 sm:w-24 divider-gold" />
      </div>
    </div>
  );
}

function CarCard({ car, idx }: { car: Car; idx: number }) {
  return (
    <article
      className="group relative overflow-hidden border border-gold-soft bg-card transition-all duration-700 hover:shadow-gold fade-up"
      style={{ animationDelay: `${(idx % 6) * 0.08}s` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 border border-gold-soft bg-background/70 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shimmer" />
          <span className="text-[0.6rem] tracking-[0.3em] text-gold uppercase font-medium">{car.category}</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 border border-gold-soft bg-background/70 backdrop-blur-sm">
          <span className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">{car.origin}</span>
        </div>
      </div>

      <div className="relative p-6 -mt-16 z-10">
        <h3 className="font-display text-2xl md:text-[1.7rem] text-gold-gradient font-semibold tracking-wide leading-tight">
          {car.name}
        </h3>
        <div className="h-px w-12 divider-gold my-4" />
        <ul className="space-y-2">
          {car.specs.map((s) => (
            <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-gold flex-shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gold-soft">
          <span className="font-display text-lg text-gold-gradient font-semibold tracking-wide">{car.price}</span>
          <Link
            to="/carro/$slug"
            params={{ slug: car.slug }}
            className="group/btn flex items-center gap-2 text-xs tracking-[0.25em] text-gold uppercase font-medium hover:text-gold-bright transition-colors"
          >
            Detalhes
            <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Index() {
  const [filter, setFilter] = useState<"Todos" | Category>("Todos");
  const filtered = filter === "Todos" ? cars : cars.filter((c) => c.category === filter);

  return (
    <main className="min-h-screen bg-noise">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        </div>

        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 py-6 z-20">
          <Link to="/" className="text-[0.65rem] tracking-[0.4em] text-gold uppercase hover:text-gold-bright transition-colors font-medium">
            ◆ LuxuryCars
          </Link>
          <div className="flex items-center gap-6 sm:gap-8">
            <a href="#colecao" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">
              Coleção
            </a>
            <Link to="/sobre" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">
              Sobre Nós
            </Link>
            <a href="#contacto" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">
              Contacto
            </a>
          </div>
        </nav>

        <div className="fade-up">
          <Logo />
        </div>

        <p className="mt-10 max-w-xl text-center text-sm md:text-base text-muted-foreground leading-relaxed fade-up px-4" style={{ animationDelay: "0.4s" }}>
          Uma seleção curada dos automóveis mais extraordinários do mundo. Hipercarros, supercarros, ícones JDM, muscle americano e elétricos de elite.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 fade-up" style={{ animationDelay: "0.6s" }}>
          <a href="#colecao" className="px-8 py-4 bg-gold text-primary-foreground text-xs tracking-[0.3em] uppercase font-semibold hover:bg-gold-bright transition-all hover:shadow-gold">
            Explorar Coleção
          </a>
          <a href="#contacto" className="px-8 py-4 border border-gold-soft text-gold text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold/10 transition-all">
            Marcar Visita
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 fade-up" style={{ animationDelay: "1s" }}>
          <span className="text-[0.6rem] tracking-[0.4em] text-muted-foreground uppercase">Descobrir</span>
          <span className="h-12 w-px divider-gold" />
        </div>
      </section>

      {/* COLLECTION */}
      <section id="colecao" className="relative px-6 md:px-12 py-24 md:py-32 max-w-[1500px] mx-auto">
        <header className="text-center mb-16">
          <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Catálogo —</span>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-4 tracking-wide">
            A Coleção
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
            Cada peça é selecionada à mão. Dezoito máquinas que definem o que significa desempenho, design e desejo.
          </p>
        </header>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-[0.65rem] md:text-xs tracking-[0.25em] uppercase font-medium border transition-all duration-300 ${
                  active
                    ? "border-gold bg-gold text-primary-foreground shadow-gold"
                    : "border-gold-soft text-muted-foreground hover:text-gold hover:border-gold"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((car, i) => (
            <CarCard key={car.slug} car={car} idx={i} />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative px-6 md:px-12 py-20 border-y border-gold-soft bg-card/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: "18+", l: "Modelos Exclusivos" },
            { v: "6", l: "Categorias" },
            { v: "1914cv", l: "Potência Máxima" },
            { v: "24/7", l: "Concierge Privado" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-5xl text-gold-gradient">{s.v}</div>
              <div className="mt-3 text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="px-6 md:px-12 py-24 md:py-32 text-center">
        <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Contacto Privado —</span>
        <h2 className="font-display text-4xl md:text-6xl text-gold-gradient mt-4 tracking-wide">
          Reserve o Seu
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
          Visita ao showroom apenas com marcação prévia. Discrição e exclusividade garantidas.
        </p>
        <a href="mailto:concierge@luxurycars.com" className="inline-block mt-10 px-10 py-4 bg-gold text-primary-foreground text-xs tracking-[0.3em] uppercase font-semibold hover:bg-gold-bright transition-all hover:shadow-gold">
          concierge@luxurycars.com
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold-soft px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <span className="font-display text-xl text-gold-gradient tracking-widest">LuxuryCars</span>
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">© MMXXVI · Todos os direitos reservados</span>
        </div>
      </footer>
    </main>
  );
}
