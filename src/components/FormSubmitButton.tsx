"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from 'lucide-react'

export default function FormSubmitButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("w-full", className)}
      type="submit"
      {...props}
      disabled={props.disabled || pending}
    >
      <span className="flex items-center justify-center gap-1">
        {
          pending && <Loader2 size={16} className="animate-spin"/>
        }
        {props.children}
      </span>
    </Button>
  );
}
