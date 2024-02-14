import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import { getRoutineByIdRequest } from '@/store/thunks/routinesThunk'
import { DAYS_OF_WEEK_ARRAY, DAYS_OF_WEEK_OBJECT } from '@/utils/constants'
import ExerciseInfo from '@/components/Exercises/ExerciseInfo'
import ExercisesList from '@/components/Exercises/ExercisesList'
import { IconArrowLeft, IconEdit } from '@/components/Icons'
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
  const [currentExercise, setCurrentExercise] = useState({})

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  useEffect(() => {
    if (id && initialLoadExercises) {
      dispatch(getRoutineByIdRequest(id))
    }
  }, [dispatch, id, initialLoadExercises])

  return (
    <main className="flex h-[100dvh] flex-col">
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          {!currentExercise.id && (
            <Link to="/routines">
              <IconArrowLeft className="size-6 cursor-pointer" />
            </Link>
          )}
          {currentExercise.id && (
            <IconArrowLeft
              onClick={() => setCurrentExercise({})}
              className="size-6 cursor-pointer"
            />
          )}
        </div>
        <div>
          {!currentExercise.id && (
            <NavbarSelector
              options={DAYS_OF_WEEK_ARRAY}
              onChange={(e) => setDay(e.target.value)}
              value={day}
            />
          )}
        </div>
        <div className="flex">
          <Link to={`/routines/${id}/edit`}>
            <IconEdit className="size-6 cursor-pointer" />
          </Link>
        </div>
      </Navbar>

      {!currentExercise.id && (
        <>
          <div className="m-4 flex flex-row items-center justify-between">
            <p className="text-3xl font-bold">
              My exercises ({routine.exercises?.[day]?.length ?? '...'})
            </p>
          </div>
          <hr />
          <ExercisesList
            loading={loading}
            exercises={routine.exercises?.[day] || []}
            onClick={(exercise) => setCurrentExercise(exercise)}
          />
        </>
      )}
      {currentExercise.id && <ExerciseInfo exercise={currentExercise} />}
    </main>
  )
}
export default RoutinesShow
