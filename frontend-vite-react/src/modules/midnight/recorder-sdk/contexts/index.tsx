import { DeployedProvider } from './recorder-deployment';
import { LocalStorageProvider } from './recorder-local-storage';
import { Provider } from './recorder-providers';
import { Logger } from 'pino';
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';

export * from './recorder-providers';
export * from './recorder-local-storage';
export * from './recorder-local-storage-class';
export * from './recorder-deployment';
export * from './recorder-deployment-class';

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;  
  contractAddress: ContractAddress;
}

export const RecorderAppProvider = ({ children, logger, contractAddress }: AppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} contractAddress={contractAddress}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
