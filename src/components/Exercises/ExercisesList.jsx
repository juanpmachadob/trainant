import ExerciseEmpty from './ExerciseEmpty'
import ExerciseItem from './ExerciseItem'
import ExerciseSkeleton from './ExerciseSkeleton'

const ExercisesList = ({ showInfo, onClick, loading, exercises }) => {
  return (
    <section className="m-4 flex flex-col gap-4">
      {loading && exercises.length === 0 && <ExerciseSkeleton />}
      {!loading && exercises.length === 0 && <ExerciseEmpty />}

      {exercises &&
        exercises.map((exercise) => (
          <ExerciseItem
            showInfo={showInfo}
            key={exercise.id}
            exercise={exercise}
            onClick={onClick}
          />
        ))}
    </section>
  )
}
export default ExercisesList
