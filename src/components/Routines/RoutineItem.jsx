import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const RoutineItem = ({ routine }) => {
  const [daysWithExercises, setDaysWithExercises] = useState(0)
  const [totalExercises, setTotalExercises] = useState(0)

  useEffect(() => {
    const days = Object.values(routine.exercises).filter(
      (day) => day.length > 0
    ).length
    setDaysWithExercises(days)

    const total = Object.values(routine.exercises).reduce(
      (total, day) => total + day.length,
      0
    )
    setTotalExercises(total)
  }, [routine.exercises])

  return (
    <li className="flex h-24 cursor-pointer flex-col justify-center rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-customLightPurple p-4 shadow-md duration-150 hover:brightness-90">
      <div className="flex gap-2">
        <span className="self-start rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
          {daysWithExercises} days
        </span>
        <span className="self-start rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
          {totalExercises} exercises
        </span>
      </div>
      <p className="text-xl font-bold text-white">{routine.name}</p>
      <p className="text-sm text-white">
        Created at {dayjs(routine.createdAt).format('DD-MMM-YYYY')}
      </p>
    </li>
  )
}
export default RoutineItem
