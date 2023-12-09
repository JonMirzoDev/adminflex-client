/* eslint-disable react/prop-types */
import { useFormContext } from 'react-hook-form'

const FormInput = ({ name, label, type = 'text', ...rest }) => {
  const { register } = useFormContext() // Retrieve register function from the form context

  return (
    <div className='mb-3 row flex flex-column'>
      <label htmlFor={name} className='col-sm-2 col-form-label'>
        {label}
      </label>
      <div className='col-sm-12'>
        <input
          type={type}
          id={name}
          {...register(name)}
          className='form-control'
          {...rest}
        />
      </div>
    </div>
  )
}

export default FormInput
