import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'

export default async function getProjectDatas(ctx: HttpContextContract) {
  const userId = ctx.auth.user?.id
  return await Project.query().select('*').where('user_id', userId!)
}
