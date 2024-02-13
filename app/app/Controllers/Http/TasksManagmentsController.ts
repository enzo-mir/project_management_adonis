import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'
import AddTaskValidator from 'App/Validators/AddTaskValidator'
import getTasks from 'App/functions/get_tasks'

export default class TasksManagmentsController {
  public async add(ctx: HttpContextContract) {
    try {
      const taskData = await ctx.request.validate(AddTaskValidator)
      await Task.create({
        name: taskData.name,
        user_id: ctx.auth.user!.id,
        description: taskData.description,
        priority: taskData.priority as 0 | 1 | 2,
        project_id: taskData.project_id,
      })
      return ctx.response.redirect().back()
    } catch (error) {
      ctx.session.flash({
        errors: error.message || 'Error : task creation failed',
      })
      return ctx.response.redirect().back()
    }
  }
  public async status(ctx: HttpContextContract) {
    const validationSchema = schema.create({
      taskId: schema.number(),
      status: schema.number(),
    })

    try {
      const taskData = await ctx.request.validate({ schema: validationSchema })
      await Task.query()
        .update({
          status: taskData.status,
        })
        .where('id', taskData.taskId)

      return ctx.response.status(200).json({ tasks: await getTasks(ctx) })
    } catch (error) {
      console.log(error)

      return ctx.inertia.location('/dashboard')
    }
  }

  public async delete(ctx: HttpContextContract) {
    const id: number = await ctx.request.only(['id']).id
    try {
      await Task.query().delete().where('id', id)
      return ctx.response.status(200).json({ tasks: await getTasks(ctx) })
    } catch (error) {
      ctx.response.status(400)
    }
  }
}
