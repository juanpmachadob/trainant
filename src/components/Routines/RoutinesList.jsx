import { Link } from 'react-router-dom'
import RoutineItem from './RoutineItem'

const RoutinesList = ({ routines }) => {
  return (
    <ul className="m-4 flex flex-col gap-4">
      {routines.length > 0 &&
        routines.map((routine) => (
          <Link key={routine.id} to={`/routines/${routine.id}`}>
            <RoutineItem key={routine.id} routine={routine} />
          </Link>
        ))}
    </ul>
  )
}
export default RoutinesList
