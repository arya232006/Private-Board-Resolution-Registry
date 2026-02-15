import * as ledger from "@midnight-ntwrk/ledger-v7";
import {
  type MidnightProvider,
  type WalletProvider,
  type UnboundTransaction,
  PrivateStateProvider,
  ZKConfigProvider,
  ProofProvider,
  PublicDataProvider,
} from "@midnight-ntwrk/midnight-js-types";
import { createContext, useCallback, useMemo, useState } from "react";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { Logger } from "pino";
import type {
  RecorderCircuits,
  RecorderPrivateStateId,
} from "../api/common-types";
import { RecorderProviders } from "../api/common-types";
import { useWallet } from "../../wallet-widget/hooks/useWallet";
import {
  ActionMessages,
  ProviderAction,
  WrappedPublicDataProvider,
} from "../../wallet-widget/utils/providersWrappers/publicDataProvider";
import { CachedFetchZkConfigProvider } from "../../wallet-widget/utils/providersWrappers/zkConfigProvider";
import {
  noopProofClient,
  proofClient,
} from "../../wallet-widget/utils/providersWrappers/proofClient";
import { inMemoryPrivateStateProvider } from "../../wallet-widget/utils/customImplementations/in-memory-private-state-provider";
import { RecorderPrivateState } from "@eddalabs/recorder-contract";
import {
  fromHex,
  toHex,
} from "@midnight-ntwrk/compact-runtime";

export interface ProvidersState {
  privateStateProvider: PrivateStateProvider<typeof RecorderPrivateStateId>;
  zkConfigProvider?: ZKConfigProvider<RecorderCircuits>;
  proofProvider: ProofProvider;
  publicDataProvider?: PublicDataProvider;
  walletProvider?: WalletProvider;
  midnightProvider?: MidnightProvider;
  providers?: RecorderProviders;
  flowMessage?: string;
}

interface ProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export const ProvidersContext = createContext<ProvidersState | undefined>(
  undefined
);

const ACTION_MESSAGES: Readonly<ActionMessages> = {
  proveTxStarted: "Proving transaction...",
  proveTxDone: undefined,
  balanceTxStarted: "Signing the transaction with Midnight Lace wallet...",
  balanceTxDone: undefined,
  downloadProverStarted: "Downloading prover key...",
  downloadProverDone: undefined,
  submitTxStarted: "Submitting transaction...",
  submitTxDone: undefined,
  watchForTxDataStarted: "Waiting for transaction finalization on blockchain...",
  watchForTxDataDone: undefined,
} as const;

