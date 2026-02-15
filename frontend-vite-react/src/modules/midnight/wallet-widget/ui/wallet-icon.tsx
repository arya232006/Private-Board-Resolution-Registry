import { Tooltip, TooltipContent, TooltipTrigger } from "./common/tooltip";
import { cn } from "@/lib/utils";

export default function WalletIcon({
  icon,
  name,
  action,
  iconReactNode,
}: {
  icon?: string;
  name: string;
  action: () => void;
  iconReactNode?: React.ReactNode;
}) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "group relative flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300",
            "bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 hover:scale-110 active:scale-95 shadow-xl hover:shadow-primary/20"
          )}
          onClick={action}
        >
          <div className="relative z-10">
             {icon && <img src={icon} alt={name} className="w-12 h-12 transition-transform duration-500 group-hover:rotate-12" />}
             {iconReactNode && (
               <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                 {iconReactNode}
               </div>
             )}
          </div>
          
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-3xl blur-2xl transition-all duration-500" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="bg-[#0c0c0c] border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-primary shadow-2xl">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
