import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import { getExercisesByPart } from '@/store/slices/exercisesSlice'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import { createRoutineRequest } from '@/store/thunks/routinesThunk'
import { DAYS_OF_WEEK_OBJECT, EXERCISE_PARTS_OBJECT } from '@/utils/constants'
import bodyParts from '@/utils/data/bodyParts.json'
import RoutinesForm from './RoutinesForm'

const RoutinesCreate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)

  const [exerciseInfo, setExerciseInfo] = useState({
    day: DAYS_OF_WEEK_OBJECT.MONDAY,
    type: EXERCISE_PARTS_OBJECT.BODY_PART,
    items: bodyParts,
    part: '',
    exercise: {}
  })

  const { formValues, setFormValues, handleInputChange } = useForm({
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

  const handleCreateRoutine = () => {
    const callback = (id) => navigate(`/routines/${id}`)
    dispatch(createRoutineRequest(formValues, callback))
  }

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

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
        formValues={formValues}
        setFormValues={setFormValues}
        handleInputChange={handleInputChange}
        exerciseInfo={exerciseInfo}
        setExerciseInfo={setExerciseInfo}
        handleSubmit={handleCreateRoutine}
      />
    </main>
  )
}
export default RoutinesCreate
