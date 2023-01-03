export type FormFieldProps = {
  type: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  ref?: React.RefObject<HTMLInputElement>
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function FormField({
  type,
  ref,
  label,
  onChange,
  className = 'form-field-primary',
  ...props
}: FormFieldProps) {
  return (
    <label className='flex flex-col items-start'>
      {label}
      <input
        ref={ref}
        type={type}
        onChange={onChange}
        className={className}
        {...props}
      />{' '}
    </label>
  )
}
