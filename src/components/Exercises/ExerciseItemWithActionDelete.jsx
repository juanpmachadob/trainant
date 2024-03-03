import { IconDelete } from '@/components/Icons'
import ExerciseItem from './ExerciseItem'

const ExerciseItemWithActionDelete = ({ exercise, onClick }) => {
  return (
    <ExerciseItem exercise={exercise}>
      <span
        className="cursor-pointer rounded-full bg-inherit p-2 text-customRed duration-150 active:brightness-75"
        onClick={() => onClick ? onClick(exercise) : null}
      >
        <IconDelete className="size-5" />
      </span>
    </ExerciseItem>
  )
}
export default ExerciseItemWithActionDelete
