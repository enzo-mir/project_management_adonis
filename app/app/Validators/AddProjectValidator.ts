import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddProjectValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    nameValue: schema.string(),
    descValue: schema.string(),
    startDateValue: schema.date(),
    endDateValue: schema.date(),
    priorityValue: schema.number(),
  })
  public messages: CustomMessages = {}
}
