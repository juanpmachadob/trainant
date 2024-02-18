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
    <form>
      <TextArea
        name="notes"
        label="Notes"
        placeholder="Enter your notes here..."
        value={notes}
        onChange={handleChange}
      ></TextArea>
    </form>
  )
}
export default ExerciseNotesAlert
