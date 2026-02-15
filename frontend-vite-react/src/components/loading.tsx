import { ShieldCheck, Cpu } from "lucide-react";

export const Loading = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] mesh-gradient animate-scan">
            <div className="relative">
                {/* Center Pulse Ring */}
                <div className="absolute inset-0 -m-8 border-4 border-primary/20 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-0 -m-12 border-2 border-primary/10 rounded-full animate-pulse opacity-10" />
                
                <div className="relative flex flex-col items-center gap-8">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                        <div className="relative p-6 bg-background rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center">
                            <ShieldCheck className="w-12 h-12 text-primary glow-primary animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-black tracking-[0.5em] text-foreground uppercase animate-pulse">
                            Initializing <span className="text-primary italic">Protocol</span>
                        </h2>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                            <div className="flex items-center gap-2">
                                <Cpu className="w-3 h-3 text-primary animate-spin duration-[3000ms]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">Registry Syncing</span>
                            </div>
                            <div className="h-px w-24 bg-gradient-to-l from-transparent via-primary/30 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Tactical Corner Overlays */}
                <div className="fixed top-12 left-12 opacity-30">
                    <p className="text-[8px] font-black uppercase tracking-widest text-primary border-l-2 border-primary pl-4 py-1">
                        SECURE_KERNEL_INIT :: 0x842AF
                    </p>
                </div>
                <div className="fixed bottom-12 right-12 opacity-30">
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground border-r-2 border-muted-foreground/30 pr-4 py-1">
                        CRYPTOGRAPHIC_INTEGRITY_VERIFIED
                    </p>
                </div>
            </div>
        </div>
    );
};