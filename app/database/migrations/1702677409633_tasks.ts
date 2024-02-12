import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.tinyint('status').defaultTo(0)
      table.tinyint('priority').defaultTo(0)
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        id: 1,
        user_id: 1,
        project_id: 1,
        name: 'task1',
        description: 'desc1',
        status: 1,
        priority: 1,
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
