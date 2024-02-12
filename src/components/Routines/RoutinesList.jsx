import { Link } from 'react-router-dom'
import RoutineEmpty from './RoutineEmpty'
import RoutineItem from './RoutineItem'
import RoutineSkeleton from './RoutineSkeleton'

const RoutinesList = ({ loading, routines }) => {
  return (
    <ul className="m-4 flex flex-col gap-4">
      {loading && routines.length === 0 && <RoutineSkeleton />}

      {!loading && routines.length === 0 && <RoutineEmpty />}

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
