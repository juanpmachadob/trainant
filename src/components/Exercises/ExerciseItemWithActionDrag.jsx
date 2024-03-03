/* eslint-disable tailwindcss/no-custom-classname */
import { IconSort } from '@/components/Icons'
import ExerciseItem from './ExerciseItem'

const ExerciseItemWithActionDrag = ({ exercise }) => {
  return (
    <ExerciseItem exercise={exercise}>
      <span className="draggable cursor-move px-2 py-4 text-customDarkBlue">
        <IconSort className="size-5" />
      </span>
    </ExerciseItem>
  )
}
export default ExerciseItemWithActionDrag
