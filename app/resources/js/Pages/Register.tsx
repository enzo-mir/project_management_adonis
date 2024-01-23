import { Link, useForm } from '@inertiajs/inertia-react'
import { Head } from '@inertiajs/inertia-react'
import Layout from './Layout'
import { WrapperForms } from '../styles/FormsWrapper'
import { useState } from 'react'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<{
    password?: string
    email?: string
    username?: string
  }>({})

  const { data, setData, post, processing } = useForm({
    email: '',
    username: '',
    password: '',
  })

  function handlSubmitRegister(e: React.FormEvent) {
    e.preventDefault()
    post('/register', {
      data,
      onError: (err) => {
        console.log(err);
        
        setErrorMessage(
          err as unknown as {
            password?: string
            email?: string
            username?: string
          }
        )
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
    <>
      <Head title="Project_managment - Register" />
      <WrapperForms>
        <h2>Register form --</h2>
        <form onSubmit={handlSubmitRegister}>
          <label htmlFor="emailRegister">
            <p>
              Email adress<i title="Must be a valid email">*</i>
            </p>
            <input
              type="email"
              name="email"
              id="emailRegister"
              onChange={handleChangeValue}
              required
            />
            {errorMessage?.email ? <p>{errorMessage.email}</p> : null}
          </label>
          <label htmlFor="usernameRegister">
            <p>
              Username<i title="The username must be further than 4 characters">*</i>
            </p>

            <input
              type="text"
              name="username"
              id="usernameRegister"
              onChange={handleChangeValue}
              required
            />
            {errorMessage?.username ? <p>{errorMessage.username}</p> : null}
          </label>
          <label htmlFor="passwordRegister">
            <p>
              Password<i title="The password must be further than 8 characters">*</i>
            </p>

            <input
              type="password"
              name="password"
              id="passwordRegister"
              onChange={handleChangeValue}
              required
            />
            {errorMessage?.password ? <p>{errorMessage.password}</p> : null}
          </label>
          <div className="cta">
            <button type="submit" disabled={processing}>
              Submit
            </button>
            <Link href="/login">You have an account ?</Link>
          </div>
        </form>
      </WrapperForms>
    </>
  )
}
Register.layout = (page: HTMLElement) => <Layout children={page} />

export default Register
