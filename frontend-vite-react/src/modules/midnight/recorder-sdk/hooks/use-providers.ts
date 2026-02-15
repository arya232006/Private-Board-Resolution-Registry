import { useContext } from 'react';
import { ProvidersContext } from '../contexts/recorder-providers';

export const useProviders = () => {
  return useContext(ProvidersContext);
};
