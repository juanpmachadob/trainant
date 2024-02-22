import { useState } from 'react'
import { IconRepeat, IconWeight } from '@/components/Icons'

const ExerciseItem = ({ showInfo, exercise, onClick = () => {} }) => {
  const [image, setImage] = useState(exercise.gifUrl)

  return (
    <div
      onClick={() => onClick(exercise)}
      className="flex w-full cursor-pointer select-none flex-row items-center justify-between gap-4 self-start rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white p-4 py-2 shadow-md duration-150 hover:brightness-90"
    >
      <img
        className="size-16"
        src={image}
        alt={`Exercise preview: ${exercise.name}`}
        onError={() => setImage('/images/exercisePlaceholder.gif')}
      />
      {/* </span> */}
      <span className="w-full overflow-hidden">
        <span className="rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
          {exercise.target}
        </span>
        <p className="truncate text-xl font-bold capitalize">{exercise.name}</p>
      </span>
      <span className="flex flex-col">
        {showInfo && 'currentWeight' in exercise && (
          <span className="flex items-center gap-2">
            <IconWeight className="size-5" />
            <span>{exercise.currentWeight}kg</span>
          </span>
        )}
        {showInfo && 'currentRepetitions' in exercise && (
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
