import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

const DecorativeSeparator = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full flex items-center justify-center py-6", className)}>
            <div className="w-full max-w-xs h-px bg-border/70" />
            <Leaf className="text-primary/50 shrink-0 mx-4 h-5 w-5" />
            <div className="w-full max-w-xs h-px bg-border/70" />
        </div>
    );
};

export default DecorativeSeparator;
