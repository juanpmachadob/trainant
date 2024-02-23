import { Link } from 'react-router-dom'
import Button from '@/components/Button'
import { Logo } from '@/components/Logo'

const Page404 = () => {
  return (
    <div className="flex h-[100dvh] flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="my-16 flex flex-col items-center gap-4 text-center">
          <Logo className="size-24" />
          <div>
            <p className="text-4xl font-bold">Oops! 404</p>
            <p className="my-2 text-sm">
              We can&apos;t seem to find the element you&apos;re looking for.
            </p>
          </div>
          <Link to="/home">
            <Button className="bottom-1 self-start bg-gradient-to-r from-customPurple to-customRed px-5 text-white">
              Go to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Page404
