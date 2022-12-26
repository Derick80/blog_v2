type Props = {
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  loading = false,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <div>
      <button disabled={disabled || loading} {...rest}>
        <div className={`transition ${loading ? 'opacity-0' : ''}`}>
          {children}
        </div>
      </button>
    </div>
  )
}
