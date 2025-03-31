
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Custom hook for auto-saving form data to localStorage
 * @param formId A unique identifier for the form (used as localStorage key prefix)
 * @param initialData The initial data for the form
 * @param autoSaveInterval The interval in milliseconds to auto-save (default: 10000ms)
 * @returns An object containing the current data, a function to update the data, and a function to clear the saved data
 */
export function useFormAutoSave<T>(
  formId: string,
  initialData: T,
  autoSaveInterval = 10000
) {
  const { id } = useParams<{ id?: string }>();
  const storageKey = `form_autosave_${formId}_${id || 'new'}`;
  
  // Try to load saved data from localStorage
  const loadSavedData = (): T | null => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
    return null;
  };

  const [formData, setFormData] = useState<T>(() => {
    const savedData = loadSavedData();
    return savedData || initialData;
  });

  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Save current form data to localStorage
  const saveFormData = (data: T) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setLastSavedAt(new Date());
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  // Update form data and trigger save
  const updateFormData = (data: T) => {
    setFormData(data);
    saveFormData(data);
  };

  // Clear saved data from localStorage
  const clearSavedData = () => {
    try {
      localStorage.removeItem(storageKey);
      setLastSavedAt(null);
    } catch (error) {
      console.error('Error clearing saved form data:', error);
    }
  };

  // Auto-save form data at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      saveFormData(formData);
    }, autoSaveInterval);

    return () => clearInterval(interval);
  }, [formData, autoSaveInterval]);

  // Auto-save when user is about to leave the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveFormData(formData);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);

  return { 
    formData, 
    updateFormData, 
    clearSavedData, 
    lastSavedAt,
    hasSavedData: !!loadSavedData()
  };
}
