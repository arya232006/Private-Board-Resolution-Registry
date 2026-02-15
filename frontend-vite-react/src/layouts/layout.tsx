import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Wallet, 
  Lock, 
  Menu, 
  Activity, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] selection:bg-primary/20 selection:text-primary">
      {/* Tactical Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/40 backdrop-blur-2xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-primary blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative p-2 bg-background border border-white/10 rounded-xl group-hover:rotate-6 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-primary glow-primary" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-foreground leading-none">MIDNIGHT</span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary leading-none mt-1 italic">Registry Terminal</span>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-2">
              <Link 
                to="/" 
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-2xl transition-all"
                activeProps={{ className: 'bg-primary/10 text-primary border border-primary/20' }}
              >
                Protocol
              </Link>
              <Link 
                to="/recorder" 
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-2xl transition-all flex items-center gap-3"
                activeProps={{ className: 'bg-primary/10 text-primary border border-primary/20' }}
              >
                <LayoutDashboard className="w-4 h-4" />
                Vault Discovery
              </Link>
              <Link 
                to="/wallet-ui" 
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-2xl transition-all flex items-center gap-3"
                activeProps={{ className: 'bg-primary/10 text-primary border border-primary/20' }}
              >
                <Wallet className="w-4 h-4" />
                Identity Hub
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="hidden sm:block h-8 w-px bg-white/5 mx-2" />
            <Button className="rounded-2xl h-11 px-8 border-none bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-glow shimmer gap-3">
              <Lock className="w-3.5 h-3.5" />
              Secure Connect
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-11 w-11 bg-white/5 border border-white/5">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Institutional Registry Footer */}
      <footer className="border-t border-white/5 bg-[#030712] py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-5 space-y-8">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter uppercase leading-none">Midnight <span className="text-primary italic">Registry</span></h3>
                    <p className="text-[10px] font-black italic tracking-widest text-muted-foreground/50 mt-1 uppercase">Cryptographic Governance Standard</p>
                  </div>
               </div>
               <p className="text-sm font-bold text-muted-foreground/60 max-w-sm leading-relaxed">
                 The definitive interface for institutional-grade privacy and zero-knowledge governance on the Midnight Network. Authorized access only.
               </p>
               <div className="flex items-center gap-3 p-4 bg-white/5 rounded-[1.5rem] border border-white/5 w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse glow-emerald" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/80">Network Protocol v1.4.2 [Stable]</span>
               </div>
            </div>

            <div className="md:col-span-2 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Infrastructure</h4>
               <ul className="space-y-4 text-xs font-bold text-muted-foreground/60 italic">
                  <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group">Docs Server <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></a></li>
                  <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group">Protocol Specs <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></a></li>
                  <li><a href="#" className="hover:text-primary transition-all flex items-center gap-2 group">Security Lab</a></li>
               </ul>
            </div>

            <div className="md:col-span-2 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Governance</h4>
               <ul className="space-y-4 text-xs font-bold text-muted-foreground/60 italic">
                  <li><a href="#" className="hover:text-primary transition-all">Registry Explorer</a></li>
                  <li><a href="#" className="hover:text-primary transition-all">Audit Terminal</a></li>
                  <li><a href="#" className="hover:text-primary transition-all">Privacy Policy</a></li>
               </ul>
            </div>

            <div className="md:col-span-3 space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Discovery</h4>
               <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/20 relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col gap-3">
                     <p className="text-[9px] font-black uppercase tracking-widest text-primary italic leading-none">New Deployment</p>
                     <p className="text-[11px] font-black text-foreground">ZK-Counter v4 Launching in Epoch 842</p>
                     <Activity className="w-8 h-8 text-primary opacity-20 absolute top-0 right-0" />
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-10">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
                  &copy; 2026 Midnight Governance Registry. <span className="hidden sm:inline">Proprietary Technology.</span>
                </p>
             </div>
             <div className="flex items-center gap-8 px-6 py-3 bg-white/5 rounded-full border border-white/5 transition-all hover:border-primary/30">
                <div className="flex items-center gap-3">
                  <Lock className="w-3 h-3 text-muted-foreground/40" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 italic">System Encrypted: SHA256-AES</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <Activity className="w-3 h-3 text-emerald-500/50" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600/80">Substrate Online</span>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
