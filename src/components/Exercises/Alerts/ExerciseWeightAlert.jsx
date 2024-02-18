import { useState } from 'react'
import Input from '@/components/Input'

// Variable to convert weight from kilograms to pounds
const CONVERSION = 2.205

const ExerciseWeightAlert = ({ value, setValue }) => {
  const [weight, setWeight] = useState({
    kg: value,
    lb: (value * CONVERSION).toFixed(1)
  })

  const handleTransformWeight = (e, type) => {
    const { value } = e.target
    let weightInKg

    // Convert weight to pounds
    if (type === 'kg') {
      weightInKg = value
      setWeight({
        kg: value,
        lb: (value * CONVERSION).toFixed(1)
      })
    }

    // Convert weight to kilograms
    if (type === 'lb') {
      weightInKg = (value / CONVERSION).toFixed(1)
      setWeight({
        kg: weightInKg,
        lb: value
      })
    }

    setValue((prev) => ({ ...prev, currentWeight: Number(weightInKg) }))
  }

  return (
    <form className="flex flex-row gap-4">
      <Input
        type="number"
        name="currentWeightKG"
        label="Weight (kg)"
        placeholder="Enter your current weight"
        value={weight.kg}
        onChange={(e) => handleTransformWeight(e, 'kg')}
      />

      <Input
        type="number"
        name="currentWeightLB"
        label="Weight (lb)"
        placeholder="Enter your current weight"
        value={weight.lb}
        onChange={(e) => handleTransformWeight(e, 'lb')}
      />
    </form>
  )
}
export default ExerciseWeightAlert
