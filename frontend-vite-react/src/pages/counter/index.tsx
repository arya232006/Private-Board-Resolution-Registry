import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { 
  RefreshCw, 
  PlusCircle, 
  Zap, 
  Database, 
  Binary, 
  Microscope, 
  ShieldCheck, 
  Cpu, 
  Network,
  ChevronRight,
  FlaskConical,
  Activity,
  Box
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { useContractSubscription } from "@/modules/midnight/counter-sdk/hooks/use-contract-subscription";
import { Badge } from "@/components/ui/badge";

export const Counter = () => {
  const { deployedContractAPI, derivedState, onDeploy, providers } =
    useContractSubscription();
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>(
    undefined
  );
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  const deployNew = async () => {
    const { address } = await onDeploy();
    setDeployedAddress(address);
  };

  const increment = async () => {
    if (deployedContractAPI) {
      await deployedContractAPI.increment();
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] mesh-gradient py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-scan select-none">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[160px] pointer-events-none animate-float opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none opacity-20" />
      
      {appLoading && <Loading />}
      
      <div className="max-w-[1400px] mx-auto relative z-10 space-y-12">
        
        {/* Header Console */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mb-16">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-5 bg-background rounded-2xl border border-white/10 shadow-2xl">
                <FlaskConical className="w-10 h-10 text-primary glow-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.8]">
                 PROTOCOL <span className="text-gradient">LAB</span>
              </h1>
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">ZK-Counter Experiment v3.2</p>
                 <div className="h-px w-12 bg-primary/20" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50">SYSTEM STABLE</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 p-2 bg-card/30 backdrop-blur-3xl rounded-[2rem] border border-white/5 shadow-2xl">
            <div className="px-6 border-r border-white/10">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse glow-emerald" />
                 <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-500">Node Sync Active</span>
               </div>
            </div>
            <div className="pr-4">
               <ModeToggle />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* Experiment Control Panel */}
          <div className="xl:col-span-4 space-y-10">
             <Card className="border-none bg-card/40 backdrop-blur-3xl shadow-4xl p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 rotate-12 opacity-[0.03]">
                   <Cpu className="w-48 h-48 text-primary" />
                </div>
                
                <div className="space-y-10 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                         <Box className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="text-2xl font-black italic">Deployer</h4>
                   </div>

                   <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed">
                      Initialize a primary instance of the ZK-Counter Protocol on the Midnight testing environment.
                   </p>

                   <Button
                      onClick={deployNew}
                      className="w-full h-16 rounded-2xl border-none bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-glow shimmer group"
                   >
                      <PlusCircle className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                      Spawn New Instance
                   </Button>

                   {deployedAddress && (
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Active Instance UUID</p>
                         <div className="p-4 bg-background/60 rounded-xl border border-white/5 group-hover:border-primary/30 transition-all cursor-pointer">
                            <code className="text-[10px] font-mono truncate block opacity-60">
                               {deployedAddress}
                            </code>
                         </div>
                      </div>
                   )}
                </div>
             </Card>

             {/* Tactical Monitors */}
             <div className="rounded-[2rem] bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-4xl">
                <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
                   <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase italic px-2 border-l-2 border-primary">realtime_telemetry</p>
                   <Activity className="w-3 h-3 text-primary animate-pulse" />
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-2 transition-all hover:opacity-100 opacity-60">
                      <div className="flex justify-between text-[10px] font-black text-primary uppercase">
                         <span>CPU_LOAD</span>
                         <span>0.42%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full w-1/4 bg-primary shimmer" />
                      </div>
                   </div>
                   <div className="space-y-2 transition-all hover:opacity-100 opacity-60">
                      <div className="flex justify-between text-[10px] font-black text-emerald-500 uppercase">
                         <span>NETWORK_STABILITY</span>
                         <span>99.9%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full w-[99%] bg-emerald-500" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* State Visualization Lab */}
          <div className="xl:col-span-8 space-y-10">
             <Card className="border-none bg-card/40 backdrop-blur-3xl shadow-4xl overflow-hidden relative group">
                <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary animate-circuit" />
                <CardContent className="p-12 space-y-12">
                   
                   <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                      <div className="flex-1 space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                               <RefreshCw className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight italic uppercase">State Controller</h3>
                         </div>
                         <p className="text-sm font-bold text-muted-foreground/60">Modify the cryptographic state through a secure ZK-Mutation transaction.</p>
                      </div>
                      
                      <Button
                        onClick={increment}
                        disabled={!deployedContractAPI}
                        className={`h-20 px-12 rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm flex items-center gap-6 transition-all duration-500 ${
                           deployedContractAPI 
                           ? 'bg-foreground text-background hover:scale-105 shadow-2xl' 
                           : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                        }`}
                      >
                        <Zap className={`w-6 h-6 ${deployedContractAPI ? 'animate-pulse text-amber-500' : ''}`} />
                        Commit Mutation
                        <ChevronRight className="w-5 h-5 opacity-30" />
                      </Button>
                   </div>

                   {/* Data Vitals Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                         { label: 'PUBLIC_ROUND', value: derivedState?.round || '0', icon: <Network className="w-4 h-4" />, color: 'primary' },
                         { label: 'PRIVATE_COUNTER', value: derivedState?.privateState.privateCounter || '0', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />, color: 'emerald' },
                         { label: 'LAST_TURN', value: derivedState?.turns.increment || 'IDLE', icon: <Binary className="w-4 h-4 text-blue-500" />, color: 'blue', mono: true },
                         { label: 'CONTRACT_REF', value: deployedContractAPI?.deployedContractAddress ? 'LINKED' : 'UNLINKED', icon: <Database className="w-4 h-4" />, color: 'white', status: !!deployedContractAPI }
                      ].map((item) => (
                         <div key={item.label} className="group/item relative p-6 bg-background/40 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all overflow-hidden text-center space-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-primary/20 group-hover/item:bg-primary transition-colors" />
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">{item.label}</p>
                            <div className="flex justify-center">
                               <div className="p-3 bg-white/5 rounded-2xl">
                                  {item.icon}
                               </div>
                            </div>
                            <p className={`text-4xl font-black tracking-tight ${item.mono ? 'font-mono text-xl uppercase' : ''}`}>
                               {item.value}
                            </p>
                            {typeof item.status !== 'undefined' && (
                               <Badge variant="outline" className={`mt-2 border-none bg-${item.status ? 'emerald-500' : 'destructive'}/10 text-${item.status ? 'emerald-500' : 'destructive'} font-black italic`}>
                                  {item.status ? 'ESTABLISHED' : 'MISSING'}
                               </Badge>
                            )}
                         </div>
                      ))}
                   </div>

                   {/* System Logs Area */}
                   {providers?.flowMessage && (
                      <div className="p-8 bg-blue-500/5 rounded-[2rem] border border-blue-500/10 flex items-start gap-6 relative group/msg overflow-hidden">
                         <div className="absolute inset-0 bg-blue-500/5 animate-pulse opacity-0 group-hover/msg:opacity-100 transition-opacity" />
                         <div className="p-3 bg-blue-500/20 rounded-2xl relative z-10">
                            <Microscope className="w-6 h-6 text-blue-500 animate-pulse" />
                         </div>
                         <div className="space-y-1 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-60 italic">System Broadcast</p>
                            <p className="text-sm font-bold text-blue-100/80 italic">{providers.flowMessage}</p>
                         </div>
                      </div>
                   )}
                </CardContent>
             </Card>

             {/* Footer Metrics */}
             <div className="flex flex-wrap justify-center gap-12 opacity-20 hover:opacity-100 transition-opacity duration-1000">
                <div className="flex items-center gap-4">
                   <ShieldCheck className="w-5 h-5 text-emerald-500" />
                   <span className="text-[9px] font-black uppercase tracking-widest">End-to-end Encrypted</span>
                </div>
                <div className="flex items-center gap-4">
                   <Activity className="w-5 h-5 text-primary" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Real-time Data Sync</span>
                </div>
                <div className="flex items-center gap-4">
                   <Binary className="w-5 h-5 text-blue-500" />
                   <span className="text-[9px] font-black uppercase tracking-widest">ZK-Compact Optimized</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

