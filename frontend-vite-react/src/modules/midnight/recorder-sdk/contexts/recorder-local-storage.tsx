import type { PropsWithChildren } from 'react';
import { createContext, useMemo } from 'react';
import { type Logger } from 'pino';
import { LocalStorage, LocalStorageProps } from './recorder-local-storage-class';

export const LocalStateContext = createContext<LocalStorageProps | undefined>(undefined);

export type LocalStateProviderProps = PropsWithChildren<{
  logger: Logger;  
}>;

export const LocalStorageProvider = ({ logger, children }: LocalStateProviderProps) => {
  const manager = useMemo(() => {
    return new LocalStorage(logger);
  }, [logger]);

  return (
    <LocalStateContext.Provider value={manager}>
      {children}
    </LocalStateContext.Provider>
  );
};
