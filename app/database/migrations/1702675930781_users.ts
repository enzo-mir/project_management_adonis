import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Hash from '@ioc:Adonis/Core/Hash'
export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').defaultTo(this.db.rawQuery('uuid()').knexQuery).primary()
      table.string('username')
      table.string('email').unique()
      table.string('password')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        id: 1,
        username: 'test',
        email: 'test@test.com',
        password: await Hash.make('test'),
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
