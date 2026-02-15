import { useContext } from 'react';
import { LocalStateContext } from '../contexts/recorder-local-storage';

export const useLocalState = () => {
  const context = useContext(LocalStateContext);
  if (context === undefined) {
    throw new Error('useLocalState must be used within a LocalStorageProvider');
  }
  return context;
};
