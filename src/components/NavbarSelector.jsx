const NavbarSelector = ({ value, options, ...props }) => {
  return (
    <select
      className="bg-transparent text-center text-xl font-bold capitalize outline-none"
      value={value}
      {...props}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  )
}

export default NavbarSelector
