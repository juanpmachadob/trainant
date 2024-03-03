import { IconWeight } from '@/components/Icons'

const ExerciseEmpty = () => {
  return (
    <div className="my-16 flex flex-col items-center gap-4 text-center">
      <IconWeight className="size-24" />
      <div>
        <p className="text-4xl font-bold">No exercises yet</p>
        <p className="my-2 text-sm">
          Add your first exercise and start exercising by simply click the
          button on the top right side
        </p>
      </div>
    </div>
  )
}
export default ExerciseEmpty
