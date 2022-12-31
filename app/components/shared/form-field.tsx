export type FormFieldProps = {
  type: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  ref?: React.RefObject<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormField({
  type,
  ref,
  onChange,
  className = 'form-field-primary',
  ...props
}: FormFieldProps) {
  return (
    <input
      ref={ref}
      type={type}
      onChange={onChange}
      className={className}
      {...props}
    />
  )
}
