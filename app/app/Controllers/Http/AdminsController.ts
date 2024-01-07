import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import { TasksType, projectsType } from 'App/types/adminDataTypes'

export default class AdminsController {
  private tableOfProjects: projectsType = []
  private tableOfTasks: TasksType = []
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

    userDataProjects.map(async (projects) => {
      let tasks = await Task.query().where('project_id', projects.id)
      tasks.map((task) => {
        this.tableOfTasks.push({
          id: task.id,
          project_id: task.project_id,
          name: task.name,
          description: task.description,
          status: task.status,
          priority: task.priority,
        })
      })

      this.tableOfProjects.push({
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
        projects: this.tableOfProjects,
        tasks: this.tableOfTasks,
      },
    })
  }
}
