import { IconWatch } from '@/components/Icons'

const RoutineEmpty = () => {
  return (
    <div className="my-16 flex flex-col items-center gap-4 text-center">
      <IconWatch className="size-24" />
      <div>
        <p className="text-4xl font-bold">No routines yet</p>
        <p className="my-2 text-sm">
          Create your first routine and start exercising by simply click the
          button on the top right side
        </p>
      </div>
    </div>
  )
}
export default RoutineEmpty
