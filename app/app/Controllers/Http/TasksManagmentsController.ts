import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

export default class TasksManagmentsController {
  public async add(ctx: HttpContextContract) {
    const validationSchema = schema.create({
      name: schema.string(),
      description: schema.string(),
      priority: schema.number(),
      project_id: schema.number(),
    })
    try {
      const taskData = await ctx.request.validate({ schema: validationSchema })
      const creationTask = await Task.create({
        name: taskData.name,
        description: taskData.description,
        priority: taskData.priority as 0 | 1 | 2,
        project_id: taskData.project_id,
      })
      return ctx.response.status(200).json({ id: creationTask.id })
    } catch (error) {}
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
      return ctx.response.status(200)
    } catch (error) {
      return ctx.inertia.location('/dashboard')
    }
  }
}
