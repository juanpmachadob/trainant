import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconRepeat, IconWeight } from '@/components/Icons'

const ExerciseCard = ({ to, exercise }) => {
  const [image, setImage] = useState(exercise.gifUrl)

  return (
    <Link
      to={to}
      state={{ exercise }}
      className="flex cursor-pointer select-none flex-row items-center justify-between gap-4 rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white p-4 py-2 shadow-md duration-150 hover:brightness-90"
    >
      <figure>
        <img
          className="size-16"
          src={image}
          alt={`Exercise preview: ${exercise.name}`}
          onError={() => setImage('/images/exercisePlaceholder.gif')}
        />
      </figure>
      <div className="w-full">
        <span className="rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
          {exercise.target}
        </span>
        <p className="truncate text-xl font-bold capitalize">{exercise.name}</p>
      </div>
      <div className="flex flex-col">
        {exercise.currentWeight && (
          <span className="flex items-center gap-2">
            <IconWeight />
            <span>{exercise.currentWeight}kg</span>
          </span>
        )}
        {exercise.currentRepetitions && (
          <span className="flex items-center gap-2">
            <IconRepeat />
            <span>{exercise.currentRepetitions}</span>
          </span>
        )}
      </div>
    </Link>
  )
}
export default ExerciseCard
