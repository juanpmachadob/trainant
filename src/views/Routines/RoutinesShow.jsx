import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import { getRoutineByIdRequest } from '@/store/thunks/routinesThunk'
import { DAYS_OF_WEEK_ARRAY, DAYS_OF_WEEK_OBJECT } from '@/utils/constants'
import ExercisesList from '@/components/Exercises/ExercisesList'
import { IconArrowLeft } from '@/components/Icons'
import Navbar from '@/components/Navbar'
import NavbarSelector from '@/components/NavbarSelector'

const RoutinesShow = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, currentRoutine: routine } = useSelector(
    (state) => state.routines
  )
  const { initialLoad: initialLoadExercises } = useSelector(
    (state) => state.exercises
  )
  const [day, setDay] = useState(DAYS_OF_WEEK_OBJECT.MONDAY)

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  useEffect(() => {
    if (id && initialLoadExercises) {
      dispatch(getRoutineByIdRequest(id))
    }
  }, [dispatch, id, initialLoadExercises])

  if (routine?.id) {
    return (
      <main className="flex h-[100dvh] flex-col">
        <Navbar>
          <div className="flex flex-row items-center gap-4">
            <Link to="/routines">
              <IconArrowLeft className="size-6 cursor-pointer" />
            </Link>
          </div>
          <div>
            <NavbarSelector
              options={DAYS_OF_WEEK_ARRAY}
              onChange={(e) => setDay(e.target.value)}
              value={day}
            />
          </div>
          <div className="flex"></div>
        </Navbar>

        <div className="m-4 flex flex-row items-center justify-between">
          <p className="text-3xl font-bold">
            My exercises ({routine.exercises[day].length})
          </p>
          {/* <Link to="/routines/create">
          <Button className="bottom-1 self-start bg-gradient-to-r from-customPurple to-customRed px-5 text-white">
            Add exercise
          </Button>
        </Link> */}
        </div>
        <hr />
        <ExercisesList loading={loading} exercises={routine.exercises[day]} />
      </main>
    )
  }
}
export default RoutinesShow
