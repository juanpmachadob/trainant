import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '@/store/thunks/authThunk'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import { IconLogout, IconUser } from '@/components/Icons'
import Navbar from '@/components/Navbar'

const Home = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getExercisesRequest())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutRequest())
  }

  return (
    <div className="flex h-[100dvh] flex-col">
      <Navbar>
        <div className="flex flex-row items-center gap-4">
          <IconUser className="size-10" />
          <span>
            <p className="text-sm">Welcome back,</p>
            <p className="font-bold">{user.name || 'User'}</p>
          </span>
        </div>
        <div className="flex">
          <IconLogout
            className="size-6 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </Navbar>
    </div>
  )
}
export default Home
