import { Resend } from 'resend'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
const resend = new Resend(Env.get('API_RESEND_KEY'))

export default async function forgotPassword(email: string, id: string) {
  function generateHash(text: string) {
    return jwt.sign({ text }, Env.get('JWT_SECRET'), { expiresIn: '1h' })
  }

  const hashedEmail = generateHash(email)
  const hashedId = generateHash(id)
  const defaultUrl = Env.get('APP_URL')
  const urlMaker = defaultUrl + hashedEmail + '/' + hashedId

  const { data, error } = await resend.emails.send({
    from: Env.get('FROM_EMAIL'),
    to: [`${email}`],
    subject: 'Reset password - Project managment',
    html: `<p>
    Please click on the following link to change the password
    <a href="${urlMaker}">Forgot password</a>.
    </p>`,
  })

  if (error) {
    return { error }
  } else {
    return { data }
  }
}
