import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { 
  RefreshCw, 
  PlusCircle, 
  ShieldCheck, 
  Eye, 
  Vote, 
  Copy, 
  Check, 
  Zap, 
  LayoutDashboard, 
  Globe, 
  Lock,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useContractSubscription } from "@/modules/midnight/recorder-sdk/hooks/use-contract-subscription";
import { ModeToggle } from "@/components/mode-toggle";
import { Counter } from "@/components/counter";

export const Recorder = () => {
  const { deployedContractAPI, contractDeployment, derivedState, onDeploy, providers } =
    useContractSubscription();
  const [appLoading, setAppLoading] = useState(true);
  const [yesVotes, setYesVotes] = useState<string>("0");
  const [noVotes, setNoVotes] = useState<string>("0");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (derivedState?.totalResolutions !== undefined || !deployedContractAPI) {
      setAppLoading(false);
    }
  }, [derivedState?.totalResolutions, deployedContractAPI]);

  const copyAddress = () => {
    if (deployedContractAPI?.deployedContractAddress) {
      navigator.clipboard.writeText(deployedContractAPI.deployedContractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const deployNew = () => {
    if (!providers?.providers) {
      alert("Please connect your wallet first using the 'Secure Connect' button.");
      console.warn("Deployment blocked: Providers not available.");
      return;
    }
    console.log("Starting contract deployment...");
    onDeploy();
  };

  const record_resolution = async () => {
    if (deployedContractAPI) {
      try {
        await deployedContractAPI.record_resolution(BigInt(yesVotes), BigInt(noVotes));
      } catch (e) {
        console.error("Failed to record resolution", e);
      }
    }
  };

  const reveal_outcome = async () => {
    if (deployedContractAPI) {
      try {
        await deployedContractAPI.reveal_outcome();
      } catch (e) {
        console.error("Failed to reveal outcome", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-scan select-none">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] pointer-events-none animate-float opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      {appLoading && <Loading />}
      <div className="max-w-[1400px] mx-auto relative z-10 transition-all duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-4 bg-background rounded-2xl shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                  <ShieldCheck className="w-12 h-12 text-primary glow-primary" />
                </div>
              </div>
              <div className="space-y-1">
                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.8] drop-shadow-sm">
                  REGISTRY <span className="text-gradient">OPERATOR</span>
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Institutional ZK-Core</p>
                  <div className="h-px w-12 bg-primary/20" />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50">SECURED BY MIDNIGHT</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 p-1.5 bg-card/30 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-2xl">
            <div className="px-6 py-2 border-r border-white/10">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse glow-emerald" />
                 <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase">Gateway Active</span>
               </div>
            </div>
            <div className="pr-2">
               <ModeToggle />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          
          {/* Main Console: Configuration & Voting */}
          <div className="xl:col-span-8 space-y-10">
            
            {/* System Status Card */}
            <Card className="border-none bg-card/40 backdrop-blur-3xl shadow-3xl overflow-hidden card-shine animate-in fade-in slide-in-from-bottom-5 duration-700">
               <div className="h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-primary animate-circuit" />
               <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x border-border/10">
                    <div className="p-12 flex flex-col items-center justify-center bg-primary/5 relative">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent" />
                       <Vote className="w-14 h-14 text-primary mb-6 animate-float relative z-10" />
                       <h3 className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-2 relative z-10">Resolutions</h3>
                       <p className="text-7xl font-black tabular-nums tracking-tighter relative z-10">
                          <Counter value={derivedState?.totalResolutions || 0} />
                       </p>
                    </div>
                    
                    <div className="p-12 lg:col-span-3 space-y-10">
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          <div className="space-y-2">
                             <h4 className="text-2xl font-black tracking-tight">Deployment Schema</h4>
                             <p className="text-sm font-bold text-muted-foreground/60">Live cryptographic identifiers for the current governance instance.</p>
                          </div>
                          <div className="flex gap-2">
                             <Badge className="bg-primary/20 text-primary border-primary/20 py-2 px-5 font-black text-[10px] tracking-widest rounded-xl">TESTNET-LCL</Badge>
                             <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 py-2 px-5 font-black text-[10px] tracking-widest rounded-xl uppercase">Synced</Badge>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="group space-y-3">
                             <div className="flex items-center justify-between px-1">
                                <Label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Runtime Address</Label>
                                <Copy className="w-3 h-3 text-muted-foreground/20" />
                             </div>
                             <div className="flex items-center gap-4 p-5 bg-background/40 rounded-[1.25rem] border border-white/5 group-hover:border-primary/40 transition-all shadow-inner relative overflow-hidden">
                                <div className="absolute left-0 top-0 w-1 h-full bg-primary/20" />
                                <ShieldCheck className={`w-6 h-6 ${deployedContractAPI?.deployedContractAddress ? 'text-emerald-500 glow-emerald' : 'text-muted-foreground/20'}`} />
                                <code className="text-[11px] font-mono font-black truncate flex-1 opacity-60">
                                  {deployedContractAPI?.deployedContractAddress || 'system::waiting_initialization'}
                                </code>
                                {deployedContractAPI?.deployedContractAddress && (
                                  <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/20 rounded-xl" onClick={copyAddress}>
                                    {copied ? <Check className="h-5 h-5 text-emerald-500" /> : <Copy className="h-5 h-5" />}
                                  </Button>
                                )}
                             </div>
                          </div>
                          <div className="group space-y-3">
                             <div className="flex items-center justify-between px-1">
                                <Label className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Identity Seed</Label>
                                <Lock className="w-3 h-3 text-muted-foreground/20" />
                             </div>
                             <div className="flex items-center gap-4 p-5 bg-muted/20 rounded-[1.25rem] border border-dashed border-white/10 relative overflow-hidden">
                                <Lock className="w-6 h-6 text-muted-foreground/20" />
                                <code className="text-[11px] font-mono text-muted-foreground/40 truncate flex-1 italic">
                                  {import.meta.env.VITE_CONTRACT_ADDRESS || 'id::undefined'}
                                </code>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" onClick={() => {
                                  navigator.clipboard.writeText(import.meta.env.VITE_CONTRACT_ADDRESS || '');
                                  setCopied(true);
                                  setTimeout(() => setCopied(false), 2000);
                                }}>
                                  {copied ? <Check className="h-5 h-5 text-emerald-500" /> : <Copy className="h-5 h-5" />}
                                </Button>
                             </div>
                          </div>
                       </div>

                       <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                           <Button 
                              onClick={deployNew} 
                              className="w-full sm:flex-1 h-20 rounded-2xl !bg-[#f8fafc] !text-[#020617] font-black text-xl gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow group border border-white/20"
                           >
                              <PlusCircle className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
                              DEPLOY NEW SYSTEM
                           </Button>
                          {contractDeployment?.status === "in-progress" && (
                            <div className="px-10 h-20 bg-primary/20 border-2 border-primary/40 rounded-2xl flex items-center gap-4 text-primary font-black text-sm animate-pulse shadow-lg shadow-primary/20">
                               <RefreshCw className="w-5 h-5 animate-spin" />
                               BOOTING...
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
               </CardContent>
            </Card>

            {/* Voting Console */}
            <Card className="border-none bg-card/60 backdrop-blur-[40px] shadow-4xl overflow-hidden relative group/console">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
               <CardHeader className="p-12 pb-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 rounded-[1.25rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover/console:scale-110 transition-transform duration-500">
                         <Vote className="w-7 h-7 text-emerald-500 glow-emerald" />
                       </div>
                       <div>
                          <CardTitle className="text-4xl font-black tracking-tighter">Decision Console</CardTitle>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Encrypted State Commit</p>
                       </div>
                    </div>
                    <div className="hidden md:flex gap-2">
                       {['ZK-04', 'ECDSA', 'AES-256'].map(t => (
                          <Badge key={t} variant="secondary" className="text-[8px] font-black bg-white/5 border-white/5 opacity-50">{t}</Badge>
                       ))}
                    </div>
                  </div>
               </CardHeader>
               <CardContent className="p-12 pt-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    <div className="space-y-4 group">
                       <div className="flex justify-between items-center px-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-emerald-500 group-hover:opacity-100 opacity-60 transition-opacity">Consented Approve</Label>
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] h-5 px-3 font-black">PRIVATE_COMMIT</Badge>
                       </div>
                       <div className="relative">
                          <Input 
                            type="number" 
                            value={yesVotes} 
                            onChange={(e) => setYesVotes(e.target.value)}
                            className="h-32 text-center text-6xl font-black bg-background/50 border-2 border-white/5 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/40 rounded-[2rem] transition-all shadow-inner text-emerald-500"
                          />
                       </div>
                    </div>
                    <div className="space-y-4 group">
                       <div className="flex justify-between items-center px-2">
                          <Label className="text-[11px] font-black uppercase tracking-widest text-destructive group-hover:opacity-100 opacity-60 transition-opacity">Consented Reject</Label>
                          <Badge className="bg-destructive/10 text-destructive border-none text-[8px] h-5 px-3 font-black">PRIVATE_COMMIT</Badge>
                       </div>
                       <div className="relative">
                          <Input 
                            type="number" 
                            value={noVotes} 
                            onChange={(e) => setNoVotes(e.target.value)}
                            className="h-32 text-center text-6xl font-black bg-background/50 border-2 border-white/5 focus-visible:ring-destructive/20 focus-visible:border-destructive/40 rounded-[2rem] transition-all shadow-inner text-destructive"
                          />
                       </div>
                    </div>
                  </div>

                   <Button 
                     onClick={record_resolution} 
                     disabled={!deployedContractAPI}
                     className="w-full h-28 !bg-[#f8fafc] !text-[#020617] font-black text-3xl rounded-[2.5rem] shadow-glow transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-20 flex gap-6 shimmer relative overflow-hidden border-2 border-white/20"
                   >
                     <ShieldCheck className="w-10 h-10" />
                     SUBMIT TO LEDGER
                     <div className="absolute right-8 opacity-20">
                        <Zap className="w-8 h-8 animate-pulse" />
                     </div>
                   </Button>
               </CardContent>
            </Card>
          </div>

          {/* Sidebar Area: Network Health & State Info */}
          <div className="xl:col-span-4 space-y-10">
            
            {/* System Integrity & Metrics */}
            <Card className="border-none bg-primary/10 backdrop-blur-3xl shadow-4xl p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 rotate-12 opacity-[0.03]">
                  <Settings className="w-48 h-48 text-primary animate-spin [animation-duration:20s]" />
               </div>
               
               <div className="space-y-10 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                      <LayoutDashboard className="w-6 h-6 text-primary glow-primary" />
                    </div>
                    <h4 className="text-2xl font-black tracking-tight">System Core</h4>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                           <span className="flex items-center gap-2 italic opacity-60">Privacy Shield</span>
                           <span className="text-emerald-500 font-black">MAX ACTIVE</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                           <div className="h-full w-[95%] bg-gradient-to-r from-emerald-500 to-primary rounded-full animate-circuit shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                           <span className="flex items-center gap-2 italic opacity-60">Circuit Integrity</span>
                           <span className="text-primary font-black">OPTIMAL_STATE</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                           <div className="h-full w-full bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.3)] shimmer" />
                        </div>
                     </div>
                  </div>

                  {/* Private State Visualizer */}
                  <div className="p-8 bg-background/40 rounded-[2rem] border border-white/5 space-y-6 relative group overflow-hidden">
                     <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                     <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full">Local Vault Inspector</p>
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/20 rounded-2xl text-center border border-white/5">
                           <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 mb-2 italic">Approved</p>
                           <p className="text-4xl font-black text-foreground">
                              <Counter value={derivedState?.privateState.yesVotes || 0} duration={1000} />
                           </p>
                        </div>
                        <div className="p-4 bg-muted/20 rounded-2xl text-center border border-white/5">
                           <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 mb-2 italic">Rejected</p>
                           <p className="text-4xl font-black text-foreground">
                              <Counter value={derivedState?.privateState.noVotes || 0} duration={1000} />
                           </p>
                        </div>
                     </div>
                  </div>

                   <Button 
                     onClick={reveal_outcome} 
                     disabled={!deployedContractAPI}
                     className="w-full h-16 !bg-[#f8fafc] !text-[#020617] font-black uppercase tracking-[0.2em] text-[10px] border-none hover:opacity-90 transition-all shadow-glow rounded-[1.25rem] group"
                   >
                     <Eye className="w-4 h-4 mr-3 group-hover:scale-125 transition-transform" />
                     REVEAL PROTOCOL STATE
                   </Button>
               </div>
            </Card>

            {/* Revealed Outcome: Holographic Alert */}
            {derivedState?.revealedOutcome && (
              <Card className="border-none bg-emerald-600 shadow-[0_40px_100px_rgba(16,185,129,0.25)] p-1 rounded-[2.5rem] overflow-hidden animate-in zoom-in-90 duration-700 relative">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent pointer-events-none" />
                 <div className="bg-[#0c0c0c]/90 backdrop-blur-4xl rounded-[calc(2.5rem-4px)] p-10 text-center space-y-8 relative z-10">
                    <div className="space-y-3">
                       <Badge className="bg-emerald-500 text-white font-black px-10 py-2 rounded-full text-xs tracking-widest animate-bounce">OUTCOME_PUBLISHED</Badge>
                       <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 italic opacity-50">Ledger Aggregation Complete</h5>
                    </div>
                    <div className="flex justify-around items-end gap-6 pt-4">
                       <div className="flex-1">
                          <p className="text-7xl font-black text-emerald-500 tracking-tighter tabular-nums leading-none glow-emerald">
                             <Counter value={derivedState.revealedOutcome[0]} duration={1000} />
                          </p>
                          <p className="text-[10px] font-black uppercase text-emerald-500/30 mt-4 tracking-widest italic">Pub Approve</p>
                       </div>
                       <div className="h-20 w-px bg-white/5 mb-2" />
                       <div className="flex-1">
                          <p className="text-7xl font-black text-destructive tracking-tighter tabular-nums leading-none">
                             <Counter value={derivedState.revealedOutcome[1]} duration={1000} />
                          </p>
                          <p className="text-[10px] font-black uppercase text-destructive/30 mt-4 tracking-widest italic">Pub Reject</p>
                       </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-3 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">
                       <Globe className="w-4 h-4" />
                       Chain Verified
                    </div>
                 </div>
              </Card>
            )}

            {/* Terminal Window */}
            <div className="rounded-[2rem] bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-4xl group">
               <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-destructive/50" />
                     <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                     <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase opacity-40 italic">system_logs --v1.0.4</p>
               </div>
               <div className="p-8 font-mono text-[10px] leading-relaxed space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                  <div className="flex items-start gap-4 text-primary font-black">
                     <span>{'>'}</span>
                     <p>INITIALIZING SECURE CONTEXT...</p>
                  </div>
                  <div className="space-y-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                     <p className="text-muted-foreground">[{new Date().toLocaleTimeString()}] indexing::synced block: 504,912</p>
                     <p className="text-emerald-500">[{new Date().toLocaleTimeString()}] zkp::circuit_verification::passed</p>
                     <p className="text-blue-400">[{new Date().toLocaleTimeString()}] ledger::state_commitment::confirmed</p>
                     <p className="text-muted-foreground/60 italic">Waiting for operator state disclosure...</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Global Process Overlay */}
        {providers?.flowMessage && (
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="px-12 py-8 bg-foreground text-background rounded-[2.5rem] shadow-5xl shadow-black/50 border border-white/10 backdrop-blur-5xl flex items-center gap-8 min-w-[500px]">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 blur-3xl animate-pulse rounded-full" />
                <RefreshCw className="w-10 h-10 animate-spin relative z-10 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30 italic">Network Process In-Flight</p>
                <p className="text-2xl font-black tracking-tighter leading-none">{providers.flowMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-40 pt-20 border-t border-white/5 text-center space-y-8 opacity-20 hover:opacity-100 transition-opacity duration-1000">
           <p className="text-[11px] font-black uppercase tracking-[0.6em] text-muted-foreground">
             Institutional Governance Standard :: Powered by Midnight &copy; 2026
           </p>
           <div className="flex justify-center items-center gap-12">
             <ShieldCheck className="w-6 h-6 grayscale" />
             <div className="h-px w-24 bg-white/10" />
             <Lock className="w-6 h-6 grayscale" />
             <div className="h-px w-24 bg-white/10" />
             <Zap className="w-6 h-6 grayscale" />
           </div>
        </div>
      </div>
    </div>
  );
};
