import { useState, useCallback, useEffect } from 'react';
import { notesService, Note, CreateNotePayload, UpdateNotePayload } from '@lib/api/notes';

/**
 * USE NOTES HOOK
 * Manages notes state and operations with optimistic updates
 */

interface UseNotesState {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

export const useNotes = () => {
  const [state, setState] = useState<UseNotesState>({
    notes: [],
    currentNote: null,
    isLoading: false,
    isSaving: false,
    error: null,
  });

  const fetchNotes = useCallback(async (page = 1, limit = 20) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await notesService.getNotes(page, limit);
      if (response) {
        setState((prev) => ({
          ...prev,
          notes: response.notes,
          isLoading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch notes',
      }));
    }
  }, []);

  const getNote = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const note = await notesService.getNote(id);
      if (note) {
        setState((prev) => ({
          ...prev,
          currentNote: note,
          isLoading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch note',
      }));
    }
  }, []);

  const createNote = useCallback(async (payload: CreateNotePayload) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));
    try {
      const newNote = await notesService.createNote(payload);
      if (newNote) {
        setState((prev) => ({
          ...prev,
          notes: [newNote, ...prev.notes],
          currentNote: newNote,
          isSaving: false,
        }));
        return newNote;
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: err instanceof Error ? err.message : 'Failed to create note',
      }));
    }
    return null;
  }, []);

  const updateNote = useCallback(async (id: string, payload: UpdateNotePayload) => {
    // Optimistic update
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.id === id ? { ...n, ...payload } : n)),
      currentNote: prev.currentNote?.id === id ? { ...prev.currentNote, ...payload } : prev.currentNote,
      isSaving: true,
      error: null,
    }));

    try {
      const updated = await notesService.updateNote(id, payload);
      if (updated) {
        setState((prev) => ({
          ...prev,
          notes: prev.notes.map((n) => (n.id === id ? updated : n)),
          currentNote: prev.currentNote?.id === id ? updated : prev.currentNote,
          isSaving: false,
        }));
        return updated;
      }
    } catch (err) {
      // Revert optimistic update
      await fetchNotes();
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: err instanceof Error ? err.message : 'Failed to update note',
      }));
    }
    return null;
  }, [fetchNotes]);

  const deleteNote = useCallback(async (id: string) => {
    // Optimistic delete
    setState((prev) => ({
      ...prev,
      notes: prev.notes.filter((n) => n.id !== id),
      currentNote: prev.currentNote?.id === id ? null : prev.currentNote,
      isSaving: true,
      error: null,
    }));

    try {
      const success = await notesService.deleteNote(id);
      if (success) {
        setState((prev) => ({
          ...prev,
          isSaving: false,
        }));
        return true;
      }
    } catch (err) {
      // Revert optimistic delete
      await fetchNotes();
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: err instanceof Error ? err.message : 'Failed to delete note',
      }));
    }
    return false;
  }, [fetchNotes]);

  const toggleFavorite = useCallback(
    async (id: string, isFavorite: boolean) => {
      // Optimistic update
      setState((prev) => ({
        ...prev,
        notes: prev.notes.map((n) =>
          n.id === id ? { ...n, isFavorite } : n
        ),
        currentNote:
          prev.currentNote?.id === id
            ? { ...prev.currentNote, isFavorite }
            : prev.currentNote,
      }));

      try {
        await notesService.toggleFavorite(id, isFavorite);
      } catch (err) {
        // Revert on error
        setState((prev) => ({
          ...prev,
          notes: prev.notes.map((n) =>
            n.id === id ? { ...n, isFavorite: !isFavorite } : n
          ),
          currentNote:
            prev.currentNote?.id === id
              ? { ...prev.currentNote, isFavorite: !isFavorite }
              : prev.currentNote,
        }));
      }
    },
    []
  );

  const searchNotes = useCallback(async (query: string) => {
    if (!query.trim()) {
      await fetchNotes();
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const results = await notesService.searchNotes(query);
      if (results) {
        setState((prev) => ({
          ...prev,
          notes: results,
          isLoading: false,
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Search failed',
      }));
    }
  }, [fetchNotes]);

  return {
    ...state,
    fetchNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    searchNotes,
  };
};
