/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import { getExercisesByPart } from '@/store/slices/exercisesSlice'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import {
  getRoutineByIdRequest,
  updateRoutineRequest
} from '@/store/thunks/routinesThunk'
import { CURRENT_DAY_OF_WEEK, EXERCISE_PARTS_OBJECT } from '@/utils/constants'
import bodyParts from '@/utils/data/bodyParts.json'
import RoutinesForm from './RoutinesForm'

const RoutinesEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading: loadingRoutines, currentRoutine: routine } = useSelector(
    (state) => state.routines
  )
  const { loading: loadingExercises, initialLoad: initialLoadExercises } =
    useSelector((state) => state.exercises)

  const [step, setStep] = useState(0)

  const [exerciseInfo, setExerciseInfo] = useState({
    day: CURRENT_DAY_OF_WEEK,
    type: EXERCISE_PARTS_OBJECT.BODY_PART,
    items: bodyParts,
    part: '',
    exercise: {}
  })

  const { formValues, setFormValues, handleInputChange, reset } = useForm({
    name: '',
    exercises: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  })

  const handleEditRoutine = () => {
    const callback = (id) => navigate(`/routines/${id}`)
    dispatch(updateRoutineRequest(formValues, callback))
  }

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  useEffect(() => {
    if (id && initialLoadExercises) {
      dispatch(getRoutineByIdRequest(id, navigate))
    }
  }, [dispatch, id, initialLoadExercises, navigate])

  useEffect(() => {
    if (routine.id) reset(routine)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routine.id])

  useEffect(() => {
    if (step === 2) {
      dispatch(
        getExercisesByPart({ type: exerciseInfo.type, part: exerciseInfo.part })
      )
    }
  }, [dispatch, exerciseInfo.type, exerciseInfo.part, step])

  return (
    <main className="flex flex-col">
      <RoutinesForm
        step={step}
        setStep={setStep}
        loading={loadingRoutines || loadingExercises}
        formValues={formValues}
        setFormValues={setFormValues}
        handleInputChange={handleInputChange}
        exerciseInfo={exerciseInfo}
        setExerciseInfo={setExerciseInfo}
        handleSubmit={handleEditRoutine}
      />
    </main>
  )
}
export default RoutinesEdit
