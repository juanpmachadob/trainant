import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import {
  getRoutineByIdRequest,
  updateRoutineRequest
} from '@/store/thunks/routinesThunk'
import { DAYS_OF_WEEK_ARRAY, DAYS_OF_WEEK_OBJECT } from '@/utils/constants'
import ExerciseInfo from '@/components/Exercises/ExerciseInfo'
import ExercisesList from '@/components/Exercises/ExercisesList'
import { IconArrowLeft, IconSave } from '@/components/Icons'
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
  const { formValues, setFormValues, valuesChanged, reset } = useForm({})

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  useEffect(() => {
    if (id && initialLoadExercises) {
      dispatch(getRoutineByIdRequest(id))
    }
  }, [dispatch, id, initialLoadExercises])

  const handleEditRoutine = () => {
    const newRoutine = {
      ...routine,
      exercises: {
        ...routine.exercises,
        [day]: routine.exercises[day].map((exercise) =>
          exercise.id === formValues.id ? formValues : exercise
        )
      }
    }
    dispatch(updateRoutineRequest(newRoutine))
  }

  return (
    <main className="flex h-[100dvh] flex-col">
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          {!formValues.id && (
            <Link to="/routines">
              <IconArrowLeft className="size-6 cursor-pointer" />
            </Link>
          )}
          {formValues.id && (
            <IconArrowLeft onClick={reset} className="size-6 cursor-pointer" />
          )}
        </div>
        <div>
          {!formValues.id && (
            <NavbarSelector
              options={DAYS_OF_WEEK_ARRAY}
              onChange={(e) => setDay(e.target.value)}
              value={day}
            />
          )}
        </div>
        <div className="flex">
          {valuesChanged && (
            <IconSave
              className="size-6 cursor-pointer"
              onClick={handleEditRoutine}
            />
          )}
        </div>
      </Navbar>

      {!formValues.id && (
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
            onClick={(exercise) => reset(exercise)}
          />
        </>
      )}
      {formValues.id && (
        <ExerciseInfo exercise={formValues} setExerciseValues={setFormValues} />
      )}
    </main>
  )
}
export default RoutinesShow
