const TextArea = ({
  containerClassName = '',
  textAreaClassName = '',
  name,
  label,
  placeholder,
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
      <textarea
        className={`block w-full rounded-xl border border-customDarkBlue p-3 text-customDarkBlue shadow focus:border-customPurple focus:outline-none disabled:opacity-50 ${textAreaClassName}`}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        rows={3}
        {...props}
      ></textarea>
      {error && error[0] && (
        <small className="block h-5 text-customRed">{error[0]}</small>
      )}
    </div>
  )
}
export default TextArea
