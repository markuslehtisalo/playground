import { cn } from "@/lib/utils";

type CardRootProps = React.HTMLAttributes<HTMLDivElement>;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function CardRoot({ className, ...props }: CardRootProps) {
  return (
    <div
      className={cn(
        "bg-white border border-aiven-grey-10 rounded-lg shadow-sm dark:bg-aiven-grey-100 dark:border-aiven-grey-80",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 pt-6 px-6", className)}
      {...props}
    />
  );
}

function CardBody({ className, ...props }: CardBodyProps) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-t-aiven-grey-10 flex gap-2 items-center px-6 py-4 dark:border-aiven-grey-80",
        className,
      )}
      {...props}
    />
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
