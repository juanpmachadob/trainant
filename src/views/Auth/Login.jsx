import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import { loginWithEmailAndPasswordRequest } from '@/store/thunks/authThunk'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Logo } from '@/components/Logo'

const Login = () => {
  const { formValues, handleInputChange, formErrors } = useForm({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginWithEmailAndPasswordRequest(formValues))
  }

  return (
    <main className="flex h-[100dvh] flex-col justify-between">
      <div className="mt-8 flex flex-col items-center gap-4 px-4 text-center">
        <Logo className="size-24" />
        <div>
          <p className="text-4xl font-bold">Trainant</p>
          <p className="text-lg">Sign in to your account</p>
        </div>
      </div>
      <form
        className="mb-8 flex flex-col items-center justify-between gap-8 px-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <Input
            label="Email"
            placeholder="Email address"
            type="email"
            name="email"
            value={formValues.email}
            error={formErrors.email}
            onChange={handleInputChange}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            value={formValues.password}
            error={formErrors.password}
            onChange={handleInputChange}
          />
          <Link
            to="/forgot-password"
            className="block w-full cursor-pointer select-none text-end text-customPurple underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <Button className="bg-gradient-to-r from-customPurple to-customRed text-customLight">
            Sign in
          </Button>
          <Link
            to="/register"
            className="block w-full cursor-pointer select-none text-end text-customPurple underline"
          >
            Create account
          </Link>
        </div>
      </form>
    </main>
  )
}
export default Login
