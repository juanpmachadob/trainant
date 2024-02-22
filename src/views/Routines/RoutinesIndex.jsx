import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import { getRoutinesRequest } from '@/store/thunks/routinesThunk'
import Button from '@/components/Button'
import { IconArrowLeft } from '@/components/Icons'
import Navbar from '@/components/Navbar'
import RoutinesList from '@/components/Routines/RoutinesList'

const RoutinesIndex = () => {
  const dispatch = useDispatch()
  const { loading: loadingRoutines, routines } = useSelector(
    (state) => state.routines
  )
  const { loading: loadingExercises, initialLoad: initialLoadExercises } =
    useSelector((state) => state.exercises)

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  useEffect(() => {
    if (initialLoadExercises) {
      dispatch(getRoutinesRequest())
    }
  }, [dispatch, initialLoadExercises])

  return (
    <main className="flex flex-col">
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          <Link
            to="/home"
            className={
              loadingRoutines || loadingExercises
                ? 'pointer-events-none opacity-50'
                : ''
            }
          >
            <IconArrowLeft className="size-6 cursor-pointer" />
          </Link>
        </div>
        <div></div>
        <div className="flex"></div>
      </Navbar>

      <div className="m-4 mt-24 flex flex-row items-center justify-between">
        <p className="text-3xl font-bold">My routines ({routines.length})</p>
        <Link
          to="/routines/create"
          className={
            loadingExercises || loadingRoutines
              ? 'pointer-events-none opacity-50'
              : ''
          }
        >
          <Button
            className="bottom-1 self-start bg-gradient-to-r from-customPurple to-customRed px-5 text-white"
            disabled={loadingExercises || loadingRoutines}
          >
            Create
          </Button>
        </Link>
      </div>
      <hr />
      <RoutinesList loading={loadingRoutines} routines={routines} />
    </main>
  )
}
export default RoutinesIndex
