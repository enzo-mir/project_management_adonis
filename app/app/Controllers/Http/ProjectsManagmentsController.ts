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

      const allProjects = await Project.query().where('user_id', ctx.auth.user!.id)

      return ctx.response.status(200).send(allProjects)
    } catch (error) {
      return ctx.inertia.location('/dashboard')
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
      return ctx.response.status(200)
    } catch (error) {
      console.log(error)
    }
  }
  public async delete(ctx: HttpContextContract) {
    const projectId = await ctx.request.only(['project']).project
    try {
      await Project.query().delete().where('id', projectId.id)
      ctx.inertia.redirectBack()
    } catch (error) {
      console.log(error)

      return ctx.response.status(400)
    }
  }
}
