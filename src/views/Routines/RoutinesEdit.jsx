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
import { DAYS_OF_WEEK_OBJECT, EXERCISE_PARTS_OBJECT } from '@/utils/constants'
import bodyParts from '@/utils/data/bodyParts.json'
import RoutinesForm from './RoutinesForm'

const RoutinesEdit = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentRoutine: routine } = useSelector((state) => state.routines)
  const { initialLoad: initialLoadExercises } = useSelector(
    (state) => state.exercises
  )

  const [step, setStep] = useState(0)

  const [exerciseInfo, setExerciseInfo] = useState({
    day: DAYS_OF_WEEK_OBJECT.MONDAY,
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
      dispatch(getRoutineByIdRequest(id))
    }
  }, [dispatch, id, initialLoadExercises])

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
    <main className="flex h-[100dvh] flex-col">
      <RoutinesForm
        step={step}
        setStep={setStep}
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
