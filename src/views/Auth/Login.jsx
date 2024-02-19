import { useDispatch } from 'react-redux'
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
    <main className="flex h-[100dvh] flex-col items-center justify-between">
      <span></span>

      {/* Logo */}
      <div className="flex flex-col items-center justify-center">
        <Logo className="text-customDarkBlue" />
      </div>

      {/* Options */}
      <div className="w-full rounded-t-3xl bg-white/75 px-4 py-8 shadow-lg shadow-black">
        <div className="mb-8">
          <p className="text-6xl font-bold">Trainant</p>
          <p className="text-lg">Sign in to your account</p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
          <span
            className="block cursor-pointer select-none text-end text-customPurple underline"
            onClick={() => alert('not yet')}
          >
            Forget password?
          </span>

          <Button className="bottom-1 mt-4 self-start bg-gradient-to-r from-customPurple to-customRed text-customLight">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  )
}

export default Login
