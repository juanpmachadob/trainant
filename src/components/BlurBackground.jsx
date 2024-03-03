const BlurBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 flex min-h-screen w-full items-center justify-center">
      <div className="relative flex w-full justify-center">
        <div className="absolute bottom-6 ml-32 size-72 animate-blob rounded-full bg-red-300 opacity-70 mix-blend-multiply blur-xl"></div>
        <div className="absolute -bottom-44 mr-16 size-72 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl"></div>
        <div className="absolute top-6 size-72 animate-blob rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl"></div>
      </div>
    </div>
  )
}
export default BlurBackground
