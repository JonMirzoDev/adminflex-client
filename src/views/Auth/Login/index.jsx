import { useForm, FormProvider } from 'react-hook-form'
import FormInput from '../../../components/FormInput'
import { useLoginMutation } from '../../../services/auth.service'
import authStore from '../../../store/auth.store'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import styles from './style.module.scss'
import { useQueryClient } from 'react-query'

export default function Login() {
  const methods = useForm()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let toastStyle = {
    fontSize: '1.25rem',
    padding: '16px',
    marginTop: '2rem'
  }

  const { mutate, isLoading } = useLoginMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log('res: ', res?.user?.status)
        if (res?.user?.status === 'blocked') {
          toast.error('Account is blocked', {
            style: toastStyle
          })
          methods.reset()
        } else {
          queryClient.invalidateQueries('users')
          authStore.login(res)
          navigate('/users')
        }
      },
      onError: (err) => {
        console.error('Login error: ', err)
        methods.reset()
      }
    })
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginRow}>
        <div className={styles.loginCol}>
          <div className={styles.loginCard}>
            <h1 className={styles.loginTitle}>Login</h1>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                  Don&apos;t have an account?{' '}
                  <Link to='/auth/register' className={styles.link}>
                    Signup
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
