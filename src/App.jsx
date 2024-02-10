import { AppRouter } from '@/router/AppRouter'
import BlurBackground from '@/components/BlurBackground'
import Loader from '@/components/Loader'

const App = () => {
  return (
    <>
      <BlurBackground />
      <Loader />
      <AppRouter />
    </>
  )
}

export default App
