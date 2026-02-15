import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Link2, 
  Wallet, 
  ShieldCheck, 
  Fingerprint, 
  Key, 
  Coins, 
  Activity, 
  Cpu, 
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Lock as LockIcon
} from "lucide-react";
import { MidnightWallet } from "@/modules/midnight/wallet-widget/ui/midnightWallet";
import { useWallet } from "@/modules/midnight/wallet-widget/hooks/useWallet";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Counter } from "@/components/counter";

export function WalletUI() {
  const {
    disconnect,
    setOpen,
    refresh,
    status,
    proofServerOnline,
    initialAPI,
    unshieldedAddress,
    shieldedAddresses,
    serviceUriConfig,
    dustBalance,
    unshieldedBalances,
  } = useWallet();

  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] mesh-gradient py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-scan select-none">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none animate-float opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none opacity-20" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-5 bg-background rounded-2xl border border-white/10 shadow-2xl">
                <Wallet className="w-10 h-10 text-primary glow-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.8]">
                 VAULT <span className="text-gradient">IDENTITY</span>
              </h1>
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Secure Asset Gateway</p>
                 <div className="h-px w-12 bg-primary/20" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/50">PROTOCOL v1.4</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 p-2 bg-card/30 backdrop-blur-3xl rounded-[2rem] border border-white/5 shadow-2xl">
            <div className="px-6 border-r border-white/10">
               <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${status?.status === 'connected' ? 'bg-emerald-500 animate-pulse glow-emerald' : 'bg-destructive'} `} />
                 <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${status?.status === 'connected' ? 'text-emerald-500' : 'text-destructive'}`}>
                    {status?.status === 'connected' ? 'Identity Online' : 'Identity Locked'}
                 </span>
               </div>
            </div>
            <div className="pr-4">
               <ModeToggle />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="xl:col-span-8 space-y-10">
            
            {/* Wallet Management Terminal */}
            <Card className="border-none bg-card/40 backdrop-blur-3xl shadow-4xl overflow-hidden relative group">
               <div className="h-1.5 bg-gradient-to-r from-primary via-emerald-500 to-primary animate-circuit" />
               <CardContent className="p-10 space-y-12">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                     <div className="flex-1 w-full space-y-8">
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black tracking-tight">Identity Management</h3>
                           <p className="text-sm font-bold text-muted-foreground/60">Connect and manage your cryptographic identifiers on the Midnight network.</p>
                        </div>
                        <div className="p-8 bg-background/50 rounded-[2rem] border border-white/5 flex items-center justify-center relative overflow-hidden group/wallet">
                           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/wallet:opacity-100 transition-opacity" />
                           <div className="relative z-10 transform scale-125">
                              <MidnightWallet />
                           </div>
                        </div>
                     </div>
                     
                      <div className="w-full md:w-64 space-y-4">
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Vault Controls</p>
                         <Button
                           variant="outline"
                           onClick={disconnect}
                           className="w-full h-14 rounded-2xl border-white/10 bg-white/5 font-black uppercase tracking-widest text-[10px] text-foreground hover:bg-destructive hover:text-white transition-all gap-4"
                         >
                           <Link2 className="h-4 w-4" />
                           Purge Session
                         </Button>
                         <Button
                           variant="outline"
                           onClick={() => setOpen(true)}
                           className="w-full h-14 rounded-2xl border-primary/40 bg-primary/10 font-black uppercase tracking-widest text-[10px] text-primary hover:bg-primary hover:text-white transition-all gap-4 shimmer"
                         >
                           <Wallet className="h-4 w-4" />
                           Expand Vault
                         </Button>
                         <Button
                           variant="outline"
                           onClick={refresh}
                           className="w-full h-14 rounded-2xl border-white/10 bg-white/5 font-black uppercase tracking-widest text-[10px] text-foreground hover:bg-white hover:text-black transition-all gap-4"
                         >
                           <RefreshCw className="h-4 w-4" />
                           Resync State
                         </Button>
                      </div>
                  </div>

                  {/* Enhanced Addresses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                        { label: 'Unshielded Address', value: unshieldedAddress?.unshieldedAddress, icon: <Fingerprint className="w-5 h-5" />, id: 'unshielded' },
                        { label: 'Shielded Address', value: shieldedAddresses?.shieldedAddress, icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, id: 'shielded' },
                        { label: 'Coin Public Key', value: shieldedAddresses?.shieldedCoinPublicKey, icon: <Key className="w-5 h-5 text-blue-500" />, id: 'coin' },
                        { label: 'Encryption Public Key', value: shieldedAddresses?.shieldedEncryptionPublicKey, icon: <LockIcon className="w-5 h-5 text-primary" />, id: 'encryption' },
                     ].map((addr) => (
                        <div key={addr.label} className="group/addr space-y-3">
                           <div className="flex justify-between px-2">
                              <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover/addr:text-primary transition-colors">{addr.label}</Label>
                              <code className="text-[7px] font-mono text-muted-foreground/20 uppercase tracking-tighter">RSA-SHA256</code>
                           </div>
                           <div className="p-5 bg-background/40 rounded-2xl border border-white/5 group-hover/addr:border-primary/30 transition-all flex items-center gap-4 relative overflow-hidden">
                              <div className="absolute left-0 top-0 w-1 h-full bg-primary/20 group-hover/addr:bg-primary transition-colors" />
                              <div className="p-2 bg-white/5 rounded-xl">
                                 {addr.icon}
                              </div>
                              <code className="text-[10px] font-mono font-black truncate flex-1 opacity-60">
                                 {addr.value || 'system::identity_offline'}
                              </code>
                              {addr.value && (
                                 <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 hover:bg-primary/10 rounded-xl"
                                    onClick={() => copyToClipboard(addr.value!, addr.id)}
                                 >
                                    {copied === addr.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                 </Button>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Dust Section Styled */}
                  <div className="pt-8 border-t border-white/5 space-y-8">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                              <Coins className="w-5 h-5 text-primary" />
                           </div>
                           <h4 className="text-xl font-black">Treasury Balances</h4>
                        </div>
                        <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 px-4 font-black">ON-CHAIN STATE</Badge>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 text-center relative overflow-hidden group/balance">
                           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/balance:opacity-100 transition-opacity" />
                           <p className="text-[9px] font-black uppercase text-muted-foreground/40 mb-4 tracking-widest italic">Dust Liquidity</p>
                           <p className="text-5xl font-black tracking-tighter tabular-nums">
                              <Counter value={dustBalance?.balance ? Number(dustBalance.balance) / 1000000000000000 : 0} />
                           </p>
                           <p className="text-[10px] font-black text-primary mt-2">DSTR</p>
                        </div>
                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 text-center relative overflow-hidden group/balance">
                           <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/balance:opacity-100 transition-opacity" />
                           <p className="text-[9px] font-black uppercase text-muted-foreground/40 mb-4 tracking-widest italic">Asset Exposure</p>
                           <p className="text-5xl font-black tracking-tighter tabular-nums">
                              <Counter value={dustBalance?.cap ? Number(dustBalance.cap) / 1000000000000000 : 0} />
                           </p>
                           <p className="text-[10px] font-black text-emerald-500 mt-2">CAP_LMT</p>
                        </div>
                        <div className="p-8 bg-foreground rounded-[2rem] text-background text-center shadow-4xl relative overflow-hidden group/balance">
                           <div className="absolute inset-0 bg-primary opacity-10 animate-pulse" />
                           <p className="text-[9px] font-black uppercase opacity-40 mb-4 tracking-widest italic">Night Tally</p>
                           <div className="space-y-1">
                              {unshieldedBalances && Object.keys(unshieldedBalances).length > 0 ? Object.entries(unshieldedBalances).map(([token, balance]) => (
                                 <p key={token} className="text-5xl font-black tracking-tighter tabular-nums">
                                    <Counter value={Number(balance) / 1000000} />
                                 </p>
                              )) : <p className="text-5xl font-black tracking-tighter tabular-nums">0.00</p>}
                           </div>
                           <p className="text-[10px] font-black uppercase mt-2">Native_Asset</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>

          {/* Right Column: Tactical Display */}
          <div className="xl:col-span-4 space-y-10">
             
             {/* Identity Tactical Display */}
             <Card className="border-none bg-primary/10 backdrop-blur-3xl shadow-4xl p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 rotate-12 opacity-[0.03]">
                   <Activity className="w-48 h-48 text-primary group-hover:scale-110 transition-transform duration-1000" />
                </div>
                
                <div className="space-y-10 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/20">
                         <Activity className="w-6 h-6 text-primary glow-primary" />
                      </div>
                      <h4 className="text-2xl font-black tracking-tight">Identity Hub</h4>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-3">
                         <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                            <span className="flex items-center gap-2 italic opacity-60">Status</span>
                            <span className={status?.status === 'connected' ? 'text-emerald-500 font-black' : 'text-destructive font-black'}>
                               {status?.status === 'connected' ? 'READY_LOCAL' : 'LOCKED_ACCESS'}
                            </span>
                         </div>
                         <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div className={`h-full ${status?.status === 'connected' ? 'w-full bg-emerald-500' : 'w-1/4 bg-destructive'} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.2)]`} />
                         </div>
                      </div>
                      <div className="space-y-3">
                         <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                            <span className="flex items-center gap-2 italic opacity-60">Proof Engine</span>
                            <span className={proofServerOnline ? 'text-primary font-black' : 'text-destructive font-black'}>
                               {proofServerOnline ? 'ONLINE_READY' : 'OFFLINE_ERR'}
                            </span>
                         </div>
                         <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                            <div className={`h-full ${proofServerOnline ? 'w-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'w-[5%] bg-destructive'} rounded-full transition-all duration-1000 shimmer`} />
                         </div>
                      </div>
                   </div>

                   {/* Quick Info Tapes */}
                   <div className="space-y-4">
                      <div className="p-5 bg-background/40 rounded-2xl border border-white/5 flex items-center justify-between group/tape">
                         <div className="flex items-center gap-4">
                            <Cpu className="w-4 h-4 text-muted-foreground/40 group-hover/tape:text-primary transition-colors" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 italic">Network ID</span>
                         </div>
                         <span className="text-xs font-mono font-black">{status?.status === 'connected' ? status.networkId : 'null'}</span>
                      </div>
                      <div className="p-5 bg-background/40 rounded-2xl border border-white/5 flex items-center justify-between group/tape">
                         <div className="flex items-center gap-4">
                            <Wallet className="w-4 h-4 text-muted-foreground/40 group-hover/tape:text-emerald-500 transition-colors" />
                            <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 italic">Provider</span>
                         </div>
                         <span className="text-xs font-mono font-black">{initialAPI?.name || 'unknown'}</span>
                      </div>
                   </div>

                   <Button 
                     onClick={() => window.open('https://midnight.network', '_blank')}
                     variant="secondary"
                     className="w-full h-16 font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-foreground hover:text-background transition-all shadow-4xl rounded-[1.25rem] group"
                   >
                     DOCUMENTATION HUB <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </div>
             </Card>

             {/* Endpoint tactical list */}
             <div className="rounded-[2rem] bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-4xl group">
                <div className="bg-white/5 px-8 py-5 flex items-center justify-between border-b border-white/5">
                   <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                   </div>
                   <p className="text-[9px] font-black tracking-widest text-muted-foreground uppercase opacity-40 italic">endpoint_services --discovery</p>
                </div>
                <div className="p-8 space-y-6">
                   {[
                      { label: 'Substrate Node', uri: serviceUriConfig?.substrateNodeUri },
                      { label: 'Indexer REST', uri: serviceUriConfig?.indexerUri },
                      { label: 'Indexer WS', uri: serviceUriConfig?.indexerWsUri },
                      { label: 'Prover Server', uri: serviceUriConfig?.proverServerUri },
                   ].map((svc) => (
                      <div key={svc.label} className="space-y-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                         <div className="flex items-center justify-between">
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">{svc.label}</p>
                            <div className={`w-1.5 h-1.5 rounded-full ${svc.uri ? 'bg-emerald-500' : 'bg-muted'} `} />
                         </div>
                         <code className="block text-[10px] font-mono truncate text-muted-foreground bg-white/5 p-2 rounded-lg border border-white/5">
                            {svc.uri || 'svc::unreachable'}
                         </code>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-40 pt-20 border-t border-white/5 text-center space-y-8 opacity-20 hover:opacity-100 transition-opacity duration-1000">
           <p className="text-[11px] font-black uppercase tracking-[0.6em] text-muted-foreground">
             Institutional Asset Vault :: Secured by Midnight &copy; 2026
           </p>
           <div className="flex justify-center items-center gap-12">
             <ShieldCheck className="w-6 h-6 grayscale" />
             <div className="h-px w-24 bg-white/10" />
             <Activity className="w-6 h-6 grayscale" />
             <div className="h-px w-24 bg-white/10" />
             <Fingerprint className="w-6 h-6 grayscale" />
           </div>
        </div>
      </div>
    </div>
  );
}
