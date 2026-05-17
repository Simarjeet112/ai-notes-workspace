/**
 * NOTES SERVICE
 * Handles all note-related API operations
 */

import { apiClient } from './client';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  isPinned: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  shareLink?: string;
  isPublic: boolean;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tags?: string[];
  category?: string;
}

export interface UpdateNotePayload {
  title?: string;
  content?: string;
  tags?: string[];
  category?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
}

export interface NotesListResponse {
  notes: Note[];
  total: number;
  page: number;
  limit: number;
}

class NotesService {
  async getNotes(page = 1, limit = 20): Promise<NotesListResponse | null> {
    const response = await apiClient.get<NotesListResponse>(
      `/notes?page=${page}&limit=${limit}`
    );
    return response.success && response.data ? response.data : null;
  }

  async getNote(id: string): Promise<Note | null> {
    const response = await apiClient.get<Note>(`/notes/${id}`);
    return response.success && response.data ? response.data : null;
  }

  async createNote(payload: CreateNotePayload): Promise<Note | null> {
    const response = await apiClient.post<Note>('/notes', payload);
    return response.success && response.data ? response.data : null;
  }

  async updateNote(id: string, payload: UpdateNotePayload): Promise<Note | null> {
    const response = await apiClient.put<Note>(`/notes/${id}`, payload);
    return response.success && response.data ? response.data : null;
  }

  async deleteNote(id: string): Promise<boolean> {
    const response = await apiClient.delete<{ success: boolean }>(`/notes/${id}`);
    return response.success ?? false;
  }

  async searchNotes(query: string): Promise<Note[] | null> {
    const response = await apiClient.get<Note[]>(`/notes/search?q=${encodeURIComponent(query)}`);
    return response.success && response.data ? response.data : null;
  }

  async getNotesByTag(tag: string): Promise<Note[] | null> {
    const response = await apiClient.get<Note[]>(`/notes/tag/${encodeURIComponent(tag)}`);
    return response.success && response.data ? response.data : null;
  }

  async getNotesByCategory(category: string): Promise<Note[] | null> {
    const response = await apiClient.get<Note[]>(
      `/notes/category/${encodeURIComponent(category)}`
    );
    return response.success && response.data ? response.data : null;
  }

  async pinNote(id: string): Promise<Note | null> {
    const response = await apiClient.patch<Note>(`/notes/${id}/pin`, { isPinned: true });
    return response.success && response.data ? response.data : null;
  }

  async unpinNote(id: string): Promise<Note | null> {
    const response = await apiClient.patch<Note>(`/notes/${id}/pin`, { isPinned: false });
    return response.success && response.data ? response.data : null;
  }

  async toggleFavorite(id: string, isFavorite: boolean): Promise<Note | null> {
    const response = await apiClient.patch<Note>(`/notes/${id}/favorite`, { isFavorite });
    return response.success && response.data ? response.data : null;
  }

  async shareNote(id: string): Promise<{ shareLink: string } | null> {
    const response = await apiClient.post<{ shareLink: string }>(`/notes/${id}/share`, {});
    return response.success && response.data ? response.data : null;
  }

  async getPublicNote(shareLink: string): Promise<Note | null> {
    const response = await apiClient.get<Note>(`/notes/share/${shareLink}`);
    return response.success && response.data ? response.data : null;
  }
}

export const notesService = new NotesService();
