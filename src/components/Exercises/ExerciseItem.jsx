import { useState } from 'react'
import { IconRepeat, IconWeight } from '@/components/Icons'

const ExerciseItem = ({ exercise, onClick = () => {} }) => {
  const [image, setImage] = useState(exercise.gifUrl)

  return (
    <div
      onClick={() => onClick(exercise)}
      className="flex cursor-pointer select-none flex-row items-center justify-between gap-4 rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white p-4 py-2 shadow-md duration-150 hover:brightness-90"
    >
      <span className="flex w-16 items-center justify-center">
        <img
          className="w-full"
          src={image}
          alt={`Exercise preview: ${exercise.name}`}
          onError={() => setImage('/images/exercisePlaceholder.gif')}
        />
      </span>
      <span className="w-full">
        <span className="rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
          {exercise.target}
        </span>
        <p className="truncate text-xl font-bold capitalize">{exercise.name}</p>
      </span>
      <span className="flex flex-col">
        {!isNaN(exercise.currentWeight) && (
          <span className="flex items-center gap-2">
            <IconWeight className="size-5" />
            <span>{exercise.currentWeight}kg</span>
          </span>
        )}
        {!isNaN(exercise.currentRepetitions) && (
          <span className="flex items-center gap-2">
            <IconRepeat className="size-5" />
            <span>{exercise.currentRepetitions}</span>
          </span>
        )}
      </span>
    </div>
  )
}
export default ExerciseItem
