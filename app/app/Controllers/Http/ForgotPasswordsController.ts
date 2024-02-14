import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import forgotPassword from 'App/mailers/ForgotPassword'
import User from 'App/Models/User'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class ForgotPasswordsController {
  public async index(ctx: HttpContextContract) {
    const { email, id } = ctx.params
    try {
      const verifyEmail = jwt.verify(email, Env.get('JWT_SECRET'))
      const verifyId = jwt.verify(id, Env.get('JWT_SECRET'))

      return ctx.inertia.render('ForgotPassword')
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return ctx.inertia.render('Undefined', {
          title: 'Error 500 : Token expired or invalid',
        })
      } else {
        return ctx.inertia.render('Undefined')
      }
    }
  }

  public async sendEmail(ctx: HttpContextContract) {
    const { email } = ctx.request.all()
    const emailExist = await User.findBy('email', email)
    if (!emailExist) {
      ctx.session.flash({
        errors: 'Email does nor exist',
      })
      return ctx.response.redirect().back()
    }

    const { data, error } = await forgotPassword(email, emailExist.id)
    if (error) {
      console.log(error)
    }

    console.log(data)

    return ctx.response.redirect().back()
  }
}
