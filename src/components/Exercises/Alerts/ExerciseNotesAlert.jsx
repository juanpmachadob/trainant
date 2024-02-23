import { useState } from 'react'
import TextArea from '@/components/TextArea'

const ExerciseNotesAlert = ({ value, setValue }) => {
  const [notes, setNotes] = useState(value)

  const handleChange = (e) => {
    const { value } = e.target
    setNotes(value)
    setValue((prev) => ({ ...prev, notes: value }))
  }

  return (
    <div>
      <TextArea
        name="notes"
        label="Notes"
        placeholder="Enter your notes here..."
        value={notes}
        onChange={handleChange}
      ></TextArea>
    </div>
  )
}
export default ExerciseNotesAlert
