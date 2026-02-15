import { useContext } from 'react';
import { DeployedProviderContext, type DeployedAPIProvider } from '../contexts';

export const useDeployment = (): DeployedAPIProvider | null => {
  const context = useContext(DeployedProviderContext);
  return context ?? null;
};
