import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { Field as BaseField } from "@base-ui/react/field";

interface InputFieldProps extends React.ComponentPropsWithoutRef<
  typeof BaseInput
> {
  description?: string;
  error?: string;
  label?: string;
}

const inputStyles =
  "bg-white border border-aiven-grey-20 flex h-10 outline-none px-3.5 rounded-md text-aiven-grey-100 text-sm transition-colors w-full dark:bg-aiven-grey-100 dark:border-aiven-grey-60 dark:text-aiven-grey-0 data-[disabled]:bg-aiven-grey-0 data-[disabled]:cursor-not-allowed data-[disabled]:text-aiven-grey-30 data-[invalid]:border-aiven-error-60 focus:-outline-offset-1 focus:outline-2 focus:outline-aiven-primary-80 placeholder:text-aiven-grey-30 dark:placeholder:text-aiven-grey-40";

export function InputField({
  className,
  description,
  error,
  id,
  label,
  ...props
}: InputFieldProps) {
  if (!label && !description && !error) {
    return (
      <BaseInput className={cn(inputStyles, className)} id={id} {...props} />
    );
  }

  return (
    <BaseField.Root
      className="flex flex-col gap-1 items-start w-full"
      invalid={!!error}
    >
      {label && (
        <BaseField.Label className="font-medium text-aiven-grey-100 text-sm dark:text-aiven-grey-0">
          {label}
        </BaseField.Label>
      )}
      <BaseField.Control
        className={cn(inputStyles, className)}
        id={id}
        render={<BaseInput />}
        {...props}
      />
      {description && !error && (
        <BaseField.Description className="text-aiven-grey-40 text-xs">
          {description}
        </BaseField.Description>
      )}
      {error && <BaseField.Error className="text-aiven-error-60 text-xs">{error}</BaseField.Error>}
    </BaseField.Root>
  );
}
