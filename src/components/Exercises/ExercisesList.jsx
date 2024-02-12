import ExerciseItem from './ExerciseItem'

const ExercisesList = ({ onClick, exercises }) => {
  return (
    <section className="m-4 flex flex-col gap-4">
      {exercises &&
        exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            onClick={onClick}
          />
        ))}
    </section>
  )
}
export default ExercisesList
