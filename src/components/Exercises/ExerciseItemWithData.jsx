import { IconRepeat, IconWeight } from '@/components/Icons'
import ExerciseItem from './ExerciseItem'

const ExerciseItemWithData = ({ exercise, onClick }) => {
  return (
    <ExerciseItem exercise={exercise} onClick={onClick}>
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <IconWeight className="size-5" />
          <span>{exercise.currentWeight}kg</span>
        </span>
        <span className="flex items-center gap-2">
          <IconRepeat className="size-5" />
          <span>{exercise.currentRepetitions}</span>
        </span>
      </span>
    </ExerciseItem>
  )
}
export default ExerciseItemWithData
