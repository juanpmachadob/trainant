import { useState } from 'react'
import { flushSync } from 'react-dom'

const ExerciseItem = ({ exercise, onClick, children }) => {
  const [image, setImage] = useState(exercise.gifUrl)

  const handleClick = () => {
    if (onClick) {
      document.startViewTransition(() => {
        flushSync(() => {
          onClick(exercise)
        })
      })
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${
        onClick ? 'cursor-pointer' : ''
      } flex w-full select-none flex-row items-center justify-between gap-4 self-start rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white p-4 py-2 shadow-md`}
      style={{ viewTransitionName: `exercise-container-${exercise.id}` }}
    >
      <img
        className="size-16"
        src={image}
        alt={`Exercise preview: ${exercise.name}`}
        onError={() => setImage('/images/exercisePlaceholder.gif')}
        style={{ viewTransitionName: `exercise-image-${exercise.id}` }}
      />
      <span className="w-full overflow-hidden">
        <span className="truncate rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
          {exercise.target}
        </span>
        <p className="truncate text-xl font-bold capitalize">{exercise.name}</p>
      </span>
      {children}
    </div>
  )
}
export default ExerciseItem
