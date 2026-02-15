import {
  type RecorderProviders,
  RecorderPrivateStateId,
} from "../api/common-types";
import { type ContractAddress } from "@midnight-ntwrk/compact-runtime";
import { BehaviorSubject } from "rxjs";
import { type Logger } from "pino";
import { type LocalStorageProps } from "./recorder-local-storage-class";
import {
  ContractController,
  ContractControllerInterface,
} from "../api/contractController";

export type ContractDeployment =  
  | InProgressContractDeployment
  | DeployedContract
  | FailedContractDeployment;

export interface InProgressContractDeployment {
  readonly status: "in-progress";
  readonly status_message?: string;
  readonly address?: ContractAddress;
}

export interface DeployedContract {
  readonly status: "deployed";
  readonly api: ContractControllerInterface;
  readonly address: ContractAddress;
}

export interface FailedContractDeployment {
  readonly status: "failed";
  readonly error: Error;
  readonly address?: ContractAddress;
}

export interface ContractFollow {
  readonly observable: BehaviorSubject<ContractDeployment>;
  address?: ContractAddress;
}

export interface DeployedAPIProvider {  
  readonly joinContract: () => ContractFollow;
  readonly deployContract: () => ContractFollow;
}

export class DeployedTemplateManager implements DeployedAPIProvider {
  constructor(
    private readonly logger: Logger,
    private readonly localState: LocalStorageProps,    
    private readonly contractAddress: ContractAddress,
    private readonly providers?: RecorderProviders
  ) {}

  joinContract(): ContractFollow {
    const deployment = new BehaviorSubject<ContractDeployment>({
      status: "in-progress",
      address: this.contractAddress,
    });
    const contractFollow = {
      observable: deployment,
      address: this.contractAddress,
    };

    void this.join(deployment, this.contractAddress);

    return contractFollow;
  }

  deployContract(): ContractFollow {
    const deployment = new BehaviorSubject<ContractDeployment>({
      status: "in-progress",
    });

    void this.deploy(deployment);

    return { observable: deployment };
  }

  private async deploy(
    deployment: BehaviorSubject<ContractDeployment>
  ): Promise<string | undefined> {
    try {
      if (this.providers) {
        deployment.next({
          status: "in-progress",
          status_message: "Generating ZK Proof (this consumes tDUST)..."
        });

        // The actual deployment call
        const api = await ContractController.deploy(
          RecorderPrivateStateId,
          this.providers,
          this.logger
        );

        deployment.next({
          status: "in-progress",
          status_message: "Finalizing on blockchain & Indexer sync..."
        });

        this.localState.addContract(api.deployedContractAddress);

        deployment.next({
          status: "deployed",
          api,
          address: api.deployedContractAddress,
        });
        return api.deployedContractAddress;
      } else {
        deployment.next({
          status: "failed",
          error: new Error("Providers are not available"),
        });
      }
    } catch (error: unknown) {
      this.logger.error({ error }, "Deployment failed");
      console.error("Full Deployment Error Object:", error);
      deployment.next({
        status: "failed",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
    return undefined;
  }

  private async join(
    deployment: BehaviorSubject<ContractDeployment>,
    contractAddress: ContractAddress
  ): Promise<void> {
    try {
      if (this.providers) {
        const api = await ContractController.join(
          RecorderPrivateStateId,
          this.providers,
          contractAddress,
          this.logger
        );

        deployment.next({
          status: "deployed",
          api,
          address: api.deployedContractAddress,
        });
      } else {
        deployment.next({
          status: "failed",
          error: new Error("Providers are not available"),
        });
      }
    } catch (error: unknown) {
      this.logger.error({ error }, "Operation failed");
      console.error("Full Error Object:", error);
      deployment.next({
        status: "failed",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }
}
