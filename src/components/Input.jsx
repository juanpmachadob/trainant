const Input = ({
  name,
  label,
  placeholder,
  value,
  error,
  handleInputChange,
  ...props
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="text-sm text-customDarkBlue">
        {label}
      </label>
      <input
        className="block w-full rounded-xl border border-customDarkBlue p-3 text-customDarkBlue shadow focus:border-customPurple focus:outline-none disabled:opacity-50"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        {...props}
      />
      {error && error[0] && (
        <small className="block h-5 text-customRed">{error[0]}</small>
      )}
    </div>
  )
}
export default Input
