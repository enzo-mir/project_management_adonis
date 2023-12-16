import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react'
import { errors } from '../types/authTypeErrors'
import Layout from './Layout'
import { WrapperForms } from '../styles/FormsWrapper'

const Login = ({ errors }: { errors: errors }) => {
  const { data, setData, post, processing } = useForm({
    email: '',
    username: '',
    password: '',
  })

  function handlSubmitLogin(e: React.FormEvent) {
    e.preventDefault()
    post('/login', { data })
  }

  function handleChangeValue(e: React.ChangeEvent) {
    setData({
      ...data,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    })
  }
  return (
    <WrapperForms>
      <Head title="Project_managment - Register" />
      <h2>Login form --</h2>
      <form onSubmit={handlSubmitLogin}>
        <label htmlFor="emailLogin">
          <p>
            Email adress<i title="Must be a valid email">*</i>
          </p>
          <input type="email" name="email" id="emailLogin" onChange={handleChangeValue} required />
          {errors.messages?.email && <p>{errors.messages?.email}</p>}
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
          {errors.messages?.password && <p>{errors.messages?.password}</p>}
        </label>
        <div className="cta">
          <button type="submit" disabled={processing}>
            Submit
          </button>
          <InertiaLink href="/register">Do not have account ?</InertiaLink>
        </div>
      </form>
    </WrapperForms>
  )
}
Login.layout = (page: HTMLElement) => <Layout children={page} />
export default Login
