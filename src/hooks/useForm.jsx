"use client"

import { useState } from "react"

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (callback) => (e) => {
    e.preventDefault()
    callback(values)
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  }
}

