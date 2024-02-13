import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class LoginController {
  public async index(ctx: HttpContextContract) {
    return ctx.inertia.render('Login')
  }

  public async login(ctx: HttpContextContract) {
    const { email, password } = ctx.request.all()
    try {
      if (!(await User.findBy('email', email)))
        throw { message: { email: 'Email adress incorrect' } }
      const getDatabsePwd = await User.query().select('password').where('email', email)
      if (!(await Hash.verify(getDatabsePwd[0].password, password)))
        throw { message: { password: 'Password incorrect' } }
      await ctx.auth.attempt(email, password)
      return ctx.response.redirect('/dashboard')
    } catch (error) {
      ctx.session.flash({
        errors: error.message,
      })
      return ctx.response.redirect().back()
    }
  }
}