export const Provider = ({ children, logger }: ProviderProps) => {
  const [flowMessage, setFlowMessage] = useState<string | undefined>(undefined);

  const { serviceUriConfig, shieldedAddresses, connectedAPI, status } = useWallet();

  const providerCallback = useCallback(
    (action: ProviderAction): void => {
      setFlowMessage(ACTION_MESSAGES[action]);
    },
    []
  );

  const privateStateProvider: PrivateStateProvider<
    typeof RecorderPrivateStateId
  > = useMemo(
    () => inMemoryPrivateStateProvider<string, RecorderPrivateState>(),
    []
  );

  const publicDataProvider: PublicDataProvider | undefined = useMemo(
    () =>
      serviceUriConfig
        ? new WrappedPublicDataProvider(
            indexerPublicDataProvider(
              serviceUriConfig.indexerUri,
              serviceUriConfig.indexerWsUri
            ),
            providerCallback,
            logger
          )
        : undefined,
    [serviceUriConfig, providerCallback, logger, status]
  );

  const zkConfigProvider = useMemo(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    return new CachedFetchZkConfigProvider<RecorderCircuits>(
      `${window.location.origin}/midnight/recorder`,
      fetch.bind(window),
      () => {}
    );
  }, [status]);

  const proofProvider = useMemo(
    () =>
      serviceUriConfig?.proverServerUri && zkConfigProvider
        ? proofClient(serviceUriConfig.proverServerUri, zkConfigProvider, providerCallback)
        : noopProofClient(),
    [serviceUriConfig, zkConfigProvider, providerCallback, status]
  );

  const walletProvider: WalletProvider = useMemo(
    () =>
      connectedAPI
        ? {
            getCoinPublicKey(): ledger.CoinPublicKey {
              return shieldedAddresses?.shieldedCoinPublicKey as unknown as ledger.CoinPublicKey;
            },
            getEncryptionPublicKey(): ledger.EncPublicKey {
              return shieldedAddresses?.shieldedEncryptionPublicKey as unknown as ledger.EncPublicKey;
            },
            async balanceTx(
              tx: UnboundTransaction,
              _ttl?: Date
            ): Promise<ledger.FinalizedTransaction> {
              try {
                const serializedTx = toHex(tx.serialize());
                const cleanTx = serializedTx.toString(); // Ensure it's a primitive string

                logger.info(
                   `Balancing transaction: size ${cleanTx.length} chars. Wallet: ${shieldedAddresses?.shieldedCoinPublicKey?.substring(0, 10)}...`
                );

                if (!shieldedAddresses?.shieldedCoinPublicKey) {
                  throw new Error("Wallet Shielded Keys are missing. Ensure your wallet is fully initialized for this network.");
                }

                const received = await connectedAPI.balanceUnsealedTransaction(cleanTx);
                return ledger.Transaction.deserialize<
                  ledger.SignatureEnabled,
                  ledger.Proof,
                  ledger.Binding
                >(
                  "signature",
                  "proof",
                  "binding",
                  fromHex(received.tx)
                );
              } catch (e: any) {
                const errorMsg = e?.message || String(e);
                if (errorMsg.includes("non-zero length")) {
                   throw new Error("Wallet returned an empty transaction. This usually means you have 0 tokens on this network or the wallet is out of sync.");
                }
                logger.error(`Error during wallet balancing: ${errorMsg}`);
                throw e;
              }
            },
          }
        : {
            getCoinPublicKey(): ledger.CoinPublicKey {
              return "";
            },
            getEncryptionPublicKey(): ledger.EncPublicKey {
              return "";
            },
            balanceTx: () => Promise.reject(new Error("readonly")),
          },
    [connectedAPI, providerCallback, status]
  );

  const midnightProvider: MidnightProvider = useMemo(
    () =>
      connectedAPI
        ? {
            submitTx: async (
              tx: ledger.FinalizedTransaction
            ): Promise<ledger.TransactionId> => {
              const txHex = toHex(tx.serialize());
              const cleanTxHex = txHex.toString();
              
              logger.info("Transaction balanced. Now submitting to local node...");
              
              await connectedAPI.submitTransaction(cleanTxHex);
              const txIdentifiers = tx.identifiers();
              const txId = txIdentifiers[0];
              logger.info(
                { txId: txId.toString() },
                "Successfully submitted transaction via wallet"
              );
              return txId;
            },
          }
        : {
            submitTx: (): Promise<ledger.TransactionId> =>
              Promise.reject(new Error("readonly")),
          },
    [connectedAPI, providerCallback, status]
  );

  const innerProviders: RecorderProviders | undefined = useMemo(() => {
    return publicDataProvider && zkConfigProvider
      ? {
          privateStateProvider,
          publicDataProvider,
          zkConfigProvider,
          proofProvider,
          walletProvider,
          midnightProvider,
        }
      : undefined;
  }, [
    privateStateProvider,
    publicDataProvider,
    proofProvider,
    zkConfigProvider,
    walletProvider,
    midnightProvider,
  ]);

  const combinedProviders: ProvidersState = useMemo(() => {
    return {
      privateStateProvider,
      publicDataProvider,
      proofProvider,
      zkConfigProvider,
      walletProvider,
      midnightProvider,
      providers: innerProviders,
      flowMessage,
    };
  }, [
    privateStateProvider,
    publicDataProvider,
    proofProvider,
    zkConfigProvider,
    walletProvider,
    midnightProvider,
    innerProviders,
    flowMessage,
  ]);

  return (
    <ProvidersContext.Provider value={combinedProviders}>
      {children}
    </ProvidersContext.Provider>
  );
};
