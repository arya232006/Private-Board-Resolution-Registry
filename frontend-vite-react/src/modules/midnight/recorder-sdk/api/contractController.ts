import { type Logger } from 'pino';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as Rx from 'rxjs';
import { RecorderPrivateStateId, RecorderProviders, DeployedRecorderContract, emptyState, UserAction, type DerivedState } from './common-types';
import { Recorder, RecorderPrivateState, createRecorderPrivateState } from '@eddalabs/recorder-contract';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { PrivateStateProvider } from '@midnight-ntwrk/midnight-js-types';
import { CompiledContract } from '@midnight-ntwrk/compact-js';

const recorderCompiledContract = CompiledContract.make('recorder', Recorder.Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(`${window.location.origin}/midnight/recorder`),
);

export interface ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;   
  readonly state$: Rx.Observable<DerivedState>;
  recordResolution: (yes: bigint, no: bigint) => Promise<void>;
  revealOutcome: () => Promise<[bigint, bigint]>;
}

export class ContractController implements ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Rx.Observable<DerivedState>;
  readonly privateStates$: Rx.Subject<RecorderPrivateState>;
  readonly transitions$: Rx.Subject<UserAction>;
  readonly revealedOutcome$: Rx.Subject<[bigint, bigint]>;

  private constructor(
    public readonly contractPrivateStateId: typeof RecorderPrivateStateId,
    public readonly deployedContract: DeployedRecorderContract,
    public readonly providers: RecorderProviders,
    private readonly logger: Logger,
  ) {
    const combine = (acc: DerivedState, value: Partial<DerivedState>): DerivedState => {
      return { ...acc, ...value };
    };
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    this.transitions$ = new Rx.Subject<UserAction>();
    this.privateStates$ = new Rx.Subject<RecorderPrivateState>();
    this.revealedOutcome$ = new Rx.Subject<[bigint, bigint]>();

    this.state$ = Rx.combineLatest([
      providers.publicDataProvider
        .contractStateObservable(this.deployedContractAddress, { type: 'all' })
        .pipe(Rx.map((contractState) => Recorder.ledger(contractState.data))),
      Rx.concat(
        Rx.from(
          Rx.defer(() => providers.privateStateProvider.get(contractPrivateStateId) as Promise<RecorderPrivateState>),
        ),
        this.privateStates$,
      ),
      Rx.concat(Rx.of<UserAction>({ record: undefined, reveal: undefined }), this.transitions$),
      Rx.concat(Rx.of<[bigint, bigint] | undefined>(undefined), this.revealedOutcome$),
    ]).pipe(
      Rx.map(([ledgerState, privateState, userActions, revealedOutcome]) => ({
        totalResolutions: ledgerState.total_resolutions,
        privateState,
        turns: userActions,
        revealedOutcome,
      })),
      Rx.scan(combine, emptyState),
      Rx.retry({ delay: 500 }),
    );
  }

  async recordResolution(yes: bigint, no: bigint): Promise<void> {
    this.logger?.info('Recording resolution');
    this.transitions$.next({ record: 'Recording resolution...', reveal: undefined });

    try {
      const txData = await this.deployedContract.callTx.record_resolution(yes, no);
      this.logger?.trace({
        record_resolution: {
          txHash: txData.public.txHash,
          blockHeight: txData.public.blockHeight,
        },
      });
      
      // Update local private state immediately for UI responsiveness
      const newState = createRecorderPrivateState(yes, no);
      await this.providers.privateStateProvider.set(this.contractPrivateStateId, newState);
      this.privateStates$.next(newState);

      this.transitions$.next({ record: undefined, reveal: undefined });
    } catch (e) {
      this.transitions$.next({ record: undefined, reveal: undefined });
      throw e;
    }
  }

  async revealOutcome(): Promise<[bigint, bigint]> {
    this.logger?.info('Revealing outcome');
    this.transitions$.next({ record: undefined, reveal: 'Revealing outcome...' });

    try {
      const result = await this.deployedContract.callTx.reveal_outcome();
      const votes = [result.result[0], result.result[1]] as [bigint, bigint];
      this.revealedOutcome$.next(votes);
      this.transitions$.next({ record: undefined, reveal: undefined });
      return votes;
    } catch (e) {
      this.transitions$.next({ record: undefined, reveal: undefined });
      throw e;
    }
  }

  static async deploy(
    contractPrivateStateId: typeof RecorderPrivateStateId,    
    providers: RecorderProviders,
    logger: Logger,
  ): Promise<ContractController> {
    const deployedContract = await deployContract(providers, {
      compiledContract: recorderCompiledContract,
      privateStateId: contractPrivateStateId,
      initialPrivateState: await ContractController.getPrivateState(contractPrivateStateId, providers.privateStateProvider),
    });

    return new ContractController(contractPrivateStateId, deployedContract, providers, logger);
  }

  static async join(
    contractPrivateStateId: typeof RecorderPrivateStateId,   
    providers: RecorderProviders,
    contractAddress: ContractAddress,
    logger: Logger,
  ): Promise<ContractController> {
    const deployedContract = await findDeployedContract(providers, {
      contractAddress,
      compiledContract: recorderCompiledContract,
      privateStateId: contractPrivateStateId,
      initialPrivateState: await ContractController.getPrivateState(contractPrivateStateId, providers.privateStateProvider),
    });

    return new ContractController(contractPrivateStateId, deployedContract, providers, logger);
  }

  private static async getPrivateState(
    id: typeof RecorderPrivateStateId,
    provider: PrivateStateProvider<typeof RecorderPrivateStateId, RecorderPrivateState>,
  ): Promise<RecorderPrivateState> {
    const existing = await provider.get(id);
    return existing ?? createRecorderPrivateState(0n, 0n);
  }
}
