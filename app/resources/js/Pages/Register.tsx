import type { errors } from '../types/authTypeErrors'
const Register = ({ errors }: { errors: errors }) => {
  console.log(errors.messages?.email)

  return (
    <form method="POST" action="register">
      <input type="email" name="email" />
      <input type="text" name="username" />
      <input type="password" name="password" />

      <button type="submit">envoyer</button>
    </form>
  )
}

export default Register
