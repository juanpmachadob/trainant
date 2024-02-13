const ExerciseSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center justify-between gap-4 rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white p-4 py-2 shadow-md">
      <span className="size-16 rounded-xl bg-slate-300"></span>
      <div className="flex w-full flex-col gap-2">
        <span className="h-4 w-1/4 rounded bg-slate-300"></span>
        <span className="h-4 w-2/3 rounded bg-slate-300"></span>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="h-4 w-14 rounded bg-slate-300"></span>
        <span className="h-4 w-12 rounded bg-slate-300"></span>
      </div>
    </div>
  )
}
export default ExerciseSkeleton
