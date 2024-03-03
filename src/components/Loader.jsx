import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Loader = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: exercisesLoading } = useSelector((state) => state.exercises)
  const { loading: routinesLoading } = useSelector((state) => state.routines)

  useEffect(() => {
    if (authLoading || exercisesLoading || routinesLoading) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [authLoading, exercisesLoading, routinesLoading])

  if (authLoading || exercisesLoading || routinesLoading) {
    return (
      <div className="absolute inset-0 z-50 flex h-full cursor-wait items-center justify-center bg-black/25">
        <div
          className="inline-block size-16 animate-spin rounded-full border-8 border-solid border-current  border-r-transparent align-[-0.125em] text-customPurple motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }
}
export default Loader
