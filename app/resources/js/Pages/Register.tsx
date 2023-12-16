import { InertiaLink, useForm } from '@inertiajs/inertia-react'
import type { errors } from '../types/authTypeErrors'
import { Head } from '@inertiajs/inertia-react'
import Layout from './Layout'
import { WrapperForms } from '../styles/FormsWrapper'

const Register = ({ errors }: { errors: errors }) => {
  const { data, setData, post, processing } = useForm({
    email: '',
    username: '',
    password: '',
  })

  function handlSubmitRegister(e: React.FormEvent) {
    e.preventDefault()
    post('/register', { data })
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
            {errors.messages?.email && <p>{errors.messages?.email}</p>}
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
            {errors.messages?.username && <p>{errors.messages?.username}</p>}
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
            {errors.messages?.password && <p>{errors.messages?.password}</p>}
          </label>
          <div className="cta">
            <button type="submit" disabled={processing}>
              Submit
            </button>
            <InertiaLink href="/login">You have an account ?</InertiaLink>
          </div>
        </form>
      </WrapperForms>
    </>
  )
}
Register.layout = (page: HTMLElement) => <Layout children={page} />

export default Register
