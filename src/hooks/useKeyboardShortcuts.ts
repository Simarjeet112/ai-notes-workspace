import { useEffect } from 'react';

/**
 * USE KEYBOARD SHORTCUTS HOOK
 * Manages keyboard shortcuts for productivity
 */

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: (e: KeyboardEvent) => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : true;
        const altMatch = shortcut.alt ? e.altKey : true;
        const metaMatch = shortcut.meta ? e.metaKey : true;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
          e.preventDefault();
          shortcut.handler(e);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

/**
 * Common keyboard shortcuts preset
 */
export const COMMON_SHORTCUTS = {
  save: { key: 's', ctrl: true } as Omit<KeyboardShortcut, 'handler'>,
  newNote: { key: 'n', ctrl: true } as Omit<KeyboardShortcut, 'handler'>,
  search: { key: 'k', ctrl: true } as Omit<KeyboardShortcut, 'handler'>,
  delete: { key: 'Delete' } as Omit<KeyboardShortcut, 'handler'>,
  escape: { key: 'Escape' } as Omit<KeyboardShortcut, 'handler'>,
  enter: { key: 'Enter' } as Omit<KeyboardShortcut, 'handler'>,
  undo: { key: 'z', ctrl: true } as Omit<KeyboardShortcut, 'handler'>,
  redo: { key: 'z', ctrl: true, shift: true } as Omit<KeyboardShortcut, 'handler'>,
};
