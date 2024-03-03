const InputSelect = ({
  containerClassName = '',
  inputClassName = '',
  name,
  label,
  placeholder,
  options,
  value,
  error,
  handleInputChange,
  ...props
}) => {
  return (
    <div className={`w-full text-start ${containerClassName}`}>
      <label htmlFor={name} className="text-sm text-customDarkBlue">
        {label}
      </label>
      <select
        className={`block w-full rounded-xl border border-customDarkBlue p-3 text-customDarkBlue shadow focus:border-customPurple focus:outline-none disabled:opacity-50 ${inputClassName}`}
        name={name}
        value={value}
        onChange={handleInputChange}
        {...props}
      >
        <option value={0} disabled>
          Select...
        </option>
        {options.length > 0 &&
          options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      {error && error[0] && (
        <small className="block h-5 text-customRed">{error[0]}</small>
      )}
    </div>
  )
}
export default InputSelect
