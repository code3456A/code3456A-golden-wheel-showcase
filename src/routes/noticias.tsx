// src/routes/noticias.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { useState } from "react";
import { Mail, Calendar, Reply, Edit, Trash2, Send } from "lucide-react";

export const Route = createFileRoute("/noticias")({
  component: Noticias,
  head: () => (
    {
      meta: [
        { title: "Notícias — LuxuryCars" },
        { name: "description", content: "Últimas novidades da LuxuryCars, incluindo o lançamento do novo showroom em São Paulo." },
      ],
    }
  ),
});

function Noticias() {
  // Simple in‑memory comment system
  type Comment = { id: number; author: string; text: string; timestamp: Date };
  const [comments, setComments] = useState<Comment[]>([]);
  const [newText, setNewText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addComment = () => {
    if (!newText.trim()) return;
    const nextId = comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;
    setComments([...comments, { id: nextId, author: "Visitor", text: newText.trim(), timestamp: new Date() }]);
    setNewText("");
  };

  const startEdit = (c: Comment) => {
    setEditId(c.id);
    setEditText(c.text);
  };

  const saveEdit = () => {
    if (editId === null) return;
    setComments(comments.map(c => c.id === editId ? { ...c, text: editText } : c));
    setEditId(null);
    setEditText("");
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <main className="min-h-screen bg-noise text-foreground">
      {/* HEADER */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/" className="text-[0.65rem] tracking-[0.4em] text-gold uppercase hover:text-gold-bright transition-colors font-medium">
          ◆ LuxuryCars
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">Home</Link>
          <Link to="/sobre" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">Sobre Nós</Link>
          <Link to="/localizacao" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">Localização</Link>
          <Link to="/noticias" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">Notícias</Link>
          <a href="#contacto" className="text-[0.65rem] tracking-[0.3em] text-muted-foreground hover:text-gold uppercase transition-colors">Contacto</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[45vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-gold-soft/30">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="text-center max-w-4xl fade-up space-y-4">
          <h1 className="font-display text-4xl md:text-6xl text-gold-gradient font-bold tracking-wide">Notícias</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            As últimas novidades da LuxuryCars – lançamentos, eventos e atualizações exclusivas.
          </p>
        </div>
      </section>

      {/* POST */}
      <section className="px-6 md:px-12 py-12 max-w-4xl mx-auto space-y-8">
        <article className="border border-gold-soft bg-card/40 backdrop-blur-sm p-6 rounded">
          <h2 className="font-display text-2xl text-gold-gradient font-bold mb-4">LuxuryCars abre showroom em São Paulo</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Calendar className="w-3 h-3" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <img src={hero} alt="São Paulo showroom" className="w-full h-48 object-cover mb-4 rounded" />
          <p className="text-muted-foreground leading-relaxed mb-4">
            Temos o prazer de anunciar a abertura do nosso mais recente showroom na vibrante cidade de São Paulo. Agora, clientes e entusiastas podem experienciar de perto a nossa coleção de hiper‑carros e super‑carros em um ambiente exclusivo, com a mesma atenção ao detalhe e privacidade que define a LuxuryCars.
          </p>
          <a
            href="mailto:sao.paulo@luxurycars.com?subject=Agendamento%20Visita%20São%20Paulo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-primary-foreground text-xs uppercase font-medium hover:bg-gold-bright transition-colors"
          >
            <Mail className="w-3 h-3" />
            Agendar Visita
          </a>
        </article>

        {/* COMMENTS */}
        <div className="space-y-4">
          <h3 className="font-display text-lg text-gold-gradient">Comentários</h3>
          <div className="flex gap-2">
            <textarea
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="Escreva seu comentário..."
              className="flex-1 p-2 border border-gold-soft bg-card/30 rounded text-sm text-foreground focus:outline-none"
              rows={2}
            />
            <button
              onClick={addComment}
              className="px-4 py-2 bg-gold text-primary-foreground text-xs uppercase font-medium hover:bg-gold-bright transition-colors"
            >
              <Send className="w-3 h-3 inline" />
            </button>
          </div>
          {comments.map(c => (
            <div key={c.id} className="border border-gold-soft bg-card/20 rounded p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.author}</span>
                <span>{c.timestamp.toLocaleString()}</span>
              </div>
              {editId === c.id ? (
                <div className="flex gap-2 items-center">
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="flex-1 p-1 border border-gold-soft bg-card/30 rounded text-sm"
                    rows={2}
                  />
                  <button onClick={saveEdit} className="px-2 py-1 bg-gold text-primary-foreground text-xs hover:bg-gold-bright rounded">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <p className="text-muted-foreground">{c.text}</p>
              )}
              <div className="flex gap-2 text-xs text-muted-foreground">
                <button onClick={() => startEdit(c)} className="flex items-center gap-1 hover:text-gold">
                  <Edit className="w-3 h-3" />
                  Editar
                </button>
                <button onClick={() => deleteComment(c.id)} className="flex items-center gap-1 hover:text-gold">
                  <Trash2 className="w-3 h-3" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
