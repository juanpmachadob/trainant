import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import {
  getRoutineByIdRequest,
  updateRoutineRequest
} from '@/store/thunks/routinesThunk'
import { CURRENT_DAY_OF_WEEK, DAYS_OF_WEEK_ARRAY } from '@/utils/constants'
import Button from '@/components/Button'
import ButtonIcon from '@/components/ButtonIcon'
import ExerciseInfo from '@/components/Exercises/ExerciseInfo'
import ExercisesList from '@/components/Exercises/ExercisesList'
import { IconArrowLeft, IconSave } from '@/components/Icons'
import Navbar from '@/components/Navbar'
import NavbarSelector from '@/components/NavbarSelector'

const RoutinesShow = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading: loadingRoutines, currentRoutine: routine } = useSelector(
    (state) => state.routines
  )
  const { initialLoad: initialLoadExercises } = useSelector(
    (state) => state.exercises
  )
  const [day, setDay] = useState(state?.day || CURRENT_DAY_OF_WEEK)
  const { formValues, setFormValues, valuesChanged, reset } = useForm({})

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  useEffect(() => {
    if (id && initialLoadExercises) {
      dispatch(getRoutineByIdRequest(id, navigate))
    }
  }, [dispatch, id, initialLoadExercises, navigate])

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

    const callback = () => reset({ ...formValues })
    dispatch(updateRoutineRequest(newRoutine, callback))
  }

  return (
    <main className="flex flex-col">
      <Navbar>
        <span className="text-start">
          {!formValues.id && (
            <Link
              to={formValues.id ? `/routines/${formValues.id}` : '/routines'}
              className={
                loadingRoutines ? 'pointer-events-none opacity-50' : ''
              }
            >
              <ButtonIcon
                className="bg-white shadow-none"
                disabled={loadingRoutines}
              >
                <IconArrowLeft className="size-6" title="Arrow icon" />
                <span className="hidden font-bold sm:block">Back</span>
              </ButtonIcon>
            </Link>
          )}
          {formValues.id && (
            <ButtonIcon
              className="bg-white shadow-none"
              onClick={reset}
              disabled={loadingRoutines}
            >
              <IconArrowLeft className="size-6" title="Arrow icon" />
              <span className="hidden font-bold sm:block">Back</span>
            </ButtonIcon>
          )}
        </span>
        <span className="text-center">
          {!formValues.id && (
            <NavbarSelector
              options={DAYS_OF_WEEK_ARRAY}
              onChange={(e) => setDay(e.target.value)}
              value={day}
              disabled={loadingRoutines}
            />
          )}
        </span>
        <span className="text-end">
          {valuesChanged && (
            <ButtonIcon
              className="bg-white shadow-none"
              onClick={handleEditRoutine}
              disabled={loadingRoutines}
            >
              <span className="hidden font-bold sm:block">Save</span>
              <IconSave className="size-6" title="Save icon" />
            </ButtonIcon>
          )}
        </span>
      </Navbar>

      <div className="mt-20">
        {!formValues.id && (
          <>
            <div className="m-4 flex flex-row items-center justify-between">
              <p className="text-3xl font-bold">
                My exercises ({routine.exercises?.[day]?.length ?? '...'})
              </p>
              <Link to={`/routines/${id}/edit`} state={{ day }}>
                <Button
                  className="bottom-1 self-start bg-gradient-to-r from-customPurple to-customRed px-5 text-white"
                  disabled={loadingRoutines}
                >
                  Edit
                </Button>
              </Link>
            </div>
            <hr />
            <ExercisesList
              loading={loadingRoutines}
              length={routine.exercises?.[day]?.length || 0}
            >
              {routine.exercises?.[day]?.map((exercise) => (
                <ExercisesList.ExerciseItemWithData
                  exercise={exercise}
                  onClick={(exercise) => reset(exercise)}
                  key={exercise.id}
                />
              ))}
            </ExercisesList>
          </>
        )}
        {formValues.id && (
          <ExerciseInfo
            showInfo={true}
            loading={loadingRoutines}
            exercise={formValues}
            setExerciseValues={setFormValues}
          />
        )}
      </div>
    </main>
  )
}
export default RoutinesShow
