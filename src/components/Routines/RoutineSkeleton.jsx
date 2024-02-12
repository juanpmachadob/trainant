const RoutineSkeleton = () => {
  return (
    <div className="flex h-24 w-full animate-pulse flex-col items-center gap-2 rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white p-4 shadow-md duration-150 hover:brightness-90">
      <div className="flex w-full flex-row gap-2">
        <span className="h-4 w-1/5 rounded-full bg-slate-300"></span>
        <span className="h-4 w-2/6 rounded-full bg-slate-300"></span>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="h-4 rounded bg-slate-300"></span>
        <span className="h-4 w-4/6 rounded bg-slate-300"></span>
      </div>
    </div>
  )
}
export default RoutineSkeleton
