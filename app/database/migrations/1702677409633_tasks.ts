import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('project_id').references('id').inTable('projects')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.tinyint('status').defaultTo(0)
      table.tinyint('priority').defaultTo(0)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
