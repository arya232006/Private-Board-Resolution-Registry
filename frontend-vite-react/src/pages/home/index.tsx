import { useNavigate } from '@tanstack/react-router';
import { ShieldCheck, Lock, Globe, Zap, ArrowRight, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Counter } from '@/components/counter';

export function Home() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Privacy Proofs Generated', value: 1200000, suffix: 'M+', icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    { label: 'Protocols Secured', value: 450, suffix: '+', icon: <Lock className="w-4 h-4 text-primary" /> },
    { label: 'Audit Compliance', value: 100, suffix: '%', icon: <CheckCircle2 className="w-4 h-4 text-blue-500" /> },
    { label: 'Network Integrity', value: 99, suffix: '.9%', icon: <Zap className="w-4 h-4 text-amber-500" /> },
  ];

  const features = [
    {
      title: 'Zero-Knowledge Privacy',
      description: 'Vote tallies are encrypted on-chain. Results are only disclosed via cryptographic reveal transitions.',
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: 'Institutional Compliance',
      description: 'Designed for corporate governance, ensuring board confidentiality while maintaining a verifiable audit trail.',
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Fast Finality',
      description: 'Optimized for the Midnight network, providing rapid transaction confirmations with sub-second proof generation.',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
    },
  ];

  const workflow = [
    { step: '01', title: 'Private Commitment', description: 'Members submit encrypted votes signed by their private identity.' },
    { step: '02', title: 'ZK Verification', description: 'Midnight network verifies vote validity without exposing numeric data.' },
    { step: '03', title: 'Consolidated State', description: 'The registry updates the encrypted global state of the resolution.' },
    { step: '04', title: 'Controlled Disclosure', description: 'The registry owner triggers a reveal transition to publish outcomes.' },
  ];

  return (
    <div className="relative isolate overflow-hidden mesh-gradient min-h-screen animate-scan selection:bg-primary/30 selection:text-primary">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-blob pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-blob pointer-events-none -z-10 [animation-delay:2s]" />
      <div className="absolute top-[20%] right-[15%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] animate-blob pointer-events-none -z-10 [animation-delay:4s]" />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[0.2em] text-primary animate-circuit shadow-glow">
               <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
               SYSTEM_LIVE :: MAINNET_ZK_ENABLED
            </div>
          </div>
           <h1 className="mt-10 text-6xl font-black tracking-tighter text-foreground sm:text-8xl leading-[0.85] text-glow">
            The Standard for <br/>
            <span className="text-gradient">Private</span> <br/>
            Governance.
          </h1>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground/80 font-medium max-w-lg border-l-2 border-primary/20 pl-6">
            Empowering institutional boards with cryptographic privacy. Deploy the Midnight Resolution Registry to secure high-stakes decisions with Zero-Knowledge proofs.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
             <Button 
              size="lg" 
              className="rounded-2xl px-12 py-9 text-2xl font-black !bg-[#f8fafc] !text-[#020617] shadow-glow group hover:scale-[1.03] active:scale-95 transition-all border border-white/20"
              onClick={() => navigate({ to: '/recorder' })}
            >
              Launch Dashboard
              <ArrowRight className="ml-4 w-7 h-7 transition-transform group-hover:translate-x-2" />
            </Button>
             <div className="flex flex-col gap-1 group/link">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 italic">Technical Protocol</p>
                <a href="#" className="text-sm font-black leading-6 text-foreground flex items-center gap-1 hover:text-primary transition-all group-hover/link:translate-x-1">
                  Read Protocol Whitepaper <ChevronRight className="w-4 h-4 text-primary" />
                </a>
             </div>
          </div>

          {/* Impact Metrics Grid */}
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border/50 pt-10">
             {metrics.map((m) => (
                <div key={m.label} className="space-y-1">
                   <div className="flex items-center gap-2 text-muted-foreground">
                      {m.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{m.label}</span>
                   </div>
                   <p className="text-3xl font-black tracking-tighter">
                      {m.label === 'Privacy Proofs Generated' ? (
                        <><Counter value={1.2} duration={2000} />M+</>
                      ) : (
                        <><Counter value={m.value} duration={2000} />{m.suffix}</>
                      )}
                   </p>
                </div>
             ))}
          </div>
        </div>
        
         {/* Hero Interaction Widget */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="rounded-[3rem] bg-card/30 backdrop-blur-3xl border border-white/5 p-12 shadow-5xl shadow-black/40 relative overflow-hidden group hover:border-primary/20 transition-all card-shine tech-border">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <ShieldCheck className="w-64 h-64 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                        <BarChart3 className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-tight">Protocol Explorer</h3>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Network Pulse Active</p>
                      </div>
                   </div>
                   <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-1 font-black text-[10px] tracking-widest">SYNCED</Badge>
                </div>
                
                <div className="space-y-8">
                  {/* Visual Node Status */}
                  <div className="p-6 bg-background/50 rounded-3xl border border-white/5 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-black uppercase text-muted-foreground">Midnight Local Node</span>
                       <code className="text-[10px] font-mono font-bold bg-muted px-2 py-1 rounded">::9944</code>
                    </div>
                    <div className="flex items-center gap-1.5 h-1">
                       {[...Array(12)].map((_, i) => (
                          <div key={i} className={`flex-1 rounded-full ${i < 8 ? 'bg-primary' : 'bg-muted'} animate-circuit`} style={{ animationDelay: `${i * 100}ms` }} />
                       ))}
                    </div>
                  </div>

                  {/* Feature Preview List */}
                  <div className="grid grid-cols-1 gap-4">
                     {['Cross-chain Finality', 'Encrypted State Delta', 'Selective Disclosure'].map((item) => (
                        <div key={item} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-crosshair">
                           <div className="w-2 h-2 rounded-full bg-primary" />
                           <span className="text-sm font-bold tracking-tight text-muted-foreground">{item}</span>
                        </div>
                     ))}
                  </div>

                  <Button onClick={() => navigate({ to: '/recorder' })} variant="outline" className="w-full h-14 rounded-2xl border-2 border-primary/20 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all">
                     View Registry Explorer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Workflow Section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <h2 className="text-base font-black text-primary uppercase tracking-[0.3em]">Protocol Lifecycle</h2>
               <p className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-none">
                  Privacy by Design, <br/>
                  <span className="text-muted-foreground/40">Not as an Afterthought.</span>
               </p>
               <p className="text-lg font-medium text-muted-foreground max-w-md">
                  Governance data is treated as high-security cargo. Every transaction is shrouded in a ZK-cloak before hitting the ledger.
               </p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {workflow.map((w) => (
                  <div key={w.step} className="p-10 bg-card/20 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden tech-border">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                        <Lock className="w-16 h-16" />
                     </div>
                     <p className="text-4xl font-black text-primary/10 group-hover:text-primary/30 transition-colors leading-none mb-6 italic tabular-nums">{w.step}</p>
                     <h4 className="text-xl font-black tracking-tight mb-3 text-glow">{w.title}</h4>
                     <p className="text-sm font-medium text-muted-foreground/60 leading-relaxed">{w.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Features Deep Dive */}
      <div className="mx-auto mt-48 max-w-7xl px-6 sm:mt-64 lg:px-8 py-32 rounded-[4rem] bg-[#050505] text-white relative overflow-hidden tech-border border-white/5 shadow-5xl shadow-black/50">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay animate-scan pointer-events-none" />
        <div className="mx-auto max-w-2xl lg:text-center relative z-10 mb-20">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-4">Enterprise Architecture</h2>
          <p className="text-4xl font-black tracking-tighter sm:text-6xl mb-8">
            Built for Compliance. <br/>
            Optimized for Speed.
          </p>
        </div>
        
         <div className="mx-auto max-w-none relative z-10">
          <dl className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col p-12 bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/[0.05] hover:border-primary/30 transition-all group relative overflow-hidden tech-border">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <dt className="flex items-center gap-5 text-2xl font-black leading-7 mb-8">
                  <div className="flex-shrink-0 p-4 bg-primary/10 rounded-[1.25rem] border border-primary/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-white group-hover:text-primary transition-colors">{feature.title}</span>
                </dt>
                <dd className="text-lg leading-relaxed text-muted-foreground font-medium group-hover:text-white/60 transition-colors">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

       {/* Technical Stack & Trust */}
      <div className="mx-auto mt-48 max-w-7xl px-6 pb-64 lg:px-8 text-center">
         <div className="flex flex-col items-center justify-center space-y-24">
            <div className="space-y-4">
               <h2 className="text-[10px] font-black tracking-[0.8em] text-muted-foreground uppercase bg-white/5 border border-white/5 px-10 py-3 rounded-full inline-block">The Governance Stack</h2>
               <p className="text-muted-foreground/30 text-[11px] font-black uppercase tracking-widest">Validated via Peer-Reviewed Research</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-20 md:gap-32 opacity-20 hover:opacity-100 transition-all duration-1000">
               <div className="flex flex-col items-center gap-4 group cursor-help">
                  <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                     <Globe className="w-14 h-14 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">MIDNIGHT NETWORK</span>
               </div>
               <div className="flex flex-col items-center gap-4 group cursor-help">
                  <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5 transition-all">
                     <ShieldCheck className="w-14 h-14 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">ZK-COMPACT</span>
               </div>
               <div className="flex flex-col items-center gap-4 group cursor-help">
                  <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 group-hover:border-blue-500/40 group-hover:bg-blue-500/5 transition-all">
                     <Lock className="w-14 h-14 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">ENCRYPTED LEDGER</span>
               </div>
               <div className="flex flex-col items-center gap-4 group cursor-help">
                  <div className="p-6 rounded-[2rem] border border-white/5 bg-white/5 group-hover:border-amber-500/40 group-hover:bg-amber-500/5 transition-all">
                     <BarChart3 className="w-14 h-14 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">REAL-TIME INDEXER</span>
               </div>
            </div>
            
            <div className="pt-32 border-t border-white/5 w-full max-w-5xl">
               <div className="flex flex-col items-center gap-8">
                  <div className="flex justify-center gap-6">
                     {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-16 h-1 w- bg-white/5 rounded-full overflow-hidden border border-white/5">
                           <div className="h-full bg-primary/30 animate-circuit" style={{ animationDelay: `${i * 200}ms` }} />
                        </div>
                     ))}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-foreground/20 italic">
                    Institutional Governance Interface :: Cryptographically Secured Context
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}


