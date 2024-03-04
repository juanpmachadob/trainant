const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`inline-flex cursor-pointer select-none whitespace-nowrap rounded-full px-8 py-3 font-bold shadow-customClassic transition duration-300 ease-in-out enabled:hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
export default Button
