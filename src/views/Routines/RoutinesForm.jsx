import { useEffect, useState } from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
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
import {
  IconAdd,
  IconArrowLeft,
  IconCheck,
  IconRemove,
  IconSave,
  IconSort
} from '@/components/Icons'
import Input from '@/components/Input'
import Navbar from '@/components/Navbar'
import NavbarSelector from '@/components/NavbarSelector'
import PartList from '@/components/Parts/PartList'

const GridLayout = WidthProvider(ReactGridLayout)
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

  const [currentAction, setCurrentAction] = useState(0)

  const [exercisesDragLayout, setExercisesDragLayout] = useState()

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

  const handleDeleteExerciseItem = (exercise) => {
    setFormValues((prev) => ({
      ...prev,
      exercises: {
        ...prev.exercises,
        [exerciseInfo.day]: prev.exercises[exerciseInfo.day].filter(
          (item) => item.id !== exercise.id
        )
      }
    }))
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

  useEffect(() => {
    if (exercisesDragLayout) {
      const orderedDrag = exercisesDragLayout.sort((a, b) => a.y - b.y)

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        exercises: {
          ...prevFormValues.exercises,
          [exerciseInfo.day]: orderedDrag.map((item) =>
            prevFormValues.exercises[exerciseInfo.day].find(
              (exercise) => exercise.id === item.i
            )
          )
        }
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisesDragLayout])

  return (
    <>
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          {step === 0 && (
            <Link
              to={formValues.id ? `/routines/${formValues.id}` : '/routines'}
              state={{ day: exerciseInfo.day }}
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
              <span className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  className="bottom-1 self-start bg-customPurple px-3 text-white"
                  disabled={loading}
                >
                  <IconAdd className="size-5" />
                </Button>
                {currentAction === 0 && (
                  <Button
                    onClick={() => setCurrentAction(1)}
                    className="bottom-1 self-start bg-customRed bg-gradient-to-r px-3 text-white"
                    disabled={loading}
                  >
                    <IconRemove className="size-5" />
                  </Button>
                )}
                {currentAction === 1 && (
                  <Button
                    onClick={() => setCurrentAction(0)}
                    className="bottom-1 self-start bg-customDarkBlue bg-gradient-to-r px-3 text-white"
                    disabled={loading}
                  >
                    <IconSort className="size-5" />
                  </Button>
                )}
              </span>
            </div>
            <hr />

            <ExercisesList
              length={formValues.exercises[exerciseInfo.day].length}
              onClick={handleDeleteExerciseItem}
            />

            <GridLayout
              rowHeight={80}
              cols={1}
              isResizable={false}
              draggableHandle=".draggable"
              layout={exercisesDragLayout}
              onDragStop={setExercisesDragLayout}
            >
              {formValues.exercises &&
                formValues.exercises[exerciseInfo.day].map((exercise) => (
                  <div key={exercise.id}>
                    {currentAction === 0 && (
                      <ExercisesList.ExerciseItemWithActionDrag
                        exercise={exercise}
                      />
                    )}
                    {currentAction === 1 && (
                      <ExercisesList.ExerciseItemWithActionDelete
                        exercise={exercise}
                        onClick={handleDeleteExerciseItem}
                      />
                    )}
                  </div>
                ))}
            </GridLayout>
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
            <ExercisesList length={exercises.length}>
              {exercises &&
                exercises.map((exercise) => (
                  <ExercisesList.ExerciseItem
                    onClick={handleChangeRoutinePartExercise}
                    key={exercise.id}
                    exercise={exercise}
                  />
                ))}
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
