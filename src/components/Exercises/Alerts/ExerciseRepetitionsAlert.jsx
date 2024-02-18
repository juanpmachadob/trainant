import { useState } from 'react'
import Input from '@/components/Input'

const ExerciseRepetitionsAlert = ({ value, setValue }) => {
  const [repetitions, setRepetitions] = useState(value)

  const handleChange = (e) => {
    const { value } = e.target
    setRepetitions(value)
    setValue((prev) => ({ ...prev, currentRepetitions: Number(value) }))
  }

  return (
    <form>
      <Input
        type="number"
        name="currentRepetitions"
        label="Repetitions"
        placeholder="Enter your current repetitions"
        value={repetitions}
        onChange={handleChange}
      />
    </form>
  )
}
export default ExerciseRepetitionsAlert
