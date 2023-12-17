import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import { TasksType, projectsType } from 'App/types/adminDataTypes'

export default class AdminsController {
  private async getUserData(ctx: HttpContextContract) {
    try {
      const userId = ctx.auth.user?.id
      const userDataProjects = await Project.query().select('*').where('user_id', userId!)
      return userDataProjects
    } catch (error) {
      return error
    }
  }

  public async dashboard(ctx: HttpContextContract) {
    const userDataProjects: Project[] = await this.getUserData(ctx)
    const tableOfProjects: projectsType = []
    const tableOfTasks: TasksType = []
    userDataProjects.map(async (projects) => {
      let task = await Task.query().select('*').where('project_id', projects.id)
      tableOfTasks.push({
        id: task[0].id,
        project_id: task[0].project_id,
        name: task[0].name,
        description: task[0].description,
        status: task[0].status,
        priority: task[0].priority,
      })

      tableOfProjects.push({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        start_date: projects.start_date,
        end_date: projects.end_date,
        status: projects.status,
        priority: projects.priority,
      })
    })

    return ctx.inertia.render('Dashboard', {
      errors: { messages: (userDataProjects as unknown as { error: string }).error || '' },
      userData: {
        projects: tableOfProjects,
        tasks: tableOfTasks,
      },
    })
  }
}
