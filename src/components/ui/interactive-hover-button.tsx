import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "font-['Lilita_One'] group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-11 text-lg font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-medhive-500 hover:bg-medhive-500/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medhive-500 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
        Ready?
      </span>

      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 px-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span className="text-lg">Get Started</span>
        <ArrowRight className="h-4 w-4" />
      </div>

      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-medhive-500 transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.5] group-hover:opacity-20" />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
