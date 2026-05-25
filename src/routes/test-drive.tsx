import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, Phone, Calendar, Car } from "lucide-react";

export const Route = createFileRoute("/test-drive")({
  component: TestDrive,
  head: () => (
    <>
      <title>Test Drive – LuxuryCars</title>
      <meta name="description" content="Agende um test drive privado dos nossos veículos exclusivos. Formulário seguro e discreto para colecionadores." />
    </>
  ),
});

function TestDrive() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    model: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes we just open the default mail client with a prefilled message.
    const subject = encodeURIComponent(`Solicitação de Test Drive – ${form.model}`);
    const body = encodeURIComponent(
      `Nome: ${form.name}\nEmail: ${form.email}\nTelefone: ${form.phone}\nCidade: ${form.city}\nModelo: ${form.model}\nData Preferida: ${form.date}\n`
    );
    window.location.href = `mailto:concierge@luxurycars.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-noise text-foreground">
      {/* HEADER */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/">
          <div className="flex items-center gap-3 select-none">
            <span className="text-gold tracking-[0.4em] font-light text-[10px] uppercase">◆</span>
            <span className="font-display font-bold tracking-[0.2em] text-gold-gradient text-sm md:text-base">LuxuryCars</span>
          </div>
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <Link to="/" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">
            Coleção
          </Link>
          <Link to="/sobre" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">
            Sobre Nós
          </Link>
          <Link to="/localizacao" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">
            Localização
          </Link>
          <Link to="/test-drive" className="text-[0.65rem] tracking-[0.3em] text-gold uppercase font-semibold border-b border-gold/45 pb-0.5">
            Test Drive
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[45vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-gold-soft/30">
        <div className="absolute inset-0 -z-10">
          <div className="bg-gradient-to-b from-background/80 via-background/60 to-background h-full w-full" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-gold-gradient font-bold tracking-wide">
          Agende o seu Test Drive
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl text-center mt-4">
          Preencha o formulário e a nossa equipe de concierge entrará em contato para confirmar a data e o modelo desejado.
        </p>
      </section>

      {/* FORM */}
      <section className="px-6 md:px-12 py-12 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 bg-card/30 border border-gold-soft rounded-lg p-6 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nome Completo"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 bg-background/60 border border-gold-soft/30 text-foreground placeholder:text-muted-foreground rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="E‑mail"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 bg-background/60 border border-gold-soft/30 text-foreground placeholder:text-muted-foreground rounded"
            />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 bg-background/60 border border-gold-soft/30 text-foreground placeholder:text-muted-foreground rounded"
          />
          <select
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 bg-background/60 border border-gold-soft/30 text-foreground rounded"
          >
            <option value="" disabled>Selecione a cidade</option>
            <option value="Lisboa">Lisboa</option>
            <option value="Porto">Porto</option>
            <option value="Portimão">Portimão</option>
            <option value="Dubai">Dubai</option>
            <option value="São Paulo">São Paulo</option>
          </select>
          <input
            type="text"
            name="model"
            placeholder="Modelo de Interesse"
            required
            value={form.model}
            onChange={handleChange}
            className="w-full p-2 bg-background/60 border border-gold-soft/30 text-foreground placeholder:text-muted-foreground rounded"
          />
          <input
            type="date"
            name="date"
            required
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 bg-background/60 border border-gold-soft/30 text-foreground rounded"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gold text-primary-foreground font-semibold py-3 rounded hover:bg-gold-bright transition-colors"
          >
            <Car className="w-4 h-4" />
            Enviar Solicitação
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold-soft px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <Link to="/" className="font-display text-xl text-gold-gradient tracking-widest hover:text-gold transition-colors">
            LuxuryCars
          </Link>
          <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">© MMXXVI · Todos os direitos reservados</span>
        </div>
      </footer>
    </main>
  );
}
