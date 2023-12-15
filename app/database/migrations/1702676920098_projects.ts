import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('user_id').references('id').inTable('users')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.date('start_date')
      table.date('end_date')
      table.tinyint('status').defaultTo(0)
      table.tinyint('priority').defaultTo(0)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
