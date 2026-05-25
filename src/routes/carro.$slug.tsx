import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { cars } from "@/data/cars";

export const Route = createFileRoute("/carro/$slug")({
  component: CarDetail,
  loader: ({ params }) => {
    const car = cars.find((c) => c.slug === params.slug);
    if (!car) throw notFound();
    return { car };
  },
  notFoundComponent: () => (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-gold-gradient mb-4">Carro não encontrado</h1>
        <Link to="/" className="text-gold hover:text-gold-bright text-xs tracking-[0.3em] uppercase">← Voltar à coleção</Link>
      </div>
    </main>
  ),
  errorComponent: () => (
    <main className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-gold-gradient mb-4">Algo correu mal</h1>
        <Link to="/" className="text-gold hover:text-gold-bright text-xs tracking-[0.3em] uppercase">← Voltar à coleção</Link>
      </div>
    </main>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.car.name} — LuxuryCars` },
          { name: "description", content: `${loaderData.car.name} (${loaderData.car.year}) — ${loaderData.car.power}, ${loaderData.car.topSpeed}. ${loaderData.car.description}` },
        ]
      : [{ title: "LuxuryCars" }],
  }),
});

function CarDetail() {
  const { car } = Route.useLoaderData();

  const related = cars.filter((c) => c.category === car.category && c.slug !== car.slug).slice(0, 3);

  const stats = [
    { label: "Potência", value: car.power },
    { label: "Velocidade Máx.", value: car.topSpeed },
    { label: "0-100 km/h", value: car.acceleration },
    { label: "Ano", value: String(car.year) },
    { label: "Motor", value: car.engine },
    { label: "Transmissão", value: car.transmission },
  ];

  return (
    <main className="min-h-screen bg-noise">
      {/* TOP NAV */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/" className="text-[0.65rem] tracking-[0.4em] text-gold uppercase hover:text-gold-bright transition-colors font-medium">
          ← LuxuryCars
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
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
            to="/"
            hash="contacto"
            className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors"
          >
            Contacto
          </Link>
        </div>
      </nav>

      {/* HERO IMAGE */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img src={car.image} alt={car.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 divider-gold" />
              <span className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">{car.origin} · {car.year}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-gold-gradient font-bold tracking-wide leading-none">
              {car.name}
            </h1>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <span className="font-display text-3xl md:text-5xl text-gold-gradient">{car.price}</span>
              <span className="text-[0.65rem] tracking-[0.4em] text-muted-foreground uppercase">Preço de referência</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Description */}
          <div className="lg:col-span-2 fade-up">
            <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Sobre —</span>
            <h2 className="font-display text-3xl md:text-4xl text-gold-gradient mt-4 mb-6 tracking-wide">
              A Máquina
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {car.description}
            </p>

            <div className="h-px divider-gold my-10" />

            <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Destaques —</span>
            <ul className="mt-6 space-y-3">
              {car.specs.map((s: string) => (
                <li key={s} className="flex items-start gap-4 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0 shimmer" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specs */}
          <aside className="fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="border border-gold-soft bg-card/50 backdrop-blur-sm p-8">
              <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Ficha Técnica —</span>
              <div className="mt-6 space-y-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase mb-1">{s.label}</div>
                    <div className="font-display text-lg text-gold-gradient">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gold-soft">
                <div className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase mb-2">Preço</div>
                <div className="font-display text-3xl text-gold-gradient">{car.price}</div>
              </div>

              <a
                href={`mailto:concierge@luxurycars.com?subject=Interesse: ${car.name}`}
                className="mt-8 block text-center px-6 py-4 bg-gold text-primary-foreground text-xs tracking-[0.3em] uppercase font-semibold hover:bg-gold-bright transition-all hover:shadow-gold"
              >
                Solicitar Reserva
              </a>
              <Link
                to="/"
                hash="contacto"
                className="mt-3 block text-center px-6 py-4 border border-gold-soft text-gold text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold/10 transition-all"
              >
                Contactar Concierge
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 py-20 border-t border-gold-soft">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-[0.7rem] tracking-[0.5em] text-gold uppercase">— Mais em {car.category} —</span>
              <h2 className="font-display text-3xl md:text-5xl text-gold-gradient mt-4 tracking-wide">Pode também gostar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/carro/$slug"
                  params={{ slug: r.slug }}
                  className="group relative overflow-hidden border border-gold-soft bg-card transition-all duration-700 hover:shadow-gold"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={r.image} alt={r.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>
                  <div className="p-6 -mt-12 relative">
                    <h3 className="font-display text-xl text-gold-gradient font-semibold tracking-wide">{r.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-base text-gold-gradient">{r.price}</span>
                      <span className="text-xs tracking-[0.25em] text-gold uppercase">Ver →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gold-soft px-6 md:px-12 py-10 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <Link to="/" className="font-display text-xl text-gold-gradient tracking-widest">LuxuryCars</Link>
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">© MMXXVI · Todos os direitos reservados</span>
        </div>
      </footer>
    </main>
  );
}
