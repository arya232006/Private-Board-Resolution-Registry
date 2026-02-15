import { type RecorderPrivateState, Recorder, createRecorderPrivateState } from '@eddalabs/recorder-contract';
import type { ImpureCircuitId } from '@midnight-ntwrk/compact-js';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type RecorderCircuits = ImpureCircuitId<Recorder.Contract<RecorderPrivateState>>;

export const RecorderPrivateStateId = 'recorderPrivateState';

export type RecorderProviders = MidnightProviders<RecorderCircuits, typeof RecorderPrivateStateId, RecorderPrivateState>;

export type RecorderContract = Recorder.Contract<RecorderPrivateState>;

export type DeployedRecorderContract = DeployedContract<RecorderContract> | FoundContract<RecorderContract>;

export type UserAction = {
  record: string | undefined;
  reveal: string | undefined;
};

export type DerivedState = {
  readonly totalResolutions: Recorder.Ledger["total_resolutions"];
  readonly privateState: RecorderPrivateState;
  readonly turns: UserAction;
  readonly revealedOutcome?: [bigint, bigint];
};

export const emptyState: DerivedState = {
  totalResolutions: 0n,
  privateState: createRecorderPrivateState(0n, 0n),
  turns: { record: undefined, reveal: undefined },
};
