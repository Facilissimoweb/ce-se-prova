import React from 'react';
import { FilePlus2, Save, Trash2 } from 'lucide-react';
import { useUserNotes } from '../../hooks/useUserNotes';

type GetIdToken = () => Promise<string | null>;

interface ReservedNotesPanelProps {
  getIdToken: GetIdToken;
}

function formatUpdatedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function previewBody(body: string): string {
  const compact = body.replace(/\s+/g, ' ').trim();
  if (!compact) return 'Nessun testo ancora…';
  return compact.length > 90 ? `${compact.slice(0, 90)}…` : compact;
}

export function ReservedNotesPanel({ getIdToken }: ReservedNotesPanelProps) {
  const notes = useUserNotes({ enabled: true, getIdToken });

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-body font-semibold text-xl md:text-2xl text-[#F4F1EA]">
            I Miei Appunti
          </h2>
          <p className="text-sm text-[#A39B93]">
            Quaderno personale libero: crea, modifica e salva note anche senza corsi
            sbloccati. Il salvataggio automatico parte dopo ogni modifica.
          </p>
        </div>
        <button
          type="button"
          disabled={notes.saving}
          onClick={() => void notes.handleCreate()}
          className="px-4 py-2.5 min-h-[44px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-xs md:text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap"
        >
          <FilePlus2 className="w-4 h-4" />
          Nuovo appunto
        </button>
      </div>

      {notes.error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-[#93000a]/25 border border-[#ffb4ab]/35 text-sm text-[#ffb4ab] flex items-center justify-between gap-4"
        >
          <span>{notes.error}</span>
          <button
            type="button"
            onClick={() => void notes.loadNotes()}
            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#12100E] text-xs font-semibold shrink-0"
          >
            Riprova
          </button>
        </div>
      )}

      {notes.loading && notes.notes.length === 0 ? (
        <div className="glass-tier-1 rounded-2xl p-8 text-center">
          <p className="text-sm text-[#A39B93]">Caricamento degli appunti…</p>
        </div>
      ) : notes.notes.length === 0 ? (
        <div className="glass-tier-1 rounded-2xl p-8 text-center space-y-3">
          <p className="text-sm text-[#F4F1EA]">Nessun appunto ancora.</p>
          <p className="text-xs text-[#A39B93] max-w-md mx-auto">
            Scrivi osservazioni, domande o stese di esercitazione. Gli appunti restano
            legati al tuo account Google e non richiedono l&apos;acquisto di un corso.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-4 space-y-2">
            {notes.notes.map((note) => {
              const active = note.id === notes.selectedId;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => notes.setSelectedId(note.id)}
                  className={`w-full text-left rounded-xl p-4 border transition-colors ${
                    active
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37]/55'
                      : 'glass-tier-1 border-transparent hover:border-[#D4AF37]/30'
                  }`}
                >
                  <p className="text-sm font-semibold text-[#F4F1EA] line-clamp-1">
                    {note.title.trim() || 'Senza titolo'}
                  </p>
                  <p className="mt-1 text-xs text-[#A39B93] line-clamp-2">
                    {previewBody(note.body)}
                  </p>
                  <p className="mt-2 text-[11px] text-[#A39B93]/80 tabular-nums">
                    {formatUpdatedAt(note.updatedAt)}
                  </p>
                </button>
              );
            })}
          </aside>

          <article className="lg:col-span-8 glass-tier-1 rounded-2xl p-5 md:p-6 space-y-4">
            {notes.selectedNote ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#D4AF37]">
                    Editor appunto
                  </p>
                  <p className="text-[11px] text-[#A39B93] tabular-nums">
                    Aggiornato {formatUpdatedAt(notes.selectedNote.updatedAt)}
                  </p>
                </div>

                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-[#A39B93]">Titolo</span>
                  <input
                    type="text"
                    value={notes.titleDraft}
                    onChange={(e) => notes.updateTitleDraft(e.target.value)}
                    maxLength={200}
                    className="w-full px-3.5 py-2.5 rounded-lg input-inset text-sm"
                    placeholder="Titolo dell’appunto"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-[#A39B93]">Testo</span>
                  <textarea
                    rows={14}
                    value={notes.bodyDraft}
                    onChange={(e) => notes.updateBodyDraft(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg input-inset text-sm resize-y min-h-[220px]"
                    placeholder="Annota qui osservazioni, domande, stese o riflessioni…"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-[#A39B93]">
                    {notes.feedback ||
                      (notes.dirty
                        ? 'Modifiche in corso — salvataggio automatico…'
                        : 'Gli appunti restano salvati nella tua Area Riservata.')}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={notes.saving || !notes.dirty}
                      onClick={() => void notes.handleSaveNow()}
                      className="px-4 py-2.5 min-h-[42px] rounded-lg bg-[#D4AF37] hover:bg-[#E6C65C] disabled:opacity-60 text-[#12100E] text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {notes.saving ? 'Salvataggio…' : 'Salva ora'}
                    </button>
                    <button
                      type="button"
                      disabled={notes.saving}
                      onClick={() => void notes.handleDelete(notes.selectedNote!.id)}
                      className="px-4 py-2.5 min-h-[42px] rounded-lg border border-[#ffb4ab]/35 hover:border-[#ffb4ab] text-[#ffb4ab] text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Elimina
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-[#A39B93]">
                Seleziona un appunto dall&apos;elenco o creane uno nuovo.
              </p>
            )}
          </article>
        </div>
      )}
    </section>
  );
}
