import User from 'App/Models/User'
import { Resend } from 'resend'
import Env from '@ioc:Adonis/Core/Env'

export default function forgotPassword(user: User) {
  const resend = new Resend(Env.get('API_RESEND_KEY'))
  
}
