import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  src?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

export function Avatar({
  alt,
  className,
  fallback,
  size = "md",
  src,
  ...props
}: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full bg-aiven-primary-10 text-aiven-primary-80 font-medium select-none dark:bg-aiven-primary-100 dark:text-aiven-primary-30",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {src && (
        <BaseAvatar.Image
          alt={alt}
          className="size-full object-cover"
          src={src}
        />
      )}
      <BaseAvatar.Fallback className="flex items-center justify-center size-full">
        {fallback}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
