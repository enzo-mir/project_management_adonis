import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegistersController {
  public async index(ctx: HttpContextContract) {
    return ctx.inertia.render('Home')
  }
}
