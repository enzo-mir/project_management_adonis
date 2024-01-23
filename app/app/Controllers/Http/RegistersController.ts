import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/AuthValidator'

export default class RegistersController {
  public async index(ctx: HttpContextContract) {
    return ctx.inertia.render('Register')
  }

  public async register(ctx: HttpContextContract) {
    try {
      const data = await ctx.request.validate(RegisterValidator)
      await User.create(data)
      return ctx.inertia.location('/login')
    } catch (error) {
      ctx.session.flash({ errors: error.messages })
      return ctx.response.redirect().back()
    }
  }
}
