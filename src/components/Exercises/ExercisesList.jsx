import { cloneElement } from 'react'
import ExerciseEmpty from './ExerciseEmpty'
import ExerciseItem from './ExerciseItem'
import ExerciseItemWithActions from './ExerciseItemWithActions'
import ExerciseItemWithData from './ExerciseItemWithData'
import ExerciseSkeleton from './ExerciseSkeleton'

const ExercisesList = ({ onClick, loading, exercises, children }) => {
  return (
    <section className="m-4 flex flex-col gap-4">
      {loading && exercises.length === 0 && <ExerciseSkeleton />}
      {!loading && exercises.length === 0 && <ExerciseEmpty />}

      {exercises &&
        exercises.map((exercise) =>
          cloneElement(children, { key: exercise.id, exercise, onClick })
        )}
    </section>
  )
}

ExercisesList.ExerciseItem = ExerciseItem
ExercisesList.ExerciseItemWithData = ExerciseItemWithData
ExercisesList.ExerciseItemWithActions = ExerciseItemWithActions

export default ExercisesList
