import { DerivedState } from "../api/common-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContractControllerInterface } from "../api/contractController";
import { Observable } from "rxjs";
import { useWallet } from "../../wallet-widget/hooks/useWallet";
import { ContractDeployment, ContractFollow } from "../contexts/recorder-deployment-class";
import { useDeployment } from "./use-deployment";
import { useProviders } from "./use-providers";

export const useContractSubscription = () => {
  const { status } = useWallet();
  const providers = useProviders();
  const deploy = useDeployment();

  const [recorderDeploymentObservable, setRecorderDeploymentObservable] =
    useState<Observable<ContractDeployment> | undefined>(undefined);

  const [contractDeployment, setContractDeployment] =
    useState<ContractDeployment>();
  const [deployedContractAPI, setDeployedContractAPI] =
    useState<ContractControllerInterface>();
  const [derivedState, setDerivedState] = useState<DerivedState>();

  const deployingRef = useRef(false);

  const onDeploy = (): ContractFollow | undefined => {
    if (!deploy) {
      console.warn("Deployment provider is not available. Is the wallet connected?");
      return undefined;
    }
    deployingRef.current = true;
    const contractFollow = deploy.deployContract();
    setRecorderDeploymentObservable(contractFollow.observable);
    return contractFollow;
  }

  const onJoin = useCallback(async (): Promise<void> => {
    if (deployingRef.current || !deploy) return;
    setRecorderDeploymentObservable(deploy.joinContract().observable);
  }, [deploy, setRecorderDeploymentObservable]);

  useEffect(() => {
    if (status?.status === "connected" && providers && deploy && !deployingRef.current && !recorderDeploymentObservable) {
      void onJoin();
    }
  }, [onJoin, status?.status, providers, deploy, recorderDeploymentObservable]);

  useEffect(() => {
    if (!recorderDeploymentObservable) {
      return;
    }
    const subscription = recorderDeploymentObservable.subscribe(
      setContractDeployment
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [recorderDeploymentObservable]);

  useEffect(() => {
    if (!contractDeployment) {
      return;
    }

    if (
      contractDeployment.status === "in-progress" ||
      contractDeployment.status === "failed"
    ) {
      return;
    }
    setDeployedContractAPI(contractDeployment.api);
  }, [contractDeployment, setDeployedContractAPI]);

  useEffect(() => {
    if (deployedContractAPI) {
      const subscriptionDerivedState =
        deployedContractAPI.state$.subscribe(setDerivedState);
      return () => {
        subscriptionDerivedState.unsubscribe();
      };
    }
  }, [deployedContractAPI]);

  return {       
    deployedContractAPI,
    contractDeployment,
    derivedState,
    onDeploy,
    providers
  };
};
