import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export default function EmptyState({
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center text-center p-8 border border-dashed border-furnizo-border rounded bg-furnizo-beige/30">
      <h3 className="font-sans text-lg font-medium text-furnizo-charcoal">{title}</h3>
      <p className="mt-2 font-sans text-xs text-furnizo-muted max-w-xs leading-relaxed">
        {description}
      </p>
      {actionText && actionHref && (
        <Link href={actionHref} className="mt-6">
          <Button className="font-sans text-xs tracking-wider uppercase bg-furnizo-brown text-furnizo-beige hover:bg-furnizo-brown/90 px-6 py-2 h-10 cursor-pointer">
            {actionText}
          </Button>
        </Link>
      )}
    </div>
  );
}
