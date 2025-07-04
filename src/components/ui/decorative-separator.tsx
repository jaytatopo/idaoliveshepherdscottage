import { cn } from "@/lib/utils";

const DecorativeSeparator = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full flex items-center justify-center py-8", className)}>
            <div className="w-full max-w-sm h-px bg-border" />
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary/70 shrink-0 mx-4"
                aria-hidden="true"
            >
                <path
                    d="M6.34315 6.34338L12 12.0002M12 12.0002L17.6569 17.6571M12 12.0002L17.6569 6.34338M12 12.0002L6.34315 17.6571"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                 <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </svg>
            <div className="w-full max-w-sm h-px bg-border" />
        </div>
    );
};

export default DecorativeSeparator;
