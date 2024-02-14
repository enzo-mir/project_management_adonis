import { Head, Link, useForm } from '@inertiajs/inertia-react'
import Layout from './Layout'
import { WrapperForms, ForgotPasswordButton } from '../styles/FormsWrapper'
import { useState } from 'react'
import ModalComponent from '../components/ModalComponent'
import { DivModal } from '../styles/Modale.style'
import ForgotPassword from '../components/ForgotPassword'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<{ password?: string; email?: string }>({})
  const [modale, setModal] = useState<string>('')
  const { data, setData, post, processing } = useForm({
    email: '',
    username: '',
    password: '',
  })

  function handlSubmitLogin(e: React.FormEvent) {
    e.preventDefault()
    post('/login', {
      data,
      onError: (error) => {
        setErrorMessage(error as unknown as { password?: string; email?: string })
      },
    })
  }

  function handleChangeValue(e: React.ChangeEvent) {
    setData({
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    })
  }
  return (
    <WrapperForms>
      {modale ? (
        <DivModal onClick={() => setModal('')}>
          <ModalComponent open={modale} setOpen={setModal} title={'Forgot password'}>
            <ForgotPassword setOpen={setModal} />
          </ModalComponent>
        </DivModal>
      ) : null}

      <Head title="Project_managment - Register" />
      <h2>Login form --</h2>
      <form onSubmit={handlSubmitLogin}>
        <label htmlFor="emailLogin">
          <p>
            Email adress<i title="Must be a valid email">*</i>
          </p>
          <input type="email" name="email" id="emailLogin" onChange={handleChangeValue} required />
          {errorMessage?.email ? <p>{errorMessage.email}</p> : null}
        </label>

        <label htmlFor="passwordLogin">
          <p>
            Password<i title="The password must be further than 8 characters">*</i>
          </p>

          <input
            type="password"
            name="password"
            id="passwordLogin"
            onChange={handleChangeValue}
            required
          />
          {errorMessage?.password ? <p>{errorMessage.password}</p> : null}
          <ForgotPasswordButton type="button" onClick={() => setModal('forgotPassword')}>
            Forgot password ?
          </ForgotPasswordButton>
        </label>
        <div className="cta">
          <button type="submit" disabled={processing}>
            Submit
          </button>
          <Link href="/register">Do not have account ?</Link>
        </div>
      </form>
    </WrapperForms>
  )
}
Login.layout = (page: HTMLElement) => <Layout children={page} />
export default Login
