const Navbar = ({ children }) => {
  return (
    <header className="flex h-20 w-full flex-row items-center justify-between border-b bg-white px-4">
      {children}
    </header>
  )
}
export default Navbar
