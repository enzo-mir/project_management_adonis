import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import AddProjectValidator from 'App/Validators/AddProjectValidator'
import { schema } from '@ioc:Adonis/Core/Validator'

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

  public async status(ctx: HttpContextContract) {
    const validationSchema = schema.create({
      projectId: schema.number(),
      status: schema.number(),
    })

    try {
      const projectUpdate = await ctx.request.validate({ schema: validationSchema })
      await Project.query()
        .update({
          status: projectUpdate.status,
        })
        .where('id', projectUpdate.projectId)
    } catch (error) {
      console.log(error)
    }
  }
}
