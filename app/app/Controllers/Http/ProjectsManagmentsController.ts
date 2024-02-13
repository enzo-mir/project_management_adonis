import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import AddProjectValidator from 'App/Validators/AddProjectValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
import getProjectDatas from 'App/functions/get_projects'

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

      return ctx.response.redirect().back()
    } catch (error) {
      ctx.session.flash({
        errors: error.message || 'Error durring project adding',
      })
      return ctx.response.redirect().back()
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
      return ctx.response.status(200).json({ projects: await getProjectDatas(ctx) })
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
