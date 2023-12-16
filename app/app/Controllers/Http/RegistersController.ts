import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'

export default class RegistersController {
  public async index(ctx: HttpContextContract) {
    return ctx.inertia.render('Register', { errors: { messages: '' } })
  }

  public async register(ctx: HttpContextContract) {
    try {
      await ctx.request.validate(AuthValidator)
      return ctx.inertia.render('Register', { errors: { message: '' } })
    } catch (error) {
      return ctx.inertia.render('Register', { errors: error })
    }
  }
}
