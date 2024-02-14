import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import forgotPassword from 'App/mailers/ForgotPassword'
import User from 'App/Models/User'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import Hash from '@ioc:Adonis/Core/Hash'

export default class ForgotPasswordsController {
  public async index(ctx: HttpContextContract) {
    const { email, id } = ctx.params
    const { password, confirmPassword } = ctx.request.qs()

    try {
      jwt.verify(email, Env.get('JWT_SECRET'))
      jwt.verify(id, Env.get('JWT_SECRET'))

      if (password && confirmPassword) {
        await this.resetPassword(ctx, email, id)
      } else {
        return ctx.inertia.render('ForgotPassword')
      }
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

  public async resetPassword(ctx: HttpContextContract, email: string, id: string) {
    const { password, confirmPassword } = ctx.request.qs()

    try {
      const emailverify = jwt.verify(email, Env.get('JWT_SECRET')) as jwt.JwtPayload & {
        text: string
      }
      const idverify = jwt.verify(id, Env.get('JWT_SECRET')) as jwt.JwtPayload & {
        text: string
      }
      if (password.length >= 8) {
        if (password === confirmPassword) {
          const passwordHashed = await Hash.make(password)
          await User.query()
            .update({
              password: passwordHashed,
            })
            .whereRaw(`id = ${idverify.text} AND email = "${emailverify.text}"`)

          return ctx.response.redirect().back()
        }
        throw new Error('Password and the confirmation password does not matchs')
      }
      throw new Error("Password's length must further than 8")
    } catch (error) {
      console.log(error)

      if (error instanceof JsonWebTokenError) {
        ctx.session.flash({
          errors: 'Error 500 : Token expired or invalid',
        })
        return ctx.response.redirect().back()
      } else {
        ctx.session.flash({
          errors: error.message,
        })
        return ctx.response.redirect().back()
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
