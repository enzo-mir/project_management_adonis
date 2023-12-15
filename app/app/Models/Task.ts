import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public project_id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public status: 0 | 1 | 2

  @column()
  public priority: 0 | 1 | 2
}
