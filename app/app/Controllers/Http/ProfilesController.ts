import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileUpdateValidator from 'App/Validators/ProfileUpdateValidator'

export default class ProfilesController {
  public async update(ctx: HttpContextContract) {
    try {
      const profileData = await ctx.request.validate(ProfileUpdateValidator)
      console.log(profileData)
    } catch (error) {
      console.log(error)
    }
  }
}
