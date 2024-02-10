import ExerciseCard from '@/views/Exercises/ExerciseCard'

const ExercisesList = ({ exercises }) => {
  return (
    <section className="m-4 flex flex-col gap-4">
      {exercises &&
        exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            to={`/exercises/${exercise.id}`}
          />
        ))}
    </section>
  )
}
export default ExercisesList
