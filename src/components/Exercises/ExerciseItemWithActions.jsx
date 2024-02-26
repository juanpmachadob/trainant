import { IconDelete } from '@/components/Icons'
import ExerciseItem from './ExerciseItem'

const ExerciseItemWithActions = ({ exercise, onClick }) => {
  return (
    <ExerciseItem exercise={exercise}>
      <span
        className="rounded-full bg-inherit p-2 text-customRed duration-150 active:brightness-75"
        onClick={() => onClick(exercise)}
      >
        <IconDelete className="size-5" />
      </span>
    </ExerciseItem>
  )
}
export default ExerciseItemWithActions
