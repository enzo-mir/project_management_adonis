import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.trim(),
    ]),
    username: schema.string([rules.trim(), rules.minLength(4)]),
    password: schema.string([rules.trim(), rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'password.minLength': 'Password must be further than 8 char',
    'username.minLength': 'Username must be further than 4 char',
    'email.email': 'Email invalid',
    'email.unique': 'The adress email is already used !',
  }
}
