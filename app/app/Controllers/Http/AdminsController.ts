import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import getProjectDatas from 'App/functions/get_projects'
import getTasks from 'App/functions/get_tasks'
import { TasksType } from 'App/types/adminDataTypes'

export default class AdminsController {
  public async dashboard(ctx: HttpContextContract) {
    try {
      const projects: Project[] = await getProjectDatas(ctx)
      const tasks: TasksType[] = await getTasks(ctx)

      return ctx.inertia.render('Dashboard', {
        projects,
        tasks,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
