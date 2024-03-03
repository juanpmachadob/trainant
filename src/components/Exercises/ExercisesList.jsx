import ExerciseEmpty from './ExerciseEmpty'
import ExerciseItem from './ExerciseItem'
import ExerciseItemWithActionDelete from './ExerciseItemWithActionDelete'
import ExerciseItemWithActionDrag from './ExerciseItemWithActionDrag'
import ExerciseItemWithData from './ExerciseItemWithData'
import ExerciseSkeleton from './ExerciseSkeleton'

const ExercisesList = ({ loading, length, children }) => {
  return (
    <section className="m-4 flex flex-col gap-4">
      {loading && length === 0 && <ExerciseSkeleton />}
      {!loading && length === 0 && <ExerciseEmpty />}
      {children}
    </section>
  )
}

ExercisesList.ExerciseItem = ExerciseItem
ExercisesList.ExerciseItemWithData = ExerciseItemWithData
ExercisesList.ExerciseItemWithActionDelete = ExerciseItemWithActionDelete
ExercisesList.ExerciseItemWithActionDrag = ExerciseItemWithActionDrag

export default ExercisesList
