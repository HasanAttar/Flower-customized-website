import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("focus-ring h-11 w-full rounded-xl border border-[var(--border)] bg-white px-4 text-sm", className)} {...props} />
));
Input.displayName = "Input";
