import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public name: string

  @column()
  public description: string

  @column.date()
  public start_date: DateTime

  @column.date()
  public end_date: DateTime

  @column()
  public status: 0 | 1 | 2

  @column()
  public priority: 0 | 1 | 2
}
