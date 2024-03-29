import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { ProfileUpdateSchema } from 'App/schemas/ProfileUpdate.schema'
import { z } from 'zod'

export default class ProfilesController {
  public async update(ctx: HttpContextContract) {
    try {
      const profileData = ProfileUpdateSchema.parse(ctx.request.all())
      if (profileData.password === '') {
        if (ctx.auth.user!.email === profileData.email) {
          await User.query()
            .update({
              username: profileData.username,
            })
            .where('id', ctx.auth.user!.id)
          return ctx.response.redirect().back()
        } else {
          await User.query()
            .update({
              username: profileData.username,
              email: profileData.email,
            })
            .where('id', ctx.auth.user!.id)
          return ctx.response.redirect().back()
        }
      } else {
        const hashedPassword = await Hash.make(profileData.password)
        if (ctx.auth.user!.email === profileData.email) {
          await User.query()
            .update({
              username: profileData.username,
              password: hashedPassword,
            })
            .where('id', ctx.auth.user!.id)
          return ctx.response.redirect().back()
        } else {
          await User.query()
            .update({
              username: profileData.username,
              email: profileData.email,
              password: hashedPassword,
            })
            .where('id', ctx.auth.user!.id)
          return ctx.response.redirect().back()
        }
      }
    } catch (error) {
      console.log(error)

      ctx.session.flash({
        errors:
          error instanceof z.ZodError
            ? JSON.parse(error.message)[0]?.message
            : error.code === 'ER_DUP_ENTRY'
              ? 'Email already used'
              : 'Error : profile update went wrong',
      })
      return ctx.response.redirect().back()
    }
  }
}
