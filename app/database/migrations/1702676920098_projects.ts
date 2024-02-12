import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.date('start_date')
      table.date('end_date')
      table.tinyint('status').defaultTo(0)
      table.tinyint('priority').defaultTo(0)
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        id: 1,
        user_id: 1,
        name: 'project1',
        description: 'desc1',
        start_date: new Date(),
        end_date: new Date(),
        status: 1,
        priority: 1,
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
