import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import { forgotPasswordRequest } from '@/store/thunks/authThunk'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Logo } from '@/components/Logo'

const ForgotPassword = () => {
  const { formValues, handleInputChange, formErrors, reset } = useForm({
    email: ''
  })
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const callback = () => reset()
    dispatch(forgotPasswordRequest(formValues.email, callback))
  }

  return (
    <main className="flex h-[100dvh] flex-col justify-between">
      <div className="mt-8 flex flex-col items-center gap-4 px-4 text-center">
        <Logo className="size-24" />
        <div>
          <p className="text-4xl font-bold">Trainant</p>
          <p className="text-lg">Forgot your password? Just enter your email!</p>
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
        </div>
        <div className="flex items-center gap-8">
          <Button className="bg-gradient-to-r from-customPurple to-customRed text-customLight">
            Send mail
          </Button>
          <Link
            to="/login"
            className="block w-full cursor-pointer select-none text-end text-customPurple underline"
          >
            Go to login
          </Link>
        </div>
      </form>
    </main>
  )
}
export default ForgotPassword
