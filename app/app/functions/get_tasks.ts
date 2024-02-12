import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default async function getTasks(ctx: HttpContextContract) {
  try {
    const userId = ctx.auth.user?.id
    return await Task.query().where('user_id', userId!)
  } catch (error) {
    return error
  }
}
