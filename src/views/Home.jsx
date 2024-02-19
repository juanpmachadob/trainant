import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutRequest } from '@/store/thunks/authThunk'
import { getExercisesRequest } from '@/store/thunks/exercisesThunk'
import Button from '@/components/Button'
import { IconLogout, IconUser } from '@/components/Icons'
import { Logo } from '@/components/Logo'
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
      <div className="flex flex-1 items-center justify-center">
        <div className="my-16 flex flex-col items-center gap-4 text-center">
          <div className="animate-bounce">
            <Logo className="size-24" />
          </div>
          {/* <IconWeight className="size-24 animate-bounce" /> */}
          <div>
            <p className="text-4xl font-bold">Are you ready?</p>
            <p className="my-2 text-sm">
              Click the button below to start exercising!
            </p>
          </div>
          <Link to="/routines">
            <Button className="bottom-1 self-start bg-gradient-to-r from-customPurple to-customRed px-5 text-white">
              My routines
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
