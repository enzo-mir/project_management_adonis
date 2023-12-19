import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import AddProjectValidator from 'App/Validators/AddProjectValidator'

export default class ProjectsManagmentsController {
  public async add(ctx: HttpContextContract) {
    try {
      const projectData = await ctx.request.validate(AddProjectValidator)
      await Project.create({
        user_id: ctx.auth.user?.id,
        name: projectData.nameValue,
        description: projectData.descValue,
        start_date: projectData.startDateValue,
        end_date: projectData.endDateValue,
        priority: projectData.priorityValue as 0 | 1 | 2,
      })
      ctx.inertia.location('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
}
