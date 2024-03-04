import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '@/hooks/useForm'
import useQuery from '@/hooks/useQuery'
import { resetPasswordRequest } from '@/store/thunks/authThunk'
import { showAlert } from '@/utils/alerts'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { Logo } from '@/components/Logo'

const ResetPassword = () => {
  const query = useQuery()
  const navigate = useNavigate()

  const { formValues, handleInputChange, formErrors } = useForm({
    password: '',
    passwordConfirmation: '',
    oobCode: query.get('oobCode')
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (!formValues.oobCode) {
      showAlert({
        icon: 'error',
        title: 'Error',
        text: 'Reset link is not valid, please try again',
        callback: () => navigate('/login')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const callback = () => navigate('/login')
    dispatch(resetPasswordRequest(formValues, callback))
  }

  return (
    <main className="flex h-[100dvh] flex-col justify-between">
      <div className="mt-8 flex flex-col items-center gap-4 px-4 text-center">
        <Logo className="size-24" />
        <div>
          <p className="text-4xl font-bold">Trainant</p>
          <p className="text-lg">
            Reset your password and continue exercising!
          </p>
        </div>
      </div>
      <form
        className="mb-8 flex flex-col items-center justify-between gap-8 px-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <Input
            label="Password"
            placeholder="New password"
            type="password"
            name="password"
            value={formValues.password}
            error={formErrors.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center gap-8">
          <Button className="bg-gradient-to-r from-customPurple to-customRed text-customLight">
            Reset password
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
export default ResetPassword
