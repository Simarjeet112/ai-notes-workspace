import { useEffect, useRef, useCallback } from 'react';

/**
 * USE AUTOSAVE HOOK
 * Automatically saves content with debouncing
 */

interface UseAutosaveOptions {
  delay?: number;
  onSave: (value: unknown) => Promise<void> | void;
}

export const useAutosave = (value: unknown, options: UseAutosaveOptions) => {
  const { delay = 1000, onSave } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isSavingRef = useRef(false);

  const save = useCallback(async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;

    try {
      await onSave(value);
    } catch (error) {
      console.error('Autosave failed:', error);
    } finally {
      isSavingRef.current = false;
    }
  }, [value, onSave]);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for autosave
    timeoutRef.current = setTimeout(() => {
      save();
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, save]);

  return {
    isSaving: isSavingRef.current,
    save,
  };
};
