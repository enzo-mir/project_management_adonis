import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsController {
  public async dashboard(ctx: HttpContextContract) {
    if (ctx.auth.user) {
      return ctx.inertia.render('Dashboard')
    }
  }
}
