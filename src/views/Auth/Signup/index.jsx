import { useForm, FormProvider } from 'react-hook-form'
import FormInput from '../../../components/FormInput'
import { useRegisterMutation } from '../../../services/auth.service'
import { Link } from 'react-router-dom'
import styles from '../Login/style.module.scss'

export default function Signup() {
  const methods = useForm()

  const { mutate, isLoading } = useRegisterMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log('res: ', res)
      }
    })
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginRow}>
        <div className={styles.loginCol}>
          <div className={styles.loginCard}>
            <h1 className={styles.loginTitle}>Register</h1>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormInput
                  name='name'
                  label='Name'
                  required
                  placeholder='Enter your name'
                />
                <FormInput
                  name='email'
                  label='Email'
                  type='email'
                  required
                  placeholder='Enter your email'
                />
                <FormInput
                  name='password'
                  label='Password'
                  type='password'
                  placeholder='Enter your password'
                  required
                />
                <div className={styles.submitButton}>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isLoading}
                  >
                    Login
                  </button>
                </div>
                <div className={styles.signupLink}>
                  Have an account?{' '}
                  <Link to='/auth/login' className={styles.link}>
                    Login
                  </Link>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
