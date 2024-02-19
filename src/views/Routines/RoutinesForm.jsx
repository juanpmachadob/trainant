import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DAYS_OF_WEEK_ARRAY, EXERCISE_PARTS_ARRAY, EXERCISE_PARTS_OBJECT } from '@/utils/constants'
import bodyParts from '@/utils/data/bodyParts.json'
import targets from '@/utils/data/targets.json'
import Button from '@/components/Button'
import ExercisesList from '@/components/Exercises/ExercisesList'
import { IconArrowLeft, IconSave } from '@/components/Icons'
import Input from '@/components/Input'
import Navbar from '@/components/Navbar'
import NavbarSelector from '@/components/NavbarSelector'
import PartList from '@/components/Parts/PartList'

const RoutinesForm = ({
  step,
  setStep,
  formValues,
  setFormValues,
  handleInputChange,
  exerciseInfo,
  setExerciseInfo,
  handleSubmit
}) => {
  const { exercises } = useSelector((state) => state.exercises)

  const handleChangeRoutineDay = (value) => {
    setExerciseInfo({ ...exerciseInfo, day: value })
  }

  const handleChangeRoutinePartType = (value) => {
    if (value === EXERCISE_PARTS_OBJECT.BODY_PART) {
      setExerciseInfo({ type: value, items: bodyParts })
    }
    if (value === EXERCISE_PARTS_OBJECT.TARGET) {
      setExerciseInfo({ type: value, items: targets })
    }
  }

  const handleChangeRoutinePartItem = (value) => {
    setExerciseInfo({ ...exerciseInfo, part: value })
    if (step === 1) setStep(2)
  }

  const handleSelectRoutinePartExercise = (value) => {
    setFormValues((prev) => ({
      ...prev,
      exercises: {
        ...prev.exercises,
        [exerciseInfo.day]: [...prev.exercises[exerciseInfo.day], value]
      }
    }))
    setStep(0)
  }

  return (
    <>
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          {step === 0 && (
            <Link to="/routines">
              <IconArrowLeft className="size-6 cursor-pointer" />
            </Link>
          )}
          {step > 0 && (
            <IconArrowLeft
              onClick={() => setStep(step - 1)}
              className="size-6 cursor-pointer"
            />
          )}
        </div>
        {step === 0 && (
          <NavbarSelector
            options={DAYS_OF_WEEK_ARRAY}
            onChange={(e) => handleChangeRoutineDay(e.target.value)}
            value={exerciseInfo.day}
          />
        )}
        {step === 1 && (
          <NavbarSelector
            options={EXERCISE_PARTS_ARRAY}
            onChange={(e) => handleChangeRoutinePartType(e.target.value)}
            value={exerciseInfo.type}
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
          />
        )}
        <div className="flex">
          <IconSave
            className="size-6 cursor-pointer"
            title="Save"
            onClick={handleSubmit}
          />
        </div>
      </Navbar>

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
            >
              Add
            </Button>
          </div>
          <hr />
          <ExercisesList exercises={formValues.exercises[exerciseInfo.day]} />
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
          <div className="m-4 flex flex-row items-center justify-between">
            <p className="text-3xl font-bold">Exercises ({exercises.length})</p>
          </div>
          <hr />
          <ExercisesList
            exercises={exercises}
            onClick={handleSelectRoutinePartExercise}
          />
        </>
      )}
    </>
  )
}
export default RoutinesForm
