import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class LoginController {
  public async index(ctx: HttpContextContract) {
    return ctx.inertia.render('Login', { errors: { messages: '' } })
  }

  public async login(ctx: HttpContextContract) {
    const { email, password } = ctx.request.all()
    try {
      if (!(await User.findBy('email', email)))
        throw { messages: { email: 'Email adress incorrect' } }
      const getDatabsePwd = await User.query().select('password').where('email', email)
      if (!(await Hash.verify(getDatabsePwd[0].password, password)))
        throw { messages: { password: 'Password incorrect' } }
      await ctx.auth.attempt(email, password)
      return ctx.inertia.location('/dashboard')
    } catch (error) {
      return ctx.inertia.render('Login', {
        errors: error,
      })
    }
  }
}
