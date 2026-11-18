import { useCallback, useEffect, useRef, useState } from 'react';
import { readJsonResponse } from '../lib/readJsonResponse';
import type { UserNoteItem } from '../types/handoff';

type GetIdToken = () => Promise<string | null>;

const LOAD_ERROR = 'Impossibile caricare gli appunti. Riprova tra poco.';
const AUTOSAVE_MS = 1200;

interface UseUserNotesParams {
  enabled: boolean;
  getIdToken: GetIdToken;
}

export function useUserNotes({ enabled, getIdToken }: UseUserNotesParams) {
  const [notes, setNotes] = useState<UserNoteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [bodyDraft, setBodyDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const getIdTokenRef = useRef(getIdToken);
  getIdTokenRef.current = getIdToken;
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedIdRef = useRef<number | null>(null);
  selectedIdRef.current = selectedId;
  const titleDraftRef = useRef(titleDraft);
  titleDraftRef.current = titleDraft;
  const bodyDraftRef = useRef(bodyDraft);
  bodyDraftRef.current = bodyDraft;
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdTokenRef.current();
      if (!token) {
        setError('Sessione non disponibile. Riprova ad accedere.');
        return;
      }
      const res = await fetch('/api/reserved/notes', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const json = await readJsonResponse<{
        notes?: UserNoteItem[];
        error?: string;
      }>(res, LOAD_ERROR);
      if (!res.ok) throw new Error(json.error || LOAD_ERROR);
      const list = Array.isArray(json.notes) ? json.notes : [];
      setNotes(list);
      setSelectedId((prev) => {
        if (prev && list.some((n) => n.id === prev)) return prev;
        return list[0]?.id ?? null;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void loadNotes();
  }, [enabled, loadNotes]);

  useEffect(() => {
    const selected = notes.find((n) => n.id === selectedId) ?? null;
    setTitleDraft(selected?.title ?? '');
    setBodyDraft(selected?.body ?? '');
    setDirty(false);
    setFeedback(null);
  }, [selectedId, notes]);

  const persistNote = useCallback(
    async (noteId: number, title: string, body: string) => {
      setSaving(true);
      setFeedback(null);
      try {
        const token = await getIdTokenRef.current();
        if (!token) throw new Error('Sessione scaduta.');
        const res = await fetch(`/api/reserved/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, body }),
        });
        const json = await readJsonResponse<{
          note?: UserNoteItem;
          error?: string;
        }>(res, 'Salvataggio non riuscito.');
        if (!res.ok) throw new Error(json.error || 'Salvataggio non riuscito.');
        if (json.note) {
          setNotes((prev) => {
            const next = prev.map((n) => (n.id === json.note!.id ? json.note! : n));
            return next.sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          });
        }
        if (selectedIdRef.current === noteId) {
          setDirty(false);
          setFeedback('Appunto salvato.');
        }
      } catch (err) {
        setFeedback(
          err instanceof Error ? err.message : 'Impossibile salvare al momento.'
        );
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const scheduleAutosave = useCallback(() => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      const id = selectedIdRef.current;
      if (!id || !dirtyRef.current) return;
      void persistNote(id, titleDraftRef.current, bodyDraftRef.current);
    }, AUTOSAVE_MS);
  }, [persistNote]);

  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, []);

  const updateTitleDraft = (value: string) => {
    setTitleDraft(value);
    setDirty(true);
    setFeedback(null);
    scheduleAutosave();
  };

  const updateBodyDraft = (value: string) => {
    setBodyDraft(value);
    setDirty(true);
    setFeedback(null);
    scheduleAutosave();
  };

  const handleSaveNow = async () => {
    if (!selectedId) return;
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    await persistNote(selectedId, titleDraft, bodyDraft);
  };

  const handleCreate = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const token = await getIdTokenRef.current();
      if (!token) throw new Error('Sessione scaduta.');
      const res = await fetch('/api/reserved/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: 'Nuovo appunto', body: '' }),
      });
      const json = await readJsonResponse<{
        note?: UserNoteItem;
        error?: string;
      }>(res, 'Creazione non riuscita.');
      if (!res.ok) throw new Error(json.error || 'Creazione non riuscita.');
      if (!json.note) throw new Error('Risposta incompleta dal server.');
      setNotes((prev) => [json.note!, ...prev]);
      setSelectedId(json.note.id);
      setFeedback('Nuovo appunto creato.');
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : 'Impossibile creare l’appunto.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (noteId: number) => {
    const target = notes.find((n) => n.id === noteId);
    const label = target?.title?.trim() || 'questo appunto';
    if (
      !window.confirm(
        `Eliminare «${label}»? L’operazione non si può annullare.`
      )
    ) {
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const token = await getIdTokenRef.current();
      if (!token) throw new Error('Sessione scaduta.');
      const res = await fetch(`/api/reserved/notes/${noteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await readJsonResponse<{ ok?: boolean; error?: string }>(
        res,
        'Eliminazione non riuscita.'
      );
      if (!res.ok) throw new Error(json.error || 'Eliminazione non riuscita.');
      setNotes((prev) => {
        const next = prev.filter((n) => n.id !== noteId);
        if (selectedIdRef.current === noteId) {
          setSelectedId(next[0]?.id ?? null);
        }
        return next;
      });
      setFeedback('Appunto eliminato.');
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : 'Impossibile eliminare l’appunto.'
      );
    } finally {
      setSaving(false);
    }
  };

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  return {
    notes,
    loading,
    error,
    loadNotes,
    selectedId,
    setSelectedId,
    selectedNote,
    titleDraft,
    bodyDraft,
    updateTitleDraft,
    updateBodyDraft,
    saving,
    feedback,
    dirty,
    handleSaveNow,
    handleCreate,
    handleDelete,
  };
}
