import { useState } from 'react'

/**
 * Custom hook to handle form inputs.
 *
 * @example
 * const {formValues, setFormValues, handleInputChange, formErrors, setFormErrors, reset} = useForm({
 *  name: 'Example'
 * });
 * @param {Object} [initialState={}] - Initial state of the form.
 * @returns {Array[]} - Array with the form values, and the functions to handle the form.
 */
const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState)
  const [formErrors, setFormErrors] = useState({})

  /**
   * Function to reset the form to its initial state.
   * @param {Object} [newFormState=initialState] - New state to reset the form.
   */
  const reset = (newFormState = initialState) => {
    setFormValues(newFormState)
  }

  /**
   * Function to handle input changes.
   * @param {Object} event - Event object from the input.
   */
  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'number' ? Number(value) : value

    setFormValues((prevState) => ({
      ...prevState,
      [name]: newValue
    }))
  }

  return {
    formValues,
    setFormValues,
    handleInputChange,
    formErrors,
    setFormErrors,
    reset
  }
}

export default useForm
