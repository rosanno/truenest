import { cn } from "@/lib/utils";

interface LoaderProps {
  variant?: "default" | "update" | "delete";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const Loader = ({
  variant = "default",
  size = "default",
  className
}: LoaderProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const variantClasses = {
    default: "text-white",
    update: "text-blue-600",
    delete: "text-red-600"
  };

  const spinner = (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );

  if (variant === "default") {
    return (
      <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black/50">
        {spinner}
      </div>
    );
  }

  return spinner;
};