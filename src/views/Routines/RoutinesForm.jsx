import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchExercises } from '@/store/slices/exercisesSlice'
import {
  DAYS_OF_WEEK_ARRAY,
  EXERCISE_PARTS_ARRAY,
  EXERCISE_PARTS_OBJECT
} from '@/utils/constants'
import bodyParts from '@/utils/data/bodyParts.json'
import targets from '@/utils/data/targets.json'
import Button from '@/components/Button'
import ExerciseInfo from '@/components/Exercises/ExerciseInfo'
import ExercisesList from '@/components/Exercises/ExercisesList'
import { IconArrowLeft, IconCheck, IconSave } from '@/components/Icons'
import Input from '@/components/Input'
import Navbar from '@/components/Navbar'
import NavbarSelector from '@/components/NavbarSelector'
import PartList from '@/components/Parts/PartList'

const RoutinesForm = ({
  step,
  setStep,
  loading,
  formValues,
  setFormValues,
  handleInputChange,
  exerciseInfo,
  setExerciseInfo,
  handleSubmit
}) => {
  const { exercises } = useSelector((state) => state.exercises)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const handleChangeRoutineDay = (value) => {
    setExerciseInfo({ ...exerciseInfo, day: value })
  }

  const handleChangeRoutinePartType = (value) => {
    if (value === EXERCISE_PARTS_OBJECT.BODY_PART) {
      setExerciseInfo({ ...exerciseInfo, type: value, items: bodyParts })
    }
    if (value === EXERCISE_PARTS_OBJECT.TARGET) {
      setExerciseInfo({ ...exerciseInfo, type: value, items: targets })
    }
  }

  const handleChangeRoutinePartItem = (value) => {
    setExerciseInfo({ ...exerciseInfo, part: value })
    if (step === 1) setStep(2)
  }

  const handleChangeRoutinePartExercise = (value) => {
    setExerciseInfo({ ...exerciseInfo, exercise: value })
    if (step === 0) setStep(4)
    if (step === 2) setStep(3)
  }

  const handleSelectRoutinePartExercise = () => {
    setFormValues((prev) => ({
      ...prev,
      exercises: {
        ...prev.exercises,
        [exerciseInfo.day]: [
          ...prev.exercises[exerciseInfo.day],
          exerciseInfo.exercise
        ]
      }
    }))
    setStep(0)
  }

  const handleSearchExerciseByTerm = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    dispatch(
      searchExercises({
        term,
        type: exerciseInfo.type,
        part: exerciseInfo.part
      })
    )
  }

  return (
    <>
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          {step === 0 && (
            <Link
              to="/routines"
              className={loading ? 'pointer-events-none opacity-50' : ''}
            >
              <IconArrowLeft className="size-6 cursor-pointer" />
            </Link>
          )}
          {step > 0 && (
            <IconArrowLeft
              onClick={() => setStep(step === 4 ? 0 : step - 1)}
              className={`size-6 cursor-pointer ${
                loading ? 'pointer-events-none opacity-50' : ''
              }`}
            />
          )}
        </div>
        {step === 0 && (
          <NavbarSelector
            options={DAYS_OF_WEEK_ARRAY}
            onChange={(e) => handleChangeRoutineDay(e.target.value)}
            value={exerciseInfo.day}
            disabled={loading}
          />
        )}
        {step === 1 && (
          <NavbarSelector
            options={EXERCISE_PARTS_ARRAY}
            onChange={(e) => handleChangeRoutinePartType(e.target.value)}
            value={exerciseInfo.type}
            disabled={loading}
          />
        )}
        {step === 2 && (
          <NavbarSelector
            options={exerciseInfo.items.map((item) => ({
              value: item,
              label: item
            }))}
            onChange={(e) => handleChangeRoutinePartItem(e.target.value)}
            value={exerciseInfo.part}
            disabled={loading}
          />
        )}
        <div className="flex">
          {step === 0 && (
            <IconSave
              className={`size-6 cursor-pointer ${
                loading ? 'pointer-events-none opacity-50' : ''
              }`}
              title="Save"
              onClick={handleSubmit}
            />
          )}
          {step === 3 && (
            <IconCheck
              className={`size-6 cursor-pointer ${
                loading ? 'pointer-events-none opacity-50' : ''
              }`}
              title="Select"
              onClick={handleSelectRoutinePartExercise}
            />
          )}
        </div>
      </Navbar>

      <div className="mt-20">
        {/* View current exercises */}
        {step === 0 && (
          <>
            <div className="flex flex-col items-center justify-between gap-4 p-4">
              <Input
                name="name"
                placeholder="Enter your routine name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <hr />
            <div className="m-4 flex flex-row items-center justify-between">
              <p className="text-3xl font-bold">
                Exercises ({formValues.exercises[exerciseInfo.day].length})
              </p>
              <Button
                onClick={() => setStep(1)}
                className="bottom-1 self-start bg-gradient-to-r from-customPurple to-customRed px-5 text-white"
                disabled={loading}
              >
                Add
              </Button>
            </div>
            <hr />
            <ExercisesList exercises={formValues.exercises[exerciseInfo.day]}>
              <ExercisesList.ExerciseItemWithActions />
            </ExercisesList>
          </>
        )}

        {/* Select exercise parts */}
        {step === 1 && (
          <PartList
            partType={exerciseInfo.type}
            partItems={exerciseInfo.items}
            onClick={handleChangeRoutinePartItem}
          />
        )}

        {/* Select exercise item */}
        {step === 2 && (
          <>
            <div className="flex flex-col items-center justify-between gap-4 p-4">
              <Input
                name="term"
                placeholder="Search exercise..."
                value={searchTerm}
                onChange={handleSearchExerciseByTerm}
              />
            </div>
            <hr />
            <div className="m-4 flex flex-row items-center justify-between">
              <p className="text-3xl font-bold">
                Exercises ({exercises.length})
              </p>
            </div>
            <hr />
            <ExercisesList
              exercises={exercises}
              onClick={handleChangeRoutinePartExercise}
            >
              <ExercisesList.ExerciseItem />
            </ExercisesList>
          </>
        )}

        {(step === 3 || step === 4) && (
          <ExerciseInfo showInfo={false} exercise={exerciseInfo.exercise} />
        )}
      </div>
    </>
  )
}
export default RoutinesForm
