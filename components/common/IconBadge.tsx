// components/common/IconBadge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Ícone com “bolha” bege no fundo (estética do template).
 * Recebe o ícone como children (um elemento JSX), evitando passar funções via props.
 */
export default function IconBadge({
  children,
  className,
  blobClassName,
  iconClassName,
}: {
  children: React.ReactNode;
  className?: string;
  blobClassName?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-grid h-12 w-12 place-items-center text-[#5E5A57]",
        className
      )}
      aria-hidden="true"
    >
      {/* bolha bege atrás */}
      <span
        className={cn(
          "pointer-events-none absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#E9E3DB] opacity-90",
          blobClassName
        )}
      />
      <span className={cn("h-6 w-6", iconClassName)}>{children}</span>
    </span>
  );
}
