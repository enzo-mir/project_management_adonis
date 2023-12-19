import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksManagmentsController {
  public async add(ctx: HttpContextContract) {
    console.log(ctx.request.all())
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
      return ctx.inertia.location('/dashboard')
    } catch (error) {
      return ctx.inertia.location('/dashboard')
    }
  }
}
