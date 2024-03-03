const Navbar = ({ children }) => {
  return (
    <header className="fixed inset-0 z-10 flex h-20 justify-center border-b bg-white">
      <div className="grid w-full max-w-6xl grid-cols-3 flex-row items-center justify-between px-4 text-center">
        {children}
      </div>
    </header>
  )
}
export default Navbar
