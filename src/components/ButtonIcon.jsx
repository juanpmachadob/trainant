import Button from './Button'

const ButtonIcon = ({ className, children, ...props }) => {
  return (
    <Button
      className={`flex items-center gap-4 !px-3 sm:!px-6 ${
        props.disabled ? 'pointer-events-none opacity-50' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}
export default ButtonIcon
