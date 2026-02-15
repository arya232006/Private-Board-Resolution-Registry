import { Button } from "./common/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./common/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./common/dropdown-menu";
import { ChevronDown, ShieldCheck, Lock, Activity, RefreshCw } from "lucide-react";
import { networkID } from "./common/common-values";
import ConnectedButton from "./connected-button";
import ScreenMain from "./screen-main";
import { useWallet } from "../hooks/useWallet";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MidnightBrowserWallet } from "../api/walletController";

export const MidnightWallet = () => {
   const { open, setOpen, status, connectingWallet } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState(networkID.TESTNET);

  useEffect(() => {
    const networkIDConnected =
      MidnightBrowserWallet.getMidnightWalletConnected().networkID;
    if (networkIDConnected === null) return;
    setSelectedNetwork(networkIDConnected as SetStateAction<networkID>);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        {status?.status === undefined ? (
           <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="h-12 px-8 rounded-xl border-primary/20 bg-primary/5 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all shadow-glow shimmer gap-3"
              disabled={connectingWallet}
            >
               {connectingWallet ? (
                 <>
                   <RefreshCw className="w-3 h-3 animate-spin" />
                   Connecting...
                 </>
               ) : (
                 <>
                   <Lock className="w-3 h-3" />
                   Establish Connection
                 </>
               )}
            </Button>
          </DialogTrigger>
        ) : (
          <ConnectedButton />
        )}
      </div>

      <DialogContent
        className="sm:max-w-[440px] bg-[#030712]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-4xl overflow-hidden p-0 gap-0"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="h-1 bg-gradient-to-r from-primary via-blue-500 to-primary animate-circuit" />
        
        <div className="p-10 space-y-8">
          <Header
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
          
          <div className="relative py-4">
             <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-xl opacity-50" />
             <ScreenMain setOpen={setOpen} selectedNetwork={selectedNetwork} />
          </div>

          <Footer />
        </div>
      </DialogContent>
    </Dialog>
  );
};

function Header({
  selectedNetwork,
  setSelectedNetwork,
}: {
  selectedNetwork: string;
  setSelectedNetwork: Dispatch<SetStateAction<networkID>>;
}) {
   const getInitials = (network: string) => {
    if (network === "testnet") return "TST";
    return network.substring(0, 4).toUpperCase();
  };
  return (
    <DialogHeader className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
               <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-black tracking-tighter uppercase italic">
              Secure <span className="text-primary">Gateway</span>
            </DialogTitle>
         </div>
         
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button
               variant="outline"
               size="sm"
               className="h-9 px-4 rounded-xl border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
             >
               <Activity className="h-3 w-3 text-emerald-500" />
               {getInitials(selectedNetwork)}
               <ChevronDown className="h-3 w-3 opacity-30" />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end" className="min-w-[160px] bg-[#0c0c0c] border-white/10 rounded-xl p-2">
             {Object.values(networkID).map((network) => (
               <DropdownMenuItem
                 key={network}
                 onClick={() => setSelectedNetwork(network)}
                 className={`rounded-lg px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all mb-1 last:mb-0 ${
                    selectedNetwork === network 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                 }`}
               >
                 {network}
               </DropdownMenuItem>
             ))}
           </DropdownMenuContent>
         </DropdownMenu>
      </div>
      
      <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] leading-relaxed border-l-2 border-primary/20 pl-4">
         Select a cryptographic enclave to authorize the registry session.
      </p>
    </DialogHeader>
  );
}

function Footer() {
  return (
    <DialogFooter className="pt-6 border-t border-white/5">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
           <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/30">Protocol Verified</span>
           <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        
        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/20 italic">
          <span>Built on Mesh</span>
          <span className="text-primary/20">•</span>
          <span>Edda Labs</span>
        </div>
      </div>
    </DialogFooter>
  );
}
